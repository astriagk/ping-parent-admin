import {
  ApprovalStatus,
  ApprovalStatusType,
  UserRoles,
} from '@src/shared/constants/enums'

export interface Driver {
  _id: string
  user_id: string
  phone_number: string
  user_type: UserRoles
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface DriverListResponse {
  success: boolean
  data: Driver[]
  message: string
}

export interface DriverDetailsUser {
  phone_number: string
  user_type: UserRoles | string
  is_active: boolean
}

export interface DriverAddress {
  _id: string
  driver_id: string
  address_line1: string
  address_line2: string
  city: string
  state: string
  pincode: string
  latitude: number
  longitude: number
  is_primary: boolean
  created_at: string
  updated_at: string
}

export interface DriverDocuments {
  _id: string
  driver_id: string
  driving_license_number: string
  driving_license_photo_url: string
  vehicle_license_number: string
  vehicle_license_photo_url: string
  insurance_number: string
  insurance_photo_url: string
  created_at: string
  updated_at: string
}

export interface DriverDetails {
  _id: string
  user_id: string
  driver_unique_id: string
  name: string
  email: string
  photo_url: string
  vehicle_type: string
  vehicle_number: string
  vehicle_capacity: number
  current_student_count: number
  approval_status: keyof typeof ApprovalStatusType
  is_available: boolean
  rating: number
  total_trips: number
  created_at: string
  updated_at: string
  approved_at: string
  approved_by: string
  rejection_reason: string | null
  user: DriverDetailsUser
  addresses: DriverAddress
  documents: DriverDocuments
}

export interface DriverDetailsResponse {
  success: boolean
  data: DriverDetails
  message: string
}

export interface UpdateDriverApprovalStatusRequest {
  id: string
  approval_status: ApprovalStatus
  rejection_reason?: string
}

export interface UpdateDriverApprovalStatusResponse {
  success: boolean
  data: DriverDetails
  message: string
}
