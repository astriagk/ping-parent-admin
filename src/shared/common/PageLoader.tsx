'use client'

import { useEffect, useState } from 'react'

import NProgress from 'nprogress'

export default function PageLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    NProgress.start()

    const timer = setTimeout(() => {
      NProgress.done()
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return null
}
