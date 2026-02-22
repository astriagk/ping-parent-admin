'use client'

import React from 'react'

import TableContainer from '@src/shared/custom/table/table'
import { TableOptions } from '@tanstack/react-table'

interface BasicTableProps<TData> {
  columns: TableOptions<TData>['columns']
  data: TData[]
}

const BasicTable = <TData extends object>({
  columns,
  data,
}: BasicTableProps<TData>) => {
  return (
    <>
      <div className="table-container">
        <TableContainer
          columns={columns}
          data={data}
          isPagination={true}
          classStyle="100%"
          isSearch={true}
          lastTrClass="text-end"
          thClass="!font-medium cursor-pointer"
          divClass="overflow-x-auto table-box whitespace-nowrap"
          tableClass="table flush"
          thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
        />
      </div>
    </>
  )
}

export default BasicTable
