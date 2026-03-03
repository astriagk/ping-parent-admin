'use client'

import React, { useMemo, useState } from 'react'

import { SubscriptionPlan } from '@src/dtos/subscription'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import Pagination from '@src/shared/common/Pagination'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, badges, headerKeys } from '@src/shared/constants/columns'
import {
  ModelModes,
  PlanTypeBadge,
  PlanTypeLabel,
  PricingModel,
  PricingModelLabel,
} from '@src/shared/constants/enums'
import { MESSAGES } from '@src/shared/constants/messages'
import TableContainer from '@src/shared/custom/table/table'
import {
  useActivateSubscriptionPlanMutation,
  useDeactivateSubscriptionPlanMutation,
  useGetSubscriptionPlansQuery,
} from '@src/store/services/subscriptionApi'
import { CirclePlus, Search } from 'lucide-react'
import { toast } from 'react-toastify'

import PlanModal from './planModal'

const SubscriptionPlansList = () => {
  const { data: plansData } = useGetSubscriptionPlansQuery()
  const [activatePlan] = useActivateSubscriptionPlanMutation()
  const [deactivatePlan] = useDeactivateSubscriptionPlanMutation()

  const [modalOpen, setModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<ModelModes>(ModelModes.ADD)
  const [editTarget, setEditTarget] = useState<SubscriptionPlan | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  //pagination
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)

  const adminData: SubscriptionPlan[] = plansData?.data ?? []

  const filierPlansRecords = adminData.filter((item: SubscriptionPlan) => {
    console.log(item)
    const filterRecord = item.plan_name
      .toLowerCase()
      .includes(searchQuery.toLowerCase())
    return filterRecord
  })

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedEvents = filierPlansRecords.slice(
    startIndex,
    startIndex + itemsPerPage
  )

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
    const id = plan._id
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
        accessorKey: accessorkeys.subscriptionPlans.id,
        header: headerKeys.subscriptionPlans.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.subscriptionPlans.planName,
        header: headerKeys.subscriptionPlans.planName,
      },
      {
        accessorKey: accessorkeys.subscriptionPlans.planType,
        header: headerKeys.subscriptionPlans.planType,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) => (
          <span
            className={`badge inline-flex items-center gap-1 ${PlanTypeBadge[row.original.plan_type] || 'badge-gray'}`}>
            {PlanTypeLabel[row.original.plan_type] ?? row.original.plan_type}
          </span>
        ),
      },
      {
        accessorKey: accessorkeys.subscriptionPlans.pricingModel,
        header: headerKeys.subscriptionPlans.pricingModel,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) =>
          PricingModelLabel[row.original.pricing_model as PricingModel] ??
          row.original.pricing_model,
      },
      {
        accessorKey: accessorkeys.subscriptionPlans.price,
        header: headerKeys.subscriptionPlans.price,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) =>
          `₹${row.original.price}${row.original.pricing_model === 'per_kid' ? '/kid' : ''}`,
      },
      {
        accessorKey: accessorkeys.subscriptionPlans.kids,
        header: headerKeys.subscriptionPlans.kids,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) =>
          `${row.original.kids.min}–${row.original.kids.max}`,
      },
      {
        accessorKey: accessorkeys.subscriptionPlans.isActive,
        header: headerKeys.subscriptionPlans.isActive,
        cell: (value: { row: { original: SubscriptionPlan } }) => {
          const { is_active } = value.row.original
          return (
            <label className="switch-group switch-soft">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={is_active}
                  onChange={() => {
                    handleToggle(value.row.original)
                  }}
                />
                <div className="switch-wrapper peer-checked:!bg-green-500/15"></div>
                <div className="switch-dot peer-checked:translate-x-full rtl:peer-checked:-translate-x-full peer-checked:!bg-green-500"></div>
              </div>
            </label>
          )
        },
      },
      {
        accessorKey: accessorkeys.subscriptionPlans.actions,
        header: headerKeys.subscriptionPlans.actions,
        cell: ({ row }: { row: { original: SubscriptionPlan } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-sub-gray btn-icon !size-8 rounded-md"
              onClick={(e) => {
                e.preventDefault()
                openEdit(row.original)
              }}>
              <i className="ri-pencil-line"></i>
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
            <div className="grid items-center gap-3 grid-cols-12">
              <div className="col-span-12 md:col-span-9 lg:col-span-5 xxl:col-span-3">
                <div className="relative group/form grow">
                  <input
                    type="email"
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
              <div className="col-span-12 md:col-span-3 lg:col-span-3 lg:col-start-10 xxl:col-span-2 xxl:col-start-11 ltr:md:text-right rtl:md:text-left">
                <button
                  className="btn btn-primary shrink-0"
                  data-modal-target="parentsCreateModal"
                  onClick={() => openCreate()}>
                  <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />{' '}
                  Add Plan
                </button>
              </div>
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
