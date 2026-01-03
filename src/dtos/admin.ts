import { UserRolesType } from '@src/components/constants/enums'

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

export interface LoginErrorResponse {
  success: false
  error: string
}

export interface VerifyTokenResponse {
  success: boolean
  data: {
    adminId: string
    role: UserRolesType
    tokenValid: boolean
  }
}

export interface VerifyTokenErrorResponse {
  success: false
  error: string
}

export interface AdminState {
  admin: Admin | null
  access_token: string | null
  refresh_token: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}
