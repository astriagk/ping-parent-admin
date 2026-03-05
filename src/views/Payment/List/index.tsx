'use client'

import React, { useMemo, useState } from 'react'

import { useRouter } from 'next/navigation'

import { Payment, PaymentDetails } from '@src/dtos/payment'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import {
  accessorkeys,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import { PaymentMethodLabel, PaymentStatus } from '@src/shared/constants/enums'
import TableContainer from '@src/shared/custom/table/table'
import { useGetPaymentListQuery } from '@src/store/services/paymentApi'
import { formatAmount, formatDate } from '@src/utils/formatters'
import { Search } from 'lucide-react'
import Select from 'react-select'

const PaymentList = () => {
  const router = useRouter()
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const { data: paymentsData } = useGetPaymentListQuery()

  const filteredData = useMemo(() => {
    const all = paymentsData?.data ?? []
    if (!statusFilter) return all
    return all.filter((p) => p.payment_status === statusFilter)
  }, [paymentsData, statusFilter])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const adminData: PaymentDetails[] = filteredData ?? []

  const filteredRecords = adminData.filter((item: PaymentDetails) => {
    const q = searchQuery.toLowerCase()
    return (
      (item.transaction_id ?? '').toLowerCase().includes(q) ||
      (item.parent_id ?? '').toLowerCase().includes(q)
    )
  })

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredRecords.slice(
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
        accessorKey: accessorkeys.payments.transactionId,
        header: headerKeys.payments.transactionId,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.transaction_id || '—',
      },
      {
        accessorKey: accessorkeys.payments.parentName,
        header: headerKeys.payments.parentName,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.parent_name || '—',
      },
      {
        accessorKey: accessorkeys.payments.parentPhone,
        header: headerKeys.payments.parentPhone,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.parent_phone || '—',
      },
      {
        accessorKey: accessorkeys.payments.paymentType,
        header: headerKeys.payments.paymentType,
        cell: ({ row }: { row: { original: any } }) => {
          const type = row.original.payment_type as keyof typeof badgeMaps
          if (!type) return <span className="text-gray-400">—</span>
          const badge = badgeMaps[type] ?? badgeMaps['undefined']
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badge.className}`}>
              {badge.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.payments.amount,
        header: headerKeys.payments.amount,
        cell: ({ row }: { row: { original: Payment } }) =>
          formatAmount(row.original.amount ?? 0),
      },
      {
        accessorKey: accessorkeys.payments.paymentMethod,
        header: headerKeys.payments.paymentMethod,
        cell: ({ row }: { row: { original: Payment } }) =>
          PaymentMethodLabel[row.original.payment_method] ??
          row.original.payment_method ??
          '—',
      },
      {
        accessorKey: accessorkeys.payments.paymentStatus,
        header: headerKeys.payments.paymentStatus,
        cell: ({ row }: { row: { original: Payment } }) => {
          const status = row.original.payment_status as PaymentStatus
          const badge = badgeMaps[status as keyof typeof badgeMaps]
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${badge?.className}`}>
              {badge?.label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.payments.planName,
        header: headerKeys.payments.planName,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.plan_name || '—',
      },
      {
        accessorKey: accessorkeys.payments.paymentDate,
        header: headerKeys.payments.paymentDate,
        cell: ({ row }: { row: { original: Payment } }) =>
          row.original.payment_date
            ? formatDate(row.original.payment_date)
            : '—',
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
                    placeholder="Search by Transaction ID or Parent"
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
                      label: badgeMaps[status as keyof typeof badgeMaps]?.label,
                    }))}
                    value={
                      Object.values(PaymentStatus)
                        .map((s) => ({
                          value: s,
                          label: badgeMaps[s as keyof typeof badgeMaps]?.label,
                        }))
                        .find((o) => o.value === statusFilter) || null
                    }
                    onChange={(option) => setStatusFilter(option?.value || '')}
                    placeholder="Filter by payment status"
                    isClearable={true}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-0 card-body">
            <div>
              <TableContainer
                columns={columns}
                data={paginatedData}
                thClass="!font-medium cursor-pointer"
                divClass="overflow-x-auto table-box whitespace-nowrap"
                lastTrClass="text-end"
                tableClass="table flush"
                thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
              />
              <Pagination
                totalItems={filteredRecords.length}
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
