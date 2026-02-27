import RoleGuard from '@src/shared/common/RoleGuard'
import AuditLogsList from '@src/views/AuditLogs/List'

const AuditLogsPage = () => {
  return (
    <RoleGuard allowedRoles={['superadmin']}>
      <AuditLogsList />
    </RoleGuard>
  )
}

export default AuditLogsPage
