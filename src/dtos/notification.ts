export interface Notification {
  _id: string
  notification_id: string
  title: string
  message: string
  type: string
  is_read: boolean
  recipient_id: string
  created_at: string
  updated_at: string
}

export interface NotificationListResponse {
  success: boolean
  data: Notification[]
  message: string
}

export interface UnreadCountResponse {
  success: boolean
  data: { count: number }
  message: string
}
