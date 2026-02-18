'use client'

import React, { useMemo } from 'react'

import { SubscriptionPlan } from '@src/dtos/subscription'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, badges, headerKeys } from '@src/shared/constants/columns'
import { useGetSubscriptionPlansQuery } from '@src/store/services/subscriptionApi'
import { CirclePlus } from 'lucide-react'

const planTypeBadge: Record<string, string> = {
  MONTHLY: 'badge-blue',
  QUARTERLY: 'badge-purple',
  YEARLY: 'badge-green',
}

const SubscriptionPlansList = () => {
  const { data: plansData } = useGetSubscriptionPlansQuery()

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.roleName, header: 'Plan Name' },
      { accessorKey: accessorkeys.description, header: headerKeys.description },
      {
        accessorKey: accessorkeys.planType,
        header: headerKeys.planType,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) => (
          <span
            className={`badge inline-flex items-center gap-1 ${planTypeBadge[row.original.plan_type] || 'badge-gray'}`}>
            {row.original.plan_type}
          </span>
        ),
      },
      {
        accessorKey: accessorkeys.pricingModel,
        header: headerKeys.pricingModel,
      },
      {
        accessorKey: accessorkeys.basePrice,
        header: headerKeys.basePrice,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) =>
          `₹${row.original.base_price}`,
      },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) => {
          const mapKey = String(row.original.is_active) as keyof typeof badges
          const { label, className } = badges[mapKey] || badges.undefined
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => console.log('Edit', row.original)}>
              Edit
            </button>
            <button
              className={`btn btn-sm ${row.original.is_active ? 'btn-orange' : 'btn-green'}`}
              onClick={() => console.log('Toggle', row.original)}>
              {row.original.is_active ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Subscription Plans" subTitle="Billing" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="flex flex-wrap justify-end gap-5">
              <button
                className="btn btn-primary shrink-0"
                onClick={() => console.log('Add Plan')}>
                <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                Add Plan
              </button>
            </div>
          </div>
          <div className="pt-4 card-body">
            <DatatablesHover
              columns={columns}
              data={plansData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SubscriptionPlansList
