'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetPaymentListQuery } from '@src/store/services/paymentApi'

const statusBadge: Record<string, { label: string; className: string }> = {
  success: { label: 'Success', className: 'badge-green' },
  failed: { label: 'Failed', className: 'badge-red' },
  pending: { label: 'Pending', className: 'badge-yellow' },
  refunded: { label: 'Refunded', className: 'badge-blue' },
}

const PaymentList = () => {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<string>('')

  const { data: paymentsData, isLoading } = useGetPaymentListQuery(
    statusFilter ? { status: statusFilter } : undefined
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: 'parent_name',
        header: 'Parent',
        cell: ({ row }: { row: { original: any } }) =>
          row.original.parent_name || '—',
      },
      {
        accessorKey: accessorkeys.amount,
        header: headerKeys.amount,
        cell: ({ row }: { row: { original: any } }) =>
          `₹${(row.original.amount ?? 0).toLocaleString()}`,
      },
      {
        accessorKey: accessorkeys.paymentMethod,
        header: headerKeys.paymentMethod,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.payment_method || '—',
      },
      {
        accessorKey: accessorkeys.paymentStatus,
        header: headerKeys.paymentStatus,
        cell: ({ row }: { row: { original: any } }) => {
          const status = row.original.status ?? ''
          const { label, className } = statusBadge[status] || {
            label: status,
            className: 'badge-gray',
          }
          return (
            <span className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }: { row: { original: any } }) =>
          row.original.created_at
            ? new Date(row.original.created_at).toLocaleDateString()
            : '—',
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: any } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() =>
                router.push(
                  `/payments/details/${row.original.payment_id ?? row.original._id}`
                )
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
                <option value="success">Success</option>
                <option value="failed">Failed</option>
                <option value="pending">Pending</option>
                <option value="refunded">Refunded</option>
              </select>
            </div>
          </div>
          <div className="pt-4 card-body">
            {isLoading ? (
              <p className="text-sm text-gray-500">Loading payments…</p>
            ) : (
              <DatatablesHover columns={columns} data={paymentsData?.data || []} />
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PaymentList
