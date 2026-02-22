import { AverageRatingResponse, RatingListResponse } from '@src/dtos/rating'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import { NEXT_PUBLIC_RATINGS_REVIEWS_API } from '@utils/url_helper'

import { baseApi } from './baseApi'

export const ratingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriverRatings: builder.query<RatingListResponse, string>({
      query: (driverId) => ({
        url: `${NEXT_PUBLIC_RATINGS_REVIEWS_API}/driver/${driverId}`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.RATING],
    }),
    getDriverAverageRating: builder.query<AverageRatingResponse, string>({
      query: (driverId) => ({
        url: `${NEXT_PUBLIC_RATINGS_REVIEWS_API}/driver/${driverId}/rating`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.RATING],
    }),
    getAllRatings: builder.query<RatingListResponse, void>({
      query: () => ({
        url: NEXT_PUBLIC_RATINGS_REVIEWS_API,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.RATING],
    }),
  }),
})

export const {
  useGetDriverRatingsQuery,
  useGetDriverAverageRatingQuery,
  useGetAllRatingsQuery,
} = ratingApi
