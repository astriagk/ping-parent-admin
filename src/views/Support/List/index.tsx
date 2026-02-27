'use client'

import React, { useMemo } from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'

const ticketStatusBadge: Record<string, string> = {
  open: 'badge-blue',
  in_progress: 'badge-yellow',
  resolved: 'badge-green',
  closed: 'badge-gray',
}

const priorityBadge: Record<string, string> = {
  low: 'badge-gray',
  medium: 'badge-yellow',
  high: 'badge-red',
}

const SupportList = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: 'subject', header: 'Subject' },
      { accessorKey: 'user_name', header: 'Raised By' },
      {
        accessorKey: 'priority',
        header: 'Priority',
        cell: ({ row }: { row: { original: any } }) => (
          <span
            className={`badge ${priorityBadge[row.original.priority] ?? 'badge-gray'}`}>
            {row.original.priority}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }: { row: { original: any } }) => (
          <span
            className={`badge ${ticketStatusBadge[row.original.status] ?? 'badge-gray'}`}>
            {row.original.status?.replace('_', ' ')}
          </span>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }: { row: { original: any } }) =>
          row.original.created_at
            ? new Date(row.original.created_at).toLocaleString()
            : '—',
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: any } }) => (
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
      <BreadCrumb title="Support Tickets" subTitle="Support" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">All Support Tickets</h6>
          </div>
          <div className="card-body">
            <DatatablesHover columns={columns} data={[]} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SupportList
