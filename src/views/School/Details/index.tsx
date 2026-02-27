'use client'

import React, { useMemo } from 'react'

import { useParams } from 'next/navigation'

import { SchoolAdmin } from '@src/dtos/schoolAdmin'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, badges, headerKeys } from '@src/shared/constants/columns'
import { useGetSchoolDetailsQuery } from '@src/store/services/schoolApi'
import {
  useDeactivateSchoolAdminMutation,
  useGetSchoolAdminsQuery,
  useGetSchoolDriversQuery,
  useRemoveDriverFromSchoolMutation,
} from '@src/store/services/schoolAdminApi'
import { toast } from 'react-toastify'

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

const SchoolDetails = () => {
  const params = useParams()
  const schoolId = params?.id as string

  const { data: schoolResponse, error } = useGetSchoolDetailsQuery(schoolId, {
    skip: !schoolId,
  })
  const { data: adminsData } = useGetSchoolAdminsQuery(schoolId, {
    skip: !schoolId,
  })
  const { data: driversData } = useGetSchoolDriversQuery(schoolId, {
    skip: !schoolId,
  })
  const [deactivateSchoolAdmin] = useDeactivateSchoolAdminMutation()
  const [removeDriver] = useRemoveDriverFromSchoolMutation()

  const school = schoolResponse?.data

  const handleDeactivateAdmin = async (adminId: string) => {
    try {
      const result = await deactivateSchoolAdmin(adminId).unwrap()
      toast.success(result?.message || 'School admin deactivated')
    } catch (error: any) {
      toast.error(error?.data?.error || 'Failed to deactivate')
    }
  }

  const handleRemoveDriver = async (driverId: string) => {
    if (!window.confirm('Remove this driver from the school?')) return
    try {
      const result = await removeDriver(driverId).unwrap()
      toast.success(result?.message || 'Driver removed from school')
    } catch (error: any) {
      toast.error(error?.data?.error || 'Failed to remove driver')
    }
  }

  const adminColumns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phone_number', header: 'Phone' },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: SchoolAdmin } }) => {
          const mapKey = String(row.original.is_active) as keyof typeof badges
          const { label, className } = badges[mapKey] || badges.undefined
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: SchoolAdmin } }) => (
          <div className="flex justify-end gap-2">
            {row.original.is_active && (
              <button
                className="btn btn-orange btn-sm"
                onClick={() => handleDeactivateAdmin(row.original._id)}>
                Deactivate
              </button>
            )}
          </div>
        ),
      },
    ],
    []
  )

  const driverColumns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: 'name', header: 'Name' },
      { accessorKey: 'email', header: 'Email' },
      { accessorKey: 'phone_number', header: 'Phone' },
      {
        accessorKey: 'approval_status',
        header: 'Approval',
        cell: ({ row }: { row: { original: any } }) => {
          const status = row.original.approval_status
          const badgeClass =
            status === 'approved'
              ? 'badge-green'
              : status === 'rejected'
                ? 'badge-red'
                : 'badge-yellow'
          return (
            <span className={`badge ${badgeClass}`}>{status}</span>
          )
        },
      },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: any } }) => {
          const mapKey = String(row.original.is_active) as keyof typeof badges
          const { label, className } = badges[mapKey] || badges.undefined
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: any } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-red btn-sm"
              onClick={() => handleRemoveDriver(row.original.driver_id)}>
              Remove
            </button>
          </div>
        ),
      },
    ],
    []
  )

  if (error || !school) {
    return (
      <React.Fragment>
        <BreadCrumb
          title="School Details"
          subTitle={error ? 'Error' : 'Loading'}
        />
        <div className="grid grid-cols-12 gap-x-space">
          <div
            className={`col-span-12 card ${error ? 'bg-red-50 border border-red-200' : ''}`}>
            <div className="card-body">
              <p className={error ? 'text-red-700' : 'text-gray-500'}>
                {error ? 'Failed to fetch school details.' : 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <BreadCrumb title="School Details" subTitle={school.school_name} />
      <div className="grid grid-cols-12 gap-x-space">
        {/* School Info Card */}
        <div className="col-span-12 card">
          <div className="card-body">
            <div className="flex justify-between items-start mb-6 pb-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {school.school_name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {school.city}, {school.state}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 pb-6 border-b">
              <DetailRow label="School Name" value={school.school_name} />
              <DetailRow label="Address" value={school.address} />
              <DetailRow label="City" value={school.city} />
              <DetailRow label="State" value={school.state} />
              <DetailRow label="Contact" value={school.contact_number} />
              <DetailRow label="Email" value={school.email} />
              <DetailRow label="Principal" value={school.principal_name} />
              <DetailRow label="Latitude" value={school.latitude} mono />
              <DetailRow label="Longitude" value={school.longitude} mono />
              <DetailRow
                label="Created"
                value={new Date(school.created_at).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
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

        {/* School Admins */}
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">School Admins</h6>
          </div>
          <div className="card-body">
            <DatatablesHover
              columns={adminColumns}
              data={adminsData?.data || []}
            />
          </div>
        </div>

        {/* School Drivers */}
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">School Drivers</h6>
          </div>
          <div className="card-body">
            <DatatablesHover
              columns={driverColumns}
              data={driversData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default SchoolDetails
