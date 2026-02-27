'use client'

import React, { useMemo } from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'

const rsvpStatusBadge: Record<string, string> = {
  attending: 'badge-green',
  not_attending: 'badge-red',
  maybe: 'badge-yellow',
}

const EventRSVPs = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: 'event_title', header: 'Event' },
      { accessorKey: 'parent_name', header: 'Parent' },
      { accessorKey: 'student_name', header: 'Student' },
      {
        accessorKey: 'rsvp_status',
        header: 'Response',
        cell: ({ row }: { row: { original: any } }) => (
          <span
            className={`badge ${rsvpStatusBadge[row.original.rsvp_status] ?? 'badge-gray'}`}>
            {row.original.rsvp_status?.replace('_', ' ')}
          </span>
        ),
      },
      {
        accessorKey: 'responded_at',
        header: 'Responded At',
        cell: ({ row }: { row: { original: any } }) =>
          row.original.responded_at
            ? new Date(row.original.responded_at).toLocaleString()
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
      <BreadCrumb title="Event RSVPs" subTitle="RSVPs" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">Event RSVPs</h6>
          </div>
          <div className="card-body">
            <DatatablesHover columns={columns} data={[]} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default EventRSVPs
