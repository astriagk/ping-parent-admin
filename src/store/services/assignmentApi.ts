import {
  CreateAssignmentRequest,
  DriverStudentAssignmentListResponse,
  SchoolAssignmentListResponse,
  UpdateAssignmentRequest,
} from '@src/dtos/assignment'
import { ApiMethods, AuthTags } from '@src/shared/constants/enums'
import {
  NEXT_PUBLIC_DRIVER_STUDENT_ASSIGNMENTS_API,
  NEXT_PUBLIC_SCHOOL_ASSIGNMENTS_API,
} from '@utils/url_helper'

import { baseApi } from './baseApi'

export const assignmentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDriverStudentAssignments: builder.query<
      DriverStudentAssignmentListResponse,
      void
    >({
      query: () => ({
        url: NEXT_PUBLIC_DRIVER_STUDENT_ASSIGNMENTS_API,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.ASSIGNMENT],
    }),
    getSchoolAssignments: builder.query<
      SchoolAssignmentListResponse,
      string
    >({
      query: (schoolId) => ({
        url: `${NEXT_PUBLIC_SCHOOL_ASSIGNMENTS_API}/${schoolId}`,
        method: ApiMethods.GET,
      }),
      providesTags: [AuthTags.ASSIGNMENT],
    }),
    createDriverStudentAssignment: builder.mutation<
      { success: boolean; message: string },
      CreateAssignmentRequest
    >({
      query: (body) => ({
        url: '/driver-student-assignments',
        method: ApiMethods.POST,
        body,
      }),
      invalidatesTags: [AuthTags.ASSIGNMENT],
    }),
    updateDriverStudentAssignment: builder.mutation<
      { success: boolean; message: string },
      UpdateAssignmentRequest
    >({
      query: ({ id, ...body }) => ({
        url: `/driver-student-assignments/${id}`,
        method: ApiMethods.PUT,
        body,
      }),
      invalidatesTags: [AuthTags.ASSIGNMENT],
    }),
    approveSchoolAssignment: builder.mutation<
      { success: boolean; message: string },
      string
    >({
      query: (assignmentId) => ({
        url: `${NEXT_PUBLIC_SCHOOL_ASSIGNMENTS_API}/${assignmentId}/approve`,
        method: ApiMethods.POST,
      }),
      invalidatesTags: [AuthTags.ASSIGNMENT],
    }),
    rejectSchoolAssignment: builder.mutation<
      { success: boolean; message: string },
      { assignmentId: string; reason?: string }
    >({
      query: ({ assignmentId, reason }) => ({
        url: `${NEXT_PUBLIC_SCHOOL_ASSIGNMENTS_API}/${assignmentId}/reject`,
        method: ApiMethods.POST,
        body: { reason },
      }),
      invalidatesTags: [AuthTags.ASSIGNMENT],
    }),
  }),
})

export const {
  useGetDriverStudentAssignmentsQuery,
  useGetSchoolAssignmentsQuery,
  useCreateDriverStudentAssignmentMutation,
  useUpdateDriverStudentAssignmentMutation,
  useApproveSchoolAssignmentMutation,
  useRejectSchoolAssignmentMutation,
} = assignmentApi
