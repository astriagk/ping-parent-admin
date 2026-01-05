import { UserRoles } from '@src/shared/constants/enums'

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
