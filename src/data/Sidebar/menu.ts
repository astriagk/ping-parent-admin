import { MegaMenu } from '@src/dtos'

const menu: MegaMenu[] = [
  // ── Dashboard ─────────────────────────────────────────────
  {
    separator: true,
    title: 'Dashboard',
    lang: 'pe-dashboard',
    children: [],
  },
  {
    title: 'Dashboard',
    lang: 'pe-dashboard',
    icon: 'layout-dashboard',
    link: '/dashboard',
    separator: false,
    children: [],
  },

  // ── User Management ───────────────────────────────────────
  {
    separator: true,
    title: 'User Management',
    lang: 'pe-user-management',
    children: [],
  },
  {
    title: 'User Management',
    lang: 'pe-user-management',
    icon: 'users-round',
    link: '#',
    separator: false,
    children: [
      {
        title: 'Parents',
        lang: 'pe-parents',
        link: '/users/parents',
        dropdownPosition: null,
        children: [
          {
            title: 'List',
            lang: 'pe-list',
            link: '/users/parents/list',
            dropdownPosition: null,
            children: [],
          },
        ],
      },
      {
        title: 'Drivers',
        lang: 'pe-drivers',
        link: '/users/drivers',
        dropdownPosition: null,
        children: [
          {
            title: 'List',
            lang: 'pe-list',
            link: '/users/drivers/list',
            dropdownPosition: null,
            children: [],
          },
        ],
      },
      {
        title: 'Students',
        lang: 'pe-students',
        link: '/users/students',
        dropdownPosition: null,
        children: [
          {
            title: 'List',
            lang: 'pe-list',
            link: '/users/students/list',
            dropdownPosition: null,
            children: [],
          },
        ],
      },
    ],
  },

  // ── Admin Management ──────────────────────────────────────
  {
    separator: true,
    title: 'Admin Management',
    lang: 'pe-admins',
    children: [],
    allowedRoles: ['superadmin', 'admin'],
  },
  {
    title: 'Admins',
    lang: 'pe-admins',
    icon: 'shield-user',
    link: '#',
    separator: false,
    allowedRoles: ['superadmin', 'admin'],
    children: [
      {
        title: 'List',
        lang: 'pe-list',
        link: '/admins/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },

  // ── School Management ─────────────────────────────────────
  {
    separator: true,
    title: 'School Management',
    lang: 'pe-schools',
    children: [],
  },
  {
    title: 'Schools',
    lang: 'pe-schools',
    icon: 'school',
    link: '#',
    separator: false,
    children: [
      {
        title: 'Schools',
        lang: 'pe-schools-list',
        link: '/schools/list',
        dropdownPosition: null,
        children: [],
      },
      {
        title: 'School Admins',
        lang: 'pe-school-admins',
        link: '/schools/school-admins/list',
        dropdownPosition: null,
        children: [],
      },
      {
        title: 'School Drivers',
        lang: 'pe-school-drivers',
        link: '/schools/school-drivers/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },

  // ── Trip Management ───────────────────────────────────────
  {
    separator: true,
    title: 'Trip Management',
    lang: 'pe-trips',
    children: [],
  },
  {
    title: 'Trip Management',
    lang: 'pe-trips',
    icon: 'map-pin',
    link: '#',
    separator: false,
    children: [
      {
        title: 'All Trips',
        lang: 'pe-all-trips',
        link: '/trips/list',
        dropdownPosition: null,
        children: [],
      },
      {
        title: 'Live Tracking',
        lang: 'pe-live-tracking',
        link: '/trips/live-tracking',
        dropdownPosition: null,
        children: [],
      },
    ],
  },

  // ── Assignments ───────────────────────────────────────────
  {
    separator: true,
    title: 'Assignments',
    lang: 'pe-assignments',
    children: [],
  },
  {
    title: 'Assignments',
    lang: 'pe-assignments',
    icon: 'clipboard-list',
    link: '#',
    separator: false,
    children: [
      {
        title: 'Driver-Student',
        lang: 'pe-driver-student',
        link: '/assignments/driver-student/list',
        dropdownPosition: null,
        children: [],
      },
      {
        title: 'School Assignments',
        lang: 'pe-school-assignments',
        link: '/assignments/school-assignments/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },

  // ── Billing ───────────────────────────────────────────────
  {
    separator: true,
    title: 'Billing',
    lang: 'pe-billing',
    children: [],
  },
  {
    title: 'Billing',
    lang: 'pe-billing',
    icon: 'credit-card',
    link: '#',
    separator: false,
    children: [
      {
        title: 'Subscription Plans',
        lang: 'pe-subscription-plans',
        link: '/billing/subscription-plans/list',
        dropdownPosition: null,
        children: [],
      },
      {
        title: 'Parent Subscriptions',
        lang: 'pe-parent-subscriptions',
        link: '/billing/parent-subscriptions/list',
        dropdownPosition: null,
        children: [],
      },
      {
        title: 'School Subscriptions',
        lang: 'pe-school-subscriptions',
        link: '/billing/school-subscriptions/list',
        dropdownPosition: null,
        children: [],
      },
      {
        title: 'Redemption Codes',
        lang: 'pe-redemption-codes',
        link: '/billing/redemption-codes/list',
        dropdownPosition: null,
        children: [],
      },
      {
        title: 'Payments',
        lang: 'pe-payments',
        link: '/payments/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },

  // ── Other Sections ────────────────────────────────────────
  {
    separator: true,
    title: 'Others',
    lang: 'pe-others',
    children: [],
  },
  {
    title: 'Roles & Permissions',
    lang: 'pe-roles',
    icon: 'shield',
    link: '#',
    separator: false,
    allowedRoles: ['superadmin', 'admin'],
    children: [
      {
        title: 'List',
        lang: 'pe-list',
        link: '/roles/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },
  {
    title: 'Ratings & Reviews',
    lang: 'pe-ratings',
    icon: 'star',
    link: '#',
    separator: false,
    children: [
      {
        title: 'List',
        lang: 'pe-list',
        link: '/ratings-reviews/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },
  {
    title: 'Audit Logs',
    lang: 'pe-audit-logs',
    icon: 'file-text',
    link: '#',
    separator: false,
    allowedRoles: ['superadmin', 'admin'],
    children: [
      {
        title: 'List',
        lang: 'pe-list',
        link: '/audit-logs/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },
  {
    title: 'Notifications',
    lang: 'pe-notifications',
    icon: 'bell',
    link: '#',
    separator: false,
    children: [
      {
        title: 'List',
        lang: 'pe-list',
        link: '/notifications/list',
        dropdownPosition: null,
        children: [],
      },
    ],
  },
  {
    title: 'Settings',
    lang: 'pe-settings',
    icon: 'settings',
    link: '/settings',
    separator: false,
    children: [],
  },
]

export { menu }
