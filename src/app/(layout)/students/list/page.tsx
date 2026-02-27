import RoleGuard from '@src/shared/common/RoleGuard'
import SchoolStudentsList from '@src/views/Students/List'

const StudentsPage = () => {
  return (
    <RoleGuard allowedRoles={['school_admin']}>
      <SchoolStudentsList />
    </RoleGuard>
  )
}

export default StudentsPage
