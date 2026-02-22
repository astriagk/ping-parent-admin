'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import AdminsListPage from './(layout)/admins/list/page'
import Layout from './(layout)/layout'

export default function Home(): JSX.Element {
  const router = useRouter()

  useEffect(() => {
    router.push('/admins/list')
  }, [router])

  return (
    <main>
      <Layout>
        <AdminsListPage />
      </Layout>
    </main>
  )
}
