export interface SchoolDriverItem {
  _id: string
  driver_id: string
  school_id: string
  school_name: string
  name: string
  username: string
  email: string
  phone_number?: string
  approval_status: 'pending' | 'approved' | 'rejected'
  is_active: boolean
  created_at: string
}

export interface SchoolDriverListResponse {
  success: boolean
  data: SchoolDriverItem[]
  message: string
}
