'use client'

import { useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { verifyAdminToken } from '@src/store/features/auth'
import { useAppDispatch } from '@src/store/hooks'

import { AUTH_MESSAGES } from '../constants/messages'
import { paths } from './DynamicTitle'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter()
  const pathname = usePathname()
  const dispatch = useAppDispatch()
  const [isVerifying, setIsVerifying] = useState(true)
  const [isValidToken, setIsValidToken] = useState(false)

  const publicRoutes = [paths.AUTH.SIGNIN_BASIC]

  useEffect(() => {
    const checkAuth = async () => {
      const isPublicRoute = publicRoutes.some((route) =>
        pathname?.startsWith(route)
      )

      if (isPublicRoute) {
        setIsVerifying(false)
        setIsValidToken(true)
        return
      }

      try {
        await dispatch(verifyAdminToken()).unwrap()
        setIsValidToken(true)
      } catch (error) {
        router.push(paths.AUTH.SIGNIN_BASIC)
        setIsValidToken(false)
      }

      setIsVerifying(false)
    }

    checkAuth()
  }, [pathname, router, dispatch])

  if (isVerifying) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {AUTH_MESSAGES.LOADING.VERIFYING_AUTH}
          </p>
        </div>
      </div>
    )
  }

  return <>{isValidToken ? children : null}</>
}
