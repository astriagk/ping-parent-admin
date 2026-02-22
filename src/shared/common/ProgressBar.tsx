'use client'

import { useEffect } from 'react'

import { usePathname, useSearchParams } from 'next/navigation'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({
  showSpinner: false,
  speed: 200,
  minimum: 0.1,
  easing: 'ease',
  trickleSpeed: 200,
})

export default function ProgressBar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Stop the bar whenever the route finishes changing
  useEffect(() => {
    NProgress.done()
  }, [pathname, searchParams])

  // Handle <a> tag clicks (sidebar links, etc.)
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const anchor = target.closest('a')

      if (anchor && anchor.href) {
        const currentUrl = window.location.href
        const targetUrl = anchor.href

        if (
          targetUrl !== currentUrl &&
          targetUrl.startsWith(window.location.origin)
        ) {
          NProgress.start()
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [])

  // Handle programmatic navigation via router.push() by patching history.pushState
  useEffect(() => {
    const originalPushState = history.pushState.bind(history)

    history.pushState = (...args: Parameters<typeof history.pushState>) => {
      NProgress.start()
      return originalPushState(...args)
    }

    return () => {
      history.pushState = originalPushState
    }
  }, [])

  return null
}
