'use client'

import React, { useMemo } from 'react'

import { DriverStudentAssignment } from '@src/dtos/assignment'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetDriverStudentAssignmentsQuery } from '@src/store/services/assignmentApi'

const assignmentStatusBadge: Record<
  string,
  { label: string; className: string }
> = {
  active: { label: 'Active', className: 'badge-green' },
  inactive: { label: 'Inactive', className: 'badge-yellow' },
  pending: { label: 'Pending', className: 'badge-blue' },
  parent_requested: { label: 'Parent Requested', className: 'badge-purple' },
  rejected: { label: 'Rejected', className: 'badge-red' },
}

const DriverStudentAssignmentsList = () => {
  const { data: assignmentsData } = useGetDriverStudentAssignmentsQuery()

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.driverName,
        header: headerKeys.driverName,
      },
      {
        accessorKey: accessorkeys.studentName,
        header: headerKeys.studentName,
      },
      {
        accessorKey: accessorkeys.schoolName,
        header: headerKeys.schoolName,
      },
      {
        accessorKey: accessorkeys.assignmentStatus,
        header: headerKeys.assignmentStatus,
        cell: ({
          row,
        }: {
          row: { original: DriverStudentAssignment }
        }) => {
          const { label, className } =
            assignmentStatusBadge[row.original.status] || {
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
        cell: ({ row }: { row: { original: DriverStudentAssignment } }) =>
          new Date(row.original.created_at).toLocaleDateString(),
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({
          row,
        }: {
          row: { original: DriverStudentAssignment }
        }) => (
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
      <BreadCrumb title="Driver-Student Assignments" subTitle="Assignments" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-body">
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

export default DriverStudentAssignmentsList
