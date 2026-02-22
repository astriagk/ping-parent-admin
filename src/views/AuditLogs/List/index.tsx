'use client'

import React, { useMemo } from 'react'

import { AuditLog } from '@src/dtos/auditLog'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetAuditLogsQuery } from '@src/store/services/auditLogApi'

const AuditLogsList = () => {
  const { data: auditLogsData } = useGetAuditLogsQuery()

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: 'user_name', header: 'User' },
      { accessorKey: 'user_role', header: 'Role' },
      { accessorKey: accessorkeys.action, header: headerKeys.action },
      { accessorKey: accessorkeys.resource, header: headerKeys.resource },
      {
        accessorKey: accessorkeys.timestamp,
        header: headerKeys.timestamp,
        cell: ({ row }: { row: { original: AuditLog } }) =>
          new Date(row.original.created_at).toLocaleString(),
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: AuditLog } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-primary btn-sm"
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
      <BreadCrumb title="Audit Logs" subTitle="Logs" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-body">
            <DatatablesHover
              columns={columns}
              data={auditLogsData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AuditLogsList
