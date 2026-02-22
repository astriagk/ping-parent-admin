export interface SchoolListItem {
  _id: string
  school_name: string
  address: string
  city: string
  state: string
  latitude: number
  longitude: number
  contact_number: string
  email: string
  principal_name: string
  created_at: string
  updated_at: string
}

export interface SchoolListResponse {
  success: boolean
  data: SchoolListItem[]
  message: string
}

export interface CreateSchoolPayload {
  school_name: string
  address: string
  city: string
  state: string
  latitude: number
  longitude: number
  contact_number: string
  email?: string
  principal_name: string
}

export interface CreateSchoolResponse {
  success: boolean
  data: SchoolListItem
  message: string
}

export interface SchoolDetailsResponse {
  success: boolean
  data: SchoolListItem
  message: string
}

export interface UpdateSchoolPayload {
  school_name?: string
  address?: string
  city?: string
  state?: string
  latitude?: number
  longitude?: number
  contact_number?: string
  email?: string
  principal_name?: string
}

export interface UpdateSchoolResponse {
  success: boolean
  data: SchoolListItem
  message: string
}
