import {
  CreateRoleRequest,
  RoleDetailsResponse,
  RoleListResponse,
  UpdateRoleRequest,
} from '@src/dtos/role'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import { NEXT_PUBLIC_ROLES_API } from '@utils/url_helper'

import { baseApi } from './baseApi'

export const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRoleList: builder.query<RoleListResponse, void>({
      query: () => ({
        url: NEXT_PUBLIC_ROLES_API,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.ROLE],
    }),
    getRoleDetails: builder.query<RoleDetailsResponse, string>({
      query: (id) => ({
        url: `${NEXT_PUBLIC_ROLES_API}/${id}`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.ROLE],
    }),
    createRole: builder.mutation<
      { success: boolean; message: string },
      CreateRoleRequest
    >({
      query: (body) => ({
        url: NEXT_PUBLIC_ROLES_API,
        method: ApiMethods.POST,
        body,
      }),
      invalidatesTags: [AuthTags.ROLE],
    }),
    updateRole: builder.mutation<
      { success: boolean; message: string },
      UpdateRoleRequest
    >({
      query: ({ id, ...body }) => ({
        url: `${NEXT_PUBLIC_ROLES_API}/${id}`,
        method: ApiMethods.PUT,
        body,
      }),
      invalidatesTags: [AuthTags.ROLE],
    }),
    deleteRole: builder.mutation<{ success: boolean; message: string }, string>(
      {
        query: (id) => ({
          url: `${NEXT_PUBLIC_ROLES_API}/${id}`,
          method: ApiMethods.DELETE,
        }),
        invalidatesTags: [AuthTags.ROLE],
      }
    ),
  }),
})

export const {
  useGetRoleListQuery,
  useGetRoleDetailsQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi
