import RoleGuard from '@src/shared/common/RoleGuard'
import RolesList from '@src/views/Roles/List'

const RolesListPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin']}>
      <RolesList />
    </RoleGuard>
  )
}

export default RolesListPage
