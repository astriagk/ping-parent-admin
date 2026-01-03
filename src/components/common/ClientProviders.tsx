'use client'

import { ReactNode, useEffect } from 'react'

import store from '@src/slices/reducer'
import { Provider } from 'react-redux'

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

  return <Provider store={store}>{children}</Provider>
}
