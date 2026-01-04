import React from 'react'

import BreadCrumb from '@src/shared/common/BreadCrumb'
import DatatablesHover from '@src/shared/components/Table/DatatablesHover'

const AdminsList = () => {
  return (
    <React.Fragment>
      <BreadCrumb title="Admins List" subTitle="Admins" />
      <div className="grid grid-cols-12 gap-x-space">
        <div className="col-span-12 card">
          <div className="card-header">
            <h6 className="card-title">Admins List</h6>
          </div>
          <div className="card-body">
            <DatatablesHover />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default AdminsList
