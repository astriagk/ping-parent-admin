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
          divClass="overflow-x-auto"
          tableClass="display group hovered table whitespace-nowrap dtr-inline"
          PaginationClassName="pagination-container"
          isPagination={true}
          thtrClass="bg-gray-100 dark:bg-dark-850 dt-orderable-asc dt-orderable-desc dt-ordering-desc"
          classStyle="100%"
          isSearch={true}
          lastTrClass="text-end"
        />
      </div>
    </>
  )
}

export default BasicTable
