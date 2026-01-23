'use client'

import BannerOne from '@src/shared/components/Banners/BannerOne'
import { ApprovalStatus } from '@src/shared/constants/enums'
import { useGetDriverDetailsQuery } from '@src/store/services/driverApi'
import { Info } from 'lucide-react'

import Overview from './Overview'
import Reports from './reports'
import BreadCrumb from '@src/shared/common/BreadCrumb'

const DriversDetails = ({ id }: { id: string }) => {
  const { data, isLoading, error } = useGetDriverDetailsQuery(id)

  return (
    <div>
      <BreadCrumb title="Driver Details" subTitle="Drivers" />
      <BannerOne
        title="Rejected Documents"
        description="Documents as beeen rejected !"
        icon={<Info className={`text-red-100 fill-red-400/50 size-8`} />}
        color="red"
        show={data?.data?.approval_status === ApprovalStatus.REJECTED}
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
