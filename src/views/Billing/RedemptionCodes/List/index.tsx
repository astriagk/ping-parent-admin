'use client'

import React, { useMemo, useState } from 'react'

import { RedemptionCode } from '@src/dtos/subscription'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import {
  accessorkeys,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import {
  useGenerateRedemptionCodesMutation,
  useGetRedemptionCodesQuery,
  useGetSchoolSubscriptionsQuery,
} from '@src/store/services/subscriptionApi'
import { Key, Search } from 'lucide-react'

const RedemptionCodesList = () => {
  const { data: schoolsData } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('')
  const [selectedSubscriptionId, setSelectedSubscriptionId] =
    useState<string>('')
  const [generateCount, setGenerateCount] = useState<number>(1)
  const [generating, setGenerating] = useState(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const [generateCodes, { isLoading: isGenerating }] =
    useGenerateRedemptionCodesMutation()

  const firstSchoolId = selectedSchoolId || schoolsData?.data?.[0]?._id || ''

  const { data: subscriptionsData } = useGetSchoolSubscriptionsQuery(
    firstSchoolId,
    { skip: !firstSchoolId }
  )

  const firstSubscriptionId =
    selectedSubscriptionId || subscriptionsData?.data?.[0]?._id || ''

  const { data: codesData } = useGetRedemptionCodesQuery(firstSubscriptionId, {
    skip: !firstSubscriptionId,
  })

  const handleGenerate = async () => {
    if (!firstSubscriptionId) return
    if (window.confirm(`Generate ${generateCount} redemption code(s)?`)) {
      setGenerating(true)
      try {
        await generateCodes({
          subscriptionId: firstSubscriptionId,
          studentIds: [],
        }).unwrap()
      } finally {
        setGenerating(false)
      }
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  const codesArr: RedemptionCode[] = codesData?.data ?? []

  const filteredRecords = codesArr.filter((item: RedemptionCode) =>
    item.code.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.redemptionCodesList.id,
        header: headerKeys.redemptionCodesList.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.redemptionCodesList.code,
        header: headerKeys.redemptionCodesList.code,
        cell: ({ row }: { row: { original: RedemptionCode } }) => (
          <code className="font-mono text-sm bg-gray-100 dark:bg-dark-850 px-2 py-0.5 rounded">
            {row.original.code}
          </code>
        ),
      },
      {
        accessorKey: accessorkeys.redemptionCodesList.codeStatus,
        header: headerKeys.redemptionCodesList.codeStatus,
        cell: ({ row }: { row: { original: RedemptionCode } }) => {
          const { label, className } = badgeMaps[row.original.status]
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.redemptionCodesList.studentName,
        header: headerKeys.redemptionCodesList.studentName,
        cell: ({ row }: { row: { original: RedemptionCode } }) =>
          row.original.student_name || '-',
      },
      {
        accessorKey: accessorkeys.redemptionCodesList.redeemedAt,
        header: headerKeys.redemptionCodesList.redeemedAt,
        cell: ({ row }: { row: { original: RedemptionCode } }) =>
          row.original.redeemed_at
            ? new Date(row.original.redeemed_at).toLocaleDateString()
            : '-',
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Redemption Codes" subTitle="Billing" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 lg:col-span-7 xxl:col-span-6">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-2">
                    <label className="font-medium text-sm whitespace-nowrap">
                      School:
                    </label>
                    <select
                      className="form-select w-40"
                      value={selectedSchoolId}
                      onChange={(e) => {
                        setSelectedSchoolId(e.target.value)
                        setSelectedSubscriptionId('')
                      }}>
                      {schoolsData?.data?.map((school) => (
                        <option key={school._id} value={school._id}>
                          {school.school_name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="font-medium text-sm whitespace-nowrap">
                      Subscription:
                    </label>
                    <select
                      className="form-select w-40"
                      value={selectedSubscriptionId}
                      onChange={(e) =>
                        setSelectedSubscriptionId(e.target.value)
                      }>
                      {subscriptionsData?.data?.map((sub) => (
                        <option key={sub._id} value={sub._id}>
                          {sub.plan_id} — {sub.subscription_status}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 lg:col-span-3 xxl:col-span-4">
                <div className="relative group/form grow">
                  <input
                    type="text"
                    className="ltr:pl-9 rtl:pr-9 form-input ltr:group-[&.right]/form:pr-9 rtl:group-[&.right]/form:pl-9 ltr:group-[&.right]/form:pl-4 rtl:group-[&.right]/form:pr-4"
                    placeholder="Search Code"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="absolute inset-y-0 flex items-center ltr:left-3 rtl:right-3 focus:outline-hidden">
                    <Search className="text-gray-500 dark:text-dark-500 size-4 fill-gray-100 dark:fill-dark-850" />
                  </button>
                </div>
              </div>
              <div className="col-span-12 md:col-span-5 lg:col-span-2 xxl:col-span-2 ltr:md:text-right rtl:md:text-left">
                <div className="flex items-center justify-end gap-2">
                  <input
                    type="number"
                    min={1}
                    max={100}
                    className="form-input w-16 text-center"
                    value={generateCount}
                    onChange={(e) =>
                      setGenerateCount(Math.max(1, Number(e.target.value)))
                    }
                    disabled={!firstSubscriptionId}
                  />
                  <button
                    className="btn btn-primary shrink-0"
                    disabled={
                      !firstSubscriptionId || isGenerating || generating
                    }
                    onClick={handleGenerate}>
                    <Key className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                    Generate
                  </button>
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

export default RedemptionCodesList
