import RoleGuard from '@src/shared/common/RoleGuard'
import RedemptionCodesList from '@src/views/Billing/RedemptionCodes/List'

const RedemptionCodesPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin', 'school_admin']}>
      <RedemptionCodesList />
    </RoleGuard>
  )
}

export default RedemptionCodesPage
