import { createAsyncThunk } from '@reduxjs/toolkit'
import { AdminListResponse } from '@src/dtos/admin'
import { MESSAGES } from '@src/shared/constants/messages'
import { ADMIN_LIST } from '@src/store/actionTypes'
import { handleAsyncThunkApi } from '@src/utils/asyncThunkHandler'
import api from '@utils/axios_api'
import { NEXT_PUBLIC_ADMIN_LIST_API } from '@utils/url_helper'

export const fetchAdminList = createAsyncThunk<
  AdminListResponse,
  void,
  { rejectValue: string }
>(ADMIN_LIST, async (_, { rejectWithValue }) => {
  const url = `${NEXT_PUBLIC_ADMIN_LIST_API}`

  return handleAsyncThunkApi(
    () => api.get(url),
    rejectWithValue,
    MESSAGES.ADMIN.ERROR.FETCH_LIST_FAILED
  )
})
