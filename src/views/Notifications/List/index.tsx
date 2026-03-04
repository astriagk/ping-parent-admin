'use client'

import React, { useMemo, useState } from 'react'

import { Notification } from '@src/dtos/notification'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import {
  accessorkeys,
  badgeClassNames,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from '@src/store/services/notificationApi'
import { CheckCheck, Search } from 'lucide-react'

const NotificationsList = () => {
  const { data: notificationsData } = useGetNotificationsQuery()
  const [markAsRead] = useMarkAsReadMutation()
  const [markAllAsRead] = useMarkAllAsReadMutation()
  const [searchQuery, setSearchQuery] = useState<string>('')

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const notificationsArr: Notification[] = notificationsData?.data ?? []

  const filteredRecords = notificationsArr.filter((item: Notification) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.notificationsList.id,
        header: headerKeys.notificationsList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.notificationsList.title,
        header: headerKeys.notificationsList.title,
        cell: ({ row }: { row: { original: Notification } }) => (
          <span className={!row.original.is_read ? 'font-semibold' : ''}>
            {row.original.title}
          </span>
        ),
      },
      {
        accessorKey: accessorkeys.notificationsList.message,
        header: headerKeys.notificationsList.message,
      },
      {
        accessorKey: accessorkeys.notificationsList.isRead,
        header: headerKeys.notificationsList.isRead,
        cell: ({ row }: { row: { original: Notification } }) => {
          const key = row.original.is_read ? 'read' : 'unread'
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badgeMaps[key as keyof typeof badgeMaps]?.className}`}>
              {badgeMaps[key as keyof typeof badgeMaps]?.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.notificationsList.createdAt,
        header: headerKeys.notificationsList.createdAt,
        cell: ({ row }: { row: { original: Notification } }) =>
          new Date(row.original.created_at).toLocaleString(),
      },
      {
        accessorKey: accessorkeys.notificationsList.actions,
        header: headerKeys.notificationsList.actions,
        cell: ({ row }: { row: { original: Notification } }) => (
          <div className="flex justify-end gap-2">
            {!row.original.is_read && (
              <button
                className="btn btn-sub-gray btn-sm"
                onClick={() => markAsRead(row.original.notification_id)}>
                Mark Read
              </button>
            )}
          </div>
        ),
      },
    ],
    [markAsRead]
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Notifications" subTitle="Notifications" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search Notification"
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
                  className="btn btn-gray shrink-0"
                  onClick={() => markAllAsRead()}>
                  <CheckCheck className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                  Mark All Read
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

export default NotificationsList
