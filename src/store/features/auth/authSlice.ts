import { Admin, LoginResponse } from '@dtos/admin'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  clearAuthData,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
} from '@utils/auth'

import { loginAdmin, verifyAdminToken } from './authThunks'

interface AdminState {
  admin: Admin | null
  access_token: string | null
  refresh_token: string | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

const initialState: AdminState = {
  admin: null,
  access_token: getAccessToken(),
  refresh_token: getRefreshToken(),
  isLoading: false,
  error: null,
  isAuthenticated: !!getAccessToken(),
}

// Helper functions for state mutations
const setLoadingState = (state: AdminState) => {
  state.isLoading = true
  state.error = null
}

const setAuthenticatedState = (
  state: AdminState,
  admin: Admin,
  accessToken: string,
  refreshToken: string
) => {
  state.admin = admin
  state.access_token = accessToken
  state.refresh_token = refreshToken
  state.isAuthenticated = true
  state.isLoading = false
  state.error = null
}

const clearAuthenticatedState = (state: AdminState, error?: string) => {
  state.admin = null
  state.access_token = null
  state.refresh_token = null
  state.isAuthenticated = false
  state.isLoading = false
  state.error = error || null
  clearAuthData()
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setAdmin: (state, action: PayloadAction<Admin>) => {
      state.admin = action.payload
      state.isAuthenticated = true
    },
    logout: (state) => {
      clearAuthenticatedState(state)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAdmin.pending, (state) => {
        setLoadingState(state)
      })
      .addCase(
        loginAdmin.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          const { admin, access_token, refresh_token } = action.payload.data
          setAuthenticatedState(state, admin, access_token, refresh_token)
          setAuthTokens(access_token, refresh_token)
        }
      )
      .addCase(loginAdmin.rejected, (state, action) => {
        clearAuthenticatedState(state, action.payload as string)
      })

    builder
      .addCase(verifyAdminToken.pending, (state) => {
        setLoadingState(state)
      })
      .addCase(verifyAdminToken.fulfilled, (state) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(verifyAdminToken.rejected, (state, action) => {
        clearAuthenticatedState(state, action.payload as string)
      })
  },
})

export const { clearError, setAdmin, logout } = authSlice.actions

export default authSlice.reducer
