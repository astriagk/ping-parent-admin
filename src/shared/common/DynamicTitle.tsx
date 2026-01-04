export const paths = {
  AUTH: {
    SIGNIN_BASIC: '/auth/signin-basic',
  },
  ADMINS: {
    LIST: '/admins/list',
  },
}

export const titles = {
  AUTH: {
    SIGNIN_BASIC: 'Authentication Sign in',
  },
  ADMINS: {
    LIST: 'Admins List',
  },
}

export const routes = [
  { path: paths.AUTH.SIGNIN_BASIC, title: titles.AUTH.SIGNIN_BASIC },
  { path: paths.ADMINS.LIST, title: titles.ADMINS.LIST },
]
