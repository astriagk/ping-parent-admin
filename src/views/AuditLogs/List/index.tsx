'use client'

import React, { useMemo, useState } from 'react'

import { AuditLog } from '@src/dtos/auditLog'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import { useGetAuditLogsQuery } from '@src/store/services/auditLogApi'
import { Search } from 'lucide-react'

const AuditLogsList = () => {
  const { data: auditLogsData } = useGetAuditLogsQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const logsData: AuditLog[] = auditLogsData?.data ?? []

  const filteredRecords = logsData.filter((item: AuditLog) =>
    ((item as any).user_name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.auditLogsList.id,
        header: headerKeys.auditLogsList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.auditLogsList.userName, header: headerKeys.auditLogsList.userName },
      { accessorKey: accessorkeys.auditLogsList.userRole, header: headerKeys.auditLogsList.userRole },
      { accessorKey: accessorkeys.auditLogsList.action, header: headerKeys.auditLogsList.action },
      { accessorKey: accessorkeys.auditLogsList.resource, header: headerKeys.auditLogsList.resource },
      {
        accessorKey: accessorkeys.auditLogsList.timestamp,
        header: headerKeys.auditLogsList.timestamp,
        cell: ({ row }: { row: { original: AuditLog } }) =>
          new Date(row.original.created_at).toLocaleString(),
      },
      {
        accessorKey: accessorkeys.auditLogsList.actions,
        header: headerKeys.auditLogsList.actions,
        cell: ({ row }: { row: { original: AuditLog } }) => (
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
      <BreadCrumb title="Audit Logs" subTitle="Logs" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search by User"
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

export default AuditLogsList
