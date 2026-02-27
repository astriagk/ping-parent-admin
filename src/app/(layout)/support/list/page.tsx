import RoleGuard from '@src/shared/common/RoleGuard'
import SupportList from '@src/views/Support/List'

const SupportPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin', 'admin']}>
      <SupportList />
    </RoleGuard>
  )
}

export default SupportPage
