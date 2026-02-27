export interface Parent {
  _id: string
  name: string
  phone_number: string
  email?: string
  user_type: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ParentStudent {
  _id: string
  name: string
  grade: string
  school_name: string
  school_id: string
}

export interface ParentSubscription {
  _id: string
  plan_name: string
  plan_type: string
  status: string
  start_date: string
  end_date: string
  amount: number
}

export interface ParentPayment {
  _id: string
  payment_type: string
  amount: number
  currency: string
  payment_method: string
  payment_status: string
  payment_date: string
  transaction_id: string
}

export interface ParentDetails {
  _id: string
  user_id: string
  name: string
  phone_number: string
  email?: string
  user_type: string
  is_active: boolean
  created_at: string
  updated_at: string
  students: ParentStudent[]
  subscriptions: ParentSubscription[]
  payments: ParentPayment[]
}

export interface ParentDetailsResponse {
  success: boolean
  data: ParentDetails
  message: string
}
