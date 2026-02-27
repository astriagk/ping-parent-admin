import RoleGuard from '@src/shared/common/RoleGuard'
import Reports from '@src/views/Reports'

const ReportsPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin', 'admin']}>
      <Reports />
    </RoleGuard>
  )
}

export default ReportsPage
