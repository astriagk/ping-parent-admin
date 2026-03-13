'use client'

import React, { useMemo, useState } from 'react'

import { AuditLog } from '@src/dtos/auditLog'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import { useGetAuditLogsQuery } from '@src/store/services/auditLogApi'
import { formatDate } from '@src/utils/formatters'
import { Search } from 'lucide-react'

const AuditLogsList = () => {
  const { data: auditLogsData } = useGetAuditLogsQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const logsData: AuditLog[] = auditLogsData?.data ?? []

  const filteredRecords = logsData.filter((item: AuditLog) =>
    ((item as any).performed_by ?? '').toLowerCase().includes(searchQuery.toLowerCase())
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
      {
        accessorKey: accessorkeys.auditLogsList.action,
        header: headerKeys.auditLogsList.action,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.action_type || '—',
      },
      {
        accessorKey: accessorkeys.auditLogsList.entityType,
        header: headerKeys.auditLogsList.entityType,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.entity_type || '—',
      },
      {
        accessorKey: accessorkeys.auditLogsList.entityId,
        header: headerKeys.auditLogsList.entityId,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.entity_id || '—',
      },
      {
        accessorKey: accessorkeys.auditLogsList.performedBy,
        header: headerKeys.auditLogsList.performedBy,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.performed_by || '—',
      },
      {
        accessorKey: accessorkeys.auditLogsList.ipAddress,
        header: headerKeys.auditLogsList.ipAddress,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.ip_address || '—',
      },
      {
        accessorKey: accessorkeys.auditLogsList.timestamp,
        header: headerKeys.auditLogsList.timestamp,
        cell: ({ row }: { row: { original: AuditLog } }) =>
          row.original.created_at ? formatDate(row.original.created_at) : '—',
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
                    placeholder="Search by Performed By"
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
