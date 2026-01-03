import { RootState } from '@src/store'

const authState = (state: RootState) => state.Auth

export const selectAuth = authState
export const selectAdmin = (state: RootState) => authState(state).admin
export const selectIsAuthenticated = (state: RootState) => authState(state).isAuthenticated
export const selectAuthLoading = (state: RootState) => authState(state).isLoading
export const selectAuthError = (state: RootState) => authState(state).error
export const selectAccessToken = (state: RootState) => authState(state).access_token
export const selectRefreshToken = (state: RootState) => authState(state).refresh_token
