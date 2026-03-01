'use client'

import React, { useMemo } from 'react'

import { useRouter } from 'next/navigation'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, badges, headerKeys } from '@src/shared/constants/columns'
import { UserRoles, UserRolesType } from '@src/shared/constants/enums'
import {
  useActivateUserMutation,
  useDeactivateUserMutation,
  useDeleteUserMutation,
} from '@src/store/services/adminApi'
import { useGetParentListQuery } from '@src/store/services/parentApi'

const ParentsList = () => {
  const router = useRouter()
  const { data: parentListData } = useGetParentListQuery({ user_type: UserRoles.PARENT })
  const [activateUser] = useActivateUserMutation()
  const [deactivateUser] = useDeactivateUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const handleActivate = (id: string) => activateUser(id)
  const handleDeactivate = (id: string) => deactivateUser(id)
  const handleDelete = (id: string) => {
    if (window.confirm('Delete this parent? This cannot be undone.')) {
      deleteUser(id)
    }
  }

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
        accessorKey: accessorkeys.email,
        header: headerKeys.email,
      },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: any } }) => {
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
        className: 'text-right',
        cell: ({ row }: { row: { original: any } }) => {
          const { is_active } = row.original
          const id = row.original._id
          return (
            <div className="flex justify-end gap-2">
              {is_active ? (
                <button
                  className="btn btn-orange btn-sm"
                  onClick={() => handleDeactivate(id)}>
                  Deactivate
                </button>
              ) : (
                <button
                  className="btn btn-green btn-sm"
                  onClick={() => handleActivate(id)}>
                  Activate
                </button>
              )}
              <button
                className="btn btn-primary btn-sm"
                onClick={() => router.push(`/users/parents/details/${id}`)}>
                View
              </button>
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
    [router]
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Parents List" subTitle="Parents" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-body">
            <DatatablesHover columns={columns} data={parentListData?.data || []} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ParentsList
