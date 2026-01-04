const AuthTags = {
  AUTH: 'Auth',
  ADMIN: 'Admin',
} as const

type AuthTagsType = typeof AuthTags

const ApiMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const

type UserRolesType = {
  SUPERADMIN: 'superadmin'
  ADMIN: 'admin'
  MODERATOR: 'moderator'
}

export { AuthTags, ApiMethods, type UserRolesType }
