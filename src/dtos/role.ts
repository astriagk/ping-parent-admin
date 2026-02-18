export interface Role {
  _id: string
  role_id: string
  name: string
  description: string
  permissions: string[]
  is_system: boolean
  created_at: string
  updated_at: string
}

export interface RoleListResponse {
  success: boolean
  data: Role[]
  message: string
}

export interface RoleDetailsResponse {
  success: boolean
  data: Role
  message: string
}

export interface CreateRoleRequest {
  name: string
  description: string
  permissions: string[]
}

export interface UpdateRoleRequest {
  id: string
  name?: string
  description?: string
  permissions?: string[]
}
