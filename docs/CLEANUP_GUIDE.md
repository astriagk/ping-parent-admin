# Template Cleanup & Optimization Guide

Guide for cleaning up the Domiex template and keeping only what you need for your custom application.

---

## Strategy: Progressive Cleanup

**Don't delete everything at once!** Follow this progressive approach:

### Phase 1: Keep Everything (Weeks 1-4)
- Build your features alongside template examples
- Reference existing code
- Learn the patterns

### Phase 2: Selective Cleanup (Month 2)
- Remove unused demo pages
- Keep core components and layout
- Your app is taking shape

### Phase 3: Production Optimization (Before deployment)
- Remove all unused code
- Optimize bundle size
- Keep only what you use

---

## What to KEEP (Essential)

### ✅ Core Structure
```
src/
├── app/
│   ├── layout.tsx                    # KEEP - Root layout
│   ├── (layout)/
│   │   └── layout.tsx                # KEEP - Main layout wrapper
│   └── globals.css                   # KEEP - Global styles
│
├── layout/                           # KEEP ALL
│   ├── Layout.tsx                    # Main layout
│   ├── Topbar.tsx                    # Navigation bar
│   ├── Sidebar.tsx                   # Side menu
│   └── Footer.tsx                    # Footer
│
├── components/
│   ├── custom/                       # KEEP ALL - Reusable components
│   │   ├── accordion/
│   │   ├── buttons/
│   │   ├── drawer/
│   │   ├── dropdown/
│   │   ├── modal/
│   │   ├── table/
│   │   └── tabs/
│   │
│   ├── common/                       # KEEP ALL - Shared components
│   │   ├── BreadCrumb.tsx
│   │   ├── Pagination.tsx
│   │   ├── DeleteModal.tsx
│   │   └── ...
│   │
│   └── constants/                    # KEEP - Layout constants
│
├── slices/
│   ├── layout/                       # KEEP - Layout state management
│   └── reducer.ts                    # KEEP - Root reducer
│
├── dtos/
│   ├── index.ts                      # KEEP
│   └── layout.ts                     # KEEP
│
├── assets/
│   ├── css/                          # KEEP ALL - Styling system
│   ├── fonts/                        # KEEP - Fonts
│   └── images/                       # REVIEW - Keep your images only
│
└── styles/                           # KEEP
```

### ✅ Configuration Files - KEEP ALL
```
package.json
tsconfig.json
next.config.mjs
tailwind.config.ts
postcss.config.mjs
next-i18next.config.js
.eslintrc.js
.prettierrc.js
.env
```

### ✅ Plugins - KEEP
```
plugins/
├── layouts/                          # KEEP - Layout styling
└── pixeleyezui/                      # KEEP - Custom components
```

---

## What to DELETE (Demo Content)

### ❌ Remove Demo Dashboards
```
src/
├── app/(layout)/dashboards/          # DELETE ALL (except what you need)
│   ├── analytics/
│   ├── crm/
│   ├── ecommerce/
│   ├── email/
│   ├── filemanager/
│   ├── hospital/
│   ├── music/
│   ├── projects/
│   └── school/
│
└── views/Dashboards/                 # DELETE ALL
    ├── AnalyticsDashboards/
    ├── CrmDashboards/
    ├── EcommerceDashboard/
    └── ...
```

### ❌ Remove Demo Apps (Keep patterns you'll use)
```
src/
├── app/(layout)/apps/                # DELETE unused apps
│   ├── calendar/                     # DELETE if not using calendar
│   ├── chat/                         # DELETE if not using chat
│   ├── crm/                          # DELETE if not using CRM
│   ├── ecommerce/                    # DELETE if not using ecommerce
│   ├── hospital/                     # DELETE if not using
│   ├── school/                       # DELETE if not using
│   └── ...
│
├── views/Apps/                       # DELETE corresponding views
│   ├── chat/
│   ├── ecommerce/
│   └── ...
│
└── slices/                           # DELETE unused slices
    ├── calendar/                     # DELETE if not using
    ├── chat/                         # DELETE if not using
    ├── crm/                          # DELETE if not using
    ├── ecommerce/                    # DELETE if not using
    └── ...
```

### ❌ Remove UI Demo Pages (Keep components!)
```
src/app/(layout)/
├── ui/                               # DELETE demo pages, KEEP components
├── form/                             # DELETE demo pages, KEEP components
├── table/                            # DELETE demo pages, KEEP components
├── apexchart/                        # DELETE if not using charts
├── echart/                           # DELETE if not using
├── widgets/                          # DELETE demo pages
├── icons/                            # DELETE icon demo pages
├── maps/                             # DELETE if not using maps
└── page/                             # DELETE demo user pages
```

### ❌ Remove Mock Data (Replace with your API)
```
src/
├── data/                             # DELETE ALL (except Sidebar menu)
│   ├── Sidebar/                      # KEEP - Update with your menu
│   ├── analyticsDashboards/          # DELETE
│   ├── ecommerce/                    # DELETE
│   ├── hospital/                     # DELETE
│   └── ...all demo data              # DELETE
│
├── apidata/                          # DELETE ALL mock API data
│   └── ...
│
└── public/apidata/                   # DELETE
```

### ❌ Remove Landing Pages (If not needed)
```
src/app/(non-layout)/landing/         # DELETE if not using
```

---

## Step-by-Step Cleanup Process

### Step 1: Create Your First Feature (Don't delete anything yet!)

1. **Create your page:**
```bash
src/app/(layout)/ping-parent/dashboard/page.tsx
```

2. **Create your view:**
```bash
src/views/PingParent/Dashboard/index.tsx
```

3. **Create your Redux slice:**
```bash
src/slices/pingparent/reducer.ts
src/slices/pingparent/thunk.ts
```

4. **Create your types:**
```bash
src/dtos/pingparent.ts
```

5. **Update sidebar menu:**
```bash
src/data/Sidebar/menu.ts
```

### Step 2: Build Your API Layer

Create API service structure:
```bash
src/services/
├── api.ts                    # Base axios instance
├── auth.service.ts           # Authentication APIs
├── user.service.ts           # User management APIs
└── pingparent.service.ts     # Your custom APIs
```

Example API setup:
```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
});

// Request interceptor - Add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized - redirect to login
      localStorage.removeItem('access_token');
      window.location.href = '/auth/signin';
    }
    return Promise.reject(error);
  }
);

export default api;
```

```typescript
// src/services/pingparent.service.ts
import api from './api';

export interface Parent {
  id: string;
  name: string;
  email: string;
  // ... your fields
}

export const pingParentAPI = {
  // GET all parents
  getParents: () => api.get<Parent[]>('/parents'),

  // GET single parent
  getParent: (id: string) => api.get<Parent>(`/parents/${id}`),

  // POST create parent
  createParent: (data: Partial<Parent>) => api.post<Parent>('/parents', data),

  // PUT update parent
  updateParent: (id: string, data: Partial<Parent>) =>
    api.put<Parent>(`/parents/${id}`, data),

  // DELETE parent
  deleteParent: (id: string) => api.delete(`/parents/${id}`),
};
```

### Step 3: Create Redux Slice with API Integration

```typescript
// src/slices/pingparent/reducer.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Parent } from '@/services/pingparent.service';

interface PingParentState {
  parents: Parent[];
  selectedParent: Parent | null;
  loading: boolean;
  error: string | null;
}

const initialState: PingParentState = {
  parents: [],
  selectedParent: null,
  loading: false,
  error: null,
};

const pingParentSlice = createSlice({
  name: 'pingparent',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setParents: (state, action: PayloadAction<Parent[]>) => {
      state.parents = action.payload;
      state.loading = false;
      state.error = null;
    },
    setSelectedParent: (state, action: PayloadAction<Parent | null>) => {
      state.selectedParent = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setParents,
  setSelectedParent,
  setError,
  clearError,
} = pingParentSlice.actions;

export default pingParentSlice.reducer;
```

```typescript
// src/slices/pingparent/thunk.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { pingParentAPI, Parent } from '@/services/pingparent.service';
import { setLoading, setParents, setSelectedParent, setError } from './reducer';

export const fetchParents = createAsyncThunk(
  'pingparent/fetchParents',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await pingParentAPI.getParents();
      dispatch(setParents(response.data));
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch parents';
      dispatch(setError(message));
      throw error;
    }
  }
);

export const fetchParent = createAsyncThunk(
  'pingparent/fetchParent',
  async (id: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await pingParentAPI.getParent(id);
      dispatch(setSelectedParent(response.data));
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to fetch parent';
      dispatch(setError(message));
      throw error;
    }
  }
);

export const createParent = createAsyncThunk(
  'pingparent/createParent',
  async (data: Partial<Parent>, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await pingParentAPI.createParent(data);
      // Refresh the list
      dispatch(fetchParents());
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to create parent';
      dispatch(setError(message));
      throw error;
    }
  }
);

export const updateParent = createAsyncThunk(
  'pingparent/updateParent',
  async ({ id, data }: { id: string; data: Partial<Parent> }, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await pingParentAPI.updateParent(id, data);
      // Refresh the list
      dispatch(fetchParents());
      return response.data;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update parent';
      dispatch(setError(message));
      throw error;
    }
  }
);

export const deleteParent = createAsyncThunk(
  'pingparent/deleteParent',
  async (id: string, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await pingParentAPI.deleteParent(id);
      // Refresh the list
      dispatch(fetchParents());
      return id;
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to delete parent';
      dispatch(setError(message));
      throw error;
    }
  }
);
```

Register in root reducer:
```typescript
// src/slices/reducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import Layout from './layout/reducer';
import pingparent from './pingparent/reducer'; // Add this

const rootReducer = combineReducers({
  Layout,
  pingparent, // Add this
  // ... other reducers
});

export default rootReducer;
```

### Step 4: Create Your View Component

```typescript
// src/views/PingParent/Dashboard/index.tsx
'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParents } from '@/slices/pingparent/thunk';
import { Loader2 } from 'lucide-react';
import { toast } from 'react-toastify';

const PingParentDashboard = () => {
  const dispatch = useDispatch();
  const { parents, loading, error } = useSelector((state: any) => state.pingparent);

  useEffect(() => {
    dispatch(fetchParents() as any);
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-500" size={40} />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Ping Parent Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {parents.map((parent: any) => (
          <div
            key={parent.id}
            className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow border border-slate-200 dark:border-slate-700"
          >
            <h3 className="text-lg font-semibold mb-2">{parent.name}</h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {parent.email}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PingParentDashboard;
```

### Step 5: Create Page Route

```typescript
// src/app/(layout)/ping-parent/dashboard/page.tsx
import PingParentDashboard from '@/views/PingParent/Dashboard';

const PingParentPage = () => {
  return <PingParentDashboard />;
};

export default PingParentPage;
```

### Step 6: Update Sidebar Menu

```typescript
// src/data/Sidebar/menu.ts
import { Home, Users } from 'lucide-react';

export const menuData = [
  {
    id: 'ping-parent',
    label: 'Ping Parent',
    icon: <Home size={20} />,
    subMenu: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        link: '/ping-parent/dashboard',
        icon: <Users size={20} />
      }
    ]
  },
  // Remove or comment out demo sections
  // ... other menu items
];
```

### Step 7: Now Start Deleting Demo Content

Only after your feature works, delete demo content:

```bash
# Delete demo dashboards
rm -rf src/app/(layout)/dashboards/analytics
rm -rf src/app/(layout)/dashboards/crm
# ... etc

# Delete demo views
rm -rf src/views/Dashboards/AnalyticsDashboards
# ... etc

# Delete demo data
rm -rf src/data/analyticsDashboards
# ... etc

# Delete demo slices
rm -rf src/slices/calendar
rm -rf src/slices/chat
# ... etc (keep layout!)
```

---

## Environment Variables

Update `.env`:
```env
# Your custom variables
NEXT_PUBLIC_API_URL=http://localhost:8000/api
NEXT_PUBLIC_APP_NAME=Ping Parent

# Remove if not using
# GOOGLE_MAPS_API_KEY=
```

---

## Folder Structure for Your App

After cleanup, you should have:

```
src/
├── app/
│   ├── (layout)/
│   │   ├── ping-parent/              # Your app routes
│   │   │   ├── dashboard/
│   │   │   ├── parents/
│   │   │   ├── students/
│   │   │   └── ...
│   │   └── layout.tsx
│   └── layout.tsx
│
├── layout/                           # Keep all
├── components/
│   ├── custom/                       # Keep all
│   └── common/                       # Keep all
│
├── views/
│   └── PingParent/                   # Your views
│       ├── Dashboard/
│       ├── Parents/
│       ├── Students/
│       └── ...
│
├── slices/
│   ├── layout/                       # Keep
│   ├── pingparent/                   # Your slice
│   ├── auth/                         # Your auth slice
│   └── reducer.ts
│
├── services/                         # Create this
│   ├── api.ts
│   ├── auth.service.ts
│   ├── pingparent.service.ts
│   └── ...
│
├── dtos/
│   ├── layout.ts                     # Keep
│   ├── pingparent.ts                 # Your types
│   └── auth.ts                       # Your types
│
├── data/
│   └── Sidebar/                      # Keep - Update menu
│
└── assets/                           # Keep all
```

---

## Bundle Size Optimization (Before Production)

### 1. Remove Unused Dependencies

Check `package.json` and remove unused packages:
```bash
# If not using calendar
npm uninstall @fullcalendar/core @fullcalendar/react

# If not using maps
npm uninstall @react-google-maps/api

# If not using specific chart library
npm uninstall echarts echarts-for-react
```

### 2. Optimize Images

- Remove unused images from `src/assets/images/`
- Compress images you keep
- Use Next.js Image component

### 3. Code Splitting

Already handled by Next.js App Router - no action needed!

### 4. Tree Shaking

- Remove unused imports
- Import only what you need from libraries
```typescript
// Bad
import * as Icons from 'lucide-react';

// Good
import { Home, User, Settings } from 'lucide-react';
```

---

## Summary

### Phase 1: BUILD (Keep everything)
✅ Create your features alongside template
✅ Use template components
✅ Reference template examples
✅ Learn the patterns

### Phase 2: REFINE (Selective cleanup)
✅ Remove obviously unused dashboards
✅ Remove demo apps you won't use
✅ Keep all components and layout
✅ Your app is functional

### Phase 3: OPTIMIZE (Production ready)
✅ Remove all demo content
✅ Remove unused dependencies
✅ Optimize images
✅ Clean unused styles
✅ Ready to deploy!

---

**Recommendation:** Start building your Ping Parent features now without deleting anything. You'll naturally understand what to remove as you build. The template components will save you tons of time!
