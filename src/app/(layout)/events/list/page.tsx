import RoleGuard from '@src/shared/common/RoleGuard'
import EventsList from '@src/views/Events/List'

const EventsPage = () => {
  return (
    <RoleGuard allowedRoles={['school_admin']}>
      <EventsList />
    </RoleGuard>
  )
}

export default EventsPage
