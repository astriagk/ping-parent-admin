// Payment List Response
export interface Payment {
  _id: string
  user_id: string
  subscription_id: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  razorpay_order_id?: string
  razorpay_payment_id?: string
  razorpay_signature?: string
  created_at: string
  updated_at: string
}

export interface PaymentListResponse {
  success: boolean
  data: Payment[]
  message: string
}

// Payment Details Response
export interface PaymentDetails {
  _id: string
  user_id: string
  subscription_id: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed'
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
  subscription_name: string
  payment_method: string
  transaction_date: string
  created_at: string
  updated_at: string
}

export interface PaymentDetailsResponse {
  success: boolean
  data: PaymentDetails
  message: string
}

// Razorpay Config Response
export interface RazorpayConfig {
  keyId: string
  currency: string
  timeout?: number
}

export interface RazorpayConfigResponse {
  success: boolean
  data: RazorpayConfig
  message: string
}

// Order Creation Request
export interface CreateOrderRequest {
  amount: number
  currency?: string
  subscription_id?: string
  description?: string
}

// Order Creation Response
export interface Order {
  id: string
  entity: string
  amount: number
  amount_paid: number
  amount_due: number
  currency: string
  receipt: string
  status: string
  attempts: number
  notes?: Record<string, any>
  created_at: number
}

export interface CreateOrderResponse {
  success: boolean
  data: Order
  message: string
}

// Payment Verification Request
export interface VerifyPaymentRequest {
  razorpay_order_id: string
  razorpay_payment_id: string
  razorpay_signature: string
  payment_id: string
}

// Payment Verification Response
export interface VerifyPaymentResponse {
  success: boolean
  data: {
    payment_id: string
    order_id: string
    status: string
    verified: boolean
  }
  message: string
  error?: string
}
