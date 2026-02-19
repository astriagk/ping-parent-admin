'use client'

import React, { useMemo, useState } from 'react'

import { SubscriptionPlan } from '@src/dtos/subscription'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import {
  ModelModes,
  PlanTypeBadge,
  PlanTypeLabel,
  PricingModel,
  PricingModelLabel,
} from '@src/shared/constants/enums'
import { MESSAGES } from '@src/shared/constants/messages'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, badges, headerKeys } from '@src/shared/constants/columns'
import {
  useActivateSubscriptionPlanMutation,
  useDeactivateSubscriptionPlanMutation,
  useGetSubscriptionPlansQuery,
} from '@src/store/services/subscriptionApi'
import { CirclePlus } from 'lucide-react'
import { toast } from 'react-toastify'

import PlanModal from './planModal'

const SubscriptionPlansList = () => {
  const { data: plansData } = useGetSubscriptionPlansQuery()
  const [activatePlan] = useActivateSubscriptionPlanMutation()
  const [deactivatePlan] = useDeactivateSubscriptionPlanMutation()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<ModelModes>(ModelModes.ADD)
  const [editTarget, setEditTarget] = useState<SubscriptionPlan | null>(null)

  const openCreate = () => {
    setModalMode(ModelModes.ADD)
    setEditTarget(null)
    setModalOpen(true)
  }

  const openEdit = (plan: SubscriptionPlan) => {
    setModalMode(ModelModes.EDIT)
    setEditTarget(plan)
    setModalOpen(true)
  }

  const handleToggle = async (plan: SubscriptionPlan) => {
    const id = plan.plan_id ?? plan._id
    try {
      if (plan.is_active) {
        await deactivatePlan(id).unwrap()
        toast.success(MESSAGES.SUBSCRIPTION.SUCCESS.PLAN_DEACTIVATED)
      } else {
        await activatePlan(id).unwrap()
        toast.success(MESSAGES.SUBSCRIPTION.SUCCESS.PLAN_ACTIVATED)
      }
    } catch (error: any) {
      toast.error(
        error?.data?.error ||
          (plan.is_active
            ? MESSAGES.SUBSCRIPTION.ERROR.DEACTIVATE_FAILED
            : MESSAGES.SUBSCRIPTION.ERROR.ACTIVATE_FAILED)
      )
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
        accessorKey: accessorkeys.planName,
        header: headerKeys.planName,
      },
      {
        accessorKey: accessorkeys.planType,
        header: headerKeys.planType,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) => (
          <span
            className={`badge inline-flex items-center gap-1 ${PlanTypeBadge[row.original.plan_type] || 'badge-gray'}`}>
            {PlanTypeLabel[row.original.plan_type] ?? row.original.plan_type}
          </span>
        ),
      },
      {
        accessorKey: accessorkeys.pricingModel,
        header: headerKeys.pricingModel,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) =>
          PricingModelLabel[row.original.pricing_model as PricingModel] ??
          row.original.pricing_model,
      },
      {
        accessorKey: accessorkeys.price,
        header: headerKeys.price,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) =>
          `₹${row.original.price}${row.original.pricing_model === 'per_kid' ? '/kid' : ''}`,
      },
      {
        accessorKey: accessorkeys.kids,
        header: headerKeys.kids,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) =>
          `${row.original.kids.min}–${row.original.kids.max}`,
      },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) => {
          const mapKey = String(row.original.is_active) as keyof typeof badges
          const { label, className } = badges[mapKey] || badges.undefined
          return (
            <span
              className={`badge inline-flex items-center gap-1 ${className}`}>
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
        show={modalOpen}
        handleHide={() => setModalOpen(false)}
        mode={modalMode}
        planData={editTarget}
      />
    </React.Fragment>
  )
}

export default SubscriptionPlansList
