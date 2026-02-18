# Admin Portal Blueprint

> Feature & menu mapping for the Ping Parent admin portal, organized by role.

---

## Roles Overview

| Role | Scope | Description |
|------|-------|-------------|
| **Super Admin** | Global | Full system access. Can create admins, manage all schools, all users, all billing. |
| **Admin** | Global | Same as Super Admin but cannot create other Super Admins. |
| **School Admin** | School-scoped | Manages drivers, students, assignments, and subscriptions for their school only. |

---

## Menu Structure by Role

### 1. Dashboard

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| Total users (parents, drivers, students) | Y | Y | School only |
| Active trips count | Y | Y | School only |
| Revenue / subscription stats | Y | Y | School only |
| Recent activity feed | Y | Y | School only |
| Pending driver approvals | Y | Y | School only |
| Expiring subscriptions alerts | Y | Y | School only |

**APIs:**
- `GET /admin/users` — aggregate counts
- `GET /trips/admin/all-trips` — trip stats
- `GET /parent-subscriptions/admin/all-subscriptions` — subscription stats
- `GET /payments/admin/all-payments` — revenue stats

---

### 2. User Management

#### 2a. Parents

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all parents | Y | Y | School only |
| View parent details | Y | Y | School only |
| Activate / deactivate parent | Y | Y | - |
| Delete parent | Y | Y | - |
| View parent's students | Y | Y | School only |
| View parent's subscriptions | Y | Y | School only |
| View parent's payments | Y | Y | - |

**APIs:**
- `GET /admin/users` — list parents (filter by role)
- `GET /admin/users/:id` — parent details
- `GET /admin/parents/:id/details` — full parent profile
- `PATCH /admin/users/:id/activate`
- `PATCH /admin/users/:id/deactivate`
- `DELETE /admin/users/:id`

#### 2b. Drivers

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all drivers | Y | Y | School only |
| View driver details + documents | Y | Y | School only |
| Approve / reject driver | Y | Y | School only |
| Activate / deactivate driver | Y | Y | - |
| Delete driver | Y | Y | - |
| View driver's trip history | Y | Y | School only |
| View driver ratings & reviews | Y | Y | School only |

**APIs:**
- `GET /admin/users` — list drivers (filter by role)
- `GET /admin/drivers/:id/details` — full driver profile + documents
- `PATCH /admin/drivers/:id/approval-status` — approve/reject
- `PATCH /admin/users/:id/activate`
- `PATCH /admin/users/:id/deactivate`
- `DELETE /admin/users/:id`
- `GET /ratings-reviews/driver/:driverId` — reviews
- `GET /ratings-reviews/driver/:driverId/rating` — average rating

#### 2c. Students

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all students | Y | Y | School only |
| View student details | Y | Y | School only |
| View student's trip history | Y | Y | School only |

**APIs:**
- `GET /admin/users` — includes students
- `GET /admin/users/:id` — student details

---

### 3. Admin Management

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all admins | Y | Y | - |
| Create new admin | Y | Y | - |
| Update admin | Y | Y | - |
| Activate / deactivate admin | Y | Y | - |
| Create super admin | Y | - | - |

**APIs:**
- `GET /admin/` — list admins
- `POST /admin/` — create admin
- `GET /admin/:id` or `GET /admin/by-admin-id/:admin_id`
- `PUT /admin/:id` or `PUT /admin/by-admin-id/:admin_id`
- `PATCH /admin/:id/activate` or `PATCH /admin/by-admin-id/:admin_id/activate`
- `PATCH /admin/:id/deactivate` or `PATCH /admin/by-admin-id/:admin_id/deactivate`
- `POST /admin/setup/create-superadmin` — one-time setup

---

### 4. School Management

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all schools | Y | Y | Own school |
| Create school | Y | Y | - |
| Update school | Y | Y | Own school |
| Delete school | Y | Y | - |
| Manage school admins | Y | Y | - |
| View school drivers | Y | Y | Own school |
| Assign driver to school | Y | Y | Own school |
| Remove driver from school | Y | Y | Own school |

**APIs:**
- `GET /schools/` — list all schools
- `POST /schools/admin` — create school
- `PUT /schools/admin/:school_id` — update school
- `DELETE /schools/admin/:school_id` — delete school
- `GET /school-admin/:schoolId` — school's admins
- `POST /school-admin/:adminId/deactivate` — deactivate school admin
- `GET /school-driver/:schoolId` — school's drivers
- `POST /school-driver/assign` — assign driver
- `POST /school-driver/:driverId/remove` — remove driver
- `GET /school-driver/:driverId/details` — driver details

---

### 5. School Admin Management

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View school admins for a school | Y | Y | Own school |
| Register school admin | Y | Y | - |
| Deactivate school admin | Y | Y | - |

**APIs:**
- `GET /school-admin/:schoolId`
- `POST /school-admin/register`
- `POST /school-admin/:adminId/deactivate`

---

### 6. Trip Management

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all trips | Y | Y | School only |
| Filter trips by status / date / driver | Y | Y | School only |
| View trip details (students, route, timeline) | Y | Y | School only |
| View trip tracking history | Y | Y | School only |
| View live trip on map | Y | Y | School only |

**APIs:**
- `GET /trips/admin/all-trips` — all trips with filters
- `GET /tracking/:tripId/tracking` — tracking history
- `GET /tracking/:tripId/current-position` — live position
- `GET /tracking/:tripId/details` — route geometry + waypoints

---

### 7. Assignments

#### 7a. Driver-Student Assignments

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all assignments | Y | Y | School only |
| View parent-requested assignments | Y | Y | School only |
| Create assignment | Y | Y | School only |
| Approve / reject assignment | Y | Y | School only |
| Deactivate assignment | Y | Y | School only |
| Delete assignment | Y | Y | - |

**APIs:**
- `GET /driver-student-assignments/admin/all-assignments`
- `GET /driver-student-assignments/admin/my-assignments` — parent-requested
- `POST /driver-student-assignments/`
- `PUT /driver-student-assignments/:id`
- `DELETE /driver-student-assignments/:id`

#### 7b. School Assignments

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View school assignments | Y | Y | Own school |
| View pending assignments | Y | Y | Own school |
| Create school assignment | Y | Y | Own school |
| Approve / reject | Y | Y | Own school |

**APIs:**
- `GET /school-assignments/:schoolId`
- `GET /school-assignments/:schoolId/pending`
- `GET /school-assignments/:schoolId/driver/:driverId`
- `POST /school-assignments/:schoolId/create`
- `POST /school-assignments/:assignmentId/approve`
- `POST /school-assignments/:assignmentId/reject`

---

### 8. Billing & Subscriptions

#### 8a. Subscription Plans

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all plans | Y | Y | Y (read-only) |
| Create plan | Y | Y | - |
| Update plan | Y | Y | - |
| Activate / deactivate plan | Y | Y | - |

**APIs:**
- `GET /subscription-plans/`
- `POST /subscription-plans/`
- `PUT /subscription-plans/:id`
- `PATCH /subscription-plans/:id/activate`
- `PATCH /subscription-plans/:id/deactivate`

**Plan Configuration Fields:**
- Name, description, badge (BEST_VALUE, POPULAR, RECOMMENDED, LIMITED_OFFER)
- Plan type: MONTHLY, QUARTERLY, YEARLY
- Pricing model: FLAT, PER_KID, BASE_PLUS_PER_KID
- Base price, per-kid price, max kids
- Features list, active/inactive status

#### 8b. Parent Subscriptions

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all subscriptions | Y | Y | School only |
| Filter by status (active/expired/cancelled) | Y | Y | School only |
| View subscription details | Y | Y | School only |

**APIs:**
- `GET /parent-subscriptions/admin/all-subscriptions`

#### 8c. School Subscriptions

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| Create school subscription | Y | Y | - |
| View school subscriptions | Y | Y | Own school |
| View active subscription | Y | Y | Own school |
| Update subscription | Y | Y | - |
| Renew subscription | Y | Y | - |
| Cancel subscription | Y | Y | - |
| View expired subscriptions | Y | Y | - |
| Generate redemption codes | Y | Y | Own school |
| View redemption codes | Y | Y | Own school |

**APIs:**
- `POST /school-subscriptions/`
- `GET /school-subscriptions/school/:schoolId`
- `GET /school-subscriptions/school/:schoolId/active`
- `GET /school-subscriptions/:subscriptionId`
- `PATCH /school-subscriptions/:subscriptionId`
- `POST /school-subscriptions/:subscriptionId/renew`
- `POST /school-subscriptions/:subscriptionId/cancel`
- `GET /school-subscriptions/expired/list`
- `POST /school-subscriptions/:subscriptionId/generate-codes`
- `GET /school-subscriptions/:subscriptionId/codes`

#### 8d. Payments

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all payments | Y | Y | School only |
| Filter by status / type / method | Y | Y | School only |
| View payment details | Y | Y | School only |
| Process refunds (via Razorpay) | Y | Y | - |

**APIs:**
- `GET /payments/admin/all-payments`
- `POST /razorpay/refunds` — process refund
- `GET /razorpay/orders/:orderId` — order details
- `GET /razorpay/payments/:paymentId` — payment details

---

### 9. Roles & Permissions

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all roles | Y | Y | - |
| Create custom role | Y | - | - |
| Update role | Y | - | - |
| Delete role | Y | - | - |

**APIs:**
- `GET /roles/`
- `POST /roles/`
- `GET /roles/:id`
- `PUT /roles/:id`
- `DELETE /roles/:id`

---

### 10. Audit Logs

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View all audit logs | Y | Y | - |
| Filter by action / user / date | Y | Y | - |
| View audit log details | Y | Y | - |

**APIs:**
- `GET /audit-logs/`
- `GET /audit-logs/:id`

---

### 11. Notifications

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View notifications | Y | Y | Y |
| Mark as read | Y | Y | Y |

**APIs:**
- `GET /notifications/`
- `GET /notifications/unread`
- `GET /notifications/unread-count`
- `PUT /notifications/:id/mark-as-read`
- `PUT /notifications/mark-all-as-read`

---

### 12. Ratings & Reviews

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| View driver reviews | Y | Y | School only |
| View driver average rating | Y | Y | School only |

**APIs:**
- `GET /ratings-reviews/driver/:driverId`
- `GET /ratings-reviews/driver/:driverId/rating`

---

### 13. System Maintenance (Super Admin Only)

| Feature | Super Admin | Admin | School Admin |
|---------|:-----------:|:-----:|:------------:|
| Clean old tracking data | Y | - | - |

**APIs:**
- `POST /tracking/admin/cleanup`

---

## Sidebar Menu Structure

### Super Admin / Admin Sidebar

```
Dashboard
User Management
  ├── Parents
  ├── Drivers (with approval badge count)
  └── Students
Admin Management
School Management
  ├── Schools
  ├── School Admins
  └── School Drivers
Trip Management
  ├── All Trips
  └── Live Tracking
Assignments
  ├── Driver-Student
  └── School Assignments
Billing
  ├── Subscription Plans
  ├── Parent Subscriptions
  ├── School Subscriptions
  ├── Redemption Codes
  └── Payments
Roles & Permissions
Ratings & Reviews
Audit Logs
Notifications
Settings
```

### School Admin Sidebar

```
Dashboard
Drivers
  ├── School Drivers
  └── Driver Approvals
Students
Trips
  ├── School Trips
  └── Live Tracking
Assignments
  ├── Driver-Student
  └── School Assignments
Subscriptions
  ├── School Subscription
  └── Redemption Codes
Ratings & Reviews
Notifications
Settings
```

---

## Key Pages Detail

### Dashboard Page
- **Cards:** Total Parents, Total Drivers, Total Students, Active Trips, Revenue (this month), Pending Approvals
- **Charts:** Trips over time, Revenue trend, Subscriptions by plan type
- **Tables:** Recent trips, Pending driver approvals, Expiring subscriptions

### Driver Approval Page
- Driver personal info + photo
- Vehicle details
- Uploaded documents (license, insurance) — view/download
- Approve / Reject buttons with reason field

### Trip Detail Page
- Trip info: driver, date, status, type (pickup/drop)
- Student list with attendance + pickup/drop status
- Map view with route geometry and waypoints
- Timeline: trip events in chronological order
- Tracking history playback

### Subscription Plan Management Page
- Plan cards with badge, price, features
- Create/edit form: name, type, pricing model, prices, features, badge
- Toggle active/inactive

### School Subscription Page
- Active subscription details
- Generate redemption codes (bulk)
- View codes: code, status (available/redeemed), assigned student
- Renew / cancel actions

### Payment History Page
- Table: parent, amount, plan, method, status, date
- Filters: status, payment method, date range
- Refund action for completed payments

---

## Notes for Frontend Development

1. **Authentication:** Admin portal uses email + password login (`POST /admin/login`). Store JWT in httpOnly cookie or secure storage.

2. **School Admin Auth:** Separate login flow (`POST /school-admin/login`). After login, scope all queries to their school.

3. **Role-based routing:** Use route guards to hide menu items and pages based on role. The token payload contains the user's role.

4. **Real-time features:** Connect to Socket.IO for live trip tracking on the map view. Listen to `trip:position_update` events.

5. **Pagination:** Most list endpoints support pagination via query params. Implement infinite scroll or page-based navigation.

6. **File viewing:** Driver documents (license, insurance photos) are served from the configured storage provider. Use the URL from the driver details API.

7. **ID convention:** The backend uses custom IDs (admin_id, driver_id, etc.) in responses to avoid exposing MongoDB `_id`. Use the `by-admin-id` style endpoints where available.

---

## Screen Map

> Maps every created screen to its route, source files, access roles, and key scenarios.
> Roles: **SA** = Super Admin · **A** = Admin · **SchA** = School Admin

---

### Screen 1 — Login

| Property | Value |
|----------|-------|
| Route | `/login` (admin) · `/school-admin/login` (SchA) |
| View | `src/views/Auth/SignIn/SigninBasic.tsx` |
| Access | All roles (separate flows) |

**Key scenarios:**
1. Admin submits email + password → `POST /admin/login` → store JWT → redirect to Dashboard
2. School Admin submits email + password → `POST /school-admin/login` → store JWT → redirect to Dashboard
3. Show inline error on wrong credentials
4. Decode JWT on success → persist role in global state

---

### Screen 2 — Dashboard

| Property | Value |
|----------|-------|
| Route | `/dashboard` |
| Page | `src/app/(layout)/dashboard/page.tsx` |
| View | `src/views/Dashboard/index.tsx` |
| Access | SA · A · SchA (data scoped to school) |

**Key scenarios:**
1. Show stat cards: Total Parents, Total Drivers, Total Students, Active Trips, Revenue (this month), Pending Approvals
2. SA + A pull global counts via `GET /admin/users?role=<role>`
3. SchA sees school-scoped counts only
4. Show pending driver approvals count (badge) → `GET /admin/users?role=driver&status=pending`
5. Trips-over-time line chart → `GET /trips/admin/all-trips`
6. Revenue trend bar chart → `GET /payments/admin/all-payments`
7. Subscriptions by plan type pie chart → `GET /parent-subscriptions/admin/all-subscriptions`
8. Recent trips table → `GET /trips/admin/all-trips` (latest 5–10)
9. Expiring subscriptions alert → `GET /parent-subscriptions/admin/all-subscriptions?status=expiring`

---

### Screen 3 — Parents List

| Property | Value |
|----------|-------|
| Route | `/users/parents/list` |
| Page | `src/app/(layout)/users/parents/list/page.tsx` |
| View | `src/views/Users/Parents/List/index.tsx` |
| Access | SA · A (all) · SchA (school-scoped) |

**Key scenarios:**
1. Paginated list → `GET /admin/users?role=parent`
2. SchA: append `&schoolId=<id>` from token
3. Search / filter by name, email, status
4. Click row → navigate to Parent Detail page
5. Activate parent → `PATCH /admin/users/:id/activate` *(SA + A)*
6. Deactivate parent → `PATCH /admin/users/:id/deactivate` *(SA + A)*
7. Delete parent (confirm dialog) → `DELETE /admin/users/:id` *(SA + A)*

---

### Screen 4 — Parent Detail *(planned)*

| Property | Value |
|----------|-------|
| Route | `/users/parents/details/[id]` |
| Access | SA · A · SchA (school-scoped) |

**Key scenarios:**
1. Full parent profile → `GET /admin/parents/:id/details`
2. Linked students list (from profile response)
3. Parent's subscriptions → `GET /parent-subscriptions/admin/all-subscriptions?parentId=<id>`
4. Parent's payments → `GET /payments/admin/all-payments?parentId=<id>` *(SA + A)*
5. Activate / Deactivate button *(SA + A)*
6. Delete button with confirm dialog *(SA + A)*

---

### Screen 5 — Drivers List

| Property | Value |
|----------|-------|
| Route | `/users/drivers/list` |
| Page | `src/app/(layout)/users/drivers/list/page.tsx` |
| View | `src/views/Users/Drivers/DriversList.tsx` |
| Access | SA · A (all) · SchA (school-scoped) |

**Key scenarios:**
1. Paginated list → `GET /admin/users?role=driver`
2. Filter by approval status: `pending` / `approved` / `rejected`
3. Pending count badge shown in sidebar menu
4. Click row → navigate to Driver Detail page
5. Activate / Deactivate driver *(SA + A)*
6. Delete driver (confirm dialog) *(SA + A)*

---

### Screen 6 — Driver Detail / Approval

| Property | Value |
|----------|-------|
| Route | `/users/drivers/details/[id]` |
| Page | `src/app/(layout)/users/drivers/details/[id]/page.tsx` |
| View | `src/views/Users/Drivers/DriverDetails/index.tsx` |
| Sub-components | `Overview.tsx` · `viewModal.tsx` · `rejectModal.tsx` · `reports.tsx` |
| Access | SA · A · SchA (school-scoped) |

**Key scenarios:**
1. Load full driver profile + documents → `GET /admin/drivers/:id/details`
2. View / download uploaded documents (license, insurance) via URLs in response
3. **Approve driver** → `PATCH /admin/drivers/:id/approval-status { status: "approved" }`
4. **Reject driver** (reason field in modal) → `PATCH /admin/drivers/:id/approval-status { status: "rejected", reason: "..." }`
5. Driver's trip history tab → `GET /trips/admin/all-trips?driverId=<id>`
6. Driver ratings & reviews tab → `GET /ratings-reviews/driver/:driverId`
7. Average rating → `GET /ratings-reviews/driver/:driverId/rating`
8. Activate / Deactivate driver *(SA + A)*
9. Delete driver (confirm dialog) *(SA + A)*

---

### Screen 7 — Students List

| Property | Value |
|----------|-------|
| Route | `/users/students/list` |
| Page | `src/app/(layout)/users/students/list/page.tsx` |
| View | `src/views/Users/Students/List/index.tsx` |
| Access | SA · A (all) · SchA (school-scoped) |

**Key scenarios:**
1. Paginated list → `GET /admin/users?role=student`
2. SchA: append `&schoolId=<id>` from token
3. Search / filter students
4. Click row → navigate to Student Detail page

---

### Screen 8 — Student Detail *(planned)*

| Property | Value |
|----------|-------|
| Route | `/users/students/details/[id]` |
| Access | SA · A · SchA (school-scoped) |

**Key scenarios:**
1. Student profile → `GET /admin/users/:id`
2. Student's trip history → `GET /trips/admin/all-trips?studentId=<id>`

---

### Screen 9 — Admin Management

| Property | Value |
|----------|-------|
| Route | `/admins/list` |
| Page | `src/app/(layout)/admins/list/page.tsx` |
| View | `src/views/Admins/List/index.tsx` |
| Access | SA · A only |

**Key scenarios:**
1. List all admins → `GET /admin/`
2. **Create admin** (email, name, password, role) → `POST /admin/ { role: "admin" }`
3. **Create Super Admin** *(SA only, button hidden for A)* → `POST /admin/setup/create-superadmin`
4. View admin detail → `GET /admin/by-admin-id/:admin_id`
5. **Update admin** info → `PUT /admin/by-admin-id/:admin_id`
6. **Activate admin** → `PATCH /admin/by-admin-id/:admin_id/activate`
7. **Deactivate admin** → `PATCH /admin/by-admin-id/:admin_id/deactivate`

---

### Screen 10 — Schools List

| Property | Value |
|----------|-------|
| Route | `/schools/list` |
| Page | `src/app/(layout)/schools/list/page.tsx` |
| View | `src/views/School/List/index.tsx` |
| Sub-components | `addSchoolModal.tsx` |
| Access | SA · A (all) · SchA (own school) |

**Key scenarios:**
1. List all schools → `GET /schools/`
2. SchA: filtered to their own school by token
3. **Create school** (name, address, contact, logo) via modal → `POST /schools/admin`
4. Click row → navigate to School Detail page
5. **Update school** → `PUT /schools/admin/:school_id` *(SA + A + SchA own school)*
6. **Delete school** (confirm dialog) → `DELETE /schools/admin/:school_id` *(SA + A)*

---

### Screen 11 — School Admins List

| Property | Value |
|----------|-------|
| Route | `/schools/school-admins/list` |
| Page | `src/app/(layout)/schools/school-admins/list/page.tsx` |
| View | `src/views/Schools/SchoolAdmins/List/index.tsx` |
| Access | SA · A only |

**Key scenarios:**
1. List school admins for a given school → `GET /school-admin/:schoolId`
2. **Register school admin** (name, email, password, schoolId) → `POST /school-admin/register`
3. **Deactivate school admin** → `POST /school-admin/:adminId/deactivate`

---

### Screen 12 — School Drivers List

| Property | Value |
|----------|-------|
| Route | `/schools/school-drivers/list` |
| Page | `src/app/(layout)/schools/school-drivers/list/page.tsx` |
| View | `src/views/Schools/SchoolDrivers/List/index.tsx` |
| Access | SA · A · SchA (own school) |

**Key scenarios:**
1. List drivers assigned to a school → `GET /school-driver/:schoolId`
2. **Assign driver to school** → `POST /school-driver/assign { schoolId, driverId }`
3. **Remove driver from school** → `POST /school-driver/:driverId/remove`
4. View driver details → `GET /school-driver/:driverId/details`

---

### Screen 13 — Trips List

| Property | Value |
|----------|-------|
| Route | `/trips/list` |
| Page | `src/app/(layout)/trips/list/page.tsx` |
| View | `src/views/Trips/List/index.tsx` |
| Access | SA · A (all) · SchA (school-scoped) |

**Key scenarios:**
1. Paginated list → `GET /trips/admin/all-trips`
2. Filter by status: `active` / `completed` / `cancelled`
3. Filter by date range: `?startDate=&endDate=`
4. Filter by driver: `?driverId=`
5. Click row → navigate to Trip Detail page

---

### Screen 14 — Trip Detail *(planned)*

| Property | Value |
|----------|-------|
| Route | `/trips/details/[id]` |
| Access | SA · A · SchA (school-scoped) |

**Key scenarios:**
1. Trip info (driver, date, status, type) → from trips list response
2. Student list with pickup/drop status and attendance (from trip detail)
3. Route map with geometry and waypoints → `GET /tracking/:tripId/details`
4. Chronological timeline of trip events (from tracking details)
5. Tracking history playback → `GET /tracking/:tripId/tracking`

---

### Screen 15 — Live Tracking

| Property | Value |
|----------|-------|
| Route | `/trips/live-tracking` |
| Page | `src/app/(layout)/trips/live-tracking/page.tsx` |
| View | `src/views/Trips/LiveTracking/index.tsx` |
| Access | SA · A · SchA (school-scoped) |

**Key scenarios:**
1. Show map with driver's current position → `GET /tracking/:tripId/current-position`
2. Real-time position updates → Socket.IO `trip:position_update` event
3. Connect to Socket.IO on page load; disconnect on page leave

---

### Screen 16 — Driver-Student Assignments

| Property | Value |
|----------|-------|
| Route | `/assignments/driver-student/list` |
| Page | `src/app/(layout)/assignments/driver-student/list/page.tsx` |
| View | `src/views/Assignments/DriverStudent/List/index.tsx` |
| Access | SA · A (all) · SchA (school-scoped) |

**Key scenarios:**
1. **All Assignments** tab → `GET /driver-student-assignments/admin/all-assignments`
2. **Pending / Parent-Requested** tab → `GET /driver-student-assignments/admin/my-assignments`
3. **Create assignment** (select driver + student) → `POST /driver-student-assignments/`
4. **Approve** → `PUT /driver-student-assignments/:id { status: "approved" }`
5. **Reject** → `PUT /driver-student-assignments/:id { status: "rejected" }`
6. **Deactivate** → `PUT /driver-student-assignments/:id { status: "inactive" }`
7. **Delete** (confirm dialog) → `DELETE /driver-student-assignments/:id` *(SA + A)*

---

### Screen 17 — School Assignments

| Property | Value |
|----------|-------|
| Route | `/assignments/school-assignments/list` |
| Page | `src/app/(layout)/assignments/school-assignments/list/page.tsx` |
| View | `src/views/Assignments/SchoolAssignments/List/index.tsx` |
| Access | SA · A (all) · SchA (own school) |

**Key scenarios:**
1. All school assignments → `GET /school-assignments/:schoolId`
2. **Pending** tab → `GET /school-assignments/:schoolId/pending`
3. Filter by driver → `GET /school-assignments/:schoolId/driver/:driverId`
4. **Create assignment** → `POST /school-assignments/:schoolId/create`
5. **Approve** → `POST /school-assignments/:assignmentId/approve`
6. **Reject** (reason field) → `POST /school-assignments/:assignmentId/reject`

---

### Screen 18 — Subscription Plans

| Property | Value |
|----------|-------|
| Route | `/billing/subscription-plans/list` |
| Page | `src/app/(layout)/billing/subscription-plans/list/page.tsx` |
| View | `src/views/Billing/SubscriptionPlans/List/index.tsx` |
| Access | SA · A (full CRUD) · SchA (read-only) |

**Key scenarios:**
1. List all plans as cards → `GET /subscription-plans/`
2. **Create plan** (via form/modal) → `POST /subscription-plans/`
3. **Update plan** → `PUT /subscription-plans/:id`
4. **Activate** → `PATCH /subscription-plans/:id/activate`
5. **Deactivate** → `PATCH /subscription-plans/:id/deactivate`
6. SchA: hide Create / Edit / Toggle buttons; show cards as read-only

**Plan form fields:** Name · Description · Badge (`BEST_VALUE` / `POPULAR` / `RECOMMENDED` / `LIMITED_OFFER`) · Plan Type (`MONTHLY` / `QUARTERLY` / `YEARLY`) · Pricing Model (`FLAT` / `PER_KID` / `BASE_PLUS_PER_KID`) · Base Price · Per-Kid Price · Max Kids · Features list · Active toggle

---

### Screen 19 — Parent Subscriptions

| Property | Value |
|----------|-------|
| Route | `/billing/parent-subscriptions/list` |
| Page | `src/app/(layout)/billing/parent-subscriptions/list/page.tsx` |
| View | `src/views/Billing/ParentSubscriptions/List/index.tsx` |
| Access | SA · A (all) · SchA (school-scoped) |

**Key scenarios:**
1. Paginated list → `GET /parent-subscriptions/admin/all-subscriptions`
2. Filter by status: `active` / `expired` / `cancelled`
3. View subscription detail (plan, dates, parent info) inline or in drawer

---

### Screen 20 — School Subscriptions

| Property | Value |
|----------|-------|
| Route | `/billing/school-subscriptions/list` |
| Page | `src/app/(layout)/billing/school-subscriptions/list/page.tsx` |
| View | `src/views/Billing/SchoolSubscriptions/List/index.tsx` |
| Access | SA · A (full) · SchA (own school — limited) |

**Key scenarios:**
1. SchA: view own school's active subscription → `GET /school-subscriptions/school/:schoolId/active`
2. SA + A: list all subscriptions → `GET /school-subscriptions/school/:schoolId`
3. **Create school subscription** → `POST /school-subscriptions/` *(SA + A)*
4. View subscription detail → `GET /school-subscriptions/:subscriptionId`
5. **Update** → `PATCH /school-subscriptions/:subscriptionId` *(SA + A)*
6. **Renew** → `POST /school-subscriptions/:subscriptionId/renew` *(SA + A)*
7. **Cancel** (confirm dialog) → `POST /school-subscriptions/:subscriptionId/cancel` *(SA + A)*
8. View expired subscriptions → `GET /school-subscriptions/expired/list` *(SA + A)*
9. **Generate redemption codes** (quantity input) → `POST /school-subscriptions/:subscriptionId/generate-codes`

---

### Screen 21 — Redemption Codes

| Property | Value |
|----------|-------|
| Route | `/billing/redemption-codes/list` |
| Page | `src/app/(layout)/billing/redemption-codes/list/page.tsx` |
| View | `src/views/Billing/RedemptionCodes/List/index.tsx` |
| Access | SA · A · SchA (own school) |

**Key scenarios:**
1. List codes for a subscription → `GET /school-subscriptions/:subscriptionId/codes`
2. Show code status: `available` / `redeemed`
3. Show which student redeemed each code (from response)
4. **Generate new codes** (quantity input + button) → `POST /school-subscriptions/:subscriptionId/generate-codes`

---

### Screen 22 — Payments List

| Property | Value |
|----------|-------|
| Route | `/payments/list` |
| Page | `src/app/(layout)/payments/list/page.tsx` |
| View | `src/views/Payment/List/index.tsx` |
| Access | SA · A (all) · SchA (school-scoped) |

**Key scenarios:**
1. Paginated list → `GET /payments/admin/all-payments`
2. Filter by status: `success` / `failed` / `pending`
3. Filter by type, payment method, date range
4. Click row → navigate to Payment Detail page
5. **Process refund** (confirm dialog + reason) → `POST /razorpay/refunds` *(SA + A)*

---

### Screen 23 — Payment Detail

| Property | Value |
|----------|-------|
| Route | `/payments/details/[id]` |
| Page | `src/app/(layout)/payments/details/[id]/page.tsx` |
| View | `src/views/Payment/Details/index.tsx` |
| Access | SA · A · SchA (school-scoped) |

**Key scenarios:**
1. Payment detail (parent, plan, amount, method, date) → `GET /razorpay/payments/:paymentId`
2. Associated order → `GET /razorpay/orders/:orderId`
3. **Process refund** for completed payments *(SA + A)*

---

### Screen 24 — Roles & Permissions

| Property | Value |
|----------|-------|
| Route | `/roles/list` |
| Page | `src/app/(layout)/roles/list/page.tsx` |
| View | `src/views/Roles/List/index.tsx` |
| Access | SA (full CRUD) · A (view only) |

**Key scenarios:**
1. List all roles → `GET /roles/`
2. View role detail with permissions → `GET /roles/:id`
3. **Create custom role** *(SA only)* → `POST /roles/`
4. **Update role** *(SA only)* → `PUT /roles/:id`
5. **Delete role** (confirm dialog, SA only) → `DELETE /roles/:id`
6. Hide Create / Edit / Delete for Admin role

---

### Screen 25 — Audit Logs

| Property | Value |
|----------|-------|
| Route | `/audit-logs/list` |
| Page | `src/app/(layout)/audit-logs/list/page.tsx` |
| View | `src/views/AuditLogs/List/index.tsx` |
| Access | SA · A only |

**Key scenarios:**
1. Paginated list → `GET /audit-logs/`
2. Filter by action type: `?action=`
3. Filter by user: `?userId=`
4. Filter by date range: `?startDate=&endDate=`
5. View log detail → `GET /audit-logs/:id`

---

### Screen 26 — Notifications

| Property | Value |
|----------|-------|
| Route | `/notifications/list` |
| Page | `src/app/(layout)/notifications/list/page.tsx` |
| View | `src/views/Notifications/List/index.tsx` |
| Access | SA · A · SchA |

**Key scenarios:**
1. List all notifications → `GET /notifications/`
2. Unread-only tab → `GET /notifications/unread`
3. Unread count badge in header/sidebar → `GET /notifications/unread-count`
4. **Mark single notification as read** → `PUT /notifications/:id/mark-as-read`
5. **Mark all as read** button → `PUT /notifications/mark-all-as-read`

---

### Screen 27 — Ratings & Reviews

| Property | Value |
|----------|-------|
| Route | `/ratings-reviews/list` |
| Page | `src/app/(layout)/ratings-reviews/list/page.tsx` |
| View | `src/views/RatingsReviews/List/index.tsx` |
| Access | SA · A (all) · SchA (school-scoped drivers) |

**Key scenarios:**
1. Select a driver → list their reviews → `GET /ratings-reviews/driver/:driverId`
2. Show driver average rating → `GET /ratings-reviews/driver/:driverId/rating`
3. Standalone page listing all drivers sorted by rating (top/low rated)

---

### Screen 28 — Settings

| Property | Value |
|----------|-------|
| Route | `/settings` |
| Page | `src/app/(layout)/settings/page.tsx` |
| View | `src/views/Settings/index.tsx` |
| Access | SA · A · SchA |

**Key scenarios:**
1. Profile settings (name, email, password change) for the logged-in admin
2. App-level configuration (SA only)

---

## Cross-Cutting Implementation Rules

| # | Rule | Notes |
|---|------|-------|
| 1 | 403 / access denied on unauthorized routes | Route guards per role |
| 2 | Decode JWT on load → store role in global state | Drives all conditional rendering |
| 3 | Append `schoolId` to all School Admin API calls | From token payload |
| 4 | Loading skeleton while API is in flight | All list / detail screens |
| 5 | Empty state when list returns 0 results | All list screens |
| 6 | Confirm dialog before destructive actions | Delete · Deactivate · Cancel · Refund |
| 7 | Paginate all list screens | `?page=&limit=` query params |
| 8 | Toast notification on success / error | All write operations |
| 9 | Redirect to Login on 401 response | Global axios / RTK Query interceptor |
| 10 | Sidebar items hidden / shown based on role | Route guard + role check |

---

## Service → Screen Mapping

| API Service | Screens that use it |
|-------------|---------------------|
| `authApi.ts` | Login |
| `adminApi.ts` | Admin Management, Dashboard |
| `driverApi.ts` | Driver Detail / Approval |
| `parentApi.ts` | Parents List, Parent Detail |
| `studentApi.ts` | Students List, Student Detail |
| `schoolApi.ts` | Schools List |
| `schoolAdminApi.ts` | School Admins List |
| `tripApi.ts` | Trips List, Trip Detail, Live Tracking, Dashboard |
| `assignmentApi.ts` | Driver-Student Assignments, School Assignments |
| `subscriptionApi.ts` | Subscription Plans, Parent Subscriptions, School Subscriptions, Redemption Codes |
| `paymentApi.ts` | Payments List, Payment Detail, Dashboard |
| `roleApi.ts` | Roles & Permissions |
| `auditLogApi.ts` | Audit Logs |
| `notificationApi.ts` | Notifications |
| `ratingApi.ts` | Ratings & Reviews, Driver Detail |
