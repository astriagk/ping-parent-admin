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
import { UserRoles } from '@src/shared/constants/enums'
import TableContainer from '@src/shared/custom/table/table'
import { useGetParentListQuery } from '@src/store/services/parentApi'
import { formatDate } from '@src/utils/formatters'
import { Search } from 'lucide-react'

const ParentsList = () => {
  const router = useRouter()
  const { data: parentListData } = useGetParentListQuery({
    user_type: UserRoles.PARENT,
  })
  const [searchQuery, setSearchQuery] = useState<string>('')

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const parentData: any[] = parentListData?.data ?? []

  const filteredParentRecords = parentData.filter((item: any) =>
    (item.name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedParents = filteredParentRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.parentsList.id,
        header: headerKeys.parentsList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.parentsList.name,
        header: headerKeys.parentsList.name,
      },
      {
        accessorKey: accessorkeys.parentsList.phoneNumber,
        header: headerKeys.parentsList.phoneNumber,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.phone_number || '—',
      },
      {
        accessorKey: accessorkeys.parentsList.email,
        header: headerKeys.parentsList.email,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.email || '—',
      },
      {
        accessorKey: accessorkeys.parentsList.studentCount,
        header: headerKeys.parentsList.studentCount,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.student_count ?? '—',
      },
      {
        accessorKey: accessorkeys.parentsList.subscriptionStatus,
        header: headerKeys.parentsList.subscriptionStatus,
        cell: ({ row }: { row: { original: any } }) => {
          const status = row.original.subscription_status as keyof typeof badgeMaps
          if (!status) return <span className="text-gray-400">—</span>
          const badge = badgeMaps[status] ?? badgeMaps['undefined']
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badge.className}`}>
              {badge.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.parentsList.isActive,
        header: headerKeys.parentsList.isActive,
        cell: ({ row }: { row: { original: any } }) => {
          const mapKey = String(row.original.is_active) as keyof typeof badgeMaps
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
        accessorKey: accessorkeys.parentsList.createdAt,
        header: headerKeys.parentsList.createdAt,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.created_at ? formatDate(row.original.created_at) : '—',
      },
      {
        accessorKey: accessorkeys.parentsList.actions,
        header: headerKeys.parentsList.actions,
        cell: ({ row }: { row: { original: any } }) => {
          const id = row.original._id
          return (
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sub-primary btn-icon !size-8 rounded-md"
                onClick={() => router.push(`/users/parents/details/${id}`)}>
                <i className="ri-eye-line"></i>
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
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search Parent"
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
                data={paginatedParents}
                thClass="!font-medium cursor-pointer"
                divClass="overflow-x-auto table-box whitespace-nowrap"
                lastTrClass="text-end"
                tableClass="table flush"
                thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
              />
              <Pagination
                totalItems={filteredParentRecords.length}
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

export default ParentsList
