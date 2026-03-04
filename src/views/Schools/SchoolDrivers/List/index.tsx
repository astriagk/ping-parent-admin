'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import { SchoolDriverItem } from '@src/dtos/schoolAdmin'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import {
  accessorkeys,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import { UserRoles } from '@src/shared/constants/enums'
import TableContainer from '@src/shared/custom/table/table'
import { useGetDriverListQuery } from '@src/store/services/driverApi'
import {
  useAssignDriverToSchoolMutation,
  useGetSchoolDriversQuery,
  useRemoveDriverFromSchoolMutation,
} from '@src/store/services/schoolAdminApi'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import { CirclePlus, Search } from 'lucide-react'
import Select from 'react-select'

const ApprovalBadge = ({ status }: { status: string }) => {
  const { label, className } = badgeMaps[status as keyof typeof badgeMaps]
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
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [removeDriver] = useRemoveDriverFromSchoolMutation()

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const firstSchoolId = selectedSchoolId || schoolsData?.data?.[0]?._id || ''

  const { data: schoolDriversData } = useGetSchoolDriversQuery(firstSchoolId, {
    skip: !firstSchoolId,
  })

  const handleRemove = (driverId: string) => {
    if (window.confirm('Remove this driver from the school?')) {
      removeDriver(driverId)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const driversArr: SchoolDriverItem[] = schoolDriversData?.data ?? []

  const filteredRecords = driversArr.filter((item: SchoolDriverItem) =>
    (item.username ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.schoolDriversList.id,
        header: headerKeys.schoolDriversList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.schoolDriversList.username,
        header: headerKeys.schoolDriversList.username,
      },
      {
        accessorKey: accessorkeys.schoolDriversList.email,
        header: headerKeys.schoolDriversList.email,
      },
      {
        accessorKey: accessorkeys.schoolDriversList.phoneNumber,
        header: headerKeys.schoolDriversList.phoneNumber,
      },
      {
        accessorKey: accessorkeys.schoolDriversList.approvalStatus,
        header: headerKeys.schoolDriversList.approvalStatus,
        cell: ({ row }: { row: { original: SchoolDriverItem } }) => (
          <ApprovalBadge status={row.original.approval_status} />
        ),
      },
      {
        accessorKey: accessorkeys.schoolDriversList.actions,
        header: headerKeys.schoolDriversList.actions,
        cell: ({ row }: { row: { original: SchoolDriverItem } }) => {
          const driverId = row.original.driver_id
          return (
            <div className="flex justify-end gap-2">
              <button
                className="btn btn-sub-red btn-icon !size-8 rounded-md"
                onClick={() => handleRemove(driverId)}>
                <i className="ri-user-unfollow-line"></i>
              </button>
              <button
                className="btn btn-sub-primary btn-icon !size-8 rounded-md"
                onClick={() =>
                  router.push(`/users/drivers/details/${driverId}`)
                }>
                <i className="ri-eye-line"></i>
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
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 lg:col-span-4 xxl:col-span-3">
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
              <div className="col-span-12 md:col-span-9 lg:col-span-4 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search Driver"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="absolute inset-y-0 flex items-center ltr:left-3 rtl:right-3 focus:outline-hidden">
                    <Search className="text-gray-500 dark:text-dark-500 size-4 fill-gray-100 dark:fill-dark-850" />
                  </button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 lg:col-span-2 lg:col-start-11 xxl:col-span-2 xxl:col-start-11 ltr:md:text-right rtl:md:text-left">
                <button
                  className="btn btn-primary shrink-0"
                  disabled={!firstSchoolId}
                  onClick={() => setModalOpen(true)}>
                  <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                  Assign Driver
                </button>
              </div>
            </div>
          </div>

          <div className="pt-0 card-body">
            <div>
              <TableContainer
                columns={columns}
                data={paginatedData}
                thClass="!font-medium cursor-pointer"
                divClass="overflow-x-auto table-box whitespace-nowrap"
                lastTrClass="text-end"
                tableClass="table flush"
                thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
              />
              <Pagination
                totalItems={filteredRecords.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
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
