export const paths = {
  AUTH: {
    SIGNIN_BASIC: '/auth/signin-basic',
  },
  ADMINS: {
    LIST: '/admins/list',
  },
  USERS: {
    DRIVERS_LIST: '/users/drivers/list',
    PARENTS_LIST: '/users/parents/list',
    DRIVER_DETAILS: '/users/drivers/details',
    PARENT_DETAILS: '/users/parents/details',
  },
}

export const titles = {
  AUTH: {
    SIGNIN_BASIC: 'Authentication Sign in',
  },
  ADMINS: {
    LIST: 'Admins List',
  },
  USERS: {
    DRIVERS_LIST: 'Drivers List',
    PARENTS_LIST: 'Parents List',
    DRIVER_DETAILS: 'Driver Details',
    PARENT_DETAILS: 'Parent Details',
  },
}

export const routes = [
  { path: paths.AUTH.SIGNIN_BASIC, title: titles.AUTH.SIGNIN_BASIC },
  { path: paths.ADMINS.LIST, title: titles.ADMINS.LIST },
  { path: paths.USERS.DRIVERS_LIST, title: titles.USERS.DRIVERS_LIST },
  { path: paths.USERS.PARENTS_LIST, title: titles.USERS.PARENTS_LIST },
  { path: paths.USERS.DRIVER_DETAILS, title: titles.USERS.DRIVER_DETAILS },
  { path: paths.USERS.PARENT_DETAILS, title: titles.USERS.PARENT_DETAILS },
]
