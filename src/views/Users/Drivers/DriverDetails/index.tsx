'use client'

import BannerOne from '@src/shared/components/Banners/BannerOne'
import { useGetDriverDetailsQuery } from '@src/store/services/driverApi'
import { Info } from 'lucide-react'

import Overview from './Overview'
import Reports from './reports'

const DriversDetails = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetDriverDetailsQuery(id)

  // Optionally handle loading and error states here

  return (
    <div>
      <BannerOne
        title="Rejected Documents"
        description="Documents as beeen rejected !"
        icon={<Info className={`text-red-100 fill-red-400/50 size-8`} />}
        color="red"
      />
      <Overview
        driverDetails={data?.data}
        isLoading={isLoading}
        error={error}
      />
      <Reports driverDocuments={data?.data?.documents} id={id} />
    </div>
  )
}

export default DriversDetails
