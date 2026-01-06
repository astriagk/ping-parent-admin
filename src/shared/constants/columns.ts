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
  contactNumber: 'contact_number',
  adminRole: 'admin_role',
  isActive: 'is_active',
  actions: 'Actions',
  userType: 'user_type',
  schoolName: 'school_name',
  address: 'address',
  city: 'city',
  state: 'state',
}

const headerKeys = {
  id: 'ID',
  username: 'Name',
  email: 'Email',
  phoneNumber: 'Phone Number',
  contactNumber: 'Contact Number',
  adminRole: 'Role',
  isActive: 'Active',
  actions: 'Actions',
  userType: 'User Type',
  schoolName: 'School Name',
  address: 'Address',
  city: 'City',
  state: 'State',
}

export { badges, accessorkeys, headerKeys, buttonsKeys }
