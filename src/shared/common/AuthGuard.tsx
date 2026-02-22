'use client'

import { useRouter } from 'next/navigation'

import { useVerifyTokenQuery } from '@src/store/services/authApi'

import { MESSAGES } from '../constants/messages'
import { paths } from './DynamicTitle'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const { data, error, isLoading } = useVerifyTokenQuery()

  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('access_token')
    if (!token) {
      router.push(`${paths.AUTH.SIGNIN_BASIC}`)
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {MESSAGES.COMMON.LOADING.VERIFYING_AUTH}
          </p>
        </div>
      </div>
    )
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

  return <>{data ? children : null}</>
}
