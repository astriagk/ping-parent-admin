# AI Prompts for Complete Feature Implementation

This document provides comprehensive AI prompts for creating complete features end-to-end in the ping-parent-admin project, including API integration, pages, components, types, and enums.

## Prerequisites

Before using these prompts, ensure you have the following information:

1. **Feature Name**: Name of the feature (e.g., "users", "products", "orders")
2. **Endpoint**: The API endpoint URL (e.g., `/admin/users`)
3. **Method**: HTTP method (GET, POST, PUT, PATCH, DELETE)
4. **Payload**: Request body structure (for POST, PUT, PATCH)
5. **Response**: Expected response structure
6. **Page Route**: Next.js route path (e.g., `/admins/list`, `/users/drivers/details/[id]`)

---

## Prompt 1: Create Complete List Page Feature (GET Endpoint)

Use this prompt when creating a **complete list page** with table display.

### Template:

```
Create a complete "[FEATURE_NAME]" list page feature with the following details:

**API Details:**
- Endpoint: [ENDPOINT_URL]
- Method: GET
- Response Structure: [Provide TypeScript interface]

**Page Route:**
- Path: /[feature-route]/list

**Requirements:**

1. **API Service** (src/store/services/[featureName]Api.ts):
   - Create RTK Query service extending baseApi
   - Add endpoint using builder.query
   - Use ApiMethods.GET from enums
   - Provide appropriate cache tags from AuthTags
   - Export hooks: useGet[FeatureName]ListQuery, useLazyGet[FeatureName]ListQuery

2. **DTOs** (src/dtos/[featureName].ts):
   - Create [FeatureName]ListItem interface with all fields
   - Create [FeatureName]ListResponse interface
   - Use types from enums where applicable
   - Import generic types from @src/dtos/generic.ts if needed

3. **URL Helper** (src/utils/url_helper.ts):
   - Add endpoint constant: NEXT_PUBLIC_[FEATURE_NAME_UPPER]_LIST_API = '/[endpoint-path]'

4. **Enums** (src/shared/constants/enums.ts) - if needed:
   - Add new enum types specific to this feature
   - Add mapping objects for display values
   - Add to AuthTags if cache tagging needed

5. **Column Constants** (src/shared/constants/columns.ts):
   - Add accessor keys to accessorkeys object for each table column
   - Add header labels to headerKeys object
   - Add badge configurations to badges object if status display needed
   - Add button configurations to buttonsKeys object if action buttons needed

6. **View Component** (src/views/[FeatureName]/List/index.tsx):
   - Add 'use client' directive at top
   - Import useGet[FeatureName]ListQuery hook
   - Import BreadCrumb, DatatablesHover components
   - Import column constants
   - Define columns array with useMemo including:
     * ID column with row index
     * Data columns using accessorKey
     * Status/badge columns with custom cell renderer
     * Actions column with buttons and handlers
   - Use DatatablesHover component with columns and data
   - Handle loading and empty states

7. **Page Component** (src/app/(layout)/[feature-route]/list/page.tsx):
   - Import view component
   - For Next.js 15+, make async if using params/searchParams
   - Await params/searchParams if applicable
   - Return view component

**Reference Implementation:**
- API: src/store/services/adminApi.ts
- DTOs: src/dtos/admin.ts
- View: src/views/Admins/List/index.tsx
- Page: src/app/(layout)/admins/list/page.tsx
- Columns: src/shared/constants/columns.ts
```

### Example Usage:

```
Create a complete "products" list page feature with the following details:

**API Details:**
- Endpoint: /admin/products
- Method: GET
- Response Structure: { success: boolean, data: ProductListItem[], message: string }

**Page Route:**
- Path: /products/list

**Requirements:**
[Follow all 7 steps from template above]
```

---

## Prompt 2: Create Complete Details Page Feature (GET by ID Endpoint)

Use this prompt when creating a **details/view page** for a specific resource.

### Template:

```
Create a complete "[FEATURE_NAME]" details page feature with the following details:

**API Details:**
- Endpoint: [ENDPOINT_URL]/[id] or [ENDPOINT_URL]/details/[id]
- Method: GET
- Response Structure: [Provide TypeScript interface]

**Page Route:**
- Path: /[feature-route]/details/[id]
- Dynamic route parameter: id

**Requirements:**

1. **API Service** (src/store/services/[featureName]Api.ts):
   - Add endpoint using builder.query with id parameter
   - Use ApiMethods.GET from enums
   - Provide appropriate cache tags
   - Export hooks: useGet[FeatureName]DetailsQuery, useLazyGet[FeatureName]DetailsQuery

2. **DTOs** (src/dtos/[featureName].ts):
   - Create [FeatureName]Details interface with all fields
   - Create [FeatureName]DetailsResponse interface
   - Include nested objects if applicable
   - Use enum types where needed

3. **URL Helper** (src/utils/url_helper.ts):
   - Add endpoint constant: NEXT_PUBLIC_[FEATURE_NAME_UPPER]_DETAILS_API = '/[endpoint-path]'

4. **View Component** (src/views/[FeatureName]/[FeatureName]Details/index.tsx):
   - Add 'use client' directive
   - Accept id as prop: { id: string }
   - Use useGet[FeatureName]DetailsQuery(id) hook
   - Destructure { data, isLoading, error } from query
   - Create child components for different sections (Overview, Reports, etc.)
   - Add BannerOne for conditional alerts based on status
   - Pass data to child components
   - Handle loading, error, and empty states

5. **Child Components** (src/views/[FeatureName]/[FeatureName]Details/):
   - Create Overview component for main details display
   - Create additional section components as needed
   - Each component should accept data and handle its own display logic

6. **Page Component** (src/app/(layout)/[feature-route]/details/[id]/page.tsx):
   - Import view component
   - Make component async
   - Define PageProps interface with params: Promise<{ id: string }>
   - Await params and destructure id
   - Pass id to view component

7. **Conditional UI Elements** (if needed):
   - Use BannerOne component for status-based alerts
   - Check status using enums (e.g., ApprovalStatus.REJECTED)
   - Pass appropriate props: title, description, icon, color, show

**Reference Implementation:**
- API: src/store/services/driverApi.ts
- DTOs: src/dtos/driver.ts
- View: src/views/Users/Drivers/DriverDetails/index.tsx
- Page: src/app/(layout)/users/drivers/details/[id]/page.tsx
- Enums: src/shared/constants/enums.ts (ApprovalStatus, AssignmentStatus)
```

### Example Usage:

```
Create a complete "order" details page feature with the following details:

**API Details:**
- Endpoint: /admin/orders/[id]
- Method: GET
- Response Structure: { success: boolean, data: OrderDetails, message: string }

**Page Route:**
- Path: /orders/details/[id]
- Dynamic route parameter: id

**Requirements:**
[Follow all 7 steps from template above]
```

---

## Prompt 3: Add Mutation Action to Existing Feature (POST/PUT/PATCH/DELETE)

Use this prompt when adding a **mutation action** to an existing feature (create, update, delete, approve, reject, etc.).

### Template:

```
Add a "[ACTION_NAME]" mutation action to the existing "[FEATURE_NAME]" feature.

**API Details:**
- Endpoint: [ENDPOINT_URL]
- Method: [POST/PUT/PATCH/DELETE]
- Payload Structure: [Provide TypeScript interface]
- Response Structure: [Provide TypeScript interface]

**Requirements:**

1. **API Service** (src/store/services/[featureName]Api.ts):
   - Add new endpoint using builder.mutation
   - Use appropriate ApiMethods enum value
   - Include payload type and response type
   - Implement invalidatesTags for cache invalidation
   - Export mutation hook: use[ActionName][FeatureName]Mutation

2. **DTOs** (src/dtos/[featureName].ts):
   - Create [ActionName][FeatureName]Payload interface
   - Create [ActionName][FeatureName]Response interface
   - Reuse existing types where applicable

3. **URL Helper** (src/utils/url_helper.ts):
   - Add endpoint constant: NEXT_PUBLIC_[FEATURE_NAME_UPPER]_[ACTION_UPPER]_API

4. **Component Integration**:
   - Use the mutation hook in the component
   - Destructure [actionName, { isLoading, isError, isSuccess }]
   - Call mutation with payload in event handler
   - Handle loading, success, and error states
   - Show appropriate toast/notification messages

**Mutation Hook Pattern:**
- Query hooks: useGet[Feature]Query for fetching data
- Mutation hooks: use[Action][Feature]Mutation for modifying data
- Lazy query hooks: useLazy[Action][Feature]Query for manual triggering

**Cache Invalidation:**
- Use invalidatesTags to refresh related queries after mutation
- Common tags: [AuthTags.ADMIN], [AuthTags.DRIVER], [AuthTags.PARENT]

**Reference Implementation:**
- API: src/store/services/driverApi.ts (approve/reject mutations)
- DTOs: src/dtos/driver.ts
```

### Example Usage:

```
Add a "approve driver" mutation action to the existing "driver" feature.

**API Details:**
- Endpoint: /admin/drivers/[id]/approve
- Method: PATCH
- Payload Structure: { driver_id: string, approved_by: string }
- Response Structure: { success: boolean, data: DriverDetails, message: string }

**Requirements:**
[Follow all 4 steps from template above]
```

---

## Prompt 4: Create Complete Feature with List and Details Pages

Use this prompt when creating a **complete CRUD feature** with both list and details pages.

### Template:

```
Create a complete "[FEATURE_NAME]" feature with list and details pages.

**API Endpoints:**

1. List: GET [LIST_ENDPOINT] → Returns array of items
2. Details: GET [DETAILS_ENDPOINT]/[id] → Returns single item details
3. Create (optional): POST [CREATE_ENDPOINT] → Creates new item
4. Update (optional): PUT/PATCH [UPDATE_ENDPOINT]/[id] → Updates item
5. Delete (optional): DELETE [DELETE_ENDPOINT]/[id] → Deletes item

**Page Routes:**
- List: /[feature-route]/list
- Details: /[feature-route]/details/[id]

**Requirements:**

1. **API Service** (src/store/services/[featureName]Api.ts):
   - Create service extending baseApi
   - Add query for list endpoint
   - Add query for details endpoint
   - Add mutations for create/update/delete if applicable
   - Configure cache tags and invalidation
   - Export all hooks

2. **DTOs** (src/dtos/[featureName].ts):
   - [FeatureName]ListItem interface
   - [FeatureName]ListResponse interface
   - [FeatureName]Details interface
   - [FeatureName]DetailsResponse interface
   - Payload interfaces for mutations

3. **URL Helper** (src/utils/url_helper.ts):
   - Add all endpoint constants

4. **Enums** (src/shared/constants/enums.ts):
   - Add feature-specific enums
   - Add status/type mapping objects
   - Add cache tags if needed

5. **Column Constants** (src/shared/constants/columns.ts):
   - Add accessorkeys for table columns
   - Add headerKeys for column labels
   - Add badge/button configurations

6. **List View** (src/views/[FeatureName]/List/index.tsx):
   - Implement as per Prompt 1

7. **Details View** (src/views/[FeatureName]/[FeatureName]Details/index.tsx):
   - Implement as per Prompt 2

8. **List Page** (src/app/(layout)/[feature-route]/list/page.tsx):
   - Simple wrapper for list view

9. **Details Page** (src/app/(layout)/[feature-route]/details/[id]/page.tsx):
   - Async component with params handling

**Reference Implementation:**
- Complete feature: driver (list + details + approve/reject)
- List only: admin
```

---

## Prompt 5: Add Nested Dynamic Route Page

Use this prompt for creating **nested dynamic routes** like /users/[userType]/details/[id].

### Template:

```
Create a nested dynamic route page for "[FEATURE_NAME]" with multiple route parameters.

**Page Route:**
- Path: /[parent-route]/[param1]/[child-route]/[param2]
- Example: /users/drivers/details/[id], /orders/[status]/items/[itemId]

**Route Parameters:**
- [param1]: [description and type]
- [param2]: [description and type]

**Requirements:**

1. **Page Component** (src/app/(layout)/[parent-route]/[param1]/[child-route]/[param2]/page.tsx):
   - Make component async
   - Define PageProps with params: Promise<{ param1: string, param2: string }>
   - Await params and destructure all parameters
   - Pass parameters to view component

2. **View Component**:
   - Accept all route parameters as props
   - Use parameters in API calls or logic
   - Handle invalid parameter scenarios

**Reference Implementation:**
- Page: src/app/(layout)/users/drivers/details/[id]/page.tsx
```

---

## Prompt 6: Add Conditional Banner/Alert to Page

Use this prompt to add **conditional banners** based on data state (like BannerOne component).

### Template:

```
Add a conditional banner to the "[FEATURE_NAME]" page that displays based on [CONDITION].

**Banner Details:**
- Title: [BANNER_TITLE]
- Description: [BANNER_DESCRIPTION]
- Color: [red/yellow/blue/green/primary]
- Icon: [Icon component name from lucide-react]
- Show Condition: [TypeScript condition expression]

**Requirements:**

1. **View Component** updates:
   - Import BannerOne from @src/shared/components/Banners/BannerOne
   - Import icon from lucide-react
   - Add BannerOne component with props:
     * title: Banner title text
     * description: Banner description text
     * icon: Icon component with appropriate classes
     * color: Theme color
     * show: Boolean condition based on data state

2. **BannerOne Component Features**:
   - Automatically shows/hides based on show prop
   - User can dismiss the banner
   - Syncs with parent show prop changes via useEffect
   - Supports custom icons and colors

**Condition Examples:**
- data?.data?.approval_status === ApprovalStatus.REJECTED
- data?.data?.is_active === false
- data?.data?.payment_status === PaymentStatus.PENDING

**Reference Implementation:**
- Component: src/shared/components/Banners/BannerOne.tsx
- Usage: src/views/Users/Drivers/DriverDetails/index.tsx
```

---

## General Guidelines for All Prompts

### File Structure to Follow:

```
src/
├── app/
│ └── (layout)/
│ └── [feature-route]/
│ ├── list/
│ │ └── page.tsx # List page
│ └── details/
│ └── [id]/
│ └── page.tsx # Details page
├── views/
│ └── [FeatureName]/
│ ├── List/
│ │ └── index.tsx # List view component
│ └── [FeatureName]Details/
│ ├── index.tsx # Details view component
│ ├── Overview.tsx # Detail sections
│ └── Reports.tsx # Detail sections
├── store/
│ └── services/
│ └── [featureName]Api.ts # RTK Query API service
├── dtos/
│ ├── [featureName].ts # Feature-specific DTOs
│ └── generic.ts # Reusable generic DTOs
├── shared/
│ ├── constants/
│ │ ├── enums.ts # Enums and constant objects
│ │ ├── columns.ts # Table column configurations
│ │ └── messages.ts # User-facing messages
│ ├── components/
│ │ ├── Table/
│ │ │ └── DatatablesHover.tsx # Table component
│ │ └── Banners/
│ │ └── BannerOne.tsx # Alert banner component
│ └── common/
│ └── BreadCrumb.tsx # Breadcrumb component
└── utils/
└── url_helper.ts # API endpoint constants
```

### Naming Conventions:

1. **Feature Routes**: kebab-case (e.g., `/admins/list`, `/users/drivers/details/[id]`)
2. **View Folders**: PascalCase (e.g., `Admins/List`, `Users/Drivers/DriverDetails`)
3. **Service Files**: camelCase with Api suffix (e.g., `adminApi.ts`, `driverApi.ts`)
4. **DTO Files**: camelCase (e.g., `admin.ts`, `driver.ts`)
5. **Endpoints**: SCREAMING_SNAKE_CASE with prefix (e.g., `NEXT_PUBLIC_ADMIN_LIST_API`)
6. **Interfaces**: PascalCase with descriptive suffix (e.g., `AdminListResponse`, `DriverDetails`)
7. **Enums**: PascalCase for enum names, SCREAMING_CASE for values
8. **Hooks**: use[Action][Feature]Query/Mutation (e.g., `useGetAdminListQuery`, `useApproveDriverMutation`)

### RTK Query Service Pattern:

- Use `baseApi.injectEndpoints()` to add endpoints
- Queries for GET requests: `builder.query<ResponseType, ParamsType>`
- Mutations for POST/PUT/PATCH/DELETE: `builder.mutation<ResponseType, PayloadType>`
- Always configure cache tags with `providesTags` and `invalidatesTags`
- Export generated hooks at the bottom

### DTO Pattern:

```typescript
// List response
export interface [Feature]ListResponse {
  success: boolean
  data: [Feature]ListItem[]
  message: string
}

// Details response
export interface [Feature]DetailsResponse {
  success: boolean
  data: [Feature]Details
  message: string
}

// Mutation payload
export interface [Action][Feature]Payload {
  [field]: type
}
```

### Enum Pattern:

```typescript
// Enum definition
enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

// Display mapping
const StatusType = {
  pending: 'Pending',
  approved: 'Approved',
  rejected: 'Rejected',
}

// Export both
export { Status, StatusType }
```

### Column Configuration Pattern:

```typescript
const accessorkeys = {
  fieldName: 'api_field_name',
}

const headerKeys = {
  fieldName: 'Display Label',
}

const badges = {
  true: { label: 'Active', className: 'badge-green' },
  false: { label: 'Inactive', className: 'badge-yellow' },
}

const buttonsKeys = {
  true: { label: 'Activate', className: 'btn-green' },
  false: { label: 'Deactivate', className: 'btn-orange' },
}
```

### Next.js 15+ Page Pattern:

```typescript
// For dynamic routes - MUST be async
interface PageProps {
  params: Promise<{ id: string }>
}

const Page = async ({ params }: PageProps) => {
  const { id } = await params
  return <ViewComponent id={id} />
}
```

---

## Quick Reference Table

| Task                                   | Prompt to Use |
| -------------------------------------- | ------------- |
| Create list page with table            | Prompt 1      |
| Create details/view page               | Prompt 2      |
| Add mutation (create/update/delete)    | Prompt 3      |
| Create complete feature (list+details) | Prompt 4      |
| Add nested dynamic routes              | Prompt 5      |
| Add conditional banners/alerts         | Prompt 6      |

---

## Common Use Cases and Workflows

### Workflow 1: Create Simple List-Only Feature

**Steps:**
1. Use **Prompt 1** to create list page
2. Done!

**Example:** Admin list page (view-only table)

---

### Workflow 2: Create Full CRUD Feature

**Steps:**
1. Use **Prompt 4** to create list + details pages
2. Use **Prompt 3** for each mutation (create, update, delete)
3. Use **Prompt 6** to add status banners if needed

**Example:** Driver management (list, view details, approve/reject)

---

### Workflow 3: Add Feature to Existing Page

**Steps:**
1. Use **Prompt 3** to add mutation endpoint
2. Update view component to use the new mutation hook
3. Add button/form to trigger the mutation

**Example:** Adding "activate/deactivate" button to admin list

---

## Important Notes and Best Practices

### API Integration

1. **RTK Query Only**: This project uses RTK Query for ALL API calls, no Redux Thunks
2. **Base API Extension**: All API services extend `baseApi` using `injectEndpoints()`
3. **Cache Management**: Always configure `providesTags` and `invalidatesTags` for proper cache invalidation
4. **Error Handling**: RTK Query handles errors automatically, accessible via `isError` and `error` from hooks

### TypeScript

1. Use interfaces for all data structures
2. Import enum types from `@src/shared/constants/enums`
3. Reuse generic interfaces from `@src/dtos/generic.ts` where applicable
4. Always type hook returns: `const { data, isLoading, error } = useGetAdminListQuery()`

### Next.js 15+ Specific

1. **Dynamic Routes MUST be async**: Any page using `params` or `searchParams` must be an async component
2. **Await Params**: Always await params before accessing: `const { id } = await params`
3. **Type Params as Promise**: `params: Promise<{ id: string }>` not `params: { id: string }`

### Component Architecture

1. **Separation**: Page components (in `app/`) are thin wrappers, logic goes in view components (in `views/`)
2. **Client Directive**: View components that use hooks need `'use client'` at the top
3. **Component Reusability**: Shared components in `src/shared/components/`, feature-specific in `src/views/[Feature]/`

### Column Configuration

1. Keep all table column configs in `src/shared/constants/columns.ts`
2. Use `accessorkeys` for mapping to API field names
3. Use `headerKeys` for display labels
4. Configure badges and buttons for dynamic styling

### File Organization

1. **DTOs**: One file per feature in `src/dtos/`
2. **API Services**: One file per feature in `src/store/services/`
3. **Views**: Folder per feature in `src/views/`, subfolders for List/Details
4. **Pages**: Follow Next.js App Router structure in `src/app/(layout)/`

### Common Patterns

1. **List Pages**: BreadCrumb + DatatablesHover with useMemo columns
2. **Details Pages**: Multiple child components for different sections
3. **Mutations**: Use mutation hooks with loading/error states for user feedback
4. **Conditional UI**: Use BannerOne for status-based alerts with enum checks

### Reference Implementations

- **List Page**: `src/views/Admins/List/index.tsx` + `src/store/services/adminApi.ts`
- **Details Page**: `src/views/Users/Drivers/DriverDetails/index.tsx` + `src/store/services/driverApi.ts`
- **Enums**: `src/shared/constants/enums.ts`
- **Columns**: `src/shared/constants/columns.ts`
- **DTOs**: `src/dtos/admin.ts`, `src/dtos/driver.ts`

---

## Checklist for New Features

When creating a new feature, ensure you've completed:

- [ ] Created API service in `src/store/services/[featureName]Api.ts`
- [ ] Defined DTOs in `src/dtos/[featureName].ts`
- [ ] Added endpoint constants in `src/utils/url_helper.ts`
- [ ] Added enums in `src/shared/constants/enums.ts` (if needed)
- [ ] Added column configs in `src/shared/constants/columns.ts` (for lists)
- [ ] Created view component(s) in `src/views/[FeatureName]/`
- [ ] Created page component(s) in `src/app/(layout)/[route]/`
- [ ] Tested loading, success, and error states
- [ ] Verified cache invalidation works for mutations
- [ ] Handled edge cases (empty data, invalid params)

---

**Last Updated:** 2026-01-05
**Project:** ping-parent-admin
**Architecture:** Next.js 15 + RTK Query + TypeScript
