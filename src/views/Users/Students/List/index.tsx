'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import {
  accessorkeys,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import { useGetStudentListQuery } from '@src/store/services/studentApi'
import { formatDate } from '@src/utils/formatters'
import { Search } from 'lucide-react'

const StudentsList = () => {
  const router = useRouter()
  const { data: studentsListData } = useGetStudentListQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const studentData: any[] = studentsListData?.data ?? []

  const filteredStudentRecords = studentData.filter((item: any) =>
    (item.student_name ?? item.name ?? '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedStudents = filteredStudentRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.studentsList.id,
        header: headerKeys.studentsList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.studentsList.studentName,
        header: headerKeys.studentsList.studentName,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.student_name || row.original.name || '—',
      },
      {
        accessorKey: accessorkeys.studentsList.parentName,
        header: headerKeys.studentsList.parentName,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.parent_name || '—',
      },
      {
        accessorKey: accessorkeys.studentsList.parentPhone,
        header: headerKeys.studentsList.parentPhone,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.parent_phone || '—',
      },
      {
        accessorKey: accessorkeys.studentsList.school,
        header: headerKeys.studentsList.school,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.school_name || '—',
      },
      {
        accessorKey: accessorkeys.studentsList.classSection,
        header: headerKeys.studentsList.classSection,
        cell: ({ row }: { row: { original: any } }) => {
          const cls = row.original.class || row.original.grade || ''
          const section = row.original.section || ''
          if (!cls) return '—'
          return section ? `${cls} - ${section}` : cls
        },
      },
      {
        accessorKey: accessorkeys.studentsList.rollNumber,
        header: headerKeys.studentsList.rollNumber,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.roll_number || '—',
      },
      {
        accessorKey: accessorkeys.studentsList.gender,
        header: headerKeys.studentsList.gender,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.gender
            ? String(row.original.gender).charAt(0).toUpperCase() +
              String(row.original.gender).slice(1)
            : '—',
      },
      {
        accessorKey: accessorkeys.studentsList.isActive,
        header: headerKeys.studentsList.isActive,
        cell: ({ row }: { row: { original: any } }) => {
          const mapKey = String(
            row.original.is_active ?? false
          ) as keyof typeof badgeMaps
          const badge = badgeMaps[mapKey] ?? badgeMaps['undefined']
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badge.className}`}>
              {badge.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.studentsList.createdAt,
        header: headerKeys.studentsList.createdAt,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.created_at ? formatDate(row.original.created_at) : '—',
      },
      {
        accessorKey: accessorkeys.studentsList.actions,
        header: headerKeys.studentsList.actions,
        cell: ({ row }: { row: { original: any } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sub-primary btn-icon !size-8 rounded-md"
              onClick={() =>
                router.push(`/students/details/${row.original._id}`)
              }>
              <i className="ri-eye-line"></i>
            </button>
          </div>
        ),
      },
    ],
    [router]
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Students List" subTitle="Students" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search Student"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="absolute inset-y-0 flex items-center ltr:left-3 rtl:right-3 ltr:group-[&.right]/form:right-3 rtl:group-[&.right]/form:left-3 ltr:group-[&.right]/form:left-auto rtl:group-[&.right]/form:right-auto focus:outline-hidden">
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
                data={paginatedStudents}
                thClass="!font-medium cursor-pointer"
                divClass="overflow-x-auto table-box whitespace-nowrap"
                lastTrClass="text-end"
                tableClass="table flush"
                thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
              />
              <Pagination
                totalItems={filteredStudentRecords.length}
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

export default StudentsList
