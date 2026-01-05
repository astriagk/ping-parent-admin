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
import { useGetAdminListQuery } from '@src/store/services/adminApi'

const AdminsList = () => {
  const { data: adminListData } = useGetAdminListQuery()
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
      { accessorKey: accessorkeys.adminRole, header: headerKeys.adminRole },
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
        cell: ({ row }: { row: { original: any } }) => {
          const { is_active } = row.original
          const mapKey = String(!is_active) as keyof typeof buttonsKeys
          const { label, className } =
            buttonsKeys[mapKey] || buttonsKeys.undefined
          return (
            <div className="flex gap-2">
              <button
                className={`btn btn-sm min-w-[100px] ${className}`}
                onClick={() =>
                  console.log(
                    is_active ? 'Deactivate' : 'Activate',
                    row.original
                  )
                }>
                {label}
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => console.log('Delete', row.original)}>
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
      <BreadCrumb title="Admins List" subTitle="Admins" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-body">
            <DatatablesHover
              columns={columns}
              data={adminListData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminsList
