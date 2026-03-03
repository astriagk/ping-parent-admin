'use client'

import React, { useMemo } from 'react'

import { ParentSubscription } from '@src/dtos/subscription'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetParentSubscriptionsQuery } from '@src/store/services/subscriptionApi'

const statusBadge: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'badge-green' },
  expired: { label: 'Expired', className: 'badge-red' },
  cancelled: { label: 'Cancelled', className: 'badge-yellow' },
}

const ParentSubscriptionsList = () => {
  const { data: subscriptionsData } = useGetParentSubscriptionsQuery()

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.plan_id, header: headerKeys.planName },
      { accessorKey: accessorkeys.parent_id, header: headerKeys.parentName },
      {
        accessorKey: accessorkeys.subscription_status,
        header: headerKeys.subscriptionStatus,
        cell: ({ row }: { row: { original: ParentSubscription } }) => {
          const { label, className } = statusBadge[
            row.original.subscription_status
          ] || {
            label: row.original.subscription_status,
            className: 'badge-gray',
          }
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.calculated_price,
        header: headerKeys.amount,
        cell: ({ row }: { row: { original: ParentSubscription } }) =>
          `₹${row.original.calculated_price}`,
      },
      {
        accessorKey: accessorkeys.startDate,
        header: headerKeys.startDate,
        cell: ({ row }: { row: { original: ParentSubscription } }) =>
          new Date(row.original.start_date).toLocaleDateString(),
      },
      {
        accessorKey: accessorkeys.endDate,
        header: headerKeys.endDate,
        cell: ({ row }: { row: { original: ParentSubscription } }) =>
          new Date(row.original.end_date).toLocaleDateString(),
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: ParentSubscription } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => console.log('View', row.original)}>
              View
            </button>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Parent Subscriptions" subTitle="Billing" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-body">
            <DatatablesHover
              columns={columns}
              data={subscriptionsData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ParentSubscriptionsList
