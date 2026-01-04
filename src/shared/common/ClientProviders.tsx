'use client'

import { ReactNode, useEffect } from 'react'

import StoreProvider from '@src/store/provider'

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  useEffect(() => {
    const htmlElement = document.documentElement
    htmlElement.classList.add('scroll-smooth', 'group')
    return () => {
      htmlElement.classList.remove('scroll-smooth', 'group')
    }
  }, [])

  return <StoreProvider>{children}</StoreProvider>
}
