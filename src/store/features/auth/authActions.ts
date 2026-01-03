import { Admin } from '@dtos/admin'
import { createAction } from '@reduxjs/toolkit'

export const clearError = createAction('auth/clearError')
export const setAdmin = createAction<Admin>('auth/setAdmin')
export const clearAuthState = createAction('auth/clearAuthState')
export const logout = createAction('auth/logout')
