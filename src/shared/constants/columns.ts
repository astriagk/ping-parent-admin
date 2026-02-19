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
  tripId: 'trip_id',
  tripType: 'trip_type',
  tripStatus: 'trip_status',
  tripDate: 'trip_date',
  totalDistance: 'total_distance',
  // Assignment
  assignmentStatus: 'assignment_status',
  studentId: 'student_id',
  driverUniqueId: 'driver_unique_id',
  assignmentId: 'assignment_id',
  driverName: 'driver_name',
  // Subscription
  planName: 'plan_name',
  planType: 'plan_type',
  amount: 'amount',
  startDate: 'start_date',
  endDate: 'end_date',
  subscriptionStatus: 'status',
  pricingModel: 'pricing_model',
  basePrice: 'base_price',
  price: 'price',
  kids: 'kids',
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
  paymentId: 'payment_id',
  paymentType: 'payment_type',
  paymentMethod: 'payment_method',
  paymentStatus: 'payment_status',
  transactionId: 'transaction_id',
  paymentDate: 'payment_date',
  currency: 'currency',
}

const headerKeys = {
  id: 'ID',
  username: 'Name',
  Name: 'Name',
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
  tripId: 'Trip ID',
  tripType: 'Type',
  tripStatus: 'Status',
  tripDate: 'Date',
  totalDistance: 'Total Distance',
  // Assignment
  assignmentStatus: 'Status',
  studentId: 'Student',
  driverName: 'Driver',
  assignmentId: 'Assignment ID',
  driverUniqueId: 'Driver Unique ID',
  // Subscription
  planName: 'Plan',
  planType: 'Plan Type',
  amount: 'Amount',
  startDate: 'Start Date',
  endDate: 'End Date',
  subscriptionStatus: 'Status',
  pricingModel: 'Pricing Model',
  basePrice: 'Base Price',
  price: 'Price',
  kids: 'Kids',
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
  paymentId: 'Payment ID',
  paymentType: 'Type',
  paymentMethod: 'Method',
  paymentStatus: 'Status',
  transactionId: 'Transaction ID',
  paymentDate: 'Payment Date',
  currency: 'Currency',
}

export { badges, accessorkeys, headerKeys, buttonsKeys }
