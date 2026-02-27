export const paths = {
  AUTH: {
    SIGNIN_BASIC: '/auth/signin-basic',
  },
  DASHBOARD: '/dashboard',
  ADMINS: {
    LIST: '/admins/list',
  },
  USERS: {
    DRIVERS_LIST: '/users/drivers/list',
    PARENTS_LIST: '/users/parents/list',
    DRIVER_DETAILS: '/users/drivers/details',
    PARENT_DETAILS: '/users/parents/details',
  },
  SCHOOLS: {
    LIST: '/schools/list',
    SCHOOL_ADMINS_LIST: '/schools/school-admins/list',
    SCHOOL_DRIVERS_LIST: '/schools/school-drivers/list',
  },
  TRIPS: {
    LIST: '/trips/list',
    LIVE_TRACKING: '/trips/live-tracking',
  },
  ASSIGNMENTS: {
    DRIVER_STUDENT: '/assignments/driver-student/list',
    SCHOOL_ASSIGNMENTS: '/assignments/school-assignments/list',
  },
  BILLING: {
    SUBSCRIPTION_PLANS: '/billing/subscription-plans/list',
    PARENT_SUBSCRIPTIONS: '/billing/parent-subscriptions/list',
    SCHOOL_SUBSCRIPTIONS: '/billing/school-subscriptions/list',
    REDEMPTION_CODES: '/billing/redemption-codes/list',
  },
  PAYMENTS: {
    LIST: '/payments/list',
  },
  ADS: {
    LIST: '/ads/list',
  },
  SUPPORT: {
    LIST: '/support/list',
  },
  REPORTS: '/reports',
  EVENTS: {
    LIST: '/events/list',
    RSVPS: '/events/rsvps/list',
  },
  COMMUNITY: {
    LIST: '/community/list',
  },
  STUDENTS: {
    LIST: '/students/list',
  },
  ROLES: {
    LIST: '/roles/list',
  },
  AUDIT_LOGS: {
    LIST: '/audit-logs/list',
  },
  NOTIFICATIONS: {
    LIST: '/notifications/list',
  },
  RATINGS: {
    LIST: '/ratings-reviews/list',
  },
  SETTINGS: '/settings',
}

export const routes = [
  { path: paths.AUTH.SIGNIN_BASIC, title: 'Sign In' },
  { path: paths.DASHBOARD, title: 'Dashboard' },
  { path: paths.ADMINS.LIST, title: 'Admins List' },
  { path: paths.USERS.DRIVERS_LIST, title: 'Driver Approvals' },
  { path: paths.USERS.PARENTS_LIST, title: 'Parents List' },
  { path: paths.USERS.DRIVER_DETAILS, title: 'Driver Details' },
  { path: paths.USERS.PARENT_DETAILS, title: 'Parent Details' },
  { path: paths.SCHOOLS.LIST, title: 'Manage Schools' },
  { path: paths.SCHOOLS.SCHOOL_ADMINS_LIST, title: 'School Admins' },
  { path: paths.SCHOOLS.SCHOOL_DRIVERS_LIST, title: 'School Drivers' },
  { path: paths.TRIPS.LIST, title: 'Trips' },
  { path: paths.TRIPS.LIVE_TRACKING, title: 'Live Tracking' },
  { path: paths.ASSIGNMENTS.DRIVER_STUDENT, title: 'Driver Assignments' },
  { path: paths.ASSIGNMENTS.SCHOOL_ASSIGNMENTS, title: 'School Assignments' },
  { path: paths.BILLING.SUBSCRIPTION_PLANS, title: 'Subscription Plans' },
  { path: paths.BILLING.PARENT_SUBSCRIPTIONS, title: 'Parent Subscriptions' },
  { path: paths.BILLING.SCHOOL_SUBSCRIPTIONS, title: 'School Subscription' },
  { path: paths.BILLING.REDEMPTION_CODES, title: 'Student Codes' },
  { path: paths.PAYMENTS.LIST, title: 'Payments' },
  { path: paths.ADS.LIST, title: 'Manage Ads' },
  { path: paths.SUPPORT.LIST, title: 'Support Tickets' },
  { path: paths.REPORTS, title: 'Reports' },
  { path: paths.EVENTS.LIST, title: 'School Events' },
  { path: paths.EVENTS.RSVPS, title: 'Event RSVPs' },
  { path: paths.COMMUNITY.LIST, title: 'Community Board' },
  { path: paths.STUDENTS.LIST, title: 'Students' },
  { path: paths.ROLES.LIST, title: 'Roles & Permissions' },
  { path: paths.AUDIT_LOGS.LIST, title: 'Audit Logs' },
  { path: paths.NOTIFICATIONS.LIST, title: 'Notifications' },
  { path: paths.RATINGS.LIST, title: 'Ratings & Reviews' },
  { path: paths.SETTINGS, title: 'Settings' },
]
