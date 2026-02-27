'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { useVerifyTokenQuery } from '@src/store/services/authApi'

interface RoleGuardProps {
  allowedRoles: string[]
  children: React.ReactNode
}

export default function RoleGuard({ allowedRoles, children }: RoleGuardProps) {
  const router = useRouter()
  const { data: authData, isLoading } = useVerifyTokenQuery()
  const userRole = authData?.data?.role ?? ''

  useEffect(() => {
    if (!isLoading && userRole && !allowedRoles.includes(userRole)) {
      router.replace('/dashboard')
    }
  }, [isLoading, userRole, allowedRoles, router])

  if (isLoading) return null

  if (userRole && !allowedRoles.includes(userRole)) return null

  return <>{children}</>
}
