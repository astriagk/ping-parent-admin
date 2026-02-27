import RoleGuard from '@src/shared/common/RoleGuard'
import PaymentList from '@src/views/Payment/List'

export default function Page() {
  return (
    <RoleGuard allowedRoles={['superadmin']}>
      <PaymentList />
    </RoleGuard>
  )
}
