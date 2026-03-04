'use client'

import React, { useMemo } from 'react'

import { useParams } from 'next/navigation'

import { Trip } from '@src/dtos/trip'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { TripStatus } from '@src/shared/constants/enums'
import { useGetStudentDetailsQuery } from '@src/store/services/studentApi'
import { useGetTripListQuery } from '@src/store/services/tripApi'

const statusBadge: Record<TripStatus, { label: string; className: string }> = {
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

const StudentDetails = () => {
  const params = useParams()
  const studentId = params?.id as string

  const { data: studentResponse, error } = useGetStudentDetailsQuery(
    studentId,
    { skip: !studentId }
  )
  const { data: tripsData } = useGetTripListQuery(
    { student_id: studentId } as any,
    { skip: !studentId }
  )

  const student = studentResponse?.data

  const tripColumns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.tripId, header: headerKeys.tripId },
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
          const status = row.original.trip_status as TripStatus
          const badge = statusBadge[status] || {
            label: status,
            className: 'badge-gray',
          }
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badge.className}`}>
              {badge.label}
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
            : '—',
      },
    ],
    []
  )

  if (error || !student) {
    return (
      <React.Fragment>
        <BreadCrumb
          title="Student Details"
          subTitle={error ? 'Error' : 'Loading'}
        />
        <div className="grid grid-cols-12 gap-x-space">
          <div
            className={`col-span-12 card ${error ? 'bg-red-50 border border-red-200' : ''}`}>
            <div className="card-body">
              <p className={error ? 'text-red-700' : 'text-gray-500'}>
                {error ? 'Failed to fetch student details.' : 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <BreadCrumb title="Student Details" subTitle={student.name} />
      <div className="grid grid-cols-12 gap-x-space">
        {/* Profile Card */}
        <div className="col-span-12 card">
          <div className="card-body">
            <div className="flex justify-between items-start mb-6 pb-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {student.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  Grade: {student.grade}
                </p>
              </div>
              <span
                className={`badge inline-flex items-center gap-1 ${student.is_active ? 'badge-green' : 'badge-yellow'}`}>
                {student.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 pb-6 border-b">
              <DetailRow label="Name" value={student.name} />
              <DetailRow label="Grade" value={student.grade} />
              <DetailRow label="School" value={student.school_name} />
              <DetailRow label="Parent" value={student.parent_name} />
              <DetailRow label="Phone" value={student.phone_number} />
              <DetailRow
                label="Joined"
                value={new Date(student.created_at).toLocaleDateString(
                  'en-IN',
                  { day: '2-digit', month: 'short', year: 'numeric' }
                )}
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

        {/* Trip History */}
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">Trip History</h6>
          </div>
          <div className="card-body">
            <DatatablesHover
              columns={tripColumns}
              data={tripsData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default StudentDetails
