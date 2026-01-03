// Authentication utility functions for token management

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'
const ADMIN_DATA_KEY = 'admin_data'

const isBrowser = typeof window !== 'undefined'

export const setAuthTokens = (
  accessToken: string,
  refreshToken: string
): void => {
  if (!isBrowser) return

  try {
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
  } catch (error) {
    console.error('Error storing auth tokens:', error)
  }
}

export const getAccessToken = (): string | null => {
  if (!isBrowser) return null

  try {
    return localStorage.getItem(ACCESS_TOKEN_KEY)
  } catch (error) {
    console.error('Error getting access token:', error)
    return null
  }
}

export const getRefreshToken = (): string | null => {
  if (!isBrowser) return null

  try {
    return localStorage.getItem(REFRESH_TOKEN_KEY)
  } catch (error) {
    console.error('Error getting refresh token:', error)
    return null
  }
}

export const setAdminData = (adminData: any): void => {
  if (!isBrowser) return

  try {
    localStorage.setItem(ADMIN_DATA_KEY, JSON.stringify(adminData))
  } catch (error) {
    console.error('Error storing admin data:', error)
  }
}

export const getAdminData = (): any | null => {
  if (!isBrowser) return null

  try {
    const data = localStorage.getItem(ADMIN_DATA_KEY)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error('Error getting admin data:', error)
    return null
  }
}

export const clearAuthData = (): void => {
  if (!isBrowser) return

  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(ADMIN_DATA_KEY)
  } catch (error) {
    console.error('Error clearing auth data:', error)
  }
}

export const isAuthenticated = (): boolean => {
  const token = getAccessToken()
  return !!token
}
