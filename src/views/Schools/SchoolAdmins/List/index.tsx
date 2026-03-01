'use client'

import React, { useMemo, useState } from 'react'

import { AdminListItem } from '@src/dtos/admin'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, badges, headerKeys } from '@src/shared/constants/columns'
import { UserRoles } from '@src/shared/constants/enums'
import { MESSAGES } from '@src/shared/constants/messages'
import {
  useCreateAdminMutation,
  useDeactivateAdminMutation,
  useGetAdminListQuery,
} from '@src/store/services/adminApi'
import { useDeactivateSchoolAdminMutation } from '@src/store/services/schoolAdminApi'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import { CirclePlus } from 'lucide-react'
import Select from 'react-select'
import { toast } from 'react-toastify'

const RegisterSchoolAdminModal = ({
  open,
  schoolId,
  onClose,
}: {
  open: boolean
  schoolId: string
  onClose: () => void
}) => {
  const [registerAdmin, { isLoading }] = useCreateAdminMutation()
  const [form, setForm] = useState({
    username: '',
    email: '',
    phone_number: '',
    password: '',
    admin_role: UserRoles.SCHOOL_ADMIN,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await registerAdmin({ school_id: schoolId, ...form }).unwrap()
    setForm({
      username: '',
      email: '',
      phone_number: '',
      password: '',
      admin_role: UserRoles.SCHOOL_ADMIN,
    })
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
              value={form.username}
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
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input
              className="form-input"
              value={form.phone_number}
              onChange={(e) =>
                setForm({ ...form, phone_number: e.target.value })
              }
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
            <button
              type="button"
              className="btn btn-light btn-sm"
              onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-sm"
              disabled={isLoading}>
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
  const { data: schoolsList } = useGetSchoolsListQuery()
  const [selectedSchoolId, setSelectedSchoolId] = React.useState<string>(() => {
    const first = schoolsList?.data?.[0]?._id
    return first || ''
  })
  const [modalOpen, setModalOpen] = useState(false)
  const [deactivateAdmin] = useDeactivateAdminMutation()

  const firstSchoolId = selectedSchoolId || schoolsData?.data?.[0]?._id || ''

  const { data: schoolAdminsData } = useGetAdminListQuery()

  const schoolAdmins = useMemo(() => {
    return (
      schoolAdminsData?.data?.filter(
        (sa: AdminListItem) =>
          sa.is_active === true && sa.admin_role === UserRoles.SCHOOL_ADMIN
      ) || []
    )
  }, [schoolAdminsData])

  const handleDeactivate = async (adminId: string) => {
    try {
      const result = await deactivateAdmin(adminId).unwrap()
      toast.success(result?.message || MESSAGES.ADMIN.SUCCESS.ADMIN_UPDATED)
    } catch (error: any) {
      const errorMsg =
        error?.data?.error ||
        error?.message ||
        MESSAGES.ADMIN.ERROR.UPDATE_FAILED
      toast.error(errorMsg)
    }
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      { accessorKey: accessorkeys.email, header: headerKeys.email },
      { accessorKey: accessorkeys.phoneNumber, header: headerKeys.phoneNumber },
      {
        accessorKey: accessorkeys.isActive,
        header: headerKeys.isActive,
        cell: ({ row }: { row: { original: AdminListItem } }) => {
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
        cell: ({ row }: { row: { original: AdminListItem } }) => (
          <div className="flex justify-end gap-2">
            <button
              className="btn btn-orange btn-sm"
              onClick={() => {
                handleDeactivate(row.original._id)
              }}>
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
              <div id="sortingByClass" className="w-full min-w-[260px]">
                <Select
                  classNamePrefix="select"
                  options={(schoolsData?.data || []).map((school: any) => ({
                    value: school._id,
                    label: school.school_name,
                  }))}
                  value={
                    (schoolsData?.data || [])
                      .map((school: any) => ({
                        value: school._id,
                        label: school.school_name,
                      }))
                      .find((opt) => opt.value === selectedSchoolId) || null
                  }
                  onChange={(option: any) =>
                    setSelectedSchoolId(option ? option.value : '')
                  }
                  placeholder="Select school"
                  isClearable={true}
                />
              </div>
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
            <DatatablesHover columns={columns} data={schoolAdmins || []} />
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
