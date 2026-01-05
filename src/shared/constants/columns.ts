const badges = {
  true: { label: 'Active', className: 'badge-green' },
  false: { label: 'Inactive', className: 'badge-yellow' },
  undefined: { label: 'Unknown', className: 'badge-gray' },
}

const buttonsKeys = {
  true: { label: 'Activate', className: 'btn-green' },
  false: { label: 'Deactivate', className: 'btn-orange' },
  undefined: { label: 'Unknown', className: 'btn-gray' },
}

const accessorkeys = {
  id: 'id',
  username: 'username',
  email: 'email',
  phoneNumber: 'phone_number',
  adminRole: 'admin_role',
  isActive: 'is_active',
  actions: 'Actions',
  userType: 'user_type',
}

const headerKeys = {
  id: 'ID',
  username: 'Name',
  email: 'Email',
  phoneNumber: 'Phone Number',
  adminRole: 'Role',
  isActive: 'Active',
  actions: 'Actions',
  userType: 'User Type',
}

export { badges, accessorkeys, headerKeys, buttonsKeys }
