import React from 'react'

import { Modal } from '@src/shared/custom/modal/modal'

interface RejectModalProps {
  show: boolean
  handleHide: () => void
  handleReject: (reason: string) => void
}

const RejectModal: React.FC<RejectModalProps> = ({
  show,
  handleHide,
  handleReject,
}) => {
  const [reason, setReason] = React.useState('')

  return (
    <React.Fragment>
      <Modal
        isOpen={show}
        id="rejectModal"
        onClose={handleHide}
        title="Reject Driver"
        position="modal-center"
        size="modal-lg"
        content={(onClose) => (
          <>
            <div>
              <textarea
                name="textareaInput2"
                id="textareaInput2"
                rows={3}
                className="h-auto form-input"
                placeholder="Enter your description"
                value={reason}
                onChange={(e) => setReason(e.target.value)}></textarea>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button className="btn btn-light" onClick={onClose}>
                Cancel
              </button>
              <button
                className="btn btn-red"
                onClick={() => {
                  handleReject(reason)
                  setReason('')
                  onClose()
                }}>
                Reject
              </button>
            </div>
          </>
        )}
      />
    </React.Fragment>
  )
}
export default RejectModal
