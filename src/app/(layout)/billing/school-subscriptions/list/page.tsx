import RoleGuard from '@src/shared/common/RoleGuard'
import SchoolSubscriptionsList from '@src/views/Billing/SchoolSubscriptions/List'

const SchoolSubscriptionsPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin', 'school_admin']}>
      <SchoolSubscriptionsList />
    </RoleGuard>
  )
}

export default SchoolSubscriptionsPage
