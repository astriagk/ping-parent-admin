const AuthTags = {
  AUTH: 'Auth',
  ADMIN: 'Admin',
  DRIVER: 'Driver',
  PARENT: 'Parent',
} as const

const ApiMethods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
} as const

enum UserRoles {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  DRIVER = 'driver',
  PARENT = 'parent',
}

const UserRolesType = {
  superadmin: 'Super Admin',
  admin: 'Admin',
  moderator: 'Moderator',
  driver: 'Driver',
  parent: 'Parent',
}

enum AssignmentStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  PENDING = 'pending',
  PARENT_REQUESTED = 'parent_requested',
  REJECTED = 'rejected',
}

export { AuthTags, ApiMethods, UserRoles, UserRolesType, AssignmentStatus }
