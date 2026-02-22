'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import { SchoolDriverItem } from '@src/dtos/schoolAdmin'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { UserRoles } from '@src/shared/constants/enums'
import { useGetDriverListQuery } from '@src/store/services/driverApi'
import {
  useAssignDriverToSchoolMutation,
  useGetSchoolDriversQuery,
  useRemoveDriverFromSchoolMutation,
} from '@src/store/services/schoolAdminApi'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import { CirclePlus } from 'lucide-react'
import Select from 'react-select'

const ApprovalBadge = ({ status }: { status: string }) => {
  const map: Record<string, { label: string; className: string }> = {
    approved: { label: 'Approved', className: 'badge-green' },
    pending: { label: 'Pending', className: 'badge-yellow' },
    rejected: { label: 'Rejected', className: 'badge-red' },
  }
  const { label, className } = map[status] || {
    label: status,
    className: 'badge-gray',
  }
  return (
    <span className={`badge inline-flex items-center gap-1 ${className}`}>
      {label}
    </span>
  )
}

const AssignDriverModal = ({
  open,
  schoolId,
  onClose,
}: {
  open: boolean
  schoolId: string
  onClose: () => void
}) => {
  const { data: driversData } = useGetDriverListQuery({
    user_type: UserRoles.DRIVER,
  })
  const [assignDriver, { isLoading }] = useAssignDriverToSchoolMutation()
  const [selectedDriverId, setSelectedDriverId] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDriverId) return
    await assignDriver({
      school_id: schoolId,
      driver_id: selectedDriverId,
    }).unwrap()
    setSelectedDriverId('')
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-md p-6">
        <h5 className="text-lg font-semibold mb-4">Assign Driver to School</h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Select Driver</label>
            <div className="min-w-[260px]">
              {(() => {
                const driverOptions = (driversData?.data || []).map(
                  (d: any) => ({
                    value: d._id,
                    label: `${d.name ?? d.username} (${d.email})`,
                  })
                )
                const selectedOption =
                  driverOptions.find((opt) => opt.value === selectedDriverId) ||
                  null
                return (
                  <Select
                    classNamePrefix="select"
                    options={driverOptions}
                    value={selectedOption}
                    onChange={(option: any) =>
                      setSelectedDriverId(option ? option.value : '')
                    }
                    placeholder="Select driver"
                    isClearable={true}
                  />
                )
              })()}
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={isLoading}>
              Assign
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const SchoolDriversList = () => {
  const router = useRouter()
  const { data: schoolsData } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = React.useState<string>(() => {
    const first = schoolsData?.data?.[0]?._id
    return first || ''
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [removeDriver] = useRemoveDriverFromSchoolMutation()

  const firstSchoolId =
    selectedSchoolId || schoolsData?.data?.[0]?._id || ''

  const { data: schoolDriversData } = useGetSchoolDriversQuery(firstSchoolId, {
    skip: !firstSchoolId,
  })

  const handleRemove = (driverId: string) => {
    if (window.confirm('Remove this driver from the school?')) {
      removeDriver(driverId)
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.username, header: headerKeys.username },
      { accessorKey: accessorkeys.email, header: headerKeys.email },
      { accessorKey: accessorkeys.phoneNumber, header: headerKeys.phoneNumber },
      {
        accessorKey: 'approval_status',
        header: 'Approval Status',
        cell: ({ row }: { row: { original: SchoolDriverItem } }) => (
          <ApprovalBadge status={row.original.approval_status} />
        ),
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: SchoolDriverItem } }) => {
          const driverId = row.original.driver_id
          return (
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-red btn-sm"
                onClick={() => handleRemove(driverId)}>
                Remove
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  router.push(`/users/drivers/details/${driverId}`)
                }>
                View
              </button>
            </div>
          )
        },
      },
    ],
    [router]
  )

  return (
    <React.Fragment>
      <BreadCrumb title="School Drivers" subTitle="Schools" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-full min-w-[260px]">
                {(() => {
                  const schoolOptions = (schoolsData?.data || []).map(
                    (school: any) => ({
                      value: school._id,
                      label: school.school_name,
                    })
                  )
                  const selectedOption =
                    schoolOptions.find(
                      (opt) => opt.value === selectedSchoolId
                    ) || null
                  return (
                    <Select
                      classNamePrefix="select"
                      options={schoolOptions}
                      value={selectedOption}
                      onChange={(option: any) =>
                        setSelectedSchoolId(option ? option.value : '')
                      }
                      placeholder="Select school"
                      isClearable={true}
                    />
                  )
                })()}
              </div>
            </div>
            <button
              className="btn btn-primary shrink-0"
              disabled={!firstSchoolId}
              onClick={() => setModalOpen(true)}>
              <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
              Assign Driver
            </button>
          </div>
          <div className="pt-4 card-body">
            <DatatablesHover
              columns={columns}
              data={schoolDriversData?.data || []}
            />
          </div>
        </div>
      </div>
      <AssignDriverModal
        open={modalOpen}
        schoolId={firstSchoolId}
        onClose={() => setModalOpen(false)}
      />
    </React.Fragment>
  )
}

export default SchoolDriversList
