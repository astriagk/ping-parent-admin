'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Payment } from '@src/dtos/payment'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import {
  PaymentMethodLabel,
  PaymentStatus,
  PaymentStatusBadge,
  PaymentStatusLabel,
} from '@src/shared/constants/enums'
import { useGetPaymentListQuery } from '@src/store/services/paymentApi'

const PaymentList = () => {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<string>('')

  const { data: paymentsData, isLoading } = useGetPaymentListQuery()

  const filteredData = useMemo(() => {
    const all = paymentsData?.data ?? []
    if (!statusFilter) return all
    return all.filter((p) => p.payment_status === statusFilter)
  }, [paymentsData, statusFilter])

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.paymentId,
        header: headerKeys.paymentId,
      },
      {
        accessorKey: accessorkeys.amount,
        header: headerKeys.amount,
        cell: ({ row }: { row: { original: Payment } }) =>
          `₹${(row.original.amount ?? 0).toLocaleString()}`,
      },
      {
        accessorKey: accessorkeys.paymentMethod,
        header: headerKeys.paymentMethod,
        cell: ({ row }: { row: { original: Payment } }) =>
          PaymentMethodLabel[row.original.payment_method] ??
          row.original.payment_method,
      },
      {
        accessorKey: accessorkeys.paymentStatus,
        header: headerKeys.paymentStatus,
        cell: ({ row }: { row: { original: Payment } }) => {
          const status = row.original.payment_status as PaymentStatus
          const label = PaymentStatusLabel[status] ?? status
          const className = PaymentStatusBadge[status] ?? 'badge-gray'
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.paymentDate,
        header: headerKeys.paymentDate,
        cell: ({ row }: { row: { original: Payment } }) =>
          row.original.payment_date
            ? new Date(row.original.payment_date).toLocaleDateString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })
            : '—',
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: Payment } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                router.push(`/payments/details/${row.original._id}`)
              }>
              View
            </button>
          </div>
        ),
      },
    ],
    [router]
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Payments" subTitle="Payment List" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="flex flex-wrap items-center gap-4">
              <label className="font-medium text-sm">Status:</label>
              <select
                className="form-select w-48"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="">All</option>
                {Object.values(PaymentStatus).map((s) => (
                  <option key={s} value={s}>
                    {PaymentStatusLabel[s]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="pt-4 card-body">
            {isLoading ? (
              <p className="text-sm text-gray-500">Loading payments…</p>
            ) : (
              <DatatablesHover
                columns={columns}
                data={filteredData}
              />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PaymentList
