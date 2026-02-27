'use client'

import React, { useMemo } from 'react'

import { useParams } from 'next/navigation'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { TripStatus } from '@src/shared/constants/enums'
import { useGetTripDetailsQuery } from '@src/store/services/tripApi'

const tripStatusBadge: Record<
  TripStatus,
  { label: string; className: string }
> = {
  [TripStatus.SCHEDULED]: { label: 'Scheduled', className: 'badge-yellow' },
  [TripStatus.STARTED]: { label: 'Started', className: 'badge-blue' },
  [TripStatus.IN_PROGRESS]: { label: 'In Progress', className: 'badge-blue' },
  [TripStatus.COMPLETED]: { label: 'Completed', className: 'badge-green' },
  [TripStatus.CANCELLED]: { label: 'Cancelled', className: 'badge-red' },
}

const DetailRow = ({
  label,
  value,
  mono = false,
}: {
  label: string
  value: React.ReactNode
  mono?: boolean
}) => (
  <div>
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p
      className={`text-gray-900 text-sm ${mono ? 'font-mono break-all' : 'font-medium'}`}>
      {value ?? '—'}
    </p>
  </div>
)

const TripDetails = () => {
  const params = useParams()
  const tripId = params?.id as string

  const { data: tripResponse, error } = useGetTripDetailsQuery(tripId, {
    skip: !tripId,
  })

  const trip = tripResponse?.data

  const studentColumns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: 'name', header: 'Student Name' },
      {
        accessorKey: 'pickup_status',
        header: 'Pickup Status',
        cell: ({ row }: { row: { original: any } }) => {
          const status = row.original.pickup_status
          const badgeClass =
            status === 'picked_up'
              ? 'badge-green'
              : status === 'missed'
                ? 'badge-red'
                : 'badge-yellow'
          return (
            <span className={`badge ${badgeClass}`}>
              {status?.replace('_', ' ') || '—'}
            </span>
          )
        },
      },
      {
        accessorKey: 'drop_status',
        header: 'Drop Status',
        cell: ({ row }: { row: { original: any } }) => {
          const status = row.original.drop_status
          const badgeClass =
            status === 'dropped'
              ? 'badge-green'
              : status === 'missed'
                ? 'badge-red'
                : 'badge-yellow'
          return (
            <span className={`badge ${badgeClass}`}>
              {status?.replace('_', ' ') || '—'}
            </span>
          )
        },
      },
    ],
    []
  )

  const trackingColumns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: 'lat',
        header: 'Latitude',
        cell: ({ row }: { row: { original: any } }) =>
          row.original.lat?.toFixed(6) ?? '—',
      },
      {
        accessorKey: 'lng',
        header: 'Longitude',
        cell: ({ row }: { row: { original: any } }) =>
          row.original.lng?.toFixed(6) ?? '—',
      },
      {
        accessorKey: 'timestamp',
        header: 'Time',
        cell: ({ row }: { row: { original: any } }) =>
          row.original.timestamp
            ? new Date(row.original.timestamp).toLocaleString()
            : '—',
      },
    ],
    []
  )

  if (error || !trip) {
    return (
      <React.Fragment>
        <BreadCrumb
          title="Trip Details"
          subTitle={error ? 'Error' : 'Loading'}
        />
        <div className="grid grid-cols-12 gap-x-space">
          <div
            className={`col-span-12 card ${error ? 'bg-red-50 border border-red-200' : ''}`}>
            <div className="card-body">
              <p className={error ? 'text-red-700' : 'text-gray-500'}>
                {error ? 'Failed to fetch trip details.' : 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  const status = trip.trip_status as TripStatus
  const badge = tripStatusBadge[status] || {
    label: status,
    className: 'badge-gray',
  }

  return (
    <React.Fragment>
      <BreadCrumb title="Trip Details" subTitle={trip._id} />
      <div className="grid grid-cols-12 gap-x-space">
        {/* Trip Info Card */}
        <div className="col-span-12 card">
          <div className="card-body">
            <div className="flex justify-between items-start mb-6 pb-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Trip #{trip._id.slice(-8)}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {trip.school_name}
                </p>
              </div>
              <span
                className={`badge inline-flex items-center gap-1 ${badge.className}`}>
                {badge.label}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 pb-6 border-b">
              <DetailRow label="Trip ID" value={trip._id} mono />
              <DetailRow label="Driver" value={trip.driver_name} />
              <DetailRow label="School" value={trip.school_name} />
              <DetailRow
                label="Type"
                value={
                  <span className="capitalize">{trip.trip_type}</span>
                }
              />
              <DetailRow
                label="Date"
                value={
                  trip.trip_date
                    ? new Date(trip.trip_date).toLocaleDateString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : undefined
                }
              />
              <DetailRow
                label="Distance"
                value={
                  trip.total_distance != null
                    ? `${trip.total_distance} KM`
                    : undefined
                }
              />
              <DetailRow
                label="Students"
                value={trip.students_count}
              />
              <DetailRow
                label="Start Time"
                value={
                  trip.start_time
                    ? new Date(trip.start_time).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : undefined
                }
              />
              <DetailRow
                label="End Time"
                value={
                  trip.end_time
                    ? new Date(trip.end_time).toLocaleTimeString('en-IN', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })
                    : undefined
                }
              />
            </div>

            <div className="flex gap-4">
              <button
                className="btn btn-light btn-sm"
                onClick={() => window.history.back()}>
                Back
              </button>
            </div>
          </div>
        </div>

        {/* Students */}
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">
              Students ({trip.students?.length || 0})
            </h6>
          </div>
          <div className="card-body">
            <DatatablesHover
              columns={studentColumns}
              data={trip.students || []}
            />
          </div>
        </div>

        {/* Tracking History */}
        {trip.tracking_history && trip.tracking_history.length > 0 && (
          <div className="col-span-12 card">
            <div className="card-header">
              <h6 className="card-title">
                Tracking History ({trip.tracking_history.length} points)
              </h6>
            </div>
            <div className="card-body">
              <DatatablesHover
                columns={trackingColumns}
                data={trip.tracking_history}
              />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default TripDetails
