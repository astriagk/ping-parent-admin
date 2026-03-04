'use client'

import React, { useMemo, useState } from 'react'

import { ParentSubscription } from '@src/dtos/subscription'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import {
  accessorkeys,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import { useGetParentSubscriptionsQuery } from '@src/store/services/subscriptionApi'
import { Search } from 'lucide-react'

const ParentSubscriptionsList = () => {
  const { data: subscriptionsData } = useGetParentSubscriptionsQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const subscriptionData: ParentSubscription[] = subscriptionsData?.data ?? []

  const filteredRecords = subscriptionData.filter((item: ParentSubscription) =>
    (item.parent_name ?? '').toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.parentSubscriptionsList.id,
        header: headerKeys.parentSubscriptionsList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.planId,
        header: headerKeys.parentSubscriptionsList.planId,
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.parentId,
        header: headerKeys.parentSubscriptionsList.parentId,
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.subscriptionStatus,
        header: headerKeys.parentSubscriptionsList.subscriptionStatus,
        cell: ({ row }: { row: { original: ParentSubscription } }) => {
          const { label, className } =
            badgeMaps[row.original.subscription_status]
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.amount,
        header: headerKeys.parentSubscriptionsList.amount,
        cell: ({ row }: { row: { original: ParentSubscription } }) =>
          `₹${row.original.calculated_price}`,
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.startDate,
        header: headerKeys.parentSubscriptionsList.startDate,
        cell: ({ row }: { row: { original: ParentSubscription } }) =>
          new Date(row.original.start_date).toLocaleDateString(),
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.endDate,
        header: headerKeys.parentSubscriptionsList.endDate,
        cell: ({ row }: { row: { original: ParentSubscription } }) =>
          new Date(row.original.end_date).toLocaleDateString(),
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.actions,
        header: headerKeys.parentSubscriptionsList.actions,
        cell: ({ row }: { row: { original: ParentSubscription } }) => (
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
      <BreadCrumb title="Parent Subscriptions" subTitle="Billing" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search by Parent"
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

export default ParentSubscriptionsList
