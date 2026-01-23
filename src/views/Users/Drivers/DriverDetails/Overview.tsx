'use client'

import React from 'react'

import Image from 'next/image'

import avatar5 from '@assets/images/avatar/user-5.png'
import { DriverDetails } from '@src/dtos/driver'
import { ApprovalStatusType, UserRolesType } from '@src/shared/constants/enums'
import { formatDate } from '@src/utils/dateFormatter'
import { formatAddress } from '@src/utils/formatAddress'
import { MessagesSquare, Pencil, Phone } from 'lucide-react'

const Overview = ({
  driverDetails,
  isLoading,
  error,
}: {
  driverDetails: DriverDetails | undefined
  isLoading: boolean
  error: any
}) => {
  return (
    <React.Fragment>
      <div className="col-span-12 card">
        <div className="card-body">
          <div className="flex flex-wrap gap-5">
            <div className="shrink-0">
              <Image
                src={driverDetails?.photo_url ?? avatar5}
                alt={driverDetails?.name || 'Driver Avatar'}
                width={160}
                height={160}
                className="rounded-md size-40"
              />
            </div>
            <div className="grow">
              <h6 className="mb-1 text-16">{driverDetails?.name}</h6>
              <div className="overflow-x-auto">
                <div className="flex flex-wrap gap-3 item-center *:flex *:items-center">
                  <p>
                    <i className="ltr:mr-1 rtl:ml-1 ri-briefcase-line"></i>
                    <span className="text-gray-500 dark:text-dark-500">
                      {driverDetails?.user?.user_type &&
                        UserRolesType[
                          driverDetails.user?.user_type as keyof typeof UserRolesType
                        ]}
                    </span>
                  </p>
                  <p>
                    <i className="ltr:mr-1 rtl:ml-1 ri-map-pin-2-line"></i>
                    <span className="text-gray-500 dark:text-dark-500">
                      {driverDetails?.addresses?.city},{' '}
                      {driverDetails?.addresses?.state}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap items-center mt-5 gap-space">
                  <div className="p-4 text-center border border-gray-200 border-dashed rounded-md dark:border-dark-800 w-36 shrink-0">
                    <h4 className="mb-1">
                      {formatDate(driverDetails?.created_at)}
                    </h4>
                    <p className="text-gray-500 dark:text-dark-500">
                      Joined Date
                    </p>
                  </div>
                  <div className="p-4 text-center border border-gray-200 border-dashed rounded-md dark:border-dark-800 w-36 shrink-0">
                    <h4 className="mb-1">{driverDetails?.vehicle_capacity}</h4>
                    <p className="text-gray-500 dark:text-dark-500">Capacity</p>
                  </div>
                  <div className="p-4 text-center border border-gray-200 border-dashed rounded-md dark:border-dark-800 w-36 shrink-0">
                    <h4 className="mb-1">{driverDetails?.vehicle_type}</h4>
                    <p className="text-gray-500 dark:text-dark-500">
                      Vehicle Type
                    </p>
                  </div>
                  <div className="p-4 text-center border border-gray-200 border-dashed rounded-md dark:border-dark-800 w-36 shrink-0">
                    <h4 className="mb-1">{driverDetails?.vehicle_number}</h4>
                    <p className="text-gray-500 dark:text-dark-500">
                      Vehicle No.
                    </p>
                  </div>
                  <div className="p-4 text-center border border-gray-200 border-dashed rounded-md dark:border-dark-800 w-36 shrink-0">
                    <h4 className="mb-1">{driverDetails?.total_trips}</h4>
                    <p className="text-gray-500 dark:text-dark-500">
                      Total Trips
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="shrink-0">
              <div className="flex items-center gap-2">
                <button className="btn btn-sub-green btn-icon" title="phone">
                  <Phone className="size-4" />
                </button>
                <button
                  className="btn btn-sub-purple btn-icon"
                  title="messages-square">
                  <MessagesSquare className="size-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 lg:col-span-6 xl:col-span-3">
                <p className="mb-1 text-gray-500 dark:text-dark-500">Status</p>
                <h6>
                  {driverDetails?.approval_status &&
                    ApprovalStatusType[driverDetails.approval_status]}
                </h6>
              </div>
              <div className="col-span-12 lg:col-span-6 xl:col-span-3">
                <p className="mb-1 text-gray-500 dark:text-dark-500">
                  Availability
                </p>
                <h6>
                  {driverDetails?.is_available ? 'Available' : 'Unavailable'}
                </h6>
              </div>
              <div className="col-span-12 lg:col-span-6 xl:col-span-3">
                <p className="mb-1 text-gray-500 dark:text-dark-500">Rating</p>
                <h6>{driverDetails?.rating}</h6>
              </div>
              <div className="col-span-12 lg:col-span-6 xl:col-span-3">
                <p className="mb-1 text-gray-500 dark:text-dark-500">Email</p>
                <h6>{driverDetails?.email}</h6>
              </div>
              <div className="col-span-12 lg:col-span-6 xl:col-span-3">
                <div className="whitespace-normal">
                  <p className="mb-1 text-gray-500 dark:text-dark-500">
                    Full Address
                  </p>
                  <h6>{formatAddress(driverDetails?.addresses)}</h6>

                  <div className="mt-1 text-xs text-gray-500">
                    <span>Latitude: {driverDetails?.addresses?.latitude}</span>
                    <span className="ml-2">
                      Longitude: {driverDetails?.addresses?.longitude}
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-span-12 lg:col-span-6 xl:col-span-3">
                <p className="mb-1 text-gray-500 dark:text-dark-500">
                  Phone Number
                </p>
                <h6>{driverDetails?.user?.phone_number}</h6>
              </div>
              <div className="col-span-12 lg:col-span-6 xl:col-span-3">
                <p className="mb-1 text-gray-500 dark:text-dark-500">
                  Driving License
                </p>
                <h6>{driverDetails?.documents?.driving_license_number}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Overview
