'use client'

import React, { useMemo } from 'react'

import { SchoolAdmin } from '@src/dtos/schoolAdmin'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, badges, headerKeys } from '@src/shared/constants/columns'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import { useGetSchoolAdminsQuery } from '@src/store/services/schoolAdminApi'

const SchoolAdminsList = () => {
  const { data: schoolsData } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = React.useState<string>('')

  const firstSchoolId =
    selectedSchoolId || schoolsData?.data?.[0]?.school_id || ''

  const { data: schoolAdminsData } = useGetSchoolAdminsQuery(firstSchoolId, {
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
      { accessorKey: accessorkeys.schoolName, header: headerKeys.schoolName },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: SchoolAdmin } }) => {
          const mapKey = String(row.original.is_active) as keyof typeof badges
          const { label, className } = badges[mapKey] || badges.undefined
          return (
            <span className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: SchoolAdmin } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-orange btn-sm"
              onClick={() => console.log('Deactivate', row.original)}>
              Deactivate
            </button>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="School Admins" subTitle="Schools" />
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
              data={schoolAdminsData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SchoolAdminsList
