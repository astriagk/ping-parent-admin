'use client'

import React, { useMemo, useState } from 'react'

import { Student } from '@src/dtos/student'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import { useGetStudentListQuery } from '@src/store/services/studentApi'
import { Search } from 'lucide-react'

const StudentsList = () => {
  const { data: studentsListData } = useGetStudentListQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const studentData: Student[] = studentsListData?.data ?? []

  const filteredStudentRecords = studentData.filter((item: Student) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        accessorKey: accessorkeys.studentsList.name,
        header: headerKeys.studentsList.name,
      },
      {
        accessorKey: accessorkeys.studentsList.email,
        header: headerKeys.studentsList.email,
      },
      {
        accessorKey: accessorkeys.studentsList.phoneNumber,
        header: headerKeys.studentsList.phoneNumber,
      },
      {
        accessorKey: accessorkeys.studentsList.grade,
        header: headerKeys.studentsList.grade,
      },
      {
        accessorKey: accessorkeys.studentsList.parentName,
        header: headerKeys.studentsList.parentName,
      },
      {
        accessorKey: accessorkeys.studentsList.schoolName,
        header: headerKeys.studentsList.schoolName,
      },
      {
        accessorKey: accessorkeys.studentsList.actions,
        header: headerKeys.studentsList.actions,
        cell: ({ row }: { row: { original: any } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sub-primary btn-icon !size-8 rounded-md"
              onClick={() => console.log('View', row.original)}>
              <i className="ri-eye-line"></i>
            </button>
          </div>
        ),
      },
    ],
    []
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
