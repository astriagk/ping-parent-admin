import { DriverListResponse } from '@src/dtos/driver'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import { NEXT_PUBLIC_USERS_LIST_API } from '@utils/url_helper'

import { baseApi } from './baseApi'

export const parentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getParentList: builder.query<
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
      providesTags: [AuthTags.PARENT],
    }),
  }),
})

export const { useGetParentListQuery, useLazyGetParentListQuery } = parentApi
