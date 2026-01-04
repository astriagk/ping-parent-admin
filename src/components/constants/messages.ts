// Authentication Messages

export const MESSAGES = {
  AUTH: {
    VALIDATION: {
      EMAIL_PASSWORD_REQUIRED: 'Email and password are required.',
    },
    SUCCESS: {
      LOGIN_SUCCESS: 'Login successful!',
    },
    ERROR: {
      LOGIN_FAILED: 'Login failed. Please try again.',
    },
    LOADING: {
      VERIFYING_AUTH: 'Verifying authentication...',
    },
  },
  COMMON: {
    ERROR: {
      NO_AUTH_TOKEN: 'No authentication token found. Please log in.',
      TOKEN_VERIFICATION_FAILED:
        'Token verification failed. Please log in again.',
    },
  },
}
