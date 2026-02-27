import RoleGuard from '@src/shared/common/RoleGuard'
import CommunityList from '@src/views/Community/List'

const CommunityPage = () => {
  return (
    <RoleGuard allowedRoles={['school_admin']}>
      <CommunityList />
    </RoleGuard>
  )
}

export default CommunityPage
