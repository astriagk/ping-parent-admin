// Subscription Plans
export interface SubscriptionPlan {
  _id: string
  plan_id: string
  name: string
  description: string
  badge?: 'BEST_VALUE' | 'POPULAR' | 'RECOMMENDED' | 'LIMITED_OFFER'
  plan_type: 'MONTHLY' | 'QUARTERLY' | 'YEARLY'
  pricing_model: 'FLAT' | 'PER_KID' | 'BASE_PLUS_PER_KID'
  base_price: number
  per_kid_price?: number
  max_kids?: number
  features: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface SubscriptionPlanListResponse {
  success: boolean
  data: SubscriptionPlan[]
  message: string
}

export interface CreateSubscriptionPlanRequest {
  name: string
  description: string
  badge?: string
  plan_type: string
  pricing_model: string
  base_price: number
  per_kid_price?: number
  max_kids?: number
  features: string[]
}

// Parent Subscriptions
export interface ParentSubscription {
  _id: string
  subscription_id: string
  parent_id: string
  parent_name: string
  plan_id: string
  plan_name: string
  status: 'active' | 'expired' | 'cancelled'
  amount: number
  currency: string
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface ParentSubscriptionListResponse {
  success: boolean
  data: ParentSubscription[]
  message: string
}

// School Subscriptions
export interface SchoolSubscription {
  _id: string
  subscription_id: string
  school_id: string
  school_name: string
  plan_id: string
  plan_name: string
  status: 'active' | 'expired' | 'cancelled'
  amount: number
  start_date: string
  end_date: string
  created_at: string
  updated_at: string
}

export interface SchoolSubscriptionListResponse {
  success: boolean
  data: SchoolSubscription[]
  message: string
}

export interface CreateSchoolSubscriptionRequest {
  school_id: string
  plan_id: string
  amount: number
}

// Redemption Codes
export interface RedemptionCode {
  _id: string
  code: string
  status: 'available' | 'redeemed'
  subscription_id: string
  school_id: string
  student_id?: string
  student_name?: string
  redeemed_at?: string
  created_at: string
}

export interface RedemptionCodeListResponse {
  success: boolean
  data: RedemptionCode[]
  message: string
}

export interface GenerateCodesRequest {
  subscriptionId: string
  count: number
}
