import {
  AdminDetailsResponse,
  AdminListResponse,
  CreateAdminRequest,
  UpdateAdminRequest,
} from '@src/dtos/admin'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import {
  NEXT_PUBLIC_ADMIN_LIST_API,
  NEXT_PUBLIC_USERS_LIST_API,
} from '@utils/url_helper'

import { baseApi } from './baseApi'

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminList: builder.query<AdminListResponse, void>({
      query: () => ({
        url: NEXT_PUBLIC_ADMIN_LIST_API,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.ADMIN],
    }),
    getAdminById: builder.query<AdminDetailsResponse, string>({
      query: (adminId) => ({
        url: `${NEXT_PUBLIC_ADMIN_LIST_API}/by-admin-id/${adminId}`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.ADMIN],
    }),
    createAdmin: builder.mutation<
      { success: boolean; message: string },
      CreateAdminRequest
    >({
      query: (body) => ({
        url: NEXT_PUBLIC_ADMIN_LIST_API,
        method: ApiMethods.POST,
        body,
      }),
      invalidatesTags: [AuthTags.ADMIN],
    }),
    updateAdmin: builder.mutation<
      { success: boolean; message: string },
      UpdateAdminRequest
    >({
      query: ({ _id, ...body }) => ({
        url: `${NEXT_PUBLIC_ADMIN_LIST_API}/by-admin-id/${_id}`,
        method: ApiMethods.PUT,
        body,
      }),
      invalidatesTags: [AuthTags.ADMIN],
    }),
    activateAdmin: builder.mutation<{ success: boolean; message: string }, string>({
      query: (adminId) => ({
        url: `${NEXT_PUBLIC_ADMIN_LIST_API}/by-admin-id/${adminId}/activate`,
        method: ApiMethods.PATCH,
      }),
      invalidatesTags: [AuthTags.ADMIN],
    }),
    deactivateAdmin: builder.mutation<{ success: boolean; message: string }, string>({
      query: (adminId) => ({
        url: `${NEXT_PUBLIC_ADMIN_LIST_API}/by-admin-id/${adminId}/deactivate`,
        method: ApiMethods.PATCH,
      }),
      invalidatesTags: [AuthTags.ADMIN],
    }),
    // Shared user actions (parents, drivers, students)
    activateUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (userId) => ({
        url: `${NEXT_PUBLIC_USERS_LIST_API}/${userId}/activate`,
        method: ApiMethods.PATCH,
      }),
      invalidatesTags: [AuthTags.PARENT, AuthTags.DRIVER, AuthTags.STUDENT],
    }),
    deactivateUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (userId) => ({
        url: `${NEXT_PUBLIC_USERS_LIST_API}/${userId}/deactivate`,
        method: ApiMethods.PATCH,
      }),
      invalidatesTags: [AuthTags.PARENT, AuthTags.DRIVER, AuthTags.STUDENT],
    }),
    deleteUser: builder.mutation<{ success: boolean; message: string }, string>({
      query: (userId) => ({
        url: `${NEXT_PUBLIC_USERS_LIST_API}/${userId}`,
        method: ApiMethods.DELETE,
      }),
      invalidatesTags: [AuthTags.PARENT, AuthTags.DRIVER, AuthTags.STUDENT],
    }),
  }),
})

export const {
  useGetAdminListQuery,
  useLazyGetAdminListQuery,
  useGetAdminByIdQuery,
  useLazyGetAdminByIdQuery,
  useCreateAdminMutation,
  useUpdateAdminMutation,
  useActivateAdminMutation,
  useDeactivateAdminMutation,
  useActivateUserMutation,
  useDeactivateUserMutation,
  useDeleteUserMutation,
} = adminApi
