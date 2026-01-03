'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { changeSettingModalOpen } from '@src/slices/layout/reducer'
import { AppDispatch } from '@src/slices/reducer'
import { useDispatch } from 'react-redux'

import DashboardsPage from './(layout)/dashboards/ecommerce/page'
import Layout from './(layout)/layout'

export default function Home(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter()

  useEffect(() => {
    router.push('/dashboards/ecommerce')
    setTimeout(() => {
      dispatch(changeSettingModalOpen(true))
    }, 1000)
  }, [router, dispatch])

  return (
    <main>
      <Layout>
        <DashboardsPage />
      </Layout>
    </main>
  )
}
