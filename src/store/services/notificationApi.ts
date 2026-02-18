import {
  NotificationListResponse,
  UnreadCountResponse,
} from '@src/dtos/notification'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import { NEXT_PUBLIC_NOTIFICATIONS_API } from '@utils/url_helper'

import { baseApi } from './baseApi'

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query<NotificationListResponse, void>({
      query: () => ({
        url: NEXT_PUBLIC_NOTIFICATIONS_API,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.NOTIFICATION],
    }),
    getUnreadNotifications: builder.query<NotificationListResponse, void>({
      query: () => ({
        url: `${NEXT_PUBLIC_NOTIFICATIONS_API}/unread`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.NOTIFICATION],
    }),
    getUnreadCount: builder.query<UnreadCountResponse, void>({
      query: () => ({
        url: `${NEXT_PUBLIC_NOTIFICATIONS_API}/unread-count`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.NOTIFICATION],
    }),
    markAsRead: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `${NEXT_PUBLIC_NOTIFICATIONS_API}/${id}/mark-as-read`,
          method: ApiMethods.PUT,
        }),
        invalidatesTags: [AuthTags.NOTIFICATION],
      }
    ),
    markAllAsRead: builder.mutation<{ success: boolean; message: string }, void>(
      {
        query: () => ({
          url: `${NEXT_PUBLIC_NOTIFICATIONS_API}/mark-all-as-read`,
          method: ApiMethods.PUT,
        }),
        invalidatesTags: [AuthTags.NOTIFICATION],
      }
    ),
  }),
})

export const {
  useGetNotificationsQuery,
  useGetUnreadNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
} = notificationApi
