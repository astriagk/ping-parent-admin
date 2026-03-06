export interface Student {
  _id: string
  student_name: string
  name?: string
  class: string
  grade?: string
  section?: string
  roll_number?: string
  gender?: string
  parent_id: string
  parent_name?: string
  school_id: string
  school_name?: string
  phone_number?: string
  pickup_address_id?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface StudentListResponse {
  success: boolean
  data: Student[]
  message: string
}

export interface StudentDetailsResponse {
  success: boolean
  data: Student
  message: string
}
