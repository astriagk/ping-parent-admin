import {
  AuditLogDetailsResponse,
  AuditLogFilters,
  AuditLogListResponse,
} from '@src/dtos/auditLog'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import { NEXT_PUBLIC_AUDIT_LOGS_API } from '@utils/url_helper'

import { baseApi } from './baseApi'

export const auditLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAuditLogs: builder.query<AuditLogListResponse, AuditLogFilters | void>({
      query: (filters) => {
        const params = new URLSearchParams()
        if (filters) {
          Object.entries(filters).forEach(([key, value]) => {
            if (value) params.set(key, value)
          })
        }
        const qs = params.toString()
        return {
          url: qs
            ? `${NEXT_PUBLIC_AUDIT_LOGS_API}?${qs}`
            : NEXT_PUBLIC_AUDIT_LOGS_API,
          method: ApiMethods.GET,
        }
      },
      providesTags: [AuthTags.AUDIT_LOG],
    }),
    getAuditLogDetails: builder.query<AuditLogDetailsResponse, string>({
      query: (id) => ({
        url: `${NEXT_PUBLIC_AUDIT_LOGS_API}/${id}`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.AUDIT_LOG],
    }),
  }),
})

export const { useGetAuditLogsQuery, useGetAuditLogDetailsQuery } = auditLogApi
