# AI Prompts for API Integration with Store

This document provides comprehensive AI prompts for creating and extending API integrations with Redux store in the admin-template-pp-ui project.

## Prerequisites

Before using these prompts, ensure you have the following information:

1. **Endpoint**: The API endpoint URL (e.g., `/admin/users`)
2. **Method**: HTTP method (GET, POST, PUT, PATCH, DELETE)
3. **Payload**: Request body structure (for POST, PUT, PATCH)
4. **Response**: Expected response structure
5. **Error**: Expected error structure
6. **Feature Name**: Name of the feature (e.g., "users", "products", "orders")

---

## Prompt 1: Create New Feature with Complete Store Setup

Use this prompt when creating a **brand new feature** from scratch.

### Template:

```
Create a new feature called "[FEATURE_NAME]" with complete Redux store integration using the following details:

**API Details:**
- Endpoint: [ENDPOINT_URL]
- Method: [GET/POST/PUT/PATCH/DELETE]
- Payload Structure:
- Response Structure:
- Error Structure:

**Requirements:**

1. Create folder structure at src/store/features/[FEATURE_NAME]/ with:
   - [FEATURE_NAME]Slice.ts (Redux slice with state management)
   - [FEATURE_NAME]Thunks.ts (Async thunk actions)
   - [FEATURE_NAME]Selectors.ts (State selectors)
   - index.ts (Export all modules)

2. Create service file at src/store/services/[FEATURE_NAME]Api.ts with RTK Query endpoints

3. Add action type constant in src/store/actionTypes.ts:
   - Format: [FEATURE_NAME_UPPER]\_[ACTION] (e.g., USERS_FETCH_LIST, USERS_CREATE)

4. Create DTO interfaces in src/dtos/[FEATURE_NAME].ts:
   - Use generic interfaces from src/dtos/generic.ts where applicable
   - Keep feature-specific interfaces in feature file

5. Add endpoint constant in src/utils/url_helper.ts:
   - Format: NEXT*PUBLIC*[FEATURE_NAME_UPPER]\_[ACTION]\_API

6. Add messages in src/shared/constants/messages.ts:
   - SUCCESS messages
   - ERROR messages
   - LOADING messages
   - VALIDATION messages

**Code Structure Reference:**

- Follow the pattern from src/store/features/auth/
- Use handleAsyncThunkApi utility for error handling
- Implement proper TypeScript typing throughout
- Use helper functions for state mutations in slice
```

### Example Usage:

```

Create a new feature called "users" with complete Redux store integration using the following details:

**API Details:**

- Endpoint: /admin/users
- Method: GET
- Payload Structure: None (GET request)
- Response Structure:
- Error Structure:

**Requirements:**
[Same as template above]

```

---

## Prompt 2: Add New Action to Existing Feature

Use this prompt when you need to **add a new API action** to an existing feature (e.g., add "delete user" to existing "users" feature).

### Template:

```

Add a new action to the existing "[FEATURE_NAME]" feature for [ACTION_DESCRIPTION].

**API Details:**

- Endpoint: [ENDPOINT_URL]
- Method: [GET/POST/PUT/PATCH/DELETE]
- Payload Structure:
- Response Structure:

**Requirements:**

1. Update src/store/features/[FEATURE_NAME]/[FEATURE_NAME]Thunks.ts:
   - Add new async thunk for this action
   - Use handleAsyncThunkApi for error handling

2. Update src/store/features/[FEATURE_NAME]/[FEATURE_NAME]Slice.ts:
   - Add new state properties if needed
   - Add extraReducers cases (pending, fulfilled, rejected)
   - Add helper functions for state mutations if needed

3. Update src/store/features/[FEATURE_NAME]/[FEATURE_NAME]Selectors.ts:
   - Add selectors for new state properties

4. Update src/store/services/[FEATURE_NAME]Api.ts:
   - Add new RTK Query endpoint (mutation or query)

5. Update src/store/features/[FEATURE_NAME]/index.ts:
   - Export new thunk and actions

6. Add action type in src/store/actionTypes.ts:
   - Format: [FEATURE_NAME_UPPER]\_[ACTION]

7. Add DTOs in src/dtos/[FEATURE_NAME].ts if needed

8. Add endpoint in src/utils/url_helper.ts:
   - Format: NEXT*PUBLIC*[FEATURE_NAME_UPPER]\_[ACTION]\_API

9. Add messages in src/shared/constants/messages.ts:
   - Under existing [FEATURE_NAME_UPPER] section

**Important:**

- Reuse existing files - DO NOT create new feature folder
- Follow the existing code patterns in the feature
- Maintain consistency with existing actions

```

### Example Usage:

```

Add a new action to the existing "users" feature for creating a new user.

**API Details:**

- Endpoint: /admin/users
- Method: POST
- Payload Structure:
- Response Structure:


**Requirements:**
[Same as template above]

```

---

## Prompt 3: Add Multiple Related Actions to Existing Feature

Use this prompt when adding **multiple related actions** to an existing feature (e.g., CRUD operations).

### Template:

```

Add the following actions to the existing "[FEATURE_NAME]" feature:

**Action 1: [ACTION_1_NAME]**

- Endpoint: [ENDPOINT_URL_1]
- Method: [METHOD_1]
- Payload: [PAYLOAD_1]
- Response: [RESPONSE_1]

**Action 2: [ACTION_2_NAME]**

- Endpoint: [ENDPOINT_URL_2]
- Method: [METHOD_2]
- Payload: [PAYLOAD_2]
- Response: [RESPONSE_2]

**Action 3: [ACTION_3_NAME]**

- Endpoint: [ENDPOINT_URL_3]
- Method: [METHOD_3]
- Payload: [PAYLOAD_3]
- Response: [RESPONSE_3]

**Requirements:**

1. Update all files in src/store/features/[FEATURE_NAME]/:
   - Add thunks for all actions
   - Update slice with state for all actions
   - Add selectors for all new state

2. Update src/store/services/[FEATURE_NAME]Api.ts with all endpoints

3. Add all action types to src/store/actionTypes.ts

4. Add all DTOs to src/dtos/[FEATURE_NAME].ts

5. Add all endpoints to src/utils/url_helper.ts

6. Add all messages to src/shared/constants/messages.ts

**Important:**

- Keep all actions in the same feature files
- Ensure consistent naming patterns
- Reuse common interfaces where possible

```

---

## Prompt 4: Create Feature with Pagination Support

Use this prompt for features that require **pagination, filtering, or sorting**.

### Template:

```

Create a new feature called "[FEATURE_NAME]" with pagination, filtering, and sorting support.

**API Details:**

- Endpoint: [ENDPOINT_URL]?page=[PAGE]&limit=[LIMIT]&sort=[SORT]&filter=[FILTER]
- Method: GET
- Query Parameters:

- Response Structure:

**Additional State Requirements:**

- Current page
- Items per page
- Total items count
- Sort configuration
- Filter configuration
- Loading states for pagination

**Requirements:**
[Follow Prompt 1 requirements plus pagination-specific state management]

```

---

## Prompt 5: Update Feature with Error Handling Improvements

Use this prompt to enhance **error handling** in existing features.

### Template:

```

Update the "[FEATURE_NAME]" feature to improve error handling for the following scenarios:

1. Network errors
2. Validation errors
3. Authentication errors
4. Server errors (500+)
5. Timeout errors

**Requirements:**

1. Update src/store/features/[FEATURE_NAME]/[FEATURE_NAME]Slice.ts:
   - Add detailed error state structure
   - Add error type discrimination

2. Update src/shared/constants/messages.ts:
   - Add specific error messages for each scenario

3. Ensure all thunks properly handle and categorize errors

**Error Response Structure:**

```

---

## Prompt 6: Add Optimistic Updates to Feature

Use this prompt to implement **optimistic UI updates**.

### Template:

```

Add optimistic updates to the "[FEATURE_NAME]" feature for [ACTION_NAME] action.

**Requirements:**

1. Update slice to implement optimistic state updates
2. Add rollback logic for failed requests
3. Handle cache invalidation properly
4. Update RTK Query configuration for optimistic updates

**Use Case:**
[Describe when optimistic update should occur]

**Rollback Strategy:**
[Describe how to rollback on failure]

```

---

## General Guidelines for All Prompts

### File Structure to Follow:

```

src/
├── store/
│ ├── features/
│ │ └── [featureName]/
│ │ ├── index.ts # Export all feature modules
│ │ ├── [featureName]Slice.ts # Redux slice
│ │ ├── [featureName]Thunks.ts # Async thunks
│ │ └── [featureName]Selectors.ts # Selectors
│ ├── services/
│ │ └── [featureName]Api.ts # RTK Query API
│ └── actionTypes.ts # Action type constants
├── dtos/
│ ├── [featureName].ts # Feature-specific DTOs
│ └── generic.ts # Reusable generic DTOs
├── utils/
│ └── url_helper.ts # API endpoint constants
└── components/
└── constants/
└── messages.ts # User-facing messages

```

### Naming Conventions:

1. **Feature Folders**: camelCase (e.g., `users`, `productCategories`)
2. **Files**: camelCase with feature prefix (e.g., `usersSlice.ts`, `usersThunks.ts`)
3. **Action Types**: SCREAMING_SNAKE_CASE (e.g., `USERS_FETCH_LIST`)
4. **Endpoints**: SCREAMING_SNAKE_CASE with prefix (e.g., `NEXT_PUBLIC_USERS_FETCH_API`)
5. **Interfaces**: PascalCase with descriptive suffix (e.g., `FetchUsersResponse`, `CreateUserPayload`)
6. **Selectors**: camelCase with `select` prefix (e.g., `selectUsers`, `selectUsersLoading`)

### State Shape Pattern:

```typescript
interface FeatureState {
  data: DataType | null // Main data
  isLoading: boolean // Loading state
  error: string | null // Error message
  // Action-specific states
  isCreating?: boolean
  isUpdating?: boolean
  isDeleting?: boolean
}
```

### Messages Pattern:

```typescript
export const MESSAGES = {
  [FEATURE_NAME_UPPER]: {
    VALIDATION: {
      // Validation messages
    },
    SUCCESS: {
      // Success messages
    },
    ERROR: {
      // Error messages
    },
    LOADING: {
      // Loading messages
    },
  },
}
```

### Thunk Pattern:

```typescript
export const [actionName] = createAsyncThunk<
  ResponseType,
  PayloadType,
  { rejectValue: string }
>(
  ACTION_TYPE_CONSTANT,
  async (payload, { rejectWithValue }) => {
    return handleAsyncThunkApi(
      () => api.[method](ENDPOINT_CONSTANT, payload),
      rejectWithValue,
      MESSAGES.[FEATURE].ERROR.[ACTION]_FAILED
    )
  }
)
```

### Selector Pattern:

```typescript
const [featureName]State = (state: RootState) => state.[FeatureName]

export const select[FeatureName] = [featureName]State
export const select[Property] = (state: RootState) => [featureName]State(state).[property]
```

---

## Quick Reference Table

| Task                                     | Prompt to Use |
| ---------------------------------------- | ------------- |
| Create brand new feature                 | Prompt 1      |
| Add single action to existing feature    | Prompt 2      |
| Add multiple actions to existing feature | Prompt 3      |
| Create feature with pagination           | Prompt 4      |
| Improve error handling                   | Prompt 5      |
| Add optimistic updates                   | Prompt 6      |

---

## Example: Complete Flow for "Products" Feature

### Step 1: Create Feature (Prompt 1)

````

Create a new feature called "products" with complete Redux store integration using the following details:

**API Details:**

- Endpoint: /admin/products
- Method: GET
- Response Structure:

  ```typescript
  interface FetchProductsResponse {
    success: boolean
    data: {
      products: Product[]
      total: number
    }
    message: string
  }

  interface Product {
    product_id: string
    name: string
    description: string
    price: number
    stock: number
    category_id: string
    is_active: boolean
    created_at: string
    updated_at: string
  }
  ```

````

---

```

### Step 2: Add Create Product Action (Prompt 2)

Add a new action to the existing "products" feature for creating a new product.

**API Details:**

- Endpoint: /admin/products
- Method: POST
- Payload Structure:

```

---

### Step 3: Add Update and Delete Actions (Prompt 3)

```

Add the following actions to the existing "products" feature:

**Action 1: Update Product**

- Endpoint: /admin/products/:id
- Method: PATCH

**Action 2: Delete Product**

- Endpoint: /admin/products/:id
- Method: DELETE

```

---

## Notes

1. Always read the existing `auth` feature files as reference before creating new features
2. Use TypeScript interfaces for all data structures
3. Follow the established patterns in the codebase
4. Ensure proper error handling in all thunks
5. Keep DTOs organized - generic types in `generic.ts`, feature-specific in feature files
6. Always export new actions, thunks, and selectors from the feature's `index.ts`
7. Use meaningful, descriptive names for all constants and interfaces
8. Add JSDoc comments for complex logic

---

**Last Updated:** 2026-01-04
