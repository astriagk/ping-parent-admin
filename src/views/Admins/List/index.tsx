'use client'

import React, { useMemo, useState } from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, badges, headerKeys } from '@src/shared/constants/columns'
import {
  useActivateAdminMutation,
  useCreateAdminMutation,
  useDeactivateAdminMutation,
  useGetAdminListQuery,
  useUpdateAdminMutation,
} from '@src/store/services/adminApi'
import { CirclePlus } from 'lucide-react'

interface AdminModalState {
  open: boolean
  mode: 'create' | 'edit' | 'view'
  data: any | null
}

const ROLES = ['admin', 'superadmin']

const AdminModal = ({
  state,
  onClose,
}: {
  state: AdminModalState
  onClose: () => void
}) => {
  const [createAdmin, { isLoading: creating }] = useCreateAdminMutation()
  const [updateAdmin, { isLoading: updating }] = useUpdateAdminMutation()

  const [form, setForm] = React.useState({
    username: state.data?.username ?? '',
    email: state.data?.email ?? '',
    phone_number: state.data?.phone_number ?? '',
    password: '',
    admin_role: state.data?.admin_role ?? 'admin',
  })

  React.useEffect(() => {
    setForm({
      username: state.data?.username ?? '',
      email: state.data?.email ?? '',
      phone_number: state.data?.phone_number ?? '',
      password: '',
      admin_role: state.data?.admin_role ?? 'admin',
    })
  }, [state.data])

  const isReadOnly = state.mode === 'view'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (state.mode === 'create') {
      await createAdmin(form).unwrap()
    } else if (state.mode === 'edit' && state.data) {
      await updateAdmin({
        admin_id: state.data.admin_id,
        username: form.username,
        email: form.email,
        phone_number: form.phone_number,
        admin_role: form.admin_role,
      }).unwrap()
    }
    onClose()
  }

  if (!state.open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-md p-6">
        <h5 className="text-lg font-semibold mb-4 capitalize">
          {state.mode === 'create'
            ? 'Create Admin'
            : state.mode === 'edit'
              ? 'Edit Admin'
              : 'Admin Details'}
        </h5>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="form-label">Name</label>
            <input
              className="form-input"
              value={form.username}
              readOnly={isReadOnly}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={form.email}
              readOnly={isReadOnly}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              value={form.phone_number}
              readOnly={isReadOnly}
              onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            />
          </div>
          {state.mode === 'create' && (
            <div>
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
            </div>
          )}
          <div>
            <label className="form-label">Role</label>
            <select
              className="form-select"
              value={form.admin_role}
              disabled={isReadOnly}
              onChange={(e) => setForm({ ...form, admin_role: e.target.value })}>
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn btn-light btn-sm" onClick={onClose}>
              {isReadOnly ? 'Close' : 'Cancel'}
            </button>
            {!isReadOnly && (
              <button
                type="submit"
                className="btn btn-primary btn-sm"
                disabled={creating || updating}>
                {state.mode === 'create' ? 'Create' : 'Save'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

const AdminsList = () => {
  const { data: adminListData } = useGetAdminListQuery()
  const [activateAdmin] = useActivateAdminMutation()
  const [deactivateAdmin] = useDeactivateAdminMutation()
  const [modal, setModal] = useState<AdminModalState>({ open: false, mode: 'create', data: null })

  const openCreate = () => setModal({ open: true, mode: 'create', data: null })
  const openEdit = (row: any) => setModal({ open: true, mode: 'edit', data: row })
  const openView = (row: any) => setModal({ open: true, mode: 'view', data: row })
  const closeModal = () => setModal({ open: false, mode: 'create', data: null })

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
      { accessorKey: accessorkeys.adminRole, header: headerKeys.adminRole },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: any } }) => {
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
        cell: ({ row }: { row: { original: any } }) => {
          const { is_active, admin_id } = row.original
          return (
            <div className="flex justify-end gap-2">
              {is_active ? (
                <button
                  className="btn btn-orange btn-sm"
                  onClick={() => deactivateAdmin(admin_id)}>
                  Deactivate
                </button>
              ) : (
                <button
                  className="btn btn-green btn-sm"
                  onClick={() => activateAdmin(admin_id)}>
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
            <DatatablesHover columns={columns} data={adminListData?.data || []} />
          </div>
        </div>
      </div>
      <AdminModal state={modal} onClose={closeModal} />
    </React.Fragment>
  )
}

export default AdminsList
