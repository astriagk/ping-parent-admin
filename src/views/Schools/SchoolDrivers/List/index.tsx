'use client'

import React, { useMemo } from 'react'

import { SchoolDriverItem } from '@src/dtos/schoolAdmin'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import { useGetSchoolDriversQuery } from '@src/store/services/schoolAdminApi'

const ApprovalBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; className: string }> = {
    approved: { label: 'Approved', className: 'badge-green' },
    pending: { label: 'Pending', className: 'badge-yellow' },
    rejected: { label: 'Rejected', className: 'badge-red' },
  }
  const { label, className } = map[status] || {
    label: status,
    className: 'badge-gray',
  }
  return (
    <span className={`badge inline-flex items-center gap-1 ${className}`}>
      {label}
    </span>
  )
}

const SchoolDriversList = () => {
  const { data: schoolsData } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = React.useState<string>('')

  const firstSchoolId =
    selectedSchoolId || schoolsData?.data?.[0]?.school_id || ''

  const { data: schoolDriversData } = useGetSchoolDriversQuery(firstSchoolId, {
    skip: !firstSchoolId,
  })

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.username, header: headerKeys.username },
      { accessorKey: accessorkeys.email, header: headerKeys.email },
      { accessorKey: accessorkeys.phoneNumber, header: headerKeys.phoneNumber },
      {
        accessorKey: 'approval_status',
        header: 'Approval Status',
        cell: ({ row }: { row: { original: SchoolDriverItem } }) => (
          <ApprovalBadge status={row.original.approval_status} />
        ),
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: SchoolDriverItem } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-red btn-sm"
              onClick={() => console.log('Remove', row.original)}>
              Remove
            </button>
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
      <BreadCrumb title="School Drivers" subTitle="Schools" />
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
              data={schoolDriversData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SchoolDriversList
