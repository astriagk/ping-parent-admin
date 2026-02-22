'use client'

import React, { useMemo, useState } from 'react'

import { SchoolSubscription } from '@src/dtos/subscription'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import {
  useCancelSchoolSubscriptionMutation,
  useCreateSchoolSubscriptionMutation,
  useGetSchoolSubscriptionsQuery,
  useGetSubscriptionPlansQuery,
  useRenewSchoolSubscriptionMutation,
} from '@src/store/services/subscriptionApi'
import { CirclePlus } from 'lucide-react'

const statusBadge: Record<string, { label: string; className: string }> = {
  active: { label: 'Active', className: 'badge-green' },
  expired: { label: 'Expired', className: 'badge-red' },
  cancelled: { label: 'Cancelled', className: 'badge-yellow' },
}

// ── Create Subscription Modal ──────────────────────────────────────────────────
const CreateSubscriptionModal = ({
  open,
  schoolId,
  onClose,
}: {
  open: boolean
  schoolId: string
  onClose: () => void
}) => {
  const { data: plansData } = useGetSubscriptionPlansQuery()
  const [createSubscription, { isLoading }] = useCreateSchoolSubscriptionMutation()
  const [form, setForm] = useState({ plan_id: '', amount: 0 })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await createSubscription({
      school_id: schoolId,
      plan_id: form.plan_id,
      amount: Number(form.amount),
    }).unwrap()
    setForm({ plan_id: '', amount: 0 })
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-md p-6">
        <h5 className="text-lg font-semibold mb-4">Create Subscription</h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Plan</label>
            <select
              className="form-select"
              value={form.plan_id}
              onChange={(e) => setForm({ ...form, plan_id: e.target.value })}
              required>
              <option value="">-- Select Plan --</option>
              {plansData?.data
                ?.filter((p) => p.is_active)
                .map((p) => (
                  <option key={p._id} value={p._id}>
                    {p.plan_name} — {p.plan_type} (₹{p.price})
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="form-label">Amount (₹)</label>
            <input
              type="number"
              min={0}
              className="form-input"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn btn-light btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={isLoading}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── View Subscription Modal ────────────────────────────────────────────────────
const ViewSubscriptionModal = ({
  open,
  sub,
  onClose,
}: {
  open: boolean
  sub: SchoolSubscription | null
  onClose: () => void
}) => {
  if (!open || !sub) return null

  const rows: [string, string][] = [
    ['School', sub.school_name],
    ['Plan', sub.plan_name],
    ['Status', sub.status],
    ['Amount', `₹${sub.amount}`],
    ['Start Date', new Date(sub.start_date).toLocaleDateString()],
    ['End Date', new Date(sub.end_date).toLocaleDateString()],
    ['Created', new Date(sub.created_at).toLocaleDateString()],
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-md p-6">
        <h5 className="text-lg font-semibold mb-4">Subscription Details</h5>
        <dl className="space-y-2">
          {rows.map(([label, value]) => (
            <div key={label} className="flex gap-4">
              <dt className="w-28 text-sm text-gray-500 dark:text-dark-500 shrink-0">{label}</dt>
              <dd className="text-sm font-medium">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="flex justify-end pt-4">
          <button className="btn btn-light btn-sm" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────────
const SchoolSubscriptionsList = () => {
  const { data: schoolsData } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = useState<string>('')
  const [createModalOpen, setCreateModalOpen] = useState(false)
  const [viewTarget, setViewTarget] = useState<SchoolSubscription | null>(null)

  const [cancelSubscription] = useCancelSchoolSubscriptionMutation()
  const [renewSubscription] = useRenewSchoolSubscriptionMutation()

  const firstSchoolId = selectedSchoolId || schoolsData?.data?.[0]?._id || ''

  const { data: subscriptionsData } = useGetSchoolSubscriptionsQuery(firstSchoolId, {
    skip: !firstSchoolId,
  })

  const handleCancel = (id: string) => {
    if (window.confirm('Cancel this subscription? This cannot be undone.')) {
      cancelSubscription(id)
    }
  }

  const handleRenew = (id: string) => {
    if (window.confirm('Renew this subscription?')) {
      renewSubscription(id)
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.schoolName, header: headerKeys.schoolName },
      { accessorKey: accessorkeys.planName, header: headerKeys.planName },
      {
        accessorKey: accessorkeys.subscriptionStatus,
        header: headerKeys.subscriptionStatus,
        cell: ({ row }: { row: { original: SchoolSubscription } }) => {
          const { label, className } = statusBadge[row.original.status] || {
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
        accessorKey: accessorkeys.amount,
        header: headerKeys.amount,
        cell: ({ row }: { row: { original: SchoolSubscription } }) =>
          `₹${row.original.amount}`,
      },
      {
        accessorKey: accessorkeys.startDate,
        header: headerKeys.startDate,
        cell: ({ row }: { row: { original: SchoolSubscription } }) =>
          new Date(row.original.start_date).toLocaleDateString(),
      },
      {
        accessorKey: accessorkeys.endDate,
        header: headerKeys.endDate,
        cell: ({ row }: { row: { original: SchoolSubscription } }) =>
          new Date(row.original.end_date).toLocaleDateString(),
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: SchoolSubscription } }) => {
          const sub = row.original
          const id = sub._id
          return (
            <div className="flex justify-end flex-wrap gap-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => setViewTarget(sub)}>
                View
              </button>
              {sub.status === 'active' && (
                <button
                  className="btn btn-red btn-sm"
                  onClick={() => handleCancel(id)}>
                  Cancel
                </button>
              )}
              {sub.status !== 'active' && (
                <button
                  className="btn btn-green btn-sm"
                  onClick={() => handleRenew(id)}>
                  Renew
                </button>
              )}
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="School Subscriptions" subTitle="Billing" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <label className="font-medium text-sm">Select School:</label>
                <select
                  className="form-select w-64"
                  value={selectedSchoolId}
                  onChange={(e) => setSelectedSchoolId(e.target.value)}>
                  {schoolsData?.data?.map((school) => (
                    <option key={school._id} value={school._id}>
                      {school.school_name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="btn btn-primary shrink-0"
                disabled={!firstSchoolId}
                onClick={() => setCreateModalOpen(true)}>
                <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                Create Subscription
              </button>
            </div>
          </div>
          <div className="pt-4 card-body">
            <DatatablesHover columns={columns} data={subscriptionsData?.data || []} />
          </div>
        </div>
      </div>
      <CreateSubscriptionModal
        open={createModalOpen}
        schoolId={firstSchoolId}
        onClose={() => setCreateModalOpen(false)}
      />
      <ViewSubscriptionModal
        open={!!viewTarget}
        sub={viewTarget}
        onClose={() => setViewTarget(null)}
      />
    </React.Fragment>
  )
}

export default SchoolSubscriptionsList
