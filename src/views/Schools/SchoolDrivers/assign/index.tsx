'use client'

import React, { useMemo, useState } from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import {
  accessorkeys,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import { STORAGE_KEYS, UserRoles } from '@src/shared/constants/enums'
import { MESSAGES } from '@src/shared/constants/messages'
import TableContainer from '@src/shared/custom/table/table'
import { useGetDriverListQuery } from '@src/store/services/driverApi'
import { useAssignDriverToSchoolMutation } from '@src/store/services/schoolAdminApi'
import LocalStorage from '@src/utils/LocalStorage'
import { formatDate } from '@src/utils/formatters'
import { Plus, Search, Trash2, UserPlus } from 'lucide-react'
import { toast } from 'react-toastify'

const DriversAssignmentsList = () => {
  const adminData = LocalStorage.getItem(STORAGE_KEYS.ADMIN)
  const user = adminData ? JSON.parse(adminData) : null
  const schoolId = user?.school_id

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedDrivers, setSelectedDrivers] = useState<any[]>([])

  const { data: driverListData } = useGetDriverListQuery({
    user_type: UserRoles.DRIVER,
  })
  const [assignDriver, { isLoading: isAssigning }] =
    useAssignDriverToSchoolMutation()

  const allDrivers: any[] = driverListData?.data ?? []

  const selectedIds = new Set(selectedDrivers.map((d) => d._id))

  const filteredDrivers = allDrivers.filter((driver) => {
    if (selectedIds.has(driver._id)) return false
    if (!searchQuery.trim()) return false
    const query = searchQuery.toLowerCase()
    return (
      (driver.name ?? '').toLowerCase().includes(query) ||
      (driver.email ?? '').toLowerCase().includes(query) ||
      (driver.phone_number ?? '').includes(query)
    )
  })

  const handleAddDriver = (driver: any) => {
    setSelectedDrivers((prev) => [...prev, driver])
  }

  const handleRemoveDriver = (driverId: string) => {
    setSelectedDrivers((prev) => prev.filter((d) => d._id !== driverId))
  }

  const handleAssignAll = async () => {
    if (!schoolId) {
      toast.error('School ID not found. Please log in again.')
      return
    }
    if (selectedDrivers.length === 0) return

    let successCount = 0

    for (const driver of selectedDrivers) {
      try {
        await assignDriver({
          driverId: driver._id,
          schoolId,
        }).unwrap()
        successCount++
      } catch (error: any) {
        toast.error(
          `Failed to assign ${driver.name || 'driver'}: ${error?.data?.error || error?.message || MESSAGES.ADMIN.ERROR.UPDATE_FAILED}`
        )
      }
    }

    if (successCount > 0) {
      toast.success(
        `Successfully assigned ${successCount} driver${successCount > 1 ? 's' : ''} to school.`
      )
      setSelectedDrivers([])
      setSearchQuery('')
    }
  }

  const selectedColumns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.assignDriversList.id,
        header: headerKeys.assignDriversList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.assignDriversList.name,
        header: headerKeys.assignDriversList.name,
        cell: ({ row }: { row: { original: any } }) => row.original.name || '—',
      },
      {
        accessorKey: accessorkeys.assignDriversList.email,
        header: headerKeys.assignDriversList.email,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.email || '—',
      },
      {
        accessorKey: accessorkeys.assignDriversList.phoneNumber,
        header: headerKeys.assignDriversList.phoneNumber,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.phone_number || '—',
      },
      {
        accessorKey: accessorkeys.assignDriversList.isActive,
        header: headerKeys.assignDriversList.isActive,
        cell: ({ row }: { row: { original: any } }) => {
          const key = String(
            row.original.is_active ?? false
          ) as keyof typeof badgeMaps
          const badge = badgeMaps[key] ?? badgeMaps['undefined']
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badge.className}`}>
              {badge.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.assignDriversList.createdAt,
        header: headerKeys.assignDriversList.createdAt,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.created_at ? formatDate(row.original.created_at) : '—',
      },
      {
        accessorKey: accessorkeys.assignDriversList.actions,
        header: headerKeys.assignDriversList.actions,
        cell: ({ row }: { row: { original: any } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sub-red btn-icon !size-8 rounded-md"
              title="Remove"
              onClick={() => handleRemoveDriver(row.original._id)}>
              <Trash2 className="size-4" />
            </button>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Assign Drivers to School" subTitle="Assignments" />
      <div className="grid grid-cols-12 gap-x-space">
        {/* Search Drivers Section */}
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">Search Drivers</h6>
            <p className="text-gray-500 dark:text-dark-500 text-sm">
              Search for drivers by name, email, or phone to add them to your
              school
            </p>
          </div>
          <div className="card-body">
            <div className="relative group/form mb-4 max-w-md">
              <input
                type="text"
                className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                placeholder="Search by name, email, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="absolute inset-y-0 flex items-center ltr:left-3 rtl:right-3 focus:outline-hidden">
                <Search className="text-gray-500 dark:text-dark-500 size-4 fill-gray-100 dark:fill-dark-850" />
              </button>
            </div>

            {searchQuery.trim() && (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredDrivers.length === 0 ? (
                  <p className="text-gray-500 dark:text-dark-500 col-span-full text-center py-4">
                    No drivers found matching &quot;{searchQuery}&quot;
                  </p>
                ) : (
                  filteredDrivers.map((driver) => {
                    const statusKey = String(
                      driver.is_active ?? false
                    ) as keyof typeof badgeMaps
                    const badge = badgeMaps[statusKey] ?? badgeMaps['undefined']
                    return (
                      <div
                        key={driver._id}
                        className="border border-gray-200 dark:border-dark-800 rounded-lg p-4 flex flex-col gap-2 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {driver.photo_url ? (
                              <img
                                src={driver.photo_url}
                                alt={driver.name}
                                className="size-10 rounded-full object-cover"
                              />
                            ) : (
                              <div className="size-10 rounded-full bg-gray-200 dark:bg-dark-800 flex items-center justify-center text-sm font-medium text-gray-500 dark:text-dark-500">
                                {(driver.name || '?').charAt(0).toUpperCase()}
                              </div>
                            )}
                            <h6 className="font-semibold text-sm">
                              {driver.name || '—'}
                            </h6>
                          </div>
                          <span
                            className={`badge inline-flex items-center gap-1 text-xs ${badge.className}`}>
                            {badge.label}
                          </span>
                        </div>
                        <div className="text-xs text-gray-500 dark:text-dark-500 space-y-1">
                          <p>
                            <span className="font-medium">Email:</span>{' '}
                            {driver.email || '—'}
                          </p>
                          <p>
                            <span className="font-medium">Phone:</span>{' '}
                            {driver.phone_number || '—'}
                          </p>
                          <p>
                            <span className="font-medium">Joined:</span>{' '}
                            {driver.created_at
                              ? formatDate(driver.created_at)
                              : '—'}
                          </p>
                        </div>
                        <button
                          className="btn btn-sub-primary btn-sm mt-2 w-full"
                          onClick={() => handleAddDriver(driver)}>
                          <Plus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                          Add
                        </button>
                      </div>
                    )
                  })
                )}
              </div>
            )}
          </div>
        </div>

        {/* Selected Drivers Section */}
        {selectedDrivers.length > 0 && (
          <div className="col-span-12 card">
            <div className="card-header flex items-center justify-between">
              <div>
                <h6 className="card-title">
                  Selected Drivers ({selectedDrivers.length})
                </h6>
                <p className="text-gray-500 dark:text-dark-500 text-sm">
                  Review and assign the selected drivers to your school
                </p>
              </div>
              <button
                className="btn btn-primary shrink-0"
                disabled={isAssigning}
                onClick={handleAssignAll}>
                <UserPlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                {isAssigning
                  ? 'Assigning...'
                  : `Assign ${selectedDrivers.length} Driver${selectedDrivers.length > 1 ? 's' : ''}`}
              </button>
            </div>
            <div className="pt-0 card-body">
              <TableContainer
                columns={selectedColumns}
                data={selectedDrivers}
                thClass="!font-medium cursor-pointer"
                divClass="overflow-x-auto table-box whitespace-nowrap"
                lastTrClass="text-end"
                tableClass="table flush"
                thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
              />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  )
}

export default DriversAssignmentsList
