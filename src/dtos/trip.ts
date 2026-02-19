import { TripStatus } from '@src/shared/constants/enums'

export interface Trip {
  _id: string
  trip_id: string
  driver_id: string
  driver_name: string
  school_id: string
  school_name: string
  trip_status: TripStatus
  trip_type: 'pickup' | 'drop'
  total_distance: number
  trip_date: string
  students_count: number
  start_time?: string
  end_time?: string
  created_at: string
  updated_at: string
}

export interface TripListResponse {
  success: boolean
  data: Trip[]
  message: string
}

export interface TripDetailsResponse {
  success: boolean
  data: Trip & {
    students: Array<{
      student_id: string
      name: string
      pickup_status: string
      drop_status: string
    }>
    tracking_history: Array<{
      lat: number
      lng: number
      timestamp: string
    }>
  }
  message: string
}

export interface TripFilters {
  status?: string
  trip_type?: string
  driver_id?: string
  school_id?: string
  from_date?: string
  to_date?: string
}
