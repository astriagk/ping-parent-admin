import RoleGuard from '@src/shared/common/RoleGuard'
import SchoolAdminsList from '@src/views/Schools/SchoolAdmins/List'

const SchoolAdminsListPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin', 'admin']}>
      <SchoolAdminsList />
    </RoleGuard>
  )
}

export default SchoolAdminsListPage
