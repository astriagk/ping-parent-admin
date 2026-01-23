'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import { paths } from '@src/shared/common/DynamicTitle'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import {
  accessorkeys,
  badges,
  buttonsKeys,
  headerKeys,
} from '@src/shared/constants/columns'
import {
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
} from '@src/store/services/paymentApi'
import { loadRazorpayScript } from '@src/utils/razorpay/loadScript'

interface PaymentItem {
  id: string
  subscriptionName: string
  amount: number
  description: string
}

const PaymentList = () => {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [processingPaymentId, setProcessingPaymentId] = useState<string | null>(
    null
  )

  // RTK Query hooks
  const [createOrder, { isLoading: isOrderLoading }] =
    useCreatePaymentOrderMutation()
  const [verifyPayment] = useVerifyPaymentMutation()

  // Get Razorpay Key from environment
  const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID

  // Sample payment items - Replace with actual data from backend
  const paymentItems: PaymentItem[] = [
    {
      id: 'payment_001',
      subscriptionName: 'Monthly Subscription',
      amount: 500,
      description: 'Monthly subscription plan',
    },
    {
      id: 'payment_002',
      subscriptionName: 'Quarterly Subscription',
      amount: 1200,
      description: 'Quarterly subscription plan',
    },
    {
      id: 'payment_003',
      subscriptionName: 'Annual Subscription',
      amount: 4000,
      description: 'Annual subscription plan',
    },
  ]

  // Load Razorpay script on mount
  React.useEffect(() => {
    const loadScript = async () => {
      try {
        await loadRazorpayScript()
      } catch (err) {
        console.error('Failed to load Razorpay script:', err)
        setError('Failed to initialize payment system')
      }
    }
    loadScript()
  }, [])

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: 'subscriptionName',
        header: 'Subscription',
      },
      {
        accessorKey: 'amount',
        header: 'Amount',
        cell: ({ row }: { row: { original: any } }) =>
          `₹${row.original.amount}`,
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        className: 'text-right',
        cell: ({ row }: { row: { original: PaymentItem } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-primary btn-sm"
              disabled={processingPaymentId === row.original.id}
              onClick={() => handlePaymentClick(row.original)}>
              {processingPaymentId === row.original.id ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Pay Now'
              )}
            </button>
          </div>
        ),
      },
    ],
    [processingPaymentId]
  )

  const handlePaymentClick = async (paymentItem: PaymentItem) => {
    setProcessingPaymentId(paymentItem.id)
    setError(null)

    try {
      // Step 1: Create order on backend
      const orderResponse = await createOrder({
        amount: paymentItem.amount,
        currency: 'INR',
        subscription_id: paymentItem.id,
        description: paymentItem.description,
      }).unwrap()

      if (!orderResponse.data || !orderResponse.data.id) {
        throw new Error('Failed to create order')
      }

      // Step 2: Open Razorpay checkout
      openRazorpayCheckout(orderResponse.data.id, paymentItem)
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to initiate payment'
      setError(errorMessage)
      console.error('Payment initiation error:', err)
      setProcessingPaymentId(null)
    }
  }

  const openRazorpayCheckout = (orderId: string, paymentItem: PaymentItem) => {
    const Razorpay = (window as any).Razorpay

    if (!Razorpay || !razorpayKeyId) {
      setError('Razorpay is not ready. Please check your configuration.')
      setProcessingPaymentId(null)
      console.error('Razorpay Key ID:', razorpayKeyId)
      console.error('Razorpay loaded:', !!Razorpay)
      return
    }

    const options = {
      key: razorpayKeyId,
      amount: Math.round(paymentItem.amount * 100),
      currency: 'INR',
      name: 'Ping Parent',
      description: paymentItem.description,
      order_id: orderId,
      handler: (response: any) => handlePaymentSuccess(response, paymentItem),
      prefill: {
        email:
          typeof window !== 'undefined'
            ? localStorage.getItem('userEmail') || ''
            : '',
        contact:
          typeof window !== 'undefined'
            ? localStorage.getItem('userPhone') || ''
            : '',
      },
      theme: {
        color: '#3399cc',
      },
    }

    try {
      const rzp = new Razorpay(options)

      rzp.on('payment.failed', (response: any) => {
        handlePaymentError({
          description: response.error.description,
        })
      })

      rzp.open()
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to open checkout'
      setError(errorMessage)
      setProcessingPaymentId(null)
    }
  }

  const handlePaymentSuccess = async (
    response: any,
    paymentItem: PaymentItem
  ) => {
    try {
      // Step 1: Verify payment on backend
      const verificationResult = await verifyPayment({
        razorpay_order_id: response.razorpay_order_id,
        razorpay_payment_id: response.razorpay_payment_id,
        razorpay_signature: response.razorpay_signature,
        payment_id: paymentItem.id,
      }).unwrap()

      if (verificationResult.success) {
        handlePaymentComplete(verificationResult.data)
      } else {
        throw new Error(
          verificationResult.error || 'Payment verification failed'
        )
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Payment verification failed'
      setError(errorMessage)
      console.error('Verification error:', err)
      setProcessingPaymentId(null)
    }
  }

  const handlePaymentError = (errorDetails: any) => {
    const errorMessage = `Payment failed: ${errorDetails.description}`
    setError(errorMessage)
    setProcessingPaymentId(null)
    console.error('Payment error:', errorDetails)
  }

  const handlePaymentComplete = (paymentData: any) => {
    console.log('Payment completed:', paymentData)
    alert('Payment successful! Your subscription is now active.')
    // window.location.href = '/dashboard'
  }

  return (
    <React.Fragment>
      <BreadCrumb title="Payments" subTitle="Payment List" />
      <div className="grid grid-cols-12 gap-x-space">
        {/* Error Message */}
        {error && (
          <div className="col-span-12">
            <div className="card bg-red-50 border border-red-200">
              <div className="card-body">
                <div className="flex justify-between items-center">
                  <span className="text-red-700">{error}</span>
                  <button
                    onClick={() => setError(null)}
                    className="text-red-700 hover:text-red-900 font-bold">
                    ✕
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Razorpay Configuration Check */}
        {!razorpayKeyId && (
          <div className="col-span-12">
            <div className="card bg-yellow-50 border border-yellow-200">
              <div className="card-body">
                <p className="text-yellow-700">
                  ⚠️ Razorpay Key ID is not configured. Please check your
                  environment variables.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Payment Table */}
        <div className="col-span-12 card">
          <div className="card-body">
            <DatatablesHover columns={columns} data={paymentItems || []} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default PaymentList
