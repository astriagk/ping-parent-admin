'use client'

import React, { useMemo, useState } from 'react'

import { SchoolAssignment } from '@src/dtos/assignment'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import {
  accessorkeys,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import { AssignmentStatus, STORAGE_KEYS } from '@src/shared/constants/enums'
import { MESSAGES } from '@src/shared/constants/messages'
import TableContainer from '@src/shared/custom/table/table'
import {
  useDeleteDriverStudentAssignmentMutation,
  useGetSchoolAssignmentsQuery,
  useUpdateDriverStudentAssignmentMutation,
} from '@src/store/services/assignmentApi'
import LocalStorage from '@src/utils/LocalStorage'
import { formatAmount, formatDate } from '@src/utils/formatters'
import { Search } from 'lucide-react'
import { toast } from 'react-toastify'

const DriverStudentAssignmentsList = () => {
  const adminData = LocalStorage.getItem(STORAGE_KEYS.ADMIN)
  const user = adminData ? JSON.parse(adminData) : null
  const schoolId = user?.school_id
  const [searchQuery, setSearchQuery] = useState<string>('')

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const { data: allData } = useGetSchoolAssignmentsQuery(schoolId)
  const [updateAssignment] = useUpdateDriverStudentAssignmentMutation()
  const [deleteAssignment] = useDeleteDriverStudentAssignmentMutation()

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const assignmentsArr: SchoolAssignment[] = allData?.data ?? []

  const filteredRecords = assignmentsArr.filter((item: SchoolAssignment) => {
    const query = searchQuery.toLowerCase()
    return (
      (item.driver?.name ?? '').toLowerCase().includes(query) ||
      (item.student?.student_name ?? '').toLowerCase().includes(query) ||
      (item.parent_name ?? '').toLowerCase().includes(query)
    )
  })

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.driverStudentList.id,
        header: headerKeys.driverStudentList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.driverStudentList.driverName,
        header: headerKeys.driverStudentList.driverName,
        cell: ({ row }: { row: { original: SchoolAssignment } }) =>
          row.original.driver?.name || '—',
      },
      {
        accessorKey: accessorkeys.driverStudentList.driverUniqueId,
        header: headerKeys.driverStudentList.driverUniqueId,
        cell: ({ row }: { row: { original: SchoolAssignment } }) =>
          row.original.driver?.driver_unique_id ||
          row.original.driver_unique_id ||
          '—',
      },
      {
        accessorKey: accessorkeys.driverStudentList.studentName,
        header: headerKeys.driverStudentList.studentName,
        cell: ({ row }: { row: { original: SchoolAssignment } }) =>
          row.original.student?.student_name || '—',
      },
      {
        accessorKey: accessorkeys.driverStudentList.parentName,
        header: headerKeys.driverStudentList.parentName,
        cell: ({ row }: { row: { original: SchoolAssignment } }) =>
          row.original.parent_name || '—',
      },
      {
        accessorKey: accessorkeys.driverStudentList.monthlyFee,
        header: headerKeys.driverStudentList.monthlyFee,
        cell: ({ row }: { row: { original: SchoolAssignment } }) =>
          row.original.monthly_fee != null
            ? formatAmount(row.original.monthly_fee)
            : '—',
      },
      {
        accessorKey: accessorkeys.driverStudentList.assignmentStatus,
        header: headerKeys.driverStudentList.assignmentStatus,
        cell: ({ row }: { row: { original: SchoolAssignment } }) => {
          const status = (row.original.assignment_status ??
            row.original.status) as keyof typeof badgeMaps
          const badge = badgeMaps[status] ?? badgeMaps['inactive']
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badge.className}`}>
              {badge.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.driverStudentList.source,
        header: headerKeys.driverStudentList.source,
        cell: ({ row }: { row: { original: SchoolAssignment } }) =>
          row.original.assignment_source || '—',
      },
      {
        accessorKey: accessorkeys.driverStudentList.assignedDate,
        header: headerKeys.driverStudentList.assignedDate,
        cell: ({ row }: { row: { original: SchoolAssignment } }) => {
          const date = row.original.assigned_date ?? row.original.created_at
          return date ? formatDate(date) : '—'
        },
      },
      {
        accessorKey: accessorkeys.driverStudentList.actions,
        header: headerKeys.driverStudentList.actions,
        cell: ({ row }: { row: { original: SchoolAssignment } }) => {
          const status = row.original.assignment_status ?? row.original.status
          const { _id } = row.original
          return (
            <div className="flex justify-end flex-wrap gap-2">
              {(status === AssignmentStatus.PENDING ||
                status === AssignmentStatus.PARENT_REQUESTED) && (
                <>
                  <button
                    className="btn btn-sub-green btn-icon !size-8 rounded-md"
                    onClick={() => handleApprove(_id)}>
                    <i className="ri-checkbox-circle-line"></i>
                  </button>
                  <button
                    className="btn btn-sub-red btn-icon !size-8 rounded-md"
                    onClick={() => handleReject(_id)}>
                    <i className="ri-close-circle-line"></i>
                  </button>
                </>
              )}
              {status === AssignmentStatus.ACTIVE && (
                <button
                  className="btn btn-sub-red btn-icon !size-8 rounded-md"
                  onClick={() => handleDeactivate(_id)}>
                  <i className="ri-forbid-line"></i>
                </button>
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
      <BreadCrumb title="Driver-Student Assignments" subTitle="Assignments" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search by driver, student, or parent..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="absolute inset-y-0 flex items-center ltr:left-3 rtl:right-3 focus:outline-hidden">
                    <Search className="text-gray-500 dark:text-dark-500 size-4 fill-gray-100 dark:fill-dark-850" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-0 card-body">
            <div>
              <TableContainer
                columns={columns}
                data={paginatedData}
                thClass="!font-medium cursor-pointer"
                divClass="overflow-x-auto table-box whitespace-nowrap"
                lastTrClass="text-end"
                tableClass="table flush"
                thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
              />
              <Pagination
                totalItems={filteredRecords.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default DriverStudentAssignmentsList
