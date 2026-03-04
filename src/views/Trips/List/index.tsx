'use client'

import React, { useMemo, useState } from 'react'

import { Trip } from '@src/dtos/trip'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import {
  accessorkeys,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import { TripStatus } from '@src/shared/constants/enums'
import TableContainer from '@src/shared/custom/table/table'
import { useGetTripListQuery } from '@src/store/services/tripApi'
import { formatDate } from '@src/utils/formatters'
import { Search } from 'lucide-react'

const TripsList = () => {
  const { data: tripsData } = useGetTripListQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const tripData: Trip[] = tripsData?.data ?? []

  const filteredTripRecords = tripData.filter((item: Trip) =>
    (item.driver_name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedTrips = filteredTripRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.tripsList.id,
        header: headerKeys.tripsList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.tripsList.tripId,
        header: headerKeys.tripsList.tripId,
      },
      {
        accessorKey: accessorkeys.tripsList.tripType,
        header: headerKeys.tripsList.tripType,
        cell: ({ row }: { row: { original: Trip } }) => (
          <span className="capitalize">{row.original.trip_type}</span>
        ),
      },
      {
        accessorKey: accessorkeys.tripsList.tripStatus,
        header: headerKeys.tripsList.tripStatus,
        cell: ({ row }: { row: { original: Trip } }) => {
          const status = row.original.trip_status as TripStatus
          const { label, className } =
            badgeMaps[status as keyof typeof badgeMaps]
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.tripsList.tripDate,
        header: headerKeys.tripsList.tripDate,
        cell: ({ row }: { row: { original: Trip } }) =>
          formatDate(row.original.trip_date),
      },
      {
        accessorKey: accessorkeys.tripsList.totalDistance,
        header: headerKeys.tripsList.totalDistance,
        cell: ({ row }: { row: { original: Trip } }) => {
          const value = row.original.total_distance
          return value != null ? `${value} KM` : '-'
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="All Trips" subTitle="Trips" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search by Driver"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="absolute inset-y-0 flex items-center ltr:left-3 rtl:right-3 ltr:group-[&.right]/form:right-3 rtl:group-[&.right]/form:left-3 ltr:group-[&.right]/form:left-auto rtl:group-[&.right]/form:right-auto focus:outline-hidden">
                    <Search className="text-gray-500 dark:text-dark-500 size-4 fill-gray-100 dark:fill-dark-850" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-0 card-body">
            <div>
              <TableContainer
                columns={columns}
                data={paginatedTrips}
                thClass="!font-medium cursor-pointer"
                divClass="overflow-x-auto table-box whitespace-nowrap"
                lastTrClass="text-end"
                tableClass="table flush"
                thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
              />
              <Pagination
                totalItems={filteredTripRecords.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default TripsList
