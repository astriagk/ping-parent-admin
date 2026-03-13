'use client'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import BannerOne from '@src/shared/components/Banners/BannerOne'
import { ApprovalStatus } from '@src/shared/constants/enums'
import { useGetDriverDetailsQuery } from '@src/store/services/driverApi'
import { Info } from 'lucide-react'

import Overview from './Overview'
import Reports from './reports'

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
      <Reports
        driverDocuments={data?.data?.documents}
        id={id}
        approvalStatus={
          data?.data?.approval_status as ApprovalStatus | undefined
        }
      />
    </div>
  )
}

export default DriversDetails
