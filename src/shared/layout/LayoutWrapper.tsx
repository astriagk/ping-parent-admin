'use client'

import { ReactNode, useEffect } from 'react'

import { usePathname } from 'next/navigation'

import Layout from '@src/layout/Layout'

import AuthGuard from '../common/AuthGuard'
import { routes } from '../common/DynamicTitle'

interface LayoutWrapperProps {
  children: ReactNode
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  const pathname = usePathname()
  const route = routes.find((r) => r.path === pathname)

  useEffect(() => {
    document.title = route ? `${route.title} | Ping Parent` : 'Ping Parent'
  }, [route])

  return (
    <AuthGuard>
      <Layout>{children}</Layout>
    </AuthGuard>
  )
}
