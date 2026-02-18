import { TripDetailsResponse, TripFilters, TripListResponse } from '@src/dtos/trip'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import { NEXT_PUBLIC_TRIPS_API } from '@utils/url_helper'

import { baseApi } from './baseApi'

export const tripApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTripList: builder.query<TripListResponse, TripFilters | void>({
      query: (filters) => {
        const params = new URLSearchParams()
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value)
          })
        }
        const qs = params.toString()
        return {
          url: qs ? `${NEXT_PUBLIC_TRIPS_API}?${qs}` : NEXT_PUBLIC_TRIPS_API,
          method: ApiMethods.GET,
        }
      },
      providesTags: [AuthTags.TRIP],
    }),
    getTripDetails: builder.query<TripDetailsResponse, string>({
      query: (id) => ({
        url: `/trips/${id}`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.TRIP],
    }),
  }),
})

export const { useGetTripListQuery, useGetTripDetailsQuery } = tripApi
