'use client'

import React, { useMemo, useState } from 'react'

import { SchoolListItem } from '@src/dtos/school'
import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'
import { accessorkeys, headerKeys } from '@src/shared/constants/columns'
import { ModelModes } from '@src/shared/constants/enums'
import { useGetSchoolsListQuery } from '@src/store/services/schoolApi'
import { CirclePlus } from 'lucide-react'

import AddSchoolModal from './addSchoolModal'

const SchoolsList = () => {
  const { data: schoolsListData, isLoading } = useGetSchoolsListQuery()
  const [addSchoolModalOpen, setAddSchoolModalOpen] = useState(false)
  const [modalMode, setModalMode] = useState<ModelModes>(ModelModes.ADD)
  const [selectedSchool, setSelectedSchool] = useState<SchoolListItem | null>(
    null
  )

  const handleAddSchool = () => {
    setModalMode(ModelModes.ADD)
    setSelectedSchool(null)
    setAddSchoolModalOpen(true)
  }

  const handleEditSchool = (school: SchoolListItem) => {
    setModalMode(ModelModes.EDIT)
    setSelectedSchool(school)
    setAddSchoolModalOpen(true)
  }

  const handleViewSchool = (school: SchoolListItem) => {
    setModalMode(ModelModes.VIEW)
    setSelectedSchool(school)
    setAddSchoolModalOpen(true)
  }

  const columns = useMemo(
    () => [
      {
        accessorKey: accessorkeys.id,
        header: headerKeys.id,
        cell: ({ row }: { row: { index: number } }) => row.index + 1,
      },
      {
        accessorKey: accessorkeys.schoolName,
        header: headerKeys.schoolName,
      },
      { accessorKey: accessorkeys.city, header: headerKeys.city },
      { accessorKey: accessorkeys.state, header: headerKeys.state },
      {
        accessorKey: accessorkeys.contactNumber,
        header: headerKeys.contactNumber,
      },
      { accessorKey: accessorkeys.email, header: headerKeys.email },
      {
        accessorKey: accessorkeys.actions,
        header: headerKeys.actions,
        cell: ({ row }: { row: { original: SchoolListItem } }) => {
          return (
            <div className="flex gap-2">
              <button
                className="btn btn-primary btn-sm"
                onClick={() => handleEditSchool(row.original)}>
                Edit
              </button>
              <button
                className="btn btn-gray btn-sm"
                onClick={() => handleViewSchool(row.original)}>
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
      <BreadCrumb title="Schools List" subTitle="Schools" />
      <div className="col-span-12 md:col-span-3 lg:col-span-3 lg:col-start-10 xxl:col-span-2 xxl:col-start-11 ltr:md:text-right rtl:md:text-left mb-4">
        <button
          className="btn btn-primary shrink-0"
          data-modal-target="parentsCreateModal"
          onClick={handleAddSchool}>
          <CirclePlus className="inline-block ltr:mr-1 rtl:ml-1 size-4" />
          Add School
        </button>
      </div>
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-body">
            <DatatablesHover
              columns={columns}
              data={schoolsListData?.data || []}
            />
          </div>
        </div>
      </div>
      <AddSchoolModal
        show={addSchoolModalOpen}
        handleHide={() => setAddSchoolModalOpen(false)}
        mode={modalMode}
        schoolData={selectedSchool}
      />
    </React.Fragment>
  )
}

export default SchoolsList
