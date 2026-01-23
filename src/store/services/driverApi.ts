import {
  DriverDetailsResponse,
  DriverListResponse,
  UpdateDriverApprovalStatusRequest,
  UpdateDriverApprovalStatusResponse,
} from '@src/dtos/driver'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import {
  NEXT_PUBLIC_DRIVER_DETAILS_API,
  NEXT_PUBLIC_USERS_LIST_API,
} from '@utils/url_helper'

import { baseApi } from './baseApi'

export const driverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriverList: builder.query<
      DriverListResponse,
      { user_type?: string } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params && params.user_type) {
          queryParams.set('user_type', params.user_type)
        }
        return {
          url: `${NEXT_PUBLIC_USERS_LIST_API}?${queryParams.toString()}`,
          method: ApiMethods.GET,
        }
      },
      providesTags: [AuthTags.DRIVER],
    }),
    getDriverDetails: builder.query<DriverDetailsResponse, string>({
      query: (id) => ({
        url: `${NEXT_PUBLIC_DRIVER_DETAILS_API}/${id}/details`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.DRIVER],
    }),
    updateDriverApprovalStatus: builder.mutation<
      UpdateDriverApprovalStatusResponse,
      UpdateDriverApprovalStatusRequest
    >({
      query: ({ id, approval_status, rejection_reason }) => ({
        url: `${NEXT_PUBLIC_DRIVER_DETAILS_API}/${id}/approval-status`,
        method: ApiMethods.PATCH,
        body: { approval_status, rejection_reason },
      }),
      invalidatesTags: [AuthTags.DRIVER],
    }),
  }),
})

export const {
  useGetDriverListQuery,
  useLazyGetDriverListQuery,
  useGetDriverDetailsQuery,
  useLazyGetDriverDetailsQuery,
  useUpdateDriverApprovalStatusMutation,
} = driverApi
