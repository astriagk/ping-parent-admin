'use client'

import React, { useMemo, useState } from 'react'

import { RedemptionCode } from '@src/dtos/subscription'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import {
  useGenerateRedemptionCodesMutation,
  useGetRedemptionCodesQuery,
  useGetSchoolSubscriptionsQuery,
} from '@src/store/services/subscriptionApi'
import { Key } from 'lucide-react'

const codeBadge: Record<string, { label: string; className: string }> = {
  available: { label: 'Available', className: 'badge-green' },
  redeemed: { label: 'Redeemed', className: 'badge-gray' },
}

const RedemptionCodesList = () => {
  const { data: schoolsData } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('')
  const [selectedSubscriptionId, setSelectedSubscriptionId] = useState<string>('')
  const [generateCount, setGenerateCount] = useState<number>(1)
  const [generating, setGenerating] = useState(false)

  const [generateCodes, { isLoading: isGenerating }] = useGenerateRedemptionCodesMutation()

  const firstSchoolId = selectedSchoolId || schoolsData?.data?.[0]?.school_id || ''

  const { data: subscriptionsData } = useGetSchoolSubscriptionsQuery(firstSchoolId, {
    skip: !firstSchoolId,
  })

  const firstSubscriptionId =
    selectedSubscriptionId || subscriptionsData?.data?.[0]?.subscription_id || ''

  const { data: codesData } = useGetRedemptionCodesQuery(firstSubscriptionId, {
    skip: !firstSubscriptionId,
  })

  const handleGenerate = async () => {
    if (!firstSubscriptionId) return
    if (window.confirm(`Generate ${generateCount} redemption code(s)?`)) {
      setGenerating(true)
      try {
        await generateCodes({ subscriptionId: firstSubscriptionId, count: generateCount }).unwrap()
      } finally {
        setGenerating(false)
      }
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.code,
        header: headerKeys.code,
        cell: ({ row }: { row: { original: RedemptionCode } }) => (
          <code className="font-mono text-sm bg-gray-100 dark:bg-dark-850 px-2 py-0.5 rounded">
            {row.original.code}
          </code>
        ),
      },
      {
        accessorKey: accessorkeys.codeStatus,
        header: headerKeys.codeStatus,
        cell: ({ row }: { row: { original: RedemptionCode } }) => {
          const { label, className } = codeBadge[row.original.status] || {
            label: row.original.status,
            className: 'badge-gray',
          }
          return (
            <span className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: 'student_name',
        header: 'Assigned Student',
        cell: ({ row }: { row: { original: RedemptionCode } }) =>
          row.original.student_name || '-',
      },
      {
        accessorKey: 'redeemed_at',
        header: 'Redeemed At',
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
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="font-medium text-sm">School:</label>
                  <select
                    className="form-select w-48"
                    value={selectedSchoolId}
                    onChange={(e) => {
                      setSelectedSchoolId(e.target.value)
                      setSelectedSubscriptionId('')
                    }}>
                    {schoolsData?.data?.map((school) => (
                      <option key={school.school_id} value={school.school_id}>
                        {school.school_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="font-medium text-sm">Subscription:</label>
                  <select
                    className="form-select w-48"
                    value={selectedSubscriptionId}
                    onChange={(e) => setSelectedSubscriptionId(e.target.value)}>
                    {subscriptionsData?.data?.map((sub) => (
                      <option key={sub.subscription_id} value={sub.subscription_id}>
                        {sub.plan_name} — {sub.status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={100}
                  className="form-input w-20 text-center"
                  value={generateCount}
                  onChange={(e) => setGenerateCount(Math.max(1, Number(e.target.value)))}
                  disabled={!firstSubscriptionId}
                />
                <button
                  className="btn btn-primary shrink-0"
                  disabled={!firstSubscriptionId || isGenerating || generating}
                  onClick={handleGenerate}>
                  <Key className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                  Generate Codes
                </button>
              </div>
            </div>
          </div>
          <div className="pt-4 card-body">
            <DatatablesHover columns={columns} data={codesData?.data || []} />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default RedemptionCodesList
