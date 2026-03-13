'use client'

import React, { useMemo, useState } from 'react'

import { Rating } from '@src/dtos/rating'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import { useGetAllRatingsQuery } from '@src/store/services/ratingApi'
import { formatDate } from '@src/utils/formatters'
import { Search } from 'lucide-react'

const RatingsReviewsList = () => {
  const { data: ratingsData } = useGetAllRatingsQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const ratingsArr: Rating[] = ratingsData?.data ?? []

  const filteredRecords = ratingsArr.filter((item: Rating) =>
    (item.driver_name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.ratingsReviewsList.id,
        header: headerKeys.ratingsReviewsList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.ratingsReviewsList.rating,
        header: headerKeys.ratingsReviewsList.rating,
        cell: ({ row }: { row: { original: Rating } }) =>
          row.original.rating != null ? `⭐ ${row.original.rating.toFixed(1)}` : '—',
      },
      {
        accessorKey: accessorkeys.ratingsReviewsList.driverName,
        header: headerKeys.ratingsReviewsList.driverName,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.driver_name || '—',
      },
      {
        accessorKey: accessorkeys.ratingsReviewsList.driverUniqueId,
        header: headerKeys.ratingsReviewsList.driverUniqueId,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.driver_unique_id || '—',
      },
      {
        accessorKey: accessorkeys.ratingsReviewsList.parentName,
        header: headerKeys.ratingsReviewsList.parentName,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.parent_name || '—',
      },
      {
        accessorKey: accessorkeys.ratingsReviewsList.review,
        header: headerKeys.ratingsReviewsList.review,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.review_text || '—',
      },
      {
        accessorKey: accessorkeys.ratingsReviewsList.tripDate,
        header: headerKeys.ratingsReviewsList.tripDate,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.trip_date ? formatDate(row.original.trip_date) : '—',
      },
      {
        accessorKey: accessorkeys.ratingsReviewsList.createdAt,
        header: headerKeys.ratingsReviewsList.createdAt,
        cell: ({ row }: { row: { original: Rating } }) =>
          row.original.created_at ? formatDate(row.original.created_at) : '—',
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Ratings & Reviews" subTitle="Reviews" />
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
    </React.Fragment>
  )
}

export default RatingsReviewsList
