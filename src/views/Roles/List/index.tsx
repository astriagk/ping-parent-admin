'use client'

import React, { useMemo } from 'react'

import { Role } from '@src/dtos/role'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetRoleListQuery } from '@src/store/services/roleApi'
import { CirclePlus } from 'lucide-react'

const RolesList = () => {
  const { data: rolesData } = useGetRoleListQuery()

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.roleName, header: headerKeys.roleName },
      { accessorKey: accessorkeys.description, header: headerKeys.description },
      {
        accessorKey: 'permissions',
        header: 'Permissions',
        cell: ({ row }: { row: { original: Role } }) => (
          <span className="text-sm">
            {row.original.permissions?.length || 0} permission(s)
          </span>
        ),
      },
      {
        accessorKey: 'is_system',
        header: 'System Role',
        cell: ({ row }: { row: { original: Role } }) => (
          <span
            className={`badge ${row.original.is_system ? 'badge-blue' : 'badge-gray'}`}>
            {row.original.is_system ? 'System' : 'Custom'}
          </span>
        ),
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: Role } }) => (
          <div className="flex justify-end gap-2">
            {!row.original.is_system && (
              <>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => console.log('Edit', row.original)}>
                  Edit
                </button>
                <button
                  className="btn btn-red btn-sm"
                  onClick={() => console.log('Delete', row.original)}>
                  Delete
                </button>
              </>
            )}
            <button
              className="btn btn-gray btn-sm"
              onClick={() => console.log('View', row.original)}>
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
      <BreadCrumb title="Roles & Permissions" subTitle="Roles" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="flex flex-wrap justify-end gap-5">
              <button
                className="btn btn-primary shrink-0"
                onClick={() => console.log('Add Role')}>
                <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                Add Role
              </button>
            </div>
          </div>
          <div className="pt-4 card-body">
            <DatatablesHover
              columns={columns}
              data={rolesData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default RolesList
