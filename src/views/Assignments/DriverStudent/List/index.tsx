'use client'

import React, { useMemo, useState } from 'react'

import { DriverStudentAssignment } from '@src/dtos/assignment'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { AssignmentStatus } from '@src/shared/constants/enums'
import { MESSAGES } from '@src/shared/constants/messages'
import {
  useCreateDriverStudentAssignmentMutation,
  useDeleteDriverStudentAssignmentMutation,
  useGetDriverStudentAssignmentsQuery,
  useGetParentRequestedAssignmentsQuery,
  useUpdateDriverStudentAssignmentMutation,
} from '@src/store/services/assignmentApi'
import { useGetDriverListQuery } from '@src/store/services/driverApi'
import { useGetStudentListQuery } from '@src/store/services/studentApi'
import { CirclePlus } from 'lucide-react'
import { toast } from 'react-toastify'

const assignmentStatusBadge: Record<
  AssignmentStatus,
  { label: string; className: string }
> = {
  [AssignmentStatus.ACTIVE]: { label: 'Active', className: 'badge-green' },
  [AssignmentStatus.INACTIVE]: { label: 'Inactive', className: 'badge-yellow' },
  [AssignmentStatus.PENDING]: { label: 'Pending', className: 'badge-blue' },
  [AssignmentStatus.PARENT_REQUESTED]: {
    label: 'Parent Requested',
    className: 'badge-purple',
  },
  [AssignmentStatus.REJECTED]: { label: 'Rejected', className: 'badge-red' },
}

const CreateAssignmentModal = ({
  open,
  onClose,
}: {
  open: boolean
  onClose: () => void
}) => {
  const { data: driversData } = useGetDriverListQuery()
  const { data: studentsData } = useGetStudentListQuery()
  const [createAssignment, { isLoading }] =
    useCreateDriverStudentAssignmentMutation()
  const [form, setForm] = useState({ driver_id: '', student_id: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createAssignment(form).unwrap()
    setForm({ driver_id: '', student_id: '' })
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-md p-6">
        <h5 className="text-lg font-semibold mb-4">Create Assignment</h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Driver</label>
            <select
              className="form-select"
              value={form.driver_id}
              onChange={(e) => setForm({ ...form, driver_id: e.target.value })}
              required>
              <option value="">-- Select Driver --</option>
              {driversData?.data?.map((d: any) => (
                <option key={d.driver_id ?? d._id} value={d.driver_id ?? d._id}>
                  {d.name ?? d.username}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label">Student</label>
            <select
              className="form-select"
              value={form.student_id}
              onChange={(e) => setForm({ ...form, student_id: e.target.value })}
              required>
              <option value="">-- Select Student --</option>
              {studentsData?.data?.map((s: any) => (
                <option
                  key={s.student_id ?? s._id}
                  value={s.student_id ?? s._id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={isLoading}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const DriverStudentAssignmentsList = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'requested'>('all')
  const [modalOpen, setModalOpen] = useState(false)

  const { data: allData, refetch: refetchAll } =
    useGetDriverStudentAssignmentsQuery()
  const { data: requestedData, refetch: refetchRequested } =
    useGetParentRequestedAssignmentsQuery()
  const [updateAssignment] = useUpdateDriverStudentAssignmentMutation()
  const [deleteAssignment] = useDeleteDriverStudentAssignmentMutation()

  const tableData =
    activeTab === 'all' ? (allData?.data ?? []) : (requestedData?.data ?? [])

  React.useEffect(() => {
    if (activeTab === 'all') {
      refetchAll()
    } else {
      refetchRequested()
    }
  }, [activeTab, refetchAll, refetchRequested])

  console.log(allData)

  const handleApprove = async (id: string) => {
    try {
      await updateAssignment({ id, status: AssignmentStatus.ACTIVE }).unwrap()
      toast.success(MESSAGES.ADMIN.SUCCESS.ADMIN_UPDATED)
    } catch (error: any) {
      toast.error(
        error?.data?.error ||
          error?.message ||
          MESSAGES.ADMIN.ERROR.UPDATE_FAILED
      )
    }
  }

  const handleReject = async (id: string) => {
    toast.info('Please enter a rejection reason (optional)')
    const reason = window.prompt('Rejection reason (optional):') ?? ''
    try {
      await updateAssignment({
        id,
        status: AssignmentStatus.REJECTED,
        rejection_reason: reason,
      }).unwrap()
      toast.success(MESSAGES.ADMIN.SUCCESS.ADMIN_UPDATED)
    } catch (error: any) {
      toast.error(
        error?.data?.error ||
          error?.message ||
          MESSAGES.ADMIN.ERROR.UPDATE_FAILED
      )
    }
  }

  const handleDeactivate = async (id: string) => {
    try {
      await updateAssignment({ id, status: AssignmentStatus.INACTIVE }).unwrap()
      toast.success(MESSAGES.ADMIN.SUCCESS.ADMIN_UPDATED)
    } catch (error: any) {
      toast.error(
        error?.data?.error ||
          error?.message ||
          MESSAGES.ADMIN.ERROR.UPDATE_FAILED
      )
    }
  }

  const handleDelete = async (id: string) => {
    toast.info('Deleting assignment...')
    try {
      await deleteAssignment(id).unwrap()
      toast.success(MESSAGES.ADMIN.SUCCESS.ADMIN_DELETED)
    } catch (error: any) {
      toast.error(
        error?.data?.error ||
          error?.message ||
          MESSAGES.ADMIN.ERROR.DELETE_FAILED
      )
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.assignmentId,
        header: headerKeys.assignmentId,
      },
      {
        accessorKey: accessorkeys.driverUniqueId,
        header: headerKeys.driverUniqueId,
      },
      { accessorKey: accessorkeys.studentId, header: headerKeys.studentId },
      {
        accessorKey: accessorkeys.assignmentStatus,
        header: headerKeys.assignmentStatus,
        cell: ({ row }: { row: { original: DriverStudentAssignment } }) => {
          const { label, className } = assignmentStatusBadge[
            row.original.assignment_status
          ] || {
            label: row.original.assignment_status,
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
        cell: ({ row }: { row: { original: DriverStudentAssignment } }) => {
          const { assignment_status, _id } = row.original
          const id = _id
          return (
            <div className="flex justify-end flex-wrap gap-2">
              {(assignment_status === AssignmentStatus.PENDING ||
                assignment_status === AssignmentStatus.PARENT_REQUESTED) && (
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
              {assignment_status === AssignmentStatus.ACTIVE && (
                <button
                  className="btn btn-orange btn-sm"
                  onClick={() => handleDeactivate(id)}>
                  Deactivate
                </button>
              )}
              <button
                className="btn btn-red btn-sm"
                onClick={() => handleDelete(id)}>
                Delete
              </button>
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Driver-Student Assignments" subTitle="Assignments" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header flex flex-wrap items-center justify-between gap-4">
            <div className="flex gap-2">
              <button
                className={`btn btn-sm ${activeTab === 'all' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setActiveTab('all')}>
                All Assignments
              </button>
              <button
                className={`btn btn-sm ${activeTab === 'requested' ? 'btn-primary' : 'btn-light'}`}
                onClick={() => setActiveTab('requested')}>
                Parent-Requested
              </button>
            </div>
            <button
              className="btn btn-primary shrink-0"
              onClick={() => setModalOpen(true)}>
              <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
              Create Assignment
            </button>
          </div>
          <div className="pt-4 card-body">
            <DatatablesHover columns={columns} data={tableData} />
          </div>
        </div>
      </div>
      <CreateAssignmentModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </React.Fragment>
  )
}

export default DriverStudentAssignmentsList
