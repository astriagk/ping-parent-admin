'use client'

import React, { useMemo } from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'

const CommunityList = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: 'content', header: 'Post Content' },
      { accessorKey: 'author', header: 'Author' },
      {
        accessorKey: 'is_anonymous',
        header: 'Anonymous',
        cell: ({ row }: { row: { original: any } }) => (
          <span className={`badge ${row.original.is_anonymous ? 'badge-gray' : 'badge-blue'}`}>
            {row.original.is_anonymous ? 'Yes' : 'No'}
          </span>
        ),
      },
      {
        accessorKey: 'is_visible',
        header: 'Visible',
        cell: ({ row }: { row: { original: any } }) => (
          <span
            className={`badge ${row.original.is_visible ? 'badge-green' : 'badge-red'}`}>
            {row.original.is_visible ? 'Visible' : 'Hidden'}
          </span>
        ),
      },
      {
        accessorKey: 'is_pinned',
        header: 'Pinned',
        cell: ({ row }: { row: { original: any } }) => (
          <span className={`badge ${row.original.is_pinned ? 'badge-yellow' : 'badge-gray'}`}>
            {row.original.is_pinned ? 'Pinned' : 'No'}
          </span>
        ),
      },
      {
        accessorKey: 'created_at',
        header: 'Date',
        cell: ({ row }: { row: { original: any } }) =>
          row.original.created_at
            ? new Date(row.original.created_at).toLocaleString()
            : '—',
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: any } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => console.log('Pin', row.original)}>
              Pin
            </button>
            <button
              className="btn btn-red btn-sm"
              onClick={() => console.log('Hide', row.original)}>
              Hide
            </button>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Community Board" subTitle="Community" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">Community Posts</h6>
          </div>
          <div className="card-body">
            <DatatablesHover columns={columns} data={[]} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default CommunityList
