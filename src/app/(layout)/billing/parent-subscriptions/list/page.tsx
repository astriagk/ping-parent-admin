import RoleGuard from '@src/shared/common/RoleGuard'
import ParentSubscriptionsList from '@src/views/Billing/ParentSubscriptions/List'

const ParentSubscriptionsPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin']}>
      <ParentSubscriptionsList />
    </RoleGuard>
  )
}

export default ParentSubscriptionsPage
