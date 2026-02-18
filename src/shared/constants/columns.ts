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
  name: 'name',
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
  // Student
  grade: 'grade',
  parentName: 'parent_name',
  // Trip
  driverName: 'driver_name',
  tripType: 'trip_type',
  tripStatus: 'status',
  tripDate: 'trip_date',
  studentsCount: 'students_count',
  // Assignment
  assignmentStatus: 'status',
  studentName: 'student_name',
  // Subscription
  planName: 'plan_name',
  planType: 'plan_type',
  amount: 'amount',
  startDate: 'start_date',
  endDate: 'end_date',
  subscriptionStatus: 'status',
  pricingModel: 'pricing_model',
  basePrice: 'base_price',
  // Redemption Codes
  code: 'code',
  codeStatus: 'status',
  // Role
  roleName: 'name',
  description: 'description',
  // Audit Log
  action: 'action',
  resource: 'resource',
  timestamp: 'created_at',
  // Notification
  title: 'title',
  message: 'message',
  isRead: 'is_read',
  // Rating
  rating: 'rating',
  review: 'review',
  // Payment
  paymentMethod: 'payment_method',
  paymentStatus: 'status',
  currency: 'currency',
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
  // Student
  grade: 'Grade',
  parentName: 'Parent',
  // Trip
  driverName: 'Driver',
  tripType: 'Type',
  tripStatus: 'Status',
  tripDate: 'Date',
  studentsCount: 'Students',
  // Assignment
  assignmentStatus: 'Status',
  studentName: 'Student',
  // Subscription
  planName: 'Plan',
  planType: 'Plan Type',
  amount: 'Amount',
  startDate: 'Start Date',
  endDate: 'End Date',
  subscriptionStatus: 'Status',
  pricingModel: 'Pricing Model',
  basePrice: 'Base Price',
  // Redemption Codes
  code: 'Code',
  codeStatus: 'Status',
  // Role
  roleName: 'Role Name',
  description: 'Description',
  // Audit Log
  action: 'Action',
  resource: 'Resource',
  timestamp: 'Timestamp',
  // Notification
  title: 'Title',
  message: 'Message',
  isRead: 'Read',
  // Rating
  rating: 'Rating',
  review: 'Review',
  // Payment
  paymentMethod: 'Method',
  paymentStatus: 'Status',
  currency: 'Currency',
}

export { badges, accessorkeys, headerKeys, buttonsKeys }
