'use client'

import React, { useMemo } from 'react'

import { Trip } from '@src/dtos/trip'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { TripStatus } from '@src/shared/constants/enums'
import { useGetTripListQuery } from '@src/store/services/tripApi'

const statusBadge: Record<TripStatus, { label: string; className: string }> = {
  [TripStatus.SCHEDULED]: { label: 'Scheduled', className: 'badge-yellow' },
  [TripStatus.STARTED]: { label: 'Started', className: 'badge-blue' },
  [TripStatus.IN_PROGRESS]: { label: 'In Progress', className: 'badge-blue' },
  [TripStatus.COMPLETED]: { label: 'Completed', className: 'badge-green' },
  [TripStatus.CANCELLED]: { label: 'Cancelled', className: 'badge-red' },
}

const TripsList = () => {
  const { data: tripsData } = useGetTripListQuery()

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.tripId,
        header: headerKeys.tripId,
      },
      {
        accessorKey: accessorkeys.tripType,
        header: headerKeys.tripType,
        cell: ({ row }: { row: { original: Trip } }) => (
          <span className="capitalize">{row.original.trip_type}</span>
        ),
      },
      {
        accessorKey: accessorkeys.tripStatus,
        header: headerKeys.tripStatus,
        cell: ({ row }: { row: { original: Trip } }) => {
          console.log(row.original)
          const status = row.original.trip_status as TripStatus
          const { label, className } = statusBadge[status] || {
            label: status,
            className: 'badge-gray',
          }
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.tripDate,
        header: headerKeys.tripDate,
        cell: ({ row }: { row: { original: Trip } }) =>
          row.original.trip_date
            ? new Date(row.original.trip_date).toLocaleDateString()
            : '-',
      },
      {
        accessorKey: accessorkeys.totalDistance,
        header: headerKeys.totalDistance,
        cell: ({ row }: { row: { original: Trip } }) => {
          const value = row.original.total_distance
          return value != null ? `${value} KM` : '-'
        },
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: Trip } }) => (
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

  console.log(tripsData)

  return (
    <React.Fragment>
      <BreadCrumb title="All Trips" subTitle="Trips" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-body">
            <DatatablesHover columns={columns} data={tripsData?.data || []} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TripsList
