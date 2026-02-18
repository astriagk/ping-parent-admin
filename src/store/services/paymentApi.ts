import {
  CreateOrderRequest,
  CreateOrderResponse,
  PaymentDetailsResponse,
  PaymentListResponse,
  RazorpayConfigResponse,
  VerifyPaymentRequest,
  VerifyPaymentResponse,
} from '@src/dtos/payment'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import {
  NEXT_PUBLIC_ALL_PAYMENTS_API,
  NEXT_PUBLIC_PAYMENT_DETAILS_API,
  NEXT_PUBLIC_RAZORPAY_CONFIG_API,
  NEXT_PUBLIC_RAZORPAY_ORDERS_API,
  NEXT_PUBLIC_RAZORPAY_REFUNDS_API,
  NEXT_PUBLIC_RAZORPAY_VERIFY_API,
} from '@utils/url_helper'

import { baseApi } from './baseApi'

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get Razorpay configuration
    getRazorpayConfig: builder.query<RazorpayConfigResponse, void>({
      query: () => ({
        url: NEXT_PUBLIC_RAZORPAY_CONFIG_API,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.PAYMENT],
    }),

    // Get payment list
    getPaymentList: builder.query<
      PaymentListResponse,
      { status?: string } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams()
        if (params && params.status) {
          queryParams.set('status', params.status)
        }
        return {
          url: `${NEXT_PUBLIC_ALL_PAYMENTS_API}?${queryParams.toString()}`,
          method: ApiMethods.GET,
        }
      },
      providesTags: [AuthTags.PAYMENT],
    }),

    // Get payment details by ID
    getPaymentDetails: builder.query<PaymentDetailsResponse, string>({
      query: (id) => ({
        url: `${NEXT_PUBLIC_PAYMENT_DETAILS_API}/${id}`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.PAYMENT],
    }),

    // Create payment order
    createPaymentOrder: builder.mutation<
      CreateOrderResponse,
      CreateOrderRequest
    >({
      query: (orderData) => ({
        url: NEXT_PUBLIC_RAZORPAY_ORDERS_API,
        method: ApiMethods.POST,
        body: orderData,
      }),
      invalidatesTags: [AuthTags.PAYMENT],
    }),

    // Verify payment
    verifyPayment: builder.mutation<
      VerifyPaymentResponse,
      VerifyPaymentRequest
    >({
      query: (verificationData) => ({
        url: NEXT_PUBLIC_RAZORPAY_VERIFY_API,
        method: ApiMethods.POST,
        body: verificationData,
      }),
      invalidatesTags: [AuthTags.PAYMENT],
    }),

    // Process refund
    processRefund: builder.mutation<
      { success: boolean; message: string },
      { payment_id: string; amount?: number; reason?: string }
    >({
      query: (body) => ({
        url: NEXT_PUBLIC_RAZORPAY_REFUNDS_API,
        method: ApiMethods.POST,
        body,
      }),
      invalidatesTags: [AuthTags.PAYMENT],
    }),
  }),
})

export const {
  useGetRazorpayConfigQuery,
  useLazyGetRazorpayConfigQuery,
  useGetPaymentListQuery,
  useLazyGetPaymentListQuery,
  useGetPaymentDetailsQuery,
  useLazyGetPaymentDetailsQuery,
  useCreatePaymentOrderMutation,
  useVerifyPaymentMutation,
  useProcessRefundMutation,
} = paymentApi
