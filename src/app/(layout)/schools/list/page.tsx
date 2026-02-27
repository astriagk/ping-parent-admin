import RoleGuard from '@src/shared/common/RoleGuard'
import SchoolsList from '@src/views/School/List'

const SchoolsListPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin', 'admin']}>
      <SchoolsList />
    </RoleGuard>
  )
}

export default SchoolsListPage
