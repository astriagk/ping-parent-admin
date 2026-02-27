'use client'

import React, { useMemo } from 'react'

import { useRouter } from 'next/navigation'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetStudentListQuery } from '@src/store/services/studentApi'

const SchoolStudentsList = () => {
  const router = useRouter()
  const { data: studentsListData } = useGetStudentListQuery()

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.username, header: headerKeys.username },
      { accessorKey: accessorkeys.grade, header: headerKeys.grade },
      { accessorKey: accessorkeys.parentName, header: headerKeys.parentName },
      { accessorKey: accessorkeys.phoneNumber, header: 'Parent Phone' },
      { accessorKey: 'assigned_driver', header: 'Assigned Driver' },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: any } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => router.push(`/students/details/${row.original._id}`)}>
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
      <BreadCrumb title="Students" subTitle="Students" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">Students (Read-only)</h6>
          </div>
          <div className="card-body">
            <DatatablesHover
              columns={columns}
              data={studentsListData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SchoolStudentsList
