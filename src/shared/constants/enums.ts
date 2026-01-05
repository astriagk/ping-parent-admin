const AuthTags = {
  AUTH: 'Auth',
  ADMIN: 'Admin',
} as const

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

enum AssignmentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  PARENT_REQUESTED = 'parent_requested',
  REJECTED = 'rejected',
}

export { AuthTags, ApiMethods, type UserRolesType, AssignmentStatus }
