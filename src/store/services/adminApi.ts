import { AdminListResponse } from '@src/dtos/admin'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import { NEXT_PUBLIC_ADMIN_LIST_API } from '@utils/url_helper'

import { baseApi } from './baseApi'

export const adminApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAdminList: builder.query<AdminListResponse, void | void>({
      query: () => {
        const queryParams = new URLSearchParams()
        return {
          url: `${NEXT_PUBLIC_ADMIN_LIST_API}?${queryParams.toString()}`,
          method: ApiMethods.GET,
        }
      },
      providesTags: [AuthTags.ADMIN],
    }),
  }),
})

export const { useGetAdminListQuery, useLazyGetAdminListQuery } = adminApi
