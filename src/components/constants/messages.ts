// Authentication Messages

export const AUTH_MESSAGES = {
  // Validation Messages
  VALIDATION: {
    EMAIL_PASSWORD_REQUIRED: 'Email and password are required.',
    EMAIL_REQUIRED: 'Email is required.',
    PASSWORD_REQUIRED: 'Password is required.',
    INVALID_EMAIL: 'Please enter a valid email address.',
    PASSWORD_MIN_LENGTH: 'Password must be at least 8 characters.',
  },

  // Success Messages
  SUCCESS: {
    LOGIN_SUCCESS: 'Login successful!',
    LOGOUT_SUCCESS: 'Logged out successfully.',
    TOKEN_VERIFIED: 'Session verified successfully.',
    PASSWORD_RESET_SENT: 'Password reset link sent to your email.',
    PASSWORD_CHANGED: 'Password changed successfully.',
  },

  // Error Messages
  ERROR: {
    LOGIN_FAILED: 'Login failed. Please try again.',
    INVALID_CREDENTIALS: 'Invalid email or password.',
    TOKEN_EXPIRED: 'Your session has expired. Please login again.',
    TOKEN_INVALID: 'Invalid or expired token.',
    TOKEN_NOT_FOUND: 'No token found. Please login.',
    TOKEN_VERIFICATION_FAILED: 'Token verification failed.',
    NETWORK_ERROR: 'Network error. Please check your connection.',
    SERVER_ERROR: 'Server error. Please try again later.',
    UNAUTHORIZED: 'Unauthorized access. Please login.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.',
    GENERIC_ERROR: 'An error occurred. Please try again.',
  },

  // Loading Messages
  LOADING: {
    VERIFYING_AUTH: 'Verifying authentication...',
    LOGGING_IN: 'Signing in...',
    LOGGING_OUT: 'Logging out...',
    PROCESSING: 'Processing...',
  },
}

// API Response Messages
export const API_MESSAGES = {
  SUCCESS: {
    DATA_FETCHED: 'Data fetched successfully.',
    DATA_CREATED: 'Data created successfully.',
    DATA_UPDATED: 'Data updated successfully.',
    DATA_DELETED: 'Data deleted successfully.',
  },

  ERROR: {
    DATA_FETCH_FAILED: 'Failed to fetch data.',
    DATA_CREATE_FAILED: 'Failed to create data.',
    DATA_UPDATE_FAILED: 'Failed to update data.',
    DATA_DELETE_FAILED: 'Failed to delete data.',
    VALIDATION_ERROR: 'Validation error. Please check your input.',
    NOT_FOUND: 'Resource not found.',
    FORBIDDEN: 'You do not have permission to perform this action.',
  },
}

// Admin Messages
export const ADMIN_MESSAGES = {
  SUCCESS: {
    ADMIN_CREATED: 'Admin created successfully.',
    ADMIN_UPDATED: 'Admin updated successfully.',
    ADMIN_DELETED: 'Admin deleted successfully.',
    ROLE_UPDATED: 'Admin role updated successfully.',
    STATUS_UPDATED: 'Admin status updated successfully.',
  },

  ERROR: {
    ADMIN_NOT_FOUND: 'Admin not found.',
    ADMIN_CREATE_FAILED: 'Failed to create admin.',
    ADMIN_UPDATE_FAILED: 'Failed to update admin.',
    ADMIN_DELETE_FAILED: 'Failed to delete admin.',
    DUPLICATE_EMAIL: 'Email already exists.',
    INVALID_ROLE: 'Invalid admin role.',
  },
}
