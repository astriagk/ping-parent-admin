'use client'

import React, { useMemo } from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'

const AdsList = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: 'title', header: 'Title' },
      { accessorKey: 'ad_type', header: 'Type' },
      { accessorKey: 'target_audience', header: 'Target Audience' },
      {
        accessorKey: 'is_active',
        header: 'Status',
        cell: ({ row }: { row: { original: any } }) => (
          <span
            className={`badge ${row.original.is_active ? 'badge-green' : 'badge-red'}`}>
            {row.original.is_active ? 'Active' : 'Inactive'}
          </span>
        ),
      },
      { accessorKey: 'impressions', header: 'Impressions' },
      { accessorKey: 'clicks', header: 'Clicks' },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: any } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => console.log('View', row.original)}>
              View
            </button>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Manage Ads" subTitle="Ads" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="flex flex-wrap justify-between items-center gap-4">
              <h6 className="card-title">Advertisements</h6>
              <button className="btn btn-primary btn-sm">Create Ad</button>
            </div>
          </div>
          <div className="card-body">
            <DatatablesHover columns={columns} data={[]} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdsList
