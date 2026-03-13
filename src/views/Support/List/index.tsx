'use client'

import React, { useMemo, useState } from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import {
  accessorkeys,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import { formatDate } from '@src/utils/formatters'
import { Search } from 'lucide-react'

const SupportList = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const data: any[] = []

  const filteredRecords = data.filter((item: any) =>
    (item.subject ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.supportList.id,
        header: headerKeys.supportList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.supportList.subject,
        header: headerKeys.supportList.subject,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.subject || '—',
      },
      {
        accessorKey: accessorkeys.supportList.raisedBy,
        header: headerKeys.supportList.raisedBy,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.raised_by || '—',
      },
      {
        accessorKey: accessorkeys.supportList.phone,
        header: headerKeys.supportList.phone,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.phone || '—',
      },
      {
        accessorKey: accessorkeys.supportList.priority,
        header: headerKeys.supportList.priority,
        cell: ({ row }: { row: { original: any } }) => {
          const badge = badgeMaps[row.original.priority as keyof typeof badgeMaps] ?? badgeMaps['undefined']
          return (
            <span className={`badge inline-flex items-center gap-1 ${badge.className}`}>
              {badge.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.supportList.status,
        header: headerKeys.supportList.status,
        cell: ({ row }: { row: { original: any } }) => {
          const badge = badgeMaps[row.original.ticket_status as keyof typeof badgeMaps] ?? badgeMaps['undefined']
          return (
            <span className={`badge inline-flex items-center gap-1 ${badge.className}`}>
              {badge.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.supportList.assignedTo,
        header: headerKeys.supportList.assignedTo,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.assigned_to || '—',
      },
      {
        accessorKey: accessorkeys.supportList.createdAt,
        header: headerKeys.supportList.createdAt,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.created_at ? formatDate(row.original.created_at) : '—',
      },
      {
        accessorKey: accessorkeys.supportList.resolvedAt,
        header: headerKeys.supportList.resolvedAt,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.resolved_at ? formatDate(row.original.resolved_at) : '—',
      },
      {
        accessorKey: accessorkeys.supportList.actions,
        header: headerKeys.supportList.actions,
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
      <BreadCrumb title="Support Tickets" subTitle="Support" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search by Subject"
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

export default SupportList
