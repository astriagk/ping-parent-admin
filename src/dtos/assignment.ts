export interface DriverStudentAssignment {
  _id: string
  assignment_id: string
  driver_id: string
  driver_name: string
  student_id: string
  student_name: string
  school_id: string
  school_name: string
  status: 'active' | 'inactive' | 'pending' | 'parent_requested' | 'rejected'
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
  assignment_id: string
  school_id: string
  school_name: string
  driver_id: string
  driver_name: string
  status: 'pending' | 'approved' | 'rejected' | 'active'
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
