export interface AuditLog {
  _id: string
  user_id: string
  user_name: string
  user_role: string
  action: string
  resource: string
  resource_id?: string
  details?: Record<string, unknown>
  ip_address?: string
  created_at: string
}

export interface AuditLogListResponse {
  success: boolean
  data: AuditLog[]
  message: string
}

export interface AuditLogDetailsResponse {
  success: boolean
  data: AuditLog
  message: string
}

export interface AuditLogFilters {
  action?: string
  user_id?: string
  from_date?: string
  to_date?: string
}
