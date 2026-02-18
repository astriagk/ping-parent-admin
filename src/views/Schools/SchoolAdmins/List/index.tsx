'use client'

import React, { useMemo, useState } from 'react'

import { SchoolAdmin } from '@src/dtos/schoolAdmin'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, badges, headerKeys } from '@src/shared/constants/columns'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import {
  useDeactivateSchoolAdminMutation,
  useGetSchoolAdminsQuery,
  useRegisterSchoolAdminMutation,
} from '@src/store/services/schoolAdminApi'
import { CirclePlus } from 'lucide-react'

interface RegisterModal {
  open: boolean
}

const RegisterSchoolAdminModal = ({
  open,
  schoolId,
  onClose,
}: {
  open: boolean
  schoolId: string
  onClose: () => void
}) => {
  const [registerAdmin, { isLoading }] = useRegisterSchoolAdminMutation()
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone_number: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await registerAdmin({ school_id: schoolId, ...form }).unwrap()
    setForm({ name: '', email: '', phone_number: '', password: '' })
    onClose()
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-dark-900 rounded-lg shadow-xl w-full max-w-md p-6">
        <h5 className="text-lg font-semibold mb-4">Register School Admin</h5>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              value={form.phone_number}
              onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
            />
          </div>
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
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="btn btn-light btn-sm" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm" disabled={isLoading}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

const SchoolAdminsList = () => {
  const { data: schoolsData } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = React.useState<string>('')
  const [modalOpen, setModalOpen] = useState(false)
  const [deactivateAdmin] = useDeactivateSchoolAdminMutation()

  const firstSchoolId = selectedSchoolId || schoolsData?.data?.[0]?.school_id || ''

  const { data: schoolAdminsData } = useGetSchoolAdminsQuery(firstSchoolId, {
    skip: !firstSchoolId,
  })

  const handleDeactivate = (adminId: string) => {
    if (window.confirm('Deactivate this school admin?')) {
      deactivateAdmin(adminId)
    }
  }

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
      { accessorKey: accessorkeys.schoolName, header: headerKeys.schoolName },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: SchoolAdmin } }) => {
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
        cell: ({ row }: { row: { original: SchoolAdmin } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-orange btn-sm"
              onClick={() => handleDeactivate(row.original.admin_id)}>
              Deactivate
            </button>
          </div>
        ),
      },
    ],
    []
  )

  return (
    <React.Fragment>
      <BreadCrumb title="School Admins" subTitle="Schools" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <label className="font-medium text-sm">Select School:</label>
              <select
                className="form-select w-64"
                value={selectedSchoolId}
                onChange={(e) => setSelectedSchoolId(e.target.value)}>
                {schoolsData?.data?.map((school) => (
                  <option key={school.school_id} value={school.school_id}>
                    {school.school_name}
                  </option>
                ))}
              </select>
            </div>
            <button
              className="btn btn-primary shrink-0"
              disabled={!firstSchoolId}
              onClick={() => setModalOpen(true)}>
              <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
              Register School Admin
            </button>
          </div>
          <div className="pt-4 card-body">
            <DatatablesHover
              columns={columns}
              data={schoolAdminsData?.data || []}
            />
          </div>
        </div>
      </div>
      <RegisterSchoolAdminModal
        open={modalOpen}
        schoolId={firstSchoolId}
        onClose={() => setModalOpen(false)}
      />
    </React.Fragment>
  )
}

export default SchoolAdminsList
