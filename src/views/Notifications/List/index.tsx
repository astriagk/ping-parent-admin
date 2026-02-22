'use client'

import React, { useMemo } from 'react'

import { Notification } from '@src/dtos/notification'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import {
  useGetNotificationsQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
} from '@src/store/services/notificationApi'
import { CheckCheck } from 'lucide-react'

const NotificationsList = () => {
  const { data: notificationsData } = useGetNotificationsQuery()
  const [markAsRead] = useMarkAsReadMutation()
  const [markAllAsRead] = useMarkAllAsReadMutation()

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.title,
        header: headerKeys.title,
        cell: ({ row }: { row: { original: Notification } }) => (
          <span className={!row.original.is_read ? 'font-semibold' : ''}>
            {row.original.title}
          </span>
        ),
      },
      { accessorKey: accessorkeys.message, header: headerKeys.message },
      {
        accessorKey: accessorkeys.isRead,
        header: headerKeys.isRead,
        cell: ({ row }: { row: { original: Notification } }) => (
          <span
            className={`badge ${row.original.is_read ? 'badge-gray' : 'badge-blue'}`}>
            {row.original.is_read ? 'Read' : 'Unread'}
          </span>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }: { row: { original: Notification } }) =>
          new Date(row.original.created_at).toLocaleString(),
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: Notification } }) => (
          <div className="flex justify-end gap-2">
            {!row.original.is_read && (
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  markAsRead(row.original.notification_id)
                }>
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
            <div className="flex flex-wrap justify-end gap-5">
              <button
                className="btn btn-gray shrink-0"
                onClick={() => markAllAsRead()}>
                <CheckCheck className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                Mark All as Read
              </button>
            </div>
          </div>
          <div className="pt-4 card-body">
            <DatatablesHover
              columns={columns}
              data={notificationsData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default NotificationsList
