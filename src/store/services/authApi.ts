import { LoginPayload, LoginResponse, VerifyTokenResponse } from '@dtos/admin'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import {
  NEXT_PUBLIC_ADMIN_LOGIN_API,
  NEXT_PUBLIC_ADMIN_VERIFY_TOKEN_API,
} from '@utils/url_helper'

import { baseApi } from './baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (credentials) => ({
        url: NEXT_PUBLIC_ADMIN_LOGIN_API,
        method: ApiMethods.POST,
        body: credentials,
      }),
      invalidatesTags: [AuthTags.AUTH],
    }),
    verifyToken: builder.query<VerifyTokenResponse, void>({
      query: () => ({
        url: NEXT_PUBLIC_ADMIN_VERIFY_TOKEN_API,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.AUTH],
    }),
  }),
})

export const { useLoginMutation, useVerifyTokenQuery } = authApi
