'use client'

import React, { useMemo, useState } from 'react'

import { SchoolSubscription } from '@src/dtos/subscription'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import { useGetSchoolSubscriptionsQuery } from '@src/store/services/subscriptionApi'
import { CirclePlus } from 'lucide-react'

import CreateSubscriptionModal from '../CreateSubscriptionModal'

const statusBadge: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'badge-green' },
  expired: { label: 'Expired', className: 'badge-red' },
  cancelled: { label: 'Cancelled', className: 'badge-yellow' },
}
const SchoolSubscriptionsList = () => {
  const { data: schoolsData } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('')
  const [createModalOpen, setCreateModalOpen] = useState(false)

  const firstSchoolId = selectedSchoolId || schoolsData?.data?.[0]?._id || ''

  const { data: subscriptionsData } = useGetSchoolSubscriptionsQuery(
    firstSchoolId,
    {
      skip: !firstSchoolId,
    }
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.planName,
        header: headerKeys.planName,
        cell: ({ row }: { row: { original: SchoolSubscription } }) =>
          row.original.plan_name || row.original.plan?.plan_name || '—',
      },
      {
        accessorKey: accessorkeys.subscriptionStatus,
        header: headerKeys.subscriptionStatus,
        cell: ({ row }: { row: { original: SchoolSubscription } }) => {
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
        accessorKey: accessorkeys.price,
        header: headerKeys.price,
        cell: ({ row }: { row: { original: SchoolSubscription } }) =>
          `₹${row.original.price || row.original.plan?.price || 0}`,
      },
      {
        accessorKey: accessorkeys.startDate,
        header: headerKeys.startDate,
        cell: ({ row }: { row: { original: SchoolSubscription } }) =>
          new Date(row.original.start_date).toLocaleDateString(),
      },
      {
        accessorKey: accessorkeys.endDate,
        header: headerKeys.endDate,
        cell: ({ row }: { row: { original: SchoolSubscription } }) =>
          new Date(row.original.end_date).toLocaleDateString(),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="School Subscriptions" subTitle="Billing" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <label className="font-medium text-sm">Select School:</label>
                <select
                  className="form-select w-64"
                  value={selectedSchoolId}
                  onChange={(e) => setSelectedSchoolId(e.target.value)}>
                  {schoolsData?.data?.map((school) => (
                    <option key={school._id} value={school._id}>
                      {school.school_name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-primary shrink-0"
                disabled={!firstSchoolId}
                onClick={() => setCreateModalOpen(true)}>
                <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                Create Subscription
              </button>
            </div>
          </div>
          <div className="pt-4 card-body">
            <DatatablesHover
              columns={columns}
              data={subscriptionsData?.data || []}
            />
          </div>
        </div>
      </div>
      <CreateSubscriptionModal
        open={createModalOpen}
        schoolId={firstSchoolId}
        onClose={() => setCreateModalOpen(false)}
      />
    </React.Fragment>
  )
}

export default SchoolSubscriptionsList
