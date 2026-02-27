import RoleGuard from '@src/shared/common/RoleGuard'
import AdsList from '@src/views/Ads/List'

const AdsPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin', 'admin']}>
      <AdsList />
    </RoleGuard>
  )
}

export default AdsPage
