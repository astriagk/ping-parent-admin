'use client'

import React, { useMemo } from 'react'

import { Rating } from '@src/dtos/rating'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetAllRatingsQuery } from '@src/store/services/ratingApi'
import { Star } from 'lucide-react'

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex items-center gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        className={`size-4 ${star <= rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
      />
    ))}
    <span className="text-sm ml-1">{rating}/5</span>
  </div>
)

const RatingsReviewsList = () => {
  const { data: ratingsData } = useGetAllRatingsQuery()

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.driverName, header: headerKeys.driverName },
      { accessorKey: 'parent_name', header: 'Parent' },
      {
        accessorKey: accessorkeys.rating,
        header: headerKeys.rating,
        cell: ({ row }: { row: { original: Rating } }) => (
          <StarRating rating={row.original.rating} />
        ),
      },
      { accessorKey: accessorkeys.review, header: headerKeys.review },
      {
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }: { row: { original: Rating } }) =>
          new Date(row.original.created_at).toLocaleDateString(),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Ratings & Reviews" subTitle="Reviews" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-body">
            <DatatablesHover
              columns={columns}
              data={ratingsData?.data || []}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default RatingsReviewsList
