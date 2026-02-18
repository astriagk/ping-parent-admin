'use client'

import React, { useMemo } from 'react'

import { SchoolSubscription } from '@src/dtos/subscription'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import { useGetSchoolSubscriptionsQuery } from '@src/store/services/subscriptionApi'

const statusBadge: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'badge-green' },
  expired: { label: 'Expired', className: 'badge-red' },
  cancelled: { label: 'Cancelled', className: 'badge-yellow' },
}

const SchoolSubscriptionsList = () => {
  const { data: schoolsData } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = React.useState<string>('')

  const firstSchoolId =
    selectedSchoolId || schoolsData?.data?.[0]?.school_id || ''

  const { data: subscriptionsData } = useGetSchoolSubscriptionsQuery(
    firstSchoolId,
    { skip: !firstSchoolId }
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.schoolName, header: headerKeys.schoolName },
      { accessorKey: accessorkeys.planName, header: headerKeys.planName },
      {
        accessorKey: accessorkeys.subscriptionStatus,
        header: headerKeys.subscriptionStatus,
        cell: ({ row }: { row: { original: SchoolSubscription } }) => {
          const { label, className } = statusBadge[row.original.status] || {
            label: row.original.status,
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
        accessorKey: accessorkeys.amount,
        header: headerKeys.amount,
        cell: ({ row }: { row: { original: SchoolSubscription } }) =>
          `₹${row.original.amount}`,
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
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: SchoolSubscription } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => console.log('View', row.original)}>
              View
            </button>
            <button
              className="btn btn-red btn-sm"
              onClick={() => console.log('Cancel', row.original)}>
              Cancel
            </button>
          </div>
        ),
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
            <div className="flex flex-wrap items-center gap-4">
              <label className="font-medium text-sm">Select School:</label>
              <select
                className="form-select w-64"
                value={selectedSchoolId}
                onChange={(e) => setSelectedSchoolId(e.target.value)}>
                {schoolsData?.data?.map((school) => (
                  <option key={school.school_id} value={school.school_id}>
                    {school.school_name}
                  </option>
                ))}
              </select>
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
    </React.Fragment>
  )
}

export default SchoolSubscriptionsList
