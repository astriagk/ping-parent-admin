export interface Rating {
  _id: string
  rating_id: string
  driver_id: string
  driver_name: string
  parent_id: string
  parent_name: string
  rating: number
  review: string
  trip_id?: string
  created_at: string
  updated_at: string
}

export interface RatingListResponse {
  success: boolean
  data: Rating[]
  message: string
}

export interface AverageRatingResponse {
  success: boolean
  data: {
    driver_id: string
    average_rating: number
    total_reviews: number
  }
  message: string
}
