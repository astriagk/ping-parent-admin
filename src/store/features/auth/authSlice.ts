import { Admin, AdminState, LoginResponse } from '@dtos/admin'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
  clearAuthData,
  getAccessToken,
  getRefreshToken,
  setAuthTokens,
} from '@utils/auth'

import { clearAuthState, clearError, logout, setAdmin } from './authActions'
import { loginAdmin, verifyAdminToken } from './authThunks'

const initialState: AdminState = {
  admin: null,
  access_token: getAccessToken(),
  refresh_token: getRefreshToken(),
  isLoading: false,
  error: null,
  isAuthenticated: !!getAccessToken(),
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Synchronous actions
    builder
      .addCase(clearError, (state) => {
        state.error = null
      })
      .addCase(setAdmin, (state, action: PayloadAction<Admin>) => {
        state.admin = action.payload
        state.isAuthenticated = true
      })
      .addCase(clearAuthState, (state) => {
        state.admin = null
        state.access_token = null
        state.refresh_token = null
        state.isAuthenticated = false
        state.error = null
        clearAuthData()
      })
      .addCase(logout, (state) => {
        state.admin = null
        state.access_token = null
        state.refresh_token = null
        state.isAuthenticated = false
        state.error = null
        clearAuthData()
      })

    // Asynchronous actions (thunks)
    builder
      .addCase(loginAdmin.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(
        loginAdmin.fulfilled,
        (state, action: PayloadAction<LoginResponse>) => {
          state.isLoading = false
          state.admin = action.payload.data.admin
          state.access_token = action.payload.data.access_token
          state.refresh_token = action.payload.data.refresh_token
          state.isAuthenticated = true
          state.error = null

          setAuthTokens(
            action.payload.data.access_token,
            action.payload.data.refresh_token
          )
        }
      )
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
      })

    // Verify token thunk
    builder
      .addCase(verifyAdminToken.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verifyAdminToken.fulfilled, (state) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.error = null
      })
      .addCase(verifyAdminToken.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload as string
        state.isAuthenticated = false
        state.admin = null
        state.access_token = null
        state.refresh_token = null
        clearAuthData()
      })
  },
})

export default authSlice.reducer
