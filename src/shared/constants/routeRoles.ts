/**
 * Centralized route-to-role mapping.
 * Routes not listed here are accessible to any authenticated user.
 */
export const routeRoles: Record<string, string[]> = {
  '/admins/list': ['superadmin'],
  '/billing/subscription-plans/list': ['superadmin'],
  '/billing/parent-subscriptions/list': ['superadmin'],
  '/billing/school-subscriptions/list': ['superadmin', 'school_admin'],
  '/billing/redemption-codes/list': ['superadmin', 'school_admin'],
  '/payments/list': ['superadmin'],
  '/schools/list': ['superadmin', 'admin'],
  '/schools/school-admins/list': ['superadmin', 'admin'],
  '/assignments/driver-student/list': ['school_admin'],
  '/audit-logs/list': ['superadmin'],
  '/roles/list': ['superadmin'],
  '/ads/list': ['superadmin', 'admin'],
  '/reports': ['superadmin', 'admin'],
  '/support/list': ['superadmin', 'admin'],
  '/community/list': ['school_admin'],
  '/events/list': ['school_admin'],
  '/events/rsvps/list': ['school_admin'],
  '/students/list': ['school_admin'],
}
