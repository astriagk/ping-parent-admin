import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { AuthTags } from '@src/shared/constants/enums'

export const baseApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== 'undefined') {
        const token = localStorage.getItem('access_token')
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
      }
      return headers
    },
  }),
  tagTypes: [
    AuthTags.AUTH,
    AuthTags.ADMIN,
    AuthTags.DRIVER,
    AuthTags.PARENT,
    AuthTags.SCHOOL,
  ],
  endpoints: () => ({}),
})
