import { UserRoles } from '@src/shared/constants/enums'

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

export interface Admin {
  _id: string
  username: string
  email: string
  phone_number: string
  admin_role: UserRoles
  is_active: boolean
  created_at: string
  updated_at: string
  last_login: string
}

export interface VerifyTokenResponse {
  success: boolean
  data: {
    adminId: string
    role: UserRoles
    tokenValid: boolean
  }
}

// Admin Entity for List
export interface AdminListItem {
  _id: string
  username: string
  email: string
  phone_number: string
  admin_role: UserRoles
  is_active: boolean
  created_at: string
  updated_at: string
  last_login: string
}

export interface AdminListResponse {
  success: boolean
  data: AdminListItem[]
  message: string
}

export interface AdminDetailsResponse {
  success: boolean
  data: AdminListItem
  message: string
}

export interface CreateAdminRequest {
  username: string
  email: string
  phone_number?: string
  password: string
  admin_role: string
  school_id?: string
}

export interface UpdateAdminRequest {
  _id: string
  username?: string
  email?: string
  phone_number?: string
  admin_role?: string
}
