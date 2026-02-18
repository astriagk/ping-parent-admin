export interface Student {
  _id: string
  student_id: string
  name: string
  grade: string
  parent_id: string
  parent_name: string
  school_id: string
  school_name: string
  phone_number?: string
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
