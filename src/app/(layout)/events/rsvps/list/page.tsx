import RoleGuard from '@src/shared/common/RoleGuard'
import EventRSVPs from '@src/views/Events/RSVPs'

const EventRSVPsPage = () => {
  return (
    <RoleGuard allowedRoles={['school_admin']}>
      <EventRSVPs />
    </RoleGuard>
  )
}

export default EventRSVPsPage
