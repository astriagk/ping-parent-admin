import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AdminListItem } from '@src/dtos/admin'

import { fetchAdminList } from './adminThunks'

interface AdminState {
  admins: AdminListItem[]
  currentAdmin: AdminListItem | null
  isLoading: boolean
  error: string | null
}

const initialState: AdminState = {
  admins: [],
  currentAdmin: null,
  isLoading: false,
  error: null,
}

// Helper functions for state mutations
const setLoadingState = (state: AdminState) => {
  state.isLoading = true
  state.error = null
}

const setErrorState = (state: AdminState, error: string) => {
  state.isLoading = false
  state.error = error
}

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null
    },
    setCurrentAdmin: (
      state,
      action: PayloadAction<AdminListItem | null>
    ) => {
      state.currentAdmin = action.payload
    },
    clearAdminList: (state) => {
      state.admins = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAdminList.pending, (state) => {
        setLoadingState(state)
      })
      .addCase(fetchAdminList.fulfilled, (state, action) => {
        state.admins = action.payload.data || []
        state.isLoading = false
        state.error = null
      })
      .addCase(fetchAdminList.rejected, (state, action) => {
        setErrorState(state, action.payload as string)
      })
  },
})

export const { clearError, setCurrentAdmin, clearAdminList } =
  adminSlice.actions

export default adminSlice.reducer
