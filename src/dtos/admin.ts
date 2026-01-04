import { UserRolesType } from '@src/components/constants/enums'

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  data: {
    admin: Admin
    access_token: string
    refresh_token: string
  }
  message: string
}

export interface ErrorResponse {
  success: false
  error: string
}

export interface Admin {
  admin_id: string
  username: string
  email: string
  phone_number: string
  admin_role: UserRolesType
  is_active: boolean
  created_at: string
  updated_at: string
  last_login: string
}

export interface VerifyTokenResponse {
  success: boolean
  data: {
    adminId: string
    role: UserRolesType
    tokenValid: boolean
  }
}
