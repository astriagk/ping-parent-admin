import { LoginPayload, LoginResponse, VerifyTokenResponse } from '@dtos/admin'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { MESSAGES } from '@src/components/constants/messages'
import { AUTH_LOGIN, AUTH_VERIFY_TOKEN } from '@src/store/actionTypes'
import { handleAsyncThunkApi } from '@src/utils/asyncThunkHandler'
import { getAccessToken } from '@utils/auth'
import api from '@utils/axios_api'
import {
  NEXT_PUBLIC_ADMIN_LOGIN_API,
  NEXT_PUBLIC_ADMIN_VERIFY_TOKEN_API,
} from '@utils/url_helper'

export const loginAdmin = createAsyncThunk<
  LoginResponse,
  LoginPayload,
  { rejectValue: string }
>(AUTH_LOGIN, async (credentials, { rejectWithValue }) => {
  return handleAsyncThunkApi(
    () => api.post(NEXT_PUBLIC_ADMIN_LOGIN_API, credentials),
    rejectWithValue,
    MESSAGES.AUTH.ERROR.LOGIN_FAILED
  )
})

export const verifyAdminToken = createAsyncThunk<
  VerifyTokenResponse,
  void,
  { rejectValue: string }
>(AUTH_VERIFY_TOKEN, async (_, { rejectWithValue }) => {
  const token = getAccessToken()

  if (!token) {
    return rejectWithValue(MESSAGES.COMMON.ERROR.NO_AUTH_TOKEN)
  }

  return handleAsyncThunkApi(
    () => api.get(NEXT_PUBLIC_ADMIN_VERIFY_TOKEN_API),
    rejectWithValue,
    MESSAGES.COMMON.ERROR.TOKEN_VERIFICATION_FAILED
  )
})
