'use client'

import React, { useMemo } from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import {
  accessorkeys,
  badges,
  buttonsKeys,
  headerKeys,
} from '@src/shared/constants/columns'
import { UserRoles, UserRolesType } from '@src/shared/constants/enums'
import { useGetParentListQuery } from '@src/store/services/parentApi'

const ParentsList = () => {
  const { data: parentListData } = useGetParentListQuery({
    user_type: UserRoles.PARENT,
  })

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.name, header: headerKeys.username },
      { accessorKey: accessorkeys.phoneNumber, header: headerKeys.phoneNumber },
      {
        accessorKey: accessorkeys.userType,
        header: headerKeys.userType,
        cell: ({ row }: { row: { original: any } }) => {
          const userType = row.original.user_type
          const userTypeLabels: Record<string, string> = UserRolesType
          return userTypeLabels[userType] || userType
        },
      },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: any } }) => {
          const { is_active } = row.original
          const mapKey = String(is_active) as keyof typeof badges
          const { label, className } = badges[mapKey] || badges.undefined
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        className: 'text-right',
        cell: ({ row }: { row: { original: any } }) => {
          const { is_active } = row.original
          const mapKey = String(!is_active) as keyof typeof buttonsKeys
          const { label, className } =
            buttonsKeys[mapKey] || buttonsKeys.undefined
          return (
            <div className="flex justify-end gap-2">
              <button
                className={`btn btn-sm min-w-[100px] ${className}`}
                onClick={() => console.log(row.original)}>
                {label}
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => console.log('View', row.original)}>
                View
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
      <BreadCrumb title="Drivers List" subTitle="Drivers" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-body">
            <DatatablesHover
              columns={columns}
              data={parentListData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
export default ParentsList
