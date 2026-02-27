import RoleGuard from '@src/shared/common/RoleGuard'
import DriverStudentAssignmentsList from '@src/views/Assignments/DriverStudent/List'

const DriverStudentAssignmentsPage = () => {
  return (
    <RoleGuard allowedRoles={['school_admin']}>
      <DriverStudentAssignmentsList />
    </RoleGuard>
  )
}

export default DriverStudentAssignmentsPage
