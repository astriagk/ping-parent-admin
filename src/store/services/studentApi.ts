import { StudentListResponse } from '@src/dtos/student'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import { NEXT_PUBLIC_USERS_LIST_API } from '@utils/url_helper'

import { baseApi } from './baseApi'

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getStudentList: builder.query<StudentListResponse, void>({
      query: () => ({
        url: `${NEXT_PUBLIC_USERS_LIST_API}?user_type=student`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.STUDENT],
    }),
  }),
})

export const { useGetStudentListQuery } = studentApi
