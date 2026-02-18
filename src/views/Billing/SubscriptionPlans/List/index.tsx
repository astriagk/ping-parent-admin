'use client'

import React, { useMemo, useState } from 'react'

import { SubscriptionPlan } from '@src/dtos/subscription'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, badges, headerKeys } from '@src/shared/constants/columns'
import {
  useActivateSubscriptionPlanMutation,
  useCreateSubscriptionPlanMutation,
  useDeactivateSubscriptionPlanMutation,
  useGetSubscriptionPlansQuery,
  useUpdateSubscriptionPlanMutation,
} from '@src/store/services/subscriptionApi'
import { CirclePlus, X } from 'lucide-react'

type PlanModalMode = 'create' | 'edit'

const BADGE_OPTIONS = ['', 'BEST_VALUE', 'POPULAR', 'RECOMMENDED', 'LIMITED_OFFER']
const PLAN_TYPES = ['MONTHLY', 'QUARTERLY', 'YEARLY']
const PRICING_MODELS = ['FLAT', 'PER_KID', 'BASE_PLUS_PER_KID']

const emptyForm = {
  name: '',
  description: '',
  badge: '',
  plan_type: 'MONTHLY',
  pricing_model: 'FLAT',
  base_price: 0,
  per_kid_price: 0,
  max_kids: 0,
  features: [''],
}

const PlanModal = ({
  open,
  mode,
  initial,
  onClose,
}: {
  open: boolean
  mode: PlanModalMode
  initial: SubscriptionPlan | null
  onClose: () => void
}) => {
  const [form, setForm] = useState(() =>
    initial
      ? {
          name: initial.name,
          description: initial.description,
          badge: initial.badge ?? '',
          plan_type: initial.plan_type,
          pricing_model: initial.pricing_model,
          base_price: initial.base_price,
          per_kid_price: initial.per_kid_price ?? 0,
          max_kids: initial.max_kids ?? 0,
          features: initial.features.length ? initial.features : [''],
        }
      : { ...emptyForm }
  )

  const [createPlan, { isLoading: creating }] = useCreateSubscriptionPlanMutation()
  const [updatePlan, { isLoading: updating }] = useUpdateSubscriptionPlanMutation()

  const isLoading = creating || updating

  const setFeature = (idx: number, value: string) => {
    const updated = [...form.features]
    updated[idx] = value
    setForm({ ...form, features: updated })
  }

  const addFeature = () => setForm({ ...form, features: [...form.features, ''] })

  const removeFeature = (idx: number) =>
    setForm({ ...form, features: form.features.filter((_, i) => i !== idx) })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const payload = {
      ...form,
      base_price: Number(form.base_price),
      per_kid_price: Number(form.per_kid_price) || undefined,
      max_kids: Number(form.max_kids) || undefined,
      badge: (form.badge as SubscriptionPlan['badge']) || undefined,
      features: form.features.filter(Boolean),
    }
    if (mode === 'create') {
      await createPlan(payload).unwrap()
    } else if (initial) {
      await updatePlan({ id: initial.plan_id ?? initial._id, ...payload }).unwrap()
    }
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto">
        <h5 className="text-lg font-semibold mb-4">
          {mode === 'create' ? 'Add Plan' : 'Edit Plan'}
        </h5>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="form-label">Name</label>
            <input
              className="form-input"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="form-label">Description</label>
            <textarea
              className="form-input"
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Badge</label>
              <select
                className="form-select"
                value={form.badge}
                onChange={(e) => setForm({ ...form, badge: e.target.value })}>
                {BADGE_OPTIONS.map((b) => (
                  <option key={b} value={b}>
                    {b || '— None —'}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Plan Type</label>
              <select
                className="form-select"
                value={form.plan_type}
                onChange={(e) => setForm({ ...form, plan_type: e.target.value })}>
                {PLAN_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Pricing Model</label>
              <select
                className="form-select"
                value={form.pricing_model}
                onChange={(e) => setForm({ ...form, pricing_model: e.target.value })}>
                {PRICING_MODELS.map((m) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">Base Price (₹)</label>
              <input
                type="number"
                min={0}
                className="form-input"
                value={form.base_price}
                onChange={(e) => setForm({ ...form, base_price: Number(e.target.value) })}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="form-label">Per-Kid Price (₹)</label>
              <input
                type="number"
                min={0}
                className="form-input"
                value={form.per_kid_price}
                onChange={(e) => setForm({ ...form, per_kid_price: Number(e.target.value) })}
              />
            </div>
            <div>
              <label className="form-label">Max Kids</label>
              <input
                type="number"
                min={0}
                className="form-input"
                value={form.max_kids}
                onChange={(e) => setForm({ ...form, max_kids: Number(e.target.value) })}
              />
            </div>
          </div>
          <div>
            <label className="form-label">Features</label>
            <div className="space-y-2">
              {form.features.map((feat, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    className="form-input flex-1"
                    value={feat}
                    placeholder={`Feature ${idx + 1}`}
                    onChange={(e) => setFeature(idx, e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-light btn-sm"
                    onClick={() => removeFeature(idx)}>
                    <X className="size-4" />
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-light btn-sm" onClick={addFeature}>
                + Add Feature
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn btn-light btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={isLoading}>
              {mode === 'create' ? 'Create' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const planTypeBadge: Record<string, string> = {
  MONTHLY: 'badge-blue',
  QUARTERLY: 'badge-purple',
  YEARLY: 'badge-green',
}

const SubscriptionPlansList = () => {
  const { data: plansData } = useGetSubscriptionPlansQuery()
  const [activatePlan] = useActivateSubscriptionPlanMutation()
  const [deactivatePlan] = useDeactivateSubscriptionPlanMutation()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<PlanModalMode>('create')
  const [editTarget, setEditTarget] = useState<SubscriptionPlan | null>(null)

  const openCreate = () => {
    setModalMode('create')
    setEditTarget(null)
    setModalOpen(true)
  }

  const openEdit = (plan: SubscriptionPlan) => {
    setModalMode('edit')
    setEditTarget(plan)
    setModalOpen(true)
  }

  const handleToggle = (plan: SubscriptionPlan) => {
    const id = plan.plan_id ?? plan._id
    if (plan.is_active) {
      deactivatePlan(id)
    } else {
      activatePlan(id)
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.roleName, header: 'Plan Name' },
      { accessorKey: accessorkeys.description, header: headerKeys.description },
      {
        accessorKey: accessorkeys.planType,
        header: headerKeys.planType,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) => (
          <span
            className={`badge inline-flex items-center gap-1 ${planTypeBadge[row.original.plan_type] || 'badge-gray'}`}>
            {row.original.plan_type}
          </span>
        ),
      },
      {
        accessorKey: accessorkeys.pricingModel,
        header: headerKeys.pricingModel,
      },
      {
        accessorKey: accessorkeys.basePrice,
        header: headerKeys.basePrice,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) =>
          `₹${row.original.base_price}`,
      },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) => {
          const mapKey = String(row.original.is_active) as keyof typeof badges
          const { label, className } = badges[mapKey] || badges.undefined
          return (
            <span className={`badge inline-flex items-center gap-1 ${className}`}>
              {label}
            </span>
          )
        },
      },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-primary btn-sm"
              onClick={() => openEdit(row.original)}>
              Edit
            </button>
            <button
              className={`btn btn-sm ${row.original.is_active ? 'btn-orange' : 'btn-green'}`}
              onClick={() => handleToggle(row.original)}>
              {row.original.is_active ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Subscription Plans" subTitle="Billing" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <div className="flex flex-wrap justify-end gap-5">
              <button className="btn btn-primary shrink-0" onClick={openCreate}>
                <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
                Add Plan
              </button>
            </div>
          </div>
          <div className="pt-4 card-body">
            <DatatablesHover columns={columns} data={plansData?.data || []} />
          </div>
        </div>
      </div>
      <PlanModal
        open={modalOpen}
        mode={modalMode}
        initial={editTarget}
        onClose={() => setModalOpen(false)}
      />
    </React.Fragment>
  )
}

export default SubscriptionPlansList
