import { LoginPayload, LoginResponse, VerifyTokenResponse } from '@dtos/admin'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { AUTH_MESSAGES } from '@src/components/constants/messages'
import { getAccessToken } from '@utils/auth'
import api from '@utils/axios_api'
import {
  NEXT_PUBLIC_ADMIN_LOGIN_API,
  NEXT_PUBLIC_ADMIN_VERIFY_TOKEN_API,
} from '@utils/url_helper'

import { handleAsyncThunkApi } from '../../../utils/asyncThunkHandler'

export const loginAdmin = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  return handleAsyncThunkApi(
    () => api.post(NEXT_PUBLIC_ADMIN_LOGIN_API, credentials),
    rejectWithValue,
    AUTH_MESSAGES.ERROR.LOGIN_FAILED
  )
})

/**
 * Verify admin token thunk
 */
export const verifyAdminToken = createAsyncThunk<
  VerifyTokenResponse,
  void,
  { rejectValue: string }
>('auth/verifyToken', async (_, { rejectWithValue }) => {
  const token = getAccessToken()

  if (!token) {
    return rejectWithValue(AUTH_MESSAGES.ERROR.TOKEN_NOT_FOUND)
  }

  return handleAsyncThunkApi(
    () => api.get(NEXT_PUBLIC_ADMIN_VERIFY_TOKEN_API),
    rejectWithValue,
    AUTH_MESSAGES.ERROR.TOKEN_VERIFICATION_FAILED
  )
})
