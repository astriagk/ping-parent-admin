'use client'

import React, { useMemo, useState } from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, badges, headerKeys } from '@src/shared/constants/columns'
import { ModelModes, UserRolesType } from '@src/shared/constants/enums'
import { MESSAGES } from '@src/shared/constants/messages'
import {
  useActivateAdminMutation,
  useDeactivateAdminMutation,
  useGetAdminListQuery,
} from '@src/store/services/adminApi'
import { CirclePlus } from 'lucide-react'
import { toast } from 'react-toastify'

import AdminModal, { AdminModalState } from './adminModal'

const AdminsList = () => {
  const { data: adminListData } = useGetAdminListQuery()
  const [activateAdmin] = useActivateAdminMutation()
  const [deactivateAdmin] = useDeactivateAdminMutation()
  const [modal, setModal] = useState<AdminModalState>({
    open: false,
    mode: ModelModes.CREATE,
    data: null,
  })

  const openCreate = () =>
    setModal({ open: true, mode: ModelModes.CREATE, data: null })
  const openEdit = (row: any) =>
    setModal({ open: true, mode: ModelModes.EDIT, data: row })
  const openView = (row: any) =>
    setModal({ open: true, mode: ModelModes.VIEW, data: row })
  const closeModal = () =>
    setModal({ open: false, mode: ModelModes.CREATE, data: null })

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.username, header: headerKeys.username },
      { accessorKey: accessorkeys.email, header: headerKeys.email },
      { accessorKey: accessorkeys.phoneNumber, header: headerKeys.phoneNumber },
      {
        accessorKey: accessorkeys.adminRole,
        header: headerKeys.adminRole,
        cell: ({ row }: { row: { original: any } }) => {
          const role = row.original[accessorkeys.adminRole]
          // Only show if role exists in UserRolesType, else fallback to raw value
          return UserRolesType[role as keyof typeof UserRolesType] || role
        },
      },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: any } }) => {
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
        cell: ({ row }: { row: { original: any } }) => {
          const { is_active, _id } = row.original

          const handleActivate = async () => {
            try {
              const result = await activateAdmin(_id).unwrap()
              toast.success(
                result?.message || MESSAGES.ADMIN.SUCCESS.ADMIN_UPDATED
              )
            } catch (error: any) {
              const errorMsg =
                error?.data?.error ||
                error?.message ||
                MESSAGES.ADMIN.ERROR.UPDATE_FAILED
              toast.error(errorMsg)
            }
          }

          const handleDeactivate = async () => {
            try {
              const result = await deactivateAdmin(_id).unwrap()
              toast.success(
                result?.message || MESSAGES.ADMIN.SUCCESS.ADMIN_UPDATED
              )
            } catch (error: any) {
              const errorMsg =
                error?.data?.error ||
                error?.message ||
                MESSAGES.ADMIN.ERROR.UPDATE_FAILED
              toast.error(errorMsg)
            }
          }

          return (
            <div className="flex justify-end gap-2">
              {is_active ? (
                <button
                  className="btn btn-orange btn-sm"
                  onClick={handleDeactivate}>
                  Deactivate
                </button>
              ) : (
                <button
                  className="btn btn-green btn-sm"
                  onClick={handleActivate}>
                  Activate
                </button>
              )}
              <button
                className="btn btn-sky btn-sm"
                onClick={() => openEdit(row.original)}>
                Edit
              </button>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => openView(row.original)}>
                View
              </button>
            </div>
          )
        },
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="Admins List" subTitle="Admins" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header flex justify-end">
            <button className="btn btn-primary shrink-0" onClick={openCreate}>
              <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
              Create Admin
            </button>
          </div>
          <div className="card-body">
            <DatatablesHover
              columns={columns}
              data={adminListData?.data || []}
            />
          </div>
        </div>
      </div>
      <AdminModal state={modal} onClose={closeModal} />
    </React.Fragment>
  )
}

export default AdminsList
