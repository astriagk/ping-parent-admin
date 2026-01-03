export type UserRolesType = {
  SUPERADMIN: 'superadmin'
  ADMIN: 'admin'
  MODERATOR: 'moderator'
}

export const AuthTags = {
  AUTH: 'Auth',
  ADMIN: 'Admin',
} as const

export type AuthTagsType = typeof AuthTags

export const ApiMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const
