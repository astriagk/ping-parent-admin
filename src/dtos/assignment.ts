import { AssignmentStatus } from '@src/shared/constants/enums'

export interface DriverStudentAssignment {
  _id: string
  driver_id: string
  driver_name: string
  student_id: string
  student_name: string
  school_id: string
  school_name: string
  assignment_status: AssignmentStatus
  created_at: string
  updated_at: string
}

export interface DriverStudentAssignmentListResponse {
  success: boolean
  data: DriverStudentAssignment[]
  message: string
}

export interface SchoolAssignment {
  _id: string
  driver_id: string
  student_id: string
  school_id: string
  monthly_fee?: number | null
  assignment_status: AssignmentStatus
  assigned_date?: string
  start_date?: string
  assigned_by?: string
  assignment_source?: string
  status?: AssignmentStatus
  parent_name?: string
  driver?: {
    driver_id: string
    name: string
    driver_unique_id: string
    vehicle_type?: string
    vehicle_number?: string
    phone_number?: string
  }
  student?: {
    student_id: string
    student_name: string
    class?: string
    section?: string
  }
  created_at: string
  updated_at: string
}

export interface SchoolAssignmentListResponse {
  success: boolean
  data: SchoolAssignment[]
  message: string
}

export interface CreateAssignmentRequest {
  driver_id: string
  student_id: string
  school_id?: string
}

export interface UpdateAssignmentRequest {
  id: string
  status: string
  rejection_reason?: string
}
