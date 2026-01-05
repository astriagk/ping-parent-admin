import React from 'react'

import Image from 'next/image'

import avatar5 from '@assets/images/avatar/user-5.png'
import { Modal } from '@src/shared/custom/modal/modal'

interface ViewModalProps {
  show: boolean
  handleHide: () => void
  driverDocument?: {
    name?: string
    photo_url?: string
  }
}

const ViewModal: React.FC<ViewModalProps> = ({
  show,
  handleHide,
  driverDocument: { name, photo_url } = {},
}) => {
  return (
    <React.Fragment>
      <Modal
        isOpen={show}
        id="viewModal"
        onClose={handleHide}
        title={name}
        position="modal-center"
        size="modal-lg"
        isFooter={false}
        content={(onClose) => (
          <>
            <Image
              src={photo_url ?? avatar5}
              alt={photo_url ? 'Driver Document' : 'Default Avatar'}
              width={200}
              height={600}
              className="rounded-md w-full h-[600px]"
            />
          </>
        )}
      />
    </React.Fragment>
  )
}
export default ViewModal
