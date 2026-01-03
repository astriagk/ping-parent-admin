# Complete Authentication Example

A complete, production-ready example of implementing authentication with API integration and Redux.

---

## Overview

This example demonstrates:
- Login/Signup with real API endpoints
- JWT token management
- Protected routes
- Redux state management
- Axios interceptors
- Error handling
- Loading states

---

## File Structure

```
src/
├── services/
│   ├── api.ts                        # Base axios instance
│   └── auth.service.ts               # Auth API calls
│
├── slices/
│   └── auth/
│       ├── reducer.ts                # Auth state
│       └── thunk.ts                  # Async actions
│
├── dtos/
│   └── auth.ts                       # Auth types
│
├── views/
│   └── Auth/
│       ├── SignIn/
│       │   └── index.tsx
│       └── SignUp/
│           └── index.tsx
│
├── app/
│   └── auth/
│       ├── signin/page.tsx
│       └── signup/page.tsx
│
└── middleware/
    └── authGuard.tsx                 # Protected route wrapper
```

---

## Step 1: Define Types

```typescript
// src/dtos/auth.ts

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'parent' | 'student';
  avatar?: string;
  createdAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token?: string;
  expires_in: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}
```

---

## Step 2: Create API Service

```typescript
// src/services/api.ts

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Handle 401 Unauthorized
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            { refresh_token: refreshToken }
          );

          const { access_token } = response.data;
          localStorage.setItem('access_token', access_token);

          // Retry original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed - logout user
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/auth/signin';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  }
);

export default api;
```

```typescript
// src/services/auth.service.ts

import api from './api';
import { AuthResponse, LoginRequest, SignupRequest, User } from '@/dtos/auth';

export const authAPI = {
  // Login
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  // Signup
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/signup', data);
    return response.data;
  },

  // Logout
  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  // Get current user
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/auth/me');
    return response.data;
  },

  // Refresh token
  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/refresh', {
      refresh_token: refreshToken,
    });
    return response.data;
  },

  // Forgot password
  forgotPassword: async (email: string): Promise<void> => {
    await api.post('/auth/forgot-password', { email });
  },

  // Reset password
  resetPassword: async (token: string, password: string): Promise<void> => {
    await api.post('/auth/reset-password', { token, password });
  },
};
```

---

## Step 3: Create Redux Slice

```typescript
// src/slices/auth/reducer.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '@/dtos/auth';

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Check if user is stored in localStorage on init
if (typeof window !== 'undefined') {
  const storedUser = localStorage.getItem('user');
  const storedToken = localStorage.getItem('access_token');
  if (storedUser && storedToken) {
    initialState.user = JSON.parse(storedUser);
    initialState.token = storedToken;
    initialState.isAuthenticated = true;
  }
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('user', JSON.stringify(action.payload));
      }
    },

    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('access_token', action.payload);
      }
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },

    clearError: (state) => {
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;

      // Clear localStorage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    },
  },
});

export const {
  setLoading,
  setUser,
  setToken,
  setError,
  clearError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
```

```typescript
// src/slices/auth/thunk.ts

import { createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '@/services/auth.service';
import { LoginRequest, SignupRequest } from '@/dtos/auth';
import { setLoading, setUser, setToken, setError, logout } from './reducer';
import { toast } from 'react-toastify';

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials: LoginRequest, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await authAPI.login(credentials);

      // Store tokens
      dispatch(setToken(response.access_token));
      if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token);
      }

      // Store user
      dispatch(setUser(response.user));

      toast.success('Login successful!');
      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Login failed. Please try again.';
      dispatch(setError(message));
      toast.error(message);
      throw error;
    }
  }
);

export const signupUser = createAsyncThunk(
  'auth/signup',
  async (data: SignupRequest, { dispatch }) => {
    try {
      dispatch(setLoading(true));

      const response = await authAPI.signup(data);

      // Store tokens
      dispatch(setToken(response.access_token));
      if (response.refresh_token) {
        localStorage.setItem('refresh_token', response.refresh_token);
      }

      // Store user
      dispatch(setUser(response.user));

      toast.success('Account created successfully!');
      return response;
    } catch (error: any) {
      const message =
        error.response?.data?.message || 'Signup failed. Please try again.';
      dispatch(setError(message));
      toast.error(message);
      throw error;
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await authAPI.logout();
      dispatch(logout());
      toast.success('Logged out successfully');
    } catch (error: any) {
      // Even if API call fails, logout locally
      dispatch(logout());
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  'auth/getCurrentUser',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const user = await authAPI.getCurrentUser();
      dispatch(setUser(user));
      return user;
    } catch (error: any) {
      dispatch(setError('Failed to fetch user data'));
      dispatch(logout());
      throw error;
    }
  }
);
```

**Register in root reducer:**
```typescript
// src/slices/reducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import Layout from './layout/reducer';
import auth from './auth/reducer'; // Add this

const rootReducer = combineReducers({
  Layout,
  auth, // Add this
});

export default rootReducer;
```

---

## Step 4: Create Login Component

```typescript
// src/views/Auth/SignIn/index.tsx

'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/slices/auth/thunk';
import { LoginRequest } from '@/dtos/auth';
import { Eye, EyeOff, Loader2, Mail, Lock } from 'lucide-react';
import Link from 'next/link';

const SignInView = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, error } = useSelector((state: any) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    try {
      await dispatch(loginUser(data) as any).unwrap();
      // Redirect to dashboard on success
      router.push('/ping-parent/dashboard');
    } catch (error) {
      // Error is already handled in thunk
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 space-y-4">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="text-slate-400" size={18} />
                </div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address',
                    },
                  })}
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white ${
                    errors.email ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="text-slate-400" size={18} />
                </div>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-700 dark:border-slate-600 dark:text-white ${
                    errors.password ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? (
                    <EyeOff className="text-slate-400 hover:text-slate-600" size={18} />
                  ) : (
                    <Eye className="text-slate-400 hover:text-slate-600" size={18} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-primary-500 border-slate-300 rounded focus:ring-primary-500"
                />
                <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">
                  Remember me
                </span>
              </label>
              <Link
                href="/auth/forgot-password"
                className="text-sm text-primary-500 hover:text-primary-600"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 focus:ring-4 focus:ring-primary-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading && <Loader2 className="animate-spin" size={18} />}
              <span>{loading ? 'Signing in...' : 'Sign In'}</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-slate-600 dark:text-slate-400">
            Don't have an account?{' '}
            <Link
              href="/auth/signup"
              className="text-primary-500 hover:text-primary-600 font-medium"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignInView;
```

---

## Step 5: Create Protected Route Wrapper

```typescript
// src/middleware/authGuard.tsx

'use client';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const router = useRouter();
  const { isAuthenticated, loading } = useSelector((state: any) => state.auth);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/auth/signin');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-primary-500" size={40} />
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
};
```

**Use in your protected pages:**
```typescript
// src/app/(layout)/ping-parent/dashboard/page.tsx
import { AuthGuard } from '@/middleware/authGuard';
import PingParentDashboard from '@/views/PingParent/Dashboard';

const PingParentPage = () => {
  return (
    <AuthGuard>
      <PingParentDashboard />
    </AuthGuard>
  );
};

export default PingParentPage;
```

---

## Step 6: Add Logout to Topbar

```typescript
// Update src/layout/Topbar.tsx - Add logout button

import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '@/slices/auth/thunk';
import { LogOut, User } from 'lucide-react';

// Inside your Topbar component:
const dispatch = useDispatch();
const { user } = useSelector((state: any) => state.auth);

const handleLogout = () => {
  dispatch(logoutUser() as any);
};

// In your user menu dropdown:
<div className="flex items-center gap-3 px-4 py-2">
  <User size={20} />
  <div>
    <p className="font-medium">{user?.name}</p>
    <p className="text-xs text-slate-500">{user?.email}</p>
  </div>
</div>

<button
  onClick={handleLogout}
  className="flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-slate-100 dark:hover:bg-slate-700"
>
  <LogOut size={18} />
  <span>Logout</span>
</button>
```

---

## Step 7: Environment Variables

```env
# .env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Ping Parent
```

---

## Usage Example

Now you can use this auth system:

```typescript
// In any component
import { useSelector } from 'react-redux';

const MyComponent = () => {
  const { user, isAuthenticated } = useSelector((state: any) => state.auth);

  if (!isAuthenticated) {
    return <div>Please login</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.name}!</h1>
    </div>
  );
};
```

---

## Testing

### Mock API Responses (for development)

If your backend isn't ready, create a mock:

```typescript
// src/services/auth.service.mock.ts

import { AuthResponse, LoginRequest, SignupRequest } from '@/dtos/auth';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const authAPIMock = {
  login: async (credentials: LoginRequest): Promise<AuthResponse> => {
    await delay(1000); // Simulate network delay

    // Mock validation
    if (credentials.email === 'admin@test.com' && credentials.password === 'password') {
      return {
        user: {
          id: '1',
          email: 'admin@test.com',
          name: 'Admin User',
          role: 'admin',
          createdAt: new Date().toISOString(),
        },
        access_token: 'mock_access_token_12345',
        refresh_token: 'mock_refresh_token_67890',
        expires_in: 3600,
      };
    }

    throw new Error('Invalid credentials');
  },

  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    await delay(1000);

    return {
      user: {
        id: Math.random().toString(),
        email: data.email,
        name: data.name,
        role: 'parent',
        createdAt: new Date().toISOString(),
      },
      access_token: 'mock_access_token_new',
      refresh_token: 'mock_refresh_token_new',
      expires_in: 3600,
    };
  },
};
```

Use in development:
```typescript
// src/services/auth.service.ts
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK_API === 'true';

export const authAPI = USE_MOCK ? authAPIMock : authAPIReal;
```

---

This is a complete, production-ready authentication example you can use and extend!
