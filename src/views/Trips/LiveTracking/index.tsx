'use client'

import React, { useMemo } from 'react'

import { Trip } from '@src/dtos/trip'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetTripListQuery } from '@src/store/services/tripApi'
import { MapPin } from 'lucide-react'

const LiveTracking = () => {
  const { data: tripsData } = useGetTripListQuery()

  // only include trips with status started or in_progress for live tracking
  const activeTrips = useMemo(() => {
    return (
      tripsData?.data?.filter(
        (t: Trip) =>
          t.trip_status === 'started' || t.trip_status === 'in_progress'
      ) || []
    )
  }, [tripsData])

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
        accessorKey: 'start_time',
        header: 'Started At',
        cell: ({ row }: { row: { original: Trip } }) =>
          row.original.start_time
            ? new Date(row.original.start_time).toLocaleTimeString()
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
              onClick={() => console.log('Track', row.original)}>
              <MapPin className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
              Track
            </button>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Live Tracking" subTitle="Trips" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12">
          <div className="card mb-4">
            <div className="card-body">
              <div className="flex items-center gap-2">
                <span className="inline-block size-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium">
                  {activeTrips.length} active trips
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12 card">
          <div className="card-body">
            <DatatablesHover columns={columns} data={activeTrips} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default LiveTracking
