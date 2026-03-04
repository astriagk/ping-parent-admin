'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Payment, PaymentDetails } from '@src/dtos/payment'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import {
  PaymentMethodLabel,
  PaymentStatus,
  PaymentStatusBadge,
  PaymentStatusLabel,
} from '@src/shared/constants/enums'
import TableContainer from '@src/shared/custom/table/table'
import { useGetPaymentListQuery } from '@src/store/services/paymentApi'
import { formatAmount, formatDate } from '@src/utils/formatters'
import { Search } from 'lucide-react'
import Select from 'react-select'

const PaymentList = () => {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: paymentsData, isLoading } = useGetPaymentListQuery()

  const filteredData = useMemo(() => {
    const all = paymentsData?.data ?? []
    if (!statusFilter) return all
    return all.filter((p) => p.payment_status === statusFilter)
  }, [paymentsData, statusFilter])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const adminData: PaymentDetails[] = filteredData ?? []

  const filierPlansRecords = adminData.filter((item: PaymentDetails) => {
    const filterRecord = item.payment_method
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return filterRecord
  })

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEvents = filierPlansRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.payments.id,
        header: headerKeys.payments.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.payments.paymentId,
        header: headerKeys.payments.paymentId,
      },
      {
        accessorKey: accessorkeys.payments.amount,
        header: headerKeys.payments.amount,
        cell: ({ row }: { row: { original: Payment } }) =>
          `${formatAmount(row.original.amount ?? 0)}`,
      },
      {
        accessorKey: accessorkeys.payments.paymentMethod,
        header: headerKeys.payments.paymentMethod,
        cell: ({ row }: { row: { original: Payment } }) =>
          PaymentMethodLabel[row.original.payment_method] ??
          row.original.payment_method,
      },
      {
        accessorKey: accessorkeys.payments.paymentStatus,
        header: headerKeys.payments.paymentStatus,
        cell: ({ row }: { row: { original: Payment } }) => {
          const status = row.original.payment_status as PaymentStatus
          const label = PaymentStatusLabel[status] ?? status
          const className = PaymentStatusBadge[status] ?? 'badge-gray'
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.payments.paymentDate,
        header: headerKeys.payments.paymentDate,
        cell: ({ row }: { row: { original: Payment } }) =>
          formatDate(row.original.payment_date),
      },
      {
        accessorKey: accessorkeys.payments.actions,
        header: headerKeys.payments.actions,
        cell: ({ row }: { row: { original: Payment } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sub-primary btn-icon !size-8 rounded-md"
              onClick={(e) => {
                e.preventDefault()
                router.push(`/payments/details/${row.original._id}`)
              }}>
              <i className="ri-eye-line"></i>
            </button>
          </div>
        ),
      },
    ],
    [router]
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Payments" subTitle="Payment List" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search Plan"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="absolute inset-y-0 flex items-center ltr:left-3 rtl:right-3 ltr:group-[&.right]/form:right-3 rtl:group-[&.right]/form:left-3 ltr:group-[&.right]/form:left-auto rtl:group-[&.right]/form:right-auto focus:outline-hidden">
                    <Search className="text-gray-500 dark:text-dark-500 size-4 fill-gray-100 dark:fill-dark-850" />
                  </button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <Select<{ value: string; label: string }>
                    classNamePrefix="select"
                    options={Object.values(PaymentStatus).map((status) => ({
                      value: status,
                      label: PaymentStatusLabel[status] ?? status,
                    }))}
                    value={
                      Object.values(PaymentStatus)
                        .map((s) => ({
                          value: s,
                          label: PaymentStatusLabel[s] ?? s,
                        }))
                        .find((o) => o.value === statusFilter) || null
                    }
                    onChange={(option) => setStatusFilter(option?.value || '')}
                    placeholder="Sorting by payment status"
                    isClearable={true}
                  />
                </div>
              </div>
              {/* <div className="col-span-12 md:col-span-3 lg:col-span-3 lg:col-start-10 xxl:col-span-2 xxl:col-start-11 ltr:md:text-right rtl:md:text-left">
                <button
                  className="btn btn-primary shrink-0"
                  data-modal-target="parentsCreateModal"
                  onClick={() => openCreate()}>
                  <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />{' '}
                  Add Plan
                </button>
              </div> */}
            </div>
          </div>

          <div className="pt-0 card-body">
            <div>
              <TableContainer
                columns={columns}
                data={paginatedEvents}
                thClass="!font-medium cursor-pointer"
                divClass="overflow-x-auto table-box whitespace-nowrap"
                lastTrClass="text-end"
                tableClass="table flush"
                thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
              />
              <Pagination
                totalItems={filierPlansRecords.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default PaymentList
