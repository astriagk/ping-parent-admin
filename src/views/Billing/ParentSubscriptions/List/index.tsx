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
import { formatDate } from '@src/utils/formatters'
import { Search } from 'lucide-react'
import Select from 'react-select'

const ParentSubscriptionsList = () => {
  const { data: subscriptionsData } = useGetParentSubscriptionsQuery()
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedStatus, setSelectedStatus] = useState<string>('')

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const subscriptionData: ParentSubscription[] = subscriptionsData?.data ?? []

  const filteredRecords = subscriptionData.filter((item: ParentSubscription) => {
    const matchesSearch = (item.parent_name ?? '')
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    const matchesStatus = selectedStatus
      ? item.subscription_status === selectedStatus
      : true
    return matchesSearch && matchesStatus
  })

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
        accessorKey: accessorkeys.parentSubscriptionsList.parentName,
        header: headerKeys.parentSubscriptionsList.parentName,
        cell: ({ row }: { row: { original: ParentSubscription } }) =>
          row.original.parent_name || '—',
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.parentPhone,
        header: headerKeys.parentSubscriptionsList.parentPhone,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.parent_phone || '—',
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.planName,
        header: headerKeys.parentSubscriptionsList.planName,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.plan_name || '—',
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.planType,
        header: headerKeys.parentSubscriptionsList.planType,
        cell: ({ row }: { row: { original: any } }) => {
          const type = row.original.plan_type as keyof typeof badgeMaps
          if (!type) return <span className="text-gray-400">—</span>
          const badge = badgeMaps[type] ?? badgeMaps['undefined']
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badge.className}`}>
              {badge.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.subscriptionStatus,
        header: headerKeys.parentSubscriptionsList.subscriptionStatus,
        cell: ({ row }: { row: { original: ParentSubscription } }) => {
          const status = row.original.subscription_status as keyof typeof badgeMaps
          const badge = badgeMaps[status] ?? badgeMaps['undefined']
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badge.className}`}>
              {badge.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.startDate,
        header: headerKeys.parentSubscriptionsList.startDate,
        cell: ({ row }: { row: { original: ParentSubscription } }) =>
          row.original.start_date ? formatDate(row.original.start_date) : '—',
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.endDate,
        header: headerKeys.parentSubscriptionsList.endDate,
        cell: ({ row }: { row: { original: ParentSubscription } }) =>
          row.original.end_date ? formatDate(row.original.end_date) : '—',
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.autoRenew,
        header: headerKeys.parentSubscriptionsList.autoRenew,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.auto_renew ? 'Yes' : 'No',
      },
      {
        accessorKey: accessorkeys.parentSubscriptionsList.createdAt,
        header: headerKeys.parentSubscriptionsList.createdAt,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.created_at ? formatDate(row.original.created_at) : '—',
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
              <div className="col-span-12 md:col-span-4 lg:col-span-3 xxl:col-span-2">
                <div className="relative group/form grow">
                  <Select<{ value: string; label: string }>
                    classNamePrefix="select"
                    options={[
                      { value: 'active', label: 'Active' },
                      { value: 'expired', label: 'Expired' },
                      { value: 'cancelled', label: 'Cancelled' },
                    ]}
                    value={
                      selectedStatus
                        ? { value: selectedStatus, label: selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1) }
                        : null
                    }
                    onChange={(option) => setSelectedStatus(option?.value || '')}
                    placeholder="Filter by Status"
                    isClearable={true}
                  />
                </div>
              </div>
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
