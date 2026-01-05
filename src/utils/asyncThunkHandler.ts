/**
 * Utility for handling async thunk errors consistently
 * Extracts error messages from API responses and provides fallback messages
 */
export const handleAsyncThunkError = (
  error: any,
  fallbackMessage: string
): string => {
  if (error.response?.data?.error) {
    return error.response.data.error
  }
  return error.message || fallbackMessage
}

/**
 * Generic API call wrapper for async thunks
 * Handles success/error responses consistently
 */
export const handleAsyncThunkApi = async <T>(
  apiCall: () => Promise<{ data: T }>,
  rejectWithValue: (value: string) => any,
  errorMessage: string
): Promise<T | ReturnType<typeof rejectWithValue>> => {
  try {
    const response = await apiCall()

    if (response.data) {
      return response.data
    }
    console.log(errorMessage)
    return rejectWithValue(errorMessage)
  } catch (error: any) {
    console.log(error, errorMessage)
    return rejectWithValue(handleAsyncThunkError(error, errorMessage))
  }
}
