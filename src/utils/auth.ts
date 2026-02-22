// Authentication utility functions for token management

const ACCESS_TOKEN_KEY = 'access_token'
const REFRESH_TOKEN_KEY = 'refresh_token'

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

export const clearAuthData = (): void => {
  if (!isBrowser) return

  try {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
  } catch (error) {
    console.error('Error clearing auth data:', error)
  }
}
