export interface ErrorResponse {
  success: false
  error: string
}

export interface SuccessResponse<T = any> {
  success: true
  data: T
  message?: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
  }
  message?: string
}
