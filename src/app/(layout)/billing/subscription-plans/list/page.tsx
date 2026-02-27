import RoleGuard from '@src/shared/common/RoleGuard'
import SubscriptionPlansList from '@src/views/Billing/SubscriptionPlans/List'

const SubscriptionPlansPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin']}>
      <SubscriptionPlansList />
    </RoleGuard>
  )
}

export default SubscriptionPlansPage
