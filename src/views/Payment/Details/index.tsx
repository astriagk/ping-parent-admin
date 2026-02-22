'use client'

import React from 'react'

import { useParams } from 'next/navigation'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import {
  PaymentMethodLabel,
  PaymentStatus,
  PaymentStatusBadge,
  PaymentStatusLabel,
  PaymentType,
  PaymentTypeLabel,
} from '@src/shared/constants/enums'
import { useGetPaymentDetailsQuery } from '@src/store/services/paymentApi'

const statusBannerConfig: Record<
  PaymentStatus,
  {
    card: string
    title: string
    titleClass: string
    body: string
    bodyClass: string
  }
> = {
  [PaymentStatus.COMPLETED]: {
    card: 'bg-green-50 border border-green-200',
    title: '✓ Payment Successful',
    titleClass: 'text-green-900',
    body: 'This payment has been completed successfully.',
    bodyClass: 'text-green-800',
  },
  [PaymentStatus.FAILED]: {
    card: 'bg-red-50 border border-red-200',
    title: '✕ Payment Failed',
    titleClass: 'text-red-900',
    body: 'This payment could not be processed.',
    bodyClass: 'text-red-800',
  },
  [PaymentStatus.PENDING]: {
    card: 'bg-yellow-50 border border-yellow-200',
    title: '⏳ Payment Pending',
    titleClass: 'text-yellow-900',
    body: 'This payment is currently being processed.',
    bodyClass: 'text-yellow-800',
  },
  [PaymentStatus.REFUNDED]: {
    card: 'bg-blue-50 border border-blue-200',
    title: '↩ Payment Refunded',
    titleClass: 'text-blue-900',
    body: 'This payment has been refunded.',
    bodyClass: 'text-blue-800',
  },
}

const DetailRow = ({
  label,
  value,
  mono = false,
}: {
  label: string
  value: React.ReactNode
  mono?: boolean
}) => (
  <div>
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p
      className={`text-gray-900 text-sm ${mono ? 'font-mono break-all' : 'font-medium'}`}>
      {value ?? '—'}
    </p>
  </div>
)

const PaymentDetails = () => {
  const params = useParams()
  const paymentId = params?.id as string

  const { data: paymentResponse, error } = useGetPaymentDetailsQuery(
    paymentId,
    { skip: !paymentId }
  )

  const payment = paymentResponse?.data

  if (error || !payment) {
    return (
      <React.Fragment>
        <BreadCrumb
          title="Payment Details"
          subTitle={error ? 'Error' : 'Not Found'}
        />
        <div className="grid grid-cols-12 gap-x-space">
          <div
            className={`col-span-12 card ${error ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <div className="card-body">
              <p className={error ? 'text-red-700' : 'text-yellow-700'}>
                {error
                  ? 'Failed to fetch payment details.'
                  : 'Payment not found.'}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  const status = payment.payment_status as PaymentStatus
  const statusBadgeClass = PaymentStatusBadge[status] ?? 'badge-gray'
  const statusLabel = PaymentStatusLabel[status] ?? status
  const banner = statusBannerConfig[status]
  const gw = payment.gateway_response

  return (
    <React.Fragment>
      <BreadCrumb title="Payment Details" subTitle={payment.payment_id} />
      <div className="grid grid-cols-12 gap-x-space">
        {/* Main Card */}
        <div className="col-span-12 card">
          <div className="card-body">
            {/* Header */}
            <div className="flex justify-between items-start mb-6 pb-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {payment.payment_id}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Transaction: {payment.transaction_id}
                </p>
              </div>
              <span
                className={`badge inline-flex items-center gap-1 ${statusBadgeClass}`}>
                {statusLabel}
              </span>
            </div>

            {/* Amount + Method */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 pb-6 border-b">
              <div>
                <p className="text-gray-500 text-sm mb-1">Amount Paid</p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{payment.amount.toLocaleString('en-IN')}
                </p>
                <p className="text-gray-400 text-xs mt-1">{payment.currency}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Payment Method</p>
                <p className="text-xl font-semibold text-gray-900">
                  {PaymentMethodLabel[payment.payment_method] ??
                    payment.payment_method}
                </p>
                {gw?.vpa && (
                  <p className="text-gray-500 text-xs mt-1">{gw.vpa}</p>
                )}
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Payment Date</p>
                <p className="text-gray-900 font-medium">
                  {new Date(payment.payment_date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  {new Date(payment.payment_date).toLocaleTimeString('en-IN', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b">
              <DetailRow label="Payment ID" value={payment.payment_id} mono />
              <DetailRow
                label="Subscription ID"
                value={payment.subscription_id}
                mono
              />
              <DetailRow
                label="Transaction ID"
                value={payment.transaction_id}
                mono
              />
              <DetailRow
                label="Payment Type"
                value={
                  PaymentTypeLabel[payment.payment_type as PaymentType] ??
                  payment.payment_type
                }
              />
              <DetailRow label="Parent ID" value={payment.parent_id} mono />
              <DetailRow label="Currency" value={payment.currency} />
            </div>

            {/* Gateway Response */}
            {gw && (
              <>
                <h4 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Gateway Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 pb-6 border-b">
                  <DetailRow
                    label="Razorpay Payment ID"
                    value={gw.razorpay_payment_id}
                    mono
                  />
                  <DetailRow
                    label="Razorpay Order ID"
                    value={gw.razorpay_order_id}
                    mono
                  />
                  <DetailRow
                    label="Gateway Amount"
                    value={`₹${(gw.amount / 100).toLocaleString('en-IN')}`}
                  />
                  <DetailRow label="Fee" value={`₹${gw.fee.toFixed(2)}`} />
                  <DetailRow label="Tax" value={`₹${gw.tax.toFixed(2)}`} />
                  <DetailRow label="Contact" value={gw.contact} />
                  {gw.vpa && <DetailRow label="VPA" value={gw.vpa} mono />}
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() => window.print()}
                className="btn btn-primary">
                Print Receipt
              </button>
              <button
                onClick={() => window.history.back()}
                className="btn btn-light">
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Status Banner */}
        {banner && (
          <div className={`col-span-12 card ${banner.card}`}>
            <div className="card-body">
              <h3 className={`text-base font-bold mb-1 ${banner.titleClass}`}>
                {banner.title}
              </h3>
              <p className={`text-sm ${banner.bodyClass}`}>{banner.body}</p>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default PaymentDetails
