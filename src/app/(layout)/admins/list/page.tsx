import RoleGuard from '@src/shared/common/RoleGuard'
import AdminsList from '@src/views/Admins/List'

const AdminsListPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin']}>
      <AdminsList />
    </RoleGuard>
  )
}

export default AdminsListPage
