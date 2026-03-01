'use client'

import React, { useEffect, useMemo, useState } from 'react'

import { DriverDocuments } from '@src/dtos/driver'
import { ApprovalStatus } from '@src/shared/constants/enums'
import TableContainer from '@src/shared/custom/table/table'
import { useUpdateDriverApprovalStatusMutation } from '@src/store/services/driverApi'
import { formatDate } from '@src/utils/dateFormatter'
import { toast } from 'react-toastify'

import RejectModal from './rejectModal'
import ViewModal from './viewModal'

const Reports = ({
  id,
  driverDocuments,
  approvalStatus,
}: {
  id: string
  driverDocuments?: DriverDocuments
  approvalStatus?: ApprovalStatus
}) => {
  const [reportData, setReportData] = useState<any[]>([])
  const [show, setShow] = useState<boolean>(false)
  const [view, setView] = useState<boolean>(false)
  const [driverDocumentState, setDriverDocumentState] = useState<{
    name?: string
    photo_url?: string
  }>({})
  const [updateDriverApprovalStatus, { isSuccess, isError }] =
    useUpdateDriverApprovalStatusMutation()

  useEffect(() => {
    if (driverDocuments) {
      setReportData([
        {
          id: driverDocuments._id,
          name: 'Driving License',
          date: formatDate(driverDocuments.created_at),
          photo_url: driverDocuments.driving_license_photo_url,
          number: driverDocuments.driving_license_number,
        },
        {
          id: driverDocuments._id,
          name: 'Vehicle License',
          date: formatDate(driverDocuments.created_at),
          photo_url: driverDocuments.vehicle_license_photo_url,
          number: driverDocuments.vehicle_license_number,
        },
        {
          id: driverDocuments._id,
          name: 'Insurance',
          date: formatDate(driverDocuments.created_at),
          photo_url: driverDocuments.insurance_photo_url,
          number: driverDocuments.insurance_number,
        },
      ])
    }
  }, [driverDocuments])

  const columns = useMemo(
    () => [
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Number',
        accessorKey: 'number',
      },
      {
        header: 'Action',
        accessorKey: 'action',
        cell: (value: { row: { original: any } }) => (
          <div className="flex items-center gap-2 justify-end">
            <button
              data-modal-target="viewModal"
              title="View"
              className="btn btn-sub-blue btn-icon !size-8 rounded-full"
              onClick={() => {
                setDriverDocumentState({
                  name: value.row.original.name,
                  photo_url: value.row.original.photo_url,
                })
                setView(true)
              }}>
              <i className="ri-eye-line"></i>
            </button>
            <button
              title="Download"
              className="btn btn-sub-purple btn-icon !size-8 rounded-full">
              <i className="ri-download-2-line"></i>
            </button>
          </div>
        ),
      },
    ],
    []
  )

  const toggleReject = () => {
    setShow(false)
  }

  const handleApprovalStatus = async (
    status: ApprovalStatus,
    reason?: string
  ) => {
    if (!id) return
    try {
      await updateDriverApprovalStatus({
        id: id,
        approval_status: status,
        ...(reason && { rejection_reason: reason }),
      }).unwrap()
      if (status === ApprovalStatus.REJECTED) {
        setShow(false)
      }
    } catch (error) {}
  }

  useEffect(() => {
    if (isSuccess)
      toast.success('Approval status updated successfully', {
        autoClose: 3000,
      })
    if (isError)
      toast.error('Failed to update approval status', {
        autoClose: 3000,
      })
  }, [isSuccess, isError])

  return (
    <React.Fragment>
      <div className="col-span-12 overflow-hidden xl:col-span-6 xl:row-span-2 card">
        <div className="flex items-center gap-3 card-header">
          <h6 className="card-title grow">Documents</h6>
          {approvalStatus === ApprovalStatus.PENDING && (
            <button
              className="btn btn-primary btn-md"
              onClick={() => handleApprovalStatus(ApprovalStatus.APPROVED)}>
              Approve
            </button>
          )}
          <button
            data-modal-target="rejectModal"
            className="btn btn-red btn-md"
            onClick={() => setShow(true)}>
            Reject
          </button>
        </div>
        <div className="pt-0 card-body">
          <div>
            <TableContainer
              columns={columns || []}
              data={reportData}
              divClass="overflow-x-auto table-box"
              tableClass="table flush even-striped whitespace-nowrap"
              isHeader={false}
            />
          </div>
        </div>
      </div>
      <ViewModal
        show={view}
        handleHide={() => {
          setView(false)
        }}
        driverDocument={driverDocumentState}
      />
      <RejectModal
        show={show}
        handleHide={toggleReject}
        handleReject={(reason: string) =>
          handleApprovalStatus(ApprovalStatus.REJECTED, reason)
        }
      />
    </React.Fragment>
  )
}

export default Reports
