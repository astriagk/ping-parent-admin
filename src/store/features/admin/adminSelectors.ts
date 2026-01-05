import { RootState } from '@src/store'

const adminState = (state: RootState) => state.Admin

export const selectAdminState = adminState
export const selectAdminList = (state: RootState) => adminState(state).admins
export const selectCurrentAdmin = (state: RootState) =>
  adminState(state).currentAdmin
export const selectAdminLoading = (state: RootState) =>
  adminState(state).isLoading
export const selectAdminError = (state: RootState) => adminState(state).error
