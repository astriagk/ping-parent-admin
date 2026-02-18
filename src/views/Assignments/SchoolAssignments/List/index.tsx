'use client'

import React, { useMemo } from 'react'

import { SchoolAssignment } from '@src/dtos/assignment'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import { useGetSchoolAssignmentsQuery } from '@src/store/services/assignmentApi'

const statusBadge: Record<string, { label: string; className: string }> = {
  approved: { label: 'Approved', className: 'badge-green' },
  pending: { label: 'Pending', className: 'badge-yellow' },
  rejected: { label: 'Rejected', className: 'badge-red' },
  active: { label: 'Active', className: 'badge-blue' },
}

const SchoolAssignmentsList = () => {
  const { data: schoolsData } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = React.useState<string>('')

  const firstSchoolId =
    selectedSchoolId || schoolsData?.data?.[0]?.school_id || ''

  const { data: assignmentsData } = useGetSchoolAssignmentsQuery(
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
      { accessorKey: accessorkeys.driverName, header: headerKeys.driverName },
      { accessorKey: accessorkeys.schoolName, header: headerKeys.schoolName },
      {
        accessorKey: accessorkeys.assignmentStatus,
        header: headerKeys.assignmentStatus,
        cell: ({ row }: { row: { original: SchoolAssignment } }) => {
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
        accessorKey: 'created_at',
        header: 'Created',
        cell: ({ row }: { row: { original: SchoolAssignment } }) =>
          new Date(row.original.created_at).toLocaleDateString(),
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: SchoolAssignment } }) => (
          <div className="flex justify-end gap-2">
            {row.original.status === 'pending' && (
              <>
                <button
                  className="btn btn-green btn-sm"
                  onClick={() => console.log('Approve', row.original)}>
                  Approve
                </button>
                <button
                  className="btn btn-red btn-sm"
                  onClick={() => console.log('Reject', row.original)}>
                  Reject
                </button>
              </>
            )}
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
      <BreadCrumb title="School Assignments" subTitle="Assignments" />
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
              data={assignmentsData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SchoolAssignmentsList
