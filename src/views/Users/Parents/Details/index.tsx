'use client'

import React, { useMemo } from 'react'

import { useParams, useRouter } from 'next/navigation'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import {
  accessorkeys,
  badgeMaps,
  headerKeys,
} from '@src/shared/constants/columns'
import TableContainer from '@src/shared/custom/table/table'
import {
  useActivateUserMutation,
  useDeactivateUserMutation,
  useDeleteUserMutation,
} from '@src/store/services/adminApi'
import { useGetParentDetailsQuery } from '@src/store/services/parentApi'
import { toast } from 'react-toastify'

const DetailRow = ({
  label,
  value,
  mono = false,
}: {
  label: string
  value: React.ReactNode
  mono?: boolean
}) => (
  <div>
    <p className="text-gray-500 text-sm mb-1">{label}</p>
    <p
      className={`text-gray-900 text-sm ${mono ? 'font-mono break-all' : 'font-medium'}`}>
      {value ?? '—'}
    </p>
  </div>
)

const ParentDetails = () => {
  const params = useParams()
  const router = useRouter()
  const parentId = params?.id as string

  const { data: parentResponse, error } = useGetParentDetailsQuery(parentId, {
    skip: !parentId,
  })
  const [activateUser] = useActivateUserMutation()
  const [deactivateUser] = useDeactivateUserMutation()
  const [deleteUser] = useDeleteUserMutation()

  const parent = parentResponse?.data

  const handleActivate = async () => {
    try {
      const result = await activateUser(parent!._id).unwrap()
      toast.success(result?.message || 'Parent activated')
    } catch (error: any) {
      toast.error(error?.data?.error || 'Failed to activate')
    }
  }

  const handleDeactivate = async () => {
    try {
      const result = await deactivateUser(parent!._id).unwrap()
      toast.success(result?.message || 'Parent deactivated')
    } catch (error: any) {
      toast.error(error?.data?.error || 'Failed to deactivate')
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Delete this parent? This cannot be undone.')) return
    try {
      const result = await deleteUser(parent!._id).unwrap()
      toast.success(result?.message || 'Parent deleted')
      router.push('/users/parents/list')
    } catch (error: any) {
      toast.error(error?.data?.error || 'Failed to delete')
    }
  }

  const studentColumns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.parentDetails.id,
        header: headerKeys.parentDetails.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.parentDetails.studentName,
        header: headerKeys.parentDetails.studentName,
      },
      {
        accessorKey: accessorkeys.parentDetails.class,
        header: headerKeys.parentDetails.class,
      },
      {
        accessorKey: accessorkeys.parentDetails.schoolId,
        header: headerKeys.parentDetails.schoolId,
      },
    ],
    []
  )

  const subscriptionColumns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.parentDetails.id,
        header: headerKeys.parentDetails.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.parentDetails.planName,
        header: headerKeys.parentDetails.planName,
      },
      {
        accessorKey: accessorkeys.parentDetails.planType,
        header: headerKeys.parentDetails.planType,
      },
      {
        accessorKey: accessorkeys.parentDetails.status,
        header: headerKeys.parentDetails.status,
        cell: ({ row }: { row: { original: any } }) => {
          const status = row.original.status
          const badgeClass =
            badgeMaps[status as keyof typeof badgeMaps]?.className
          return <span className={`badge ${badgeClass}`}>{status}</span>
        },
      },
      {
        accessorKey: accessorkeys.parentDetails.startDate,
        header: headerKeys.parentDetails.startDate,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.start_date
            ? new Date(row.original.start_date).toLocaleDateString()
            : '—',
      },
      {
        accessorKey: accessorkeys.parentDetails.endDate,
        header: headerKeys.parentDetails.endDate,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.end_date
            ? new Date(row.original.end_date).toLocaleDateString()
            : '—',
      },
      {
        accessorKey: accessorkeys.parentDetails.amount,
        header: headerKeys.parentDetails.amount,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.amount != null
            ? `₹${row.original.amount.toLocaleString('en-IN')}`
            : '—',
      },
    ],
    []
  )

  const paymentColumns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.parentDetails.id,
        header: headerKeys.parentDetails.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.parentDetails.paymentType,
        header: headerKeys.parentDetails.paymentType,
      },
      {
        accessorKey: accessorkeys.parentDetails.amount,
        header: headerKeys.parentDetails.amount,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.amount != null
            ? `₹${row.original.amount.toLocaleString('en-IN')}`
            : '—',
      },
      {
        accessorKey: accessorkeys.parentDetails.paymentMethod,
        header: headerKeys.parentDetails.paymentMethod,
      },
      {
        accessorKey: accessorkeys.parentDetails.paymentStatus,
        header: headerKeys.parentDetails.paymentStatus,
        cell: ({ row }: { row: { original: any } }) => {
          const status = row.original.payment_status
          const badgeClass =
            badgeMaps[status as keyof typeof badgeMaps]?.className
          return <span className={`badge ${badgeClass}`}>{status}</span>
        },
      },
      {
        accessorKey: accessorkeys.parentDetails.paymentDate,
        header: headerKeys.parentDetails.paymentDate,
        cell: ({ row }: { row: { original: any } }) =>
          row.original.payment_date
            ? new Date(row.original.payment_date).toLocaleDateString()
            : '—',
      },
    ],
    []
  )

  if (error || !parent) {
    return (
      <React.Fragment>
        <BreadCrumb
          title="Parent Details"
          subTitle={error ? 'Error' : 'Loading'}
        />
        <div className="grid grid-cols-12 gap-x-space">
          <div
            className={`col-span-12 card ${error ? 'bg-red-50 border border-red-200' : ''}`}>
            <div className="card-body">
              <p className={error ? 'text-red-700' : 'text-gray-500'}>
                {error ? 'Failed to fetch parent details.' : 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <BreadCrumb title="Parent Details" subTitle={parent.name} />
      <div className="grid grid-cols-12 gap-x-space">
        {/* Profile Card */}
        <div className="col-span-12 card">
          <div className="card-body">
            <div className="flex justify-between items-start mb-6 pb-6 border-b">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {parent.name}
                </h2>
                <p className="text-gray-500 text-sm mt-1">
                  {parent.user.phone_number}
                </p>
              </div>
              <span
                className={`badge inline-flex items-center gap-1 ${badgeMaps[String(parent.user.is_active) as keyof typeof badgeMaps]?.className}`}>
                {parent.user.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6 pb-6 border-b">
              <DetailRow label="Name" value={parent.name} />
              <DetailRow label="Phone" value={parent.user.phone_number} />
              <DetailRow label="Email" value={parent.email} />
              <DetailRow label="User ID" value={parent.user_id} mono />
              <DetailRow
                label="Joined"
                value={new Date(parent.created_at).toLocaleDateString('en-IN', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              />
              <DetailRow
                label="Status"
                value={parent.is_active ? 'Active' : 'Inactive'}
              />
            </div>
          </div>
        </div>

        {/* Linked Students */}
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">Linked Students</h6>
          </div>
          <div className="card-body">
            <TableContainer
              columns={studentColumns}
              data={parent.students || []}
              thClass="!font-medium cursor-pointer"
              divClass="overflow-x-auto table-box whitespace-nowrap"
              lastTrClass="text-end"
              tableClass="table flush"
              thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
            />
          </div>
        </div>

        {/* Subscriptions */}
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">Subscriptions</h6>
          </div>
          <div className="card-body">
            <TableContainer
              columns={subscriptionColumns}
              data={parent.subscriptions || []}
              thClass="!font-medium cursor-pointer"
              divClass="overflow-x-auto table-box whitespace-nowrap"
              lastTrClass="text-end"
              tableClass="table flush"
              thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
            />
          </div>
        </div>

        {/* Payments */}
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">Payments</h6>
          </div>
          <div className="card-body">
            <TableContainer
              columns={paymentColumns}
              data={parent.payments || []}
              thClass="!font-medium cursor-pointer"
              divClass="overflow-x-auto table-box whitespace-nowrap"
              lastTrClass="text-end"
              tableClass="table flush"
              thtrClass="text-gray-500 bg-gray-100 dark:bg-dark-850 dark:text-dark-500"
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default ParentDetails
