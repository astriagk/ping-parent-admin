'use client'

import React, { useMemo } from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'

const eventTypeBadge: Record<string, string> = {
  sports: 'badge-blue',
  parent_meeting: 'badge-purple',
  cultural: 'badge-yellow',
  holiday: 'badge-green',
  festival: 'badge-orange',
  exam: 'badge-red',
  excursion: 'badge-teal',
  general: 'badge-gray',
}

const EventsList = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: 'title', header: 'Event Title' },
      {
        accessorKey: 'event_type',
        header: 'Type',
        cell: ({ row }: { row: { original: any } }) => (
          <span
            className={`badge ${eventTypeBadge[row.original.event_type] ?? 'badge-gray'}`}>
            {row.original.event_type?.replace('_', ' ')}
          </span>
        ),
      },
      { accessorKey: 'event_date', header: 'Date' },
      { accessorKey: 'audience_scope', header: 'Audience' },
      {
        accessorKey: 'requires_rsvp',
        header: 'RSVP',
        cell: ({ row }: { row: { original: any } }) => (
          <span className={`badge ${row.original.requires_rsvp ? 'badge-blue' : 'badge-gray'}`}>
            {row.original.requires_rsvp ? 'Required' : 'No'}
          </span>
        ),
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
      <BreadCrumb title="School Events" subTitle="Events" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h6 className="card-title">School Events</h6>
              <button className="btn btn-primary btn-sm">Create Event</button>
            </div>
          </div>
          <div className="card-body">
            <DatatablesHover columns={columns} data={[]} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default EventsList
