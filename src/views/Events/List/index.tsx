'use client'

import React, { useMemo, useState } from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import {
  accessorkeys,
  badgeClassNames,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import { CirclePlus, Search } from 'lucide-react'

const EventsList = () => {
  const [searchQuery, setSearchQuery] = useState<string>('')

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const data: any[] = []

  const filteredRecords = data.filter((item: any) =>
    (item.title ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.eventsList.id,
        header: headerKeys.eventsList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.eventsList.title,
        header: headerKeys.eventsList.title,
      },
      {
        accessorKey: accessorkeys.eventsList.eventType,
        header: headerKeys.eventsList.eventType,
        cell: ({ row }: { row: { original: any } }) => {
          const key = row.original.event_type as keyof typeof badgeMaps
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badgeMaps[key]?.className || badgeClassNames.secondary}`}>
              {badgeMaps[key]?.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.eventsList.eventDate,
        header: headerKeys.eventsList.eventDate,
      },
      {
        accessorKey: accessorkeys.eventsList.audienceScope,
        header: headerKeys.eventsList.audienceScope,
      },
      {
        accessorKey: accessorkeys.eventsList.requiresRsvp,
        header: headerKeys.eventsList.requiresRsvp,
        cell: ({ row }: { row: { original: any } }) => {
          const key = row.original.requires_rsvp ? 'required' : 'not_required'
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badgeMaps[key as keyof typeof badgeMaps]?.className}`}>
              {badgeMaps[key as keyof typeof badgeMaps]?.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.eventsList.actions,
        header: headerKeys.eventsList.actions,
        cell: ({ row }: { row: { original: any } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sub-primary btn-icon !size-8 rounded-md"
              onClick={() => console.log('View', row.original)}>
              <i className="ri-eye-line"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="School Events" subTitle="Events" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search Event"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="absolute inset-y-0 flex items-center ltr:left-3 rtl:right-3 ltr:group-[&.right]/form:right-3 rtl:group-[&.right]/form:left-3 ltr:group-[&.right]/form:left-auto rtl:group-[&.right]/form:right-auto focus:outline-hidden">
                    <Search className="text-gray-500 dark:text-dark-500 size-4 fill-gray-100 dark:fill-dark-850" />
                  </button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-3 lg:col-span-3 lg:col-start-10 xxl:col-span-2 xxl:col-start-11 ltr:md:text-right rtl:md:text-left">
                <button
                  className="btn btn-primary shrink-0"
                  onClick={() => console.log('Create Event')}>
                  <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />{' '}
                  Create Event
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
    </React.Fragment>
  )
}

export default EventsList
