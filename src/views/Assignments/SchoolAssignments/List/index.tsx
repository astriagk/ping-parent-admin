'use client'

import React, { useMemo, useState } from 'react'

import { SchoolAssignment } from '@src/dtos/assignment'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import {
  useApproveSchoolAssignmentMutation,
  useCreateSchoolAssignmentMutation,
  useGetSchoolAssignmentsQuery,
  useRejectSchoolAssignmentMutation,
} from '@src/store/services/assignmentApi'
import { useGetDriverListQuery } from '@src/store/services/driverApi'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import { CirclePlus } from 'lucide-react'

const statusBadge: Record<string, { label: string; className: string }> = {
  approved: { label: 'Approved', className: 'badge-green' },
  pending: { label: 'Pending', className: 'badge-yellow' },
  rejected: { label: 'Rejected', className: 'badge-red' },
  active: { label: 'Active', className: 'badge-blue' },
}

const CreateSchoolAssignmentModal = ({
  open,
  schoolId,
  onClose,
}: {
  open: boolean
  schoolId: string
  onClose: () => void
}) => {
  const { data: driversData } = useGetDriverListQuery()
  const [createAssignment, { isLoading }] = useCreateSchoolAssignmentMutation()
  const [selectedDriverId, setSelectedDriverId] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDriverId) return
    await createAssignment({ schoolId, driver_id: selectedDriverId }).unwrap()
    setSelectedDriverId('')
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-md p-6">
        <h5 className="text-lg font-semibold mb-4">Create School Assignment</h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Select Driver</label>
            <select
              className="form-select"
              value={selectedDriverId}
              onChange={(e) => setSelectedDriverId(e.target.value)}
              required>
              <option value="">-- Select Driver --</option>
              {driversData?.data?.map((d: any) => (
                <option key={d.driver_id ?? d._id} value={d.driver_id ?? d._id}>
                  {d.name ?? d.username}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn btn-light btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={isLoading}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const SchoolAssignmentsList = () => {
  const { data: schoolsData } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = React.useState<string>('')
  const [modalOpen, setModalOpen] = useState(false)
  const [approveAssignment] = useApproveSchoolAssignmentMutation()
  const [rejectAssignment] = useRejectSchoolAssignmentMutation()

  const firstSchoolId = selectedSchoolId || schoolsData?.data?.[0]?.school_id || ''

  const { data: assignmentsData } = useGetSchoolAssignmentsQuery(firstSchoolId, {
    skip: !firstSchoolId,
  })

  const handleApprove = (assignmentId: string) => approveAssignment(assignmentId)

  const handleReject = (assignmentId: string) => {
    const reason = window.prompt('Rejection reason (optional):') ?? ''
    rejectAssignment({ assignmentId, reason })
  }

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
            <span className={`badge inline-flex items-center gap-1 ${className}`}>
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
        cell: ({ row }: { row: { original: SchoolAssignment } }) => {
          const id = row.original.assignment_id ?? row.original._id
          return (
            <div className="flex justify-end gap-2">
              {row.original.status === 'pending' && (
                <>
                  <button
                    className="btn btn-green btn-sm"
                    onClick={() => handleApprove(id)}>
                    Approve
                  </button>
                  <button
                    className="btn btn-red btn-sm"
                    onClick={() => handleReject(id)}>
                    Reject
                  </button>
                </>
              )}
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="School Assignments" subTitle="Assignments" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
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
            <button
              className="btn btn-primary shrink-0"
              disabled={!firstSchoolId}
              onClick={() => setModalOpen(true)}>
              <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
              Create Assignment
            </button>
          </div>
          <div className="pt-4 card-body">
            <DatatablesHover columns={columns} data={assignmentsData?.data || []} />
          </div>
        </div>
      </div>
      <CreateSchoolAssignmentModal
        open={modalOpen}
        schoolId={firstSchoolId}
        onClose={() => setModalOpen(false)}
      />
    </React.Fragment>
  )
}

export default SchoolAssignmentsList
