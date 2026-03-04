'use client'

import React, { useMemo, useState } from 'react'

import { Role } from '@src/dtos/role'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import {
  accessorkeys,
  badgeClassNames,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import { useGetRoleListQuery } from '@src/store/services/roleApi'
import { CirclePlus, Search } from 'lucide-react'

const RolesList = () => {
  const { data: rolesData } = useGetRoleListQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const rolesArr: Role[] = rolesData?.data ?? []

  const filteredRecords = rolesArr.filter((item: Role) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.rolesList.id,
        header: headerKeys.rolesList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.rolesList.roleName,
        header: headerKeys.rolesList.roleName,
      },
      {
        accessorKey: accessorkeys.rolesList.description,
        header: headerKeys.rolesList.description,
      },
      {
        accessorKey: accessorkeys.rolesList.permissions,
        header: headerKeys.rolesList.permissions,
        cell: ({ row }: { row: { original: Role } }) => (
          <span className="text-sm">
            {row.original.permissions?.length || 0} permission(s)
          </span>
        ),
      },
      {
        accessorKey: accessorkeys.rolesList.isSystem,
        header: headerKeys.rolesList.isSystem,
        cell: ({ row }: { row: { original: Role } }) => {
          const key = row.original.is_system ? 'system' : 'custom'
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badgeMaps[key as keyof typeof badgeMaps]?.className}`}>
              {badgeMaps[key as keyof typeof badgeMaps]?.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.rolesList.actions,
        header: headerKeys.rolesList.actions,
        cell: ({ row }: { row: { original: Role } }) => (
          <div className="flex justify-end gap-2">
            {!row.original.is_system && (
              <>
                <button
                  className="btn btn-sub-gray btn-icon !size-8 rounded-md"
                  onClick={() => console.log('Edit', row.original)}>
                  <i className="ri-pencil-line"></i>
                </button>
                <button
                  className="btn btn-sub-red btn-icon !size-8 rounded-md"
                  onClick={() => console.log('Delete', row.original)}>
                  <i className="ri-delete-bin-line"></i>
                </button>
              </>
            )}
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
      <BreadCrumb title="Roles & Permissions" subTitle="Roles" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search Role"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="absolute inset-y-0 flex items-center ltr:left-3 rtl:right-3 ltr:group-[&.right]/form:right-3 rtl:group-[&.right]/form:left-3 ltr:group-[&.right]/form:left-auto rtl:group-[&.right]/form:right-auto focus:outline-hidden">
                    <Search className="text-gray-500 dark:text-dark-500 size-4 fill-gray-100 dark:fill-dark-850" />
                  </button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 lg:col-span-3 lg:col-start-10 xxl:col-span-2 xxl:col-start-11 ltr:md:text-right rtl:md:text-left">
                <button
                  className="btn btn-primary shrink-0"
                  onClick={() => console.log('Add Role')}>
                  <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />{' '}
                  Add Role
                </button>
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

export default RolesList
