'use client'

import { useEffect } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { useVerifyTokenQuery } from '@src/store/services/authApi'

import { STORAGE_KEYS } from '../constants/enums'
import { MESSAGES } from '../constants/messages'
import { routeRoles } from '../constants/routeRoles'
import { paths } from './DynamicTitle'

interface AuthGuardProps {
  children: React.ReactNode
}

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">
        {MESSAGES.COMMON.LOADING.VERIFYING_AUTH}
      </p>
    </div>
  </div>
)

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { data, error, isLoading } = useVerifyTokenQuery()

  // Redirect to signin if no token
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN)
      if (!token) {
        router.push(`${paths.AUTH.SIGNIN_BASIC}`)
      }
    }
  }, [router])

  // Redirect to dashboard if user role is not allowed on current route
  useEffect(() => {
    if (data) {
      const userRole = data.data?.role ?? ''
      const allowedRoles = routeRoles[pathname]

      if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
        router.replace('/dashboard')
      }
    }
  }, [data, pathname, router])

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="mt-4 text-gray-600">
            404 | {MESSAGES.COMMON.ERROR.TOKEN_VERIFICATION_FAILED}
          </p>
        </div>
      </div>
    )
  }

  if (data) {
    const userRole = data.data?.role ?? ''
    const allowedRoles = routeRoles[pathname]

    // If user role is not allowed, show loading while redirect happens
    if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
      return <LoadingSpinner />
    }

    return <>{children}</>
  }

  return <LoadingSpinner />
}
