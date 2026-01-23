'use client'

import React from 'react'

import { useParams } from 'next/navigation'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import { useGetPaymentDetailsQuery } from '@src/store/services/paymentApi'

const PaymentDetails = () => {
  const params = useParams()
  const paymentId = params?.id as string

  // RTK Query hook
  const {
    data: paymentResponse,
    isLoading,
    error,
  } = useGetPaymentDetailsQuery(paymentId, {
    skip: !paymentId,
  })

  const paymentData = paymentResponse?.data

  const statusColors: Record<
    string,
    { bg: string; text: string; label: string }
  > = {
    completed: {
      bg: 'bg-green-100',
      text: 'text-green-800',
      label: '✓ Completed',
    },
    pending: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-800',
      label: '⏳ Pending',
    },
    failed: { bg: 'bg-red-100', text: 'text-red-800', label: '✕ Failed' },
  }

  const statusStyle = paymentData ? statusColors[paymentData.status] : null

  if (isLoading) {
    return (
      <React.Fragment>
        <BreadCrumb title="Payment Details" subTitle="Loading..." />
        <div className="grid grid-cols-12 gap-x-space">
          <div className="col-span-12 card">
            <div className="card-body flex justify-center py-12">
              <svg
                className="animate-spin h-12 w-12 text-blue-600"
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
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  if (error) {
    return (
      <React.Fragment>
        <BreadCrumb title="Payment Details" subTitle="Error" />
        <div className="grid grid-cols-12 gap-x-space">
          <div className="col-span-12 card bg-red-50 border border-red-200">
            <div className="card-body">
              <p className="text-red-700">
                {error instanceof Error
                  ? error.message
                  : 'Failed to fetch payment details'}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  if (!paymentData) {
    return (
      <React.Fragment>
        <BreadCrumb title="Payment Details" subTitle="Not Found" />
        <div className="grid grid-cols-12 gap-x-space">
          <div className="col-span-12 card bg-yellow-50 border border-yellow-200">
            <div className="card-body">
              <p className="text-yellow-700">Payment not found</p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <BreadCrumb
        title="Payment Details"
        subTitle={paymentData.subscription_name}
      />
      <div className="grid grid-cols-12 gap-x-space">
        {/* Main Card */}
        <div className="col-span-12 card">
          <div className="card-body">
            {/* Header with Status */}
            <div className="flex justify-between items-start mb-6 pb-6 border-b">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {paymentData.subscription_name}
                </h2>
                <p className="text-gray-600 mt-1">
                  Payment ID: {paymentData.razorpay_payment_id}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-lg font-semibold badge ${statusStyle?.bg} ${statusStyle?.text}`}>
                {statusStyle?.label}
              </span>
            </div>

            {/* Amount Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6 pb-6 border-b">
              <div>
                <p className="text-gray-600 text-sm mb-2">Amount Paid</p>
                <p className="text-4xl font-bold text-green-600">
                  ₹{paymentData.amount.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-2">Payment Method</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {paymentData.payment_method}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-gray-600 text-sm mb-1">Transaction ID</p>
                <p className="text-gray-900 font-mono text-sm break-all">
                  {paymentData._id}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Payment Date</p>
                <p className="text-gray-900">{paymentData.transaction_date}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Order ID</p>
                <p className="text-gray-900 font-mono text-sm">
                  {paymentData.razorpay_order_id}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Status</p>
                <p className={`font-semibold ${statusStyle?.text}`}>
                  {statusStyle?.label}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Currency</p>
                <p className="text-gray-900">{paymentData.currency}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Subscription ID</p>
                <p className="text-gray-900 font-mono text-sm">
                  {paymentData.subscription_id}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mt-6 pt-6 border-t">
              <button
                onClick={() => window.print()}
                className="btn btn-primary">
                Print Receipt
              </button>
              <button
                onClick={() => window.history.back()}
                className="btn btn-default">
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        {paymentData.status === 'completed' && (
          <div className="col-span-12 card bg-green-50 border border-green-200">
            <div className="card-body">
              <h3 className="text-lg font-bold text-green-900 mb-2">
                ✓ Payment Successful
              </h3>
              <p className="text-green-800">
                Your subscription is now active. You can access all features.
              </p>
            </div>
          </div>
        )}

        {paymentData.status === 'failed' && (
          <div className="col-span-12 card bg-red-50 border border-red-200">
            <div className="card-body">
              <h3 className="text-lg font-bold text-red-900 mb-2">
                ✕ Payment Failed
              </h3>
              <p className="text-red-800 mb-4">
                Your payment could not be processed. Please try again.
              </p>
              <button className="btn btn-danger">Retry Payment</button>
            </div>
          </div>
        )}

        {paymentData.status === 'pending' && (
          <div className="col-span-12 card bg-yellow-50 border border-yellow-200">
            <div className="card-body">
              <h3 className="text-lg font-bold text-yellow-900 mb-2">
                ⏳ Payment Pending
              </h3>
              <p className="text-yellow-800">
                Your payment is being processed. Please wait...
              </p>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default PaymentDetails
