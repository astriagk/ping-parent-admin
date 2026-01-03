# Quick Start Guide - Domiex Template

This guide provides quick recipes for common development tasks.

---

## Setup & Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn dev

# Build for production
yarn build

# Start production server
yarn start
```

---

## Quick Recipes

### 1. Create a New Page

```typescript
// Step 1: Create view component
// src/views/MyFeature/index.tsx
const MyFeatureView = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Feature</h1>
      {/* Your content */}
    </div>
  );
};

export default MyFeatureView;

// Step 2: Create page route
// src/app/(layout)/myfeature/page.tsx
import MyFeatureView from '@/views/MyFeature';

const MyFeaturePage = () => {
  return <MyFeatureView />;
};

export default MyFeaturePage;

// Step 3: Add to sidebar menu
// Edit src/data/Sidebar/menu.ts
// Add your menu item to the appropriate section
```

### 2. Add a Card Component

```typescript
const InfoCard = ({ title, value, icon, trend }) => {
  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {title}
        </h3>
        <div className="text-primary-500">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-slate-900 dark:text-white">
        {value}
      </div>
      {trend && (
        <div className="mt-2 text-sm text-green-600">
          {trend}
        </div>
      )}
    </div>
  );
};

// Usage
<InfoCard
  title="Total Sales"
  value="$12,345"
  icon={<DollarSign />}
  trend="+12.5% from last month"
/>
```

### 3. Create a Data Table

```typescript
import { CustomTable } from '@/components/custom/table';

const MyTable = ({ data }) => {
  const columns = [
    { header: 'Name', accessorKey: 'name' },
    { header: 'Email', accessorKey: 'email' },
    { header: 'Status', accessorKey: 'status' }
  ];

  return (
    <CustomTable
      data={data}
      columns={columns}
      enableSorting
      enableFiltering
      enablePagination
    />
  );
};
```

### 4. Add a Form with Validation

```typescript
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    try {
      // Your API call here
      console.log(data);
      toast.success('Form submitted successfully!');
    } catch (error) {
      toast.error('Submission failed!');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
          type="email"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 6,
              message: 'Password must be at least 6 characters'
            }
          })}
          type="password"
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-6 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
      >
        Submit
      </button>
    </form>
  );
};
```

### 5. Add a Chart

```typescript
import ReactApexChart from 'react-apexcharts';

const SalesChart = ({ data }) => {
  const options = {
    chart: {
      type: 'line',
      toolbar: { show: false }
    },
    stroke: { curve: 'smooth', width: 2 },
    colors: ['#6366f1'],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    yaxis: {
      labels: {
        formatter: (value) => `$${value}`
      }
    },
    tooltip: {
      theme: 'dark'
    }
  };

  const series = [{
    name: 'Sales',
    data: [30000, 40000, 35000, 50000, 49000, 60000]
  }];

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Sales Overview</h3>
      <ReactApexChart
        options={options}
        series={series}
        type="line"
        height={350}
      />
    </div>
  );
};
```

### 6. Use Redux State

```typescript
import { useSelector, useDispatch } from 'react-redux';
import { changeLayoutMode } from '@/slices/layout/reducer';

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const layoutMode = useSelector((state) => state.Layout.layoutMode);

  const toggleTheme = () => {
    const newMode = layoutMode === 'LIGHT' ? 'DARK' : 'LIGHT';
    dispatch(changeLayoutMode(newMode));
  };

  return (
    <button onClick={toggleTheme}>
      {layoutMode === 'LIGHT' ? 'Dark' : 'Light'} Mode
    </button>
  );
};
```

### 7. Create a Modal

```typescript
import { useState } from 'react';
import { CustomModal } from '@/components/custom/modal';

const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Open Modal
      </button>

      <CustomModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Confirm Action"
      >
        <div className="p-6">
          <p>Are you sure you want to proceed?</p>
          <div className="mt-6 flex gap-4 justify-end">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                // Handle confirm
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-primary-500 text-white rounded"
            >
              Confirm
            </button>
          </div>
        </div>
      </CustomModal>
    </>
  );
};
```

### 8. Add API Integration

```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const userAPI = {
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  createUser: (data) => api.post('/users', data),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  deleteUser: (id) => api.delete(`/users/${id}`)
};

// Usage in component
import { userAPI } from '@/services/api';
import { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await userAPI.getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Failed to load users:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {users.map(user => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  );
};
```

### 9. Use Translations

```typescript
import { useTranslation } from 'next-i18next';

const MyComponent = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};

// Add to public/locales/en/common.json
{
  "welcome": "Welcome to Dashboard",
  "description": "Manage your business efficiently"
}
```

### 10. Create a Dashboard Widget

```typescript
const DashboardWidget = ({ title, children, icon, actions }) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="p-2 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary-500">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
            {title}
          </h3>
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

// Usage
<DashboardWidget
  title="Sales Overview"
  icon={<TrendingUp size={20} />}
  actions={
    <button className="text-sm text-primary-500">View All</button>
  }
>
  <SalesChart />
</DashboardWidget>
```

---

## Layout Customization

### Change Layout Type

```typescript
import { changeLayout } from '@/slices/layout/reducer';

// In your component
dispatch(changeLayout('HORIZONTAL')); // Options: VERTICAL, HORIZONTAL, MODERN, BOXED, SEMIBOX
```

### Change Sidebar Size

```typescript
import { changeSidebarSize } from '@/slices/layout/reducer';

dispatch(changeSidebarSize('SMALL')); // Options: DEFAULT, MEDIUM, SMALL
```

### Change Theme

```typescript
import { changeLayoutMode, changeDataColor } from '@/slices/layout/reducer';

// Toggle dark mode
dispatch(changeLayoutMode('DARK')); // Options: LIGHT, DARK, DEFAULT, BLACK_WHITE

// Change accent color
dispatch(changeDataColor('VIOLET')); // Options: DEFAULT, GREEN, VIOLET, ORANGE, TEAL, FUCHSIA, LIME, AMBER
```

---

## Common Tailwind Classes

### Layout
```css
/* Container */
p-6                    /* Padding all sides */
mx-auto                /* Center horizontally */
max-w-7xl              /* Max width */

/* Grid */
grid grid-cols-3 gap-4  /* 3 column grid */
grid-cols-12            /* 12 column grid */
col-span-4              /* Span 4 columns */

/* Flex */
flex items-center justify-between
flex-col               /* Column direction */
gap-4                  /* Gap between items */
```

### Typography
```css
text-2xl font-bold     /* Large bold text */
text-sm                /* Small text */
text-slate-600         /* Gray text */
dark:text-white        /* White in dark mode */
```

### Colors
```css
bg-white dark:bg-slate-800       /* Background */
text-primary-500                  /* Primary color */
border-slate-200                  /* Border color */
```

### Spacing
```css
mb-4                   /* Margin bottom */
mt-6                   /* Margin top */
px-4 py-2              /* Padding x and y */
```

### Borders & Shadows
```css
rounded-lg             /* Rounded corners */
shadow-lg              /* Large shadow */
border                 /* Border */
```

### Responsive
```css
md:grid-cols-2         /* 2 columns on medium screens */
lg:flex                /* Flex on large screens */
hidden md:block        /* Hide on mobile, show on desktop */
```

---

## File Locations Reference

| What | Where |
|------|-------|
| Pages | `src/app/(layout)/[section]/page.tsx` |
| Views | `src/views/[Feature]/` |
| Components | `src/components/custom/` |
| Redux Slices | `src/slices/[feature]/` |
| Mock Data | `src/data/` |
| API Data | `src/apidata/` |
| TypeScript Types | `src/dtos/` |
| Styles | `src/assets/css/` |
| Images | `src/assets/images/` |
| Layout Components | `src/layout/` |
| Sidebar Menu | `src/data/Sidebar/menu.ts` |

---

## Environment Variables

```env
# Brand
NEXT_PUBLIC_BRAND_NAME="Your Brand"

# API
NEXT_PUBLIC_IS_API_ACTIVE="false"
NEXT_PUBLIC_BASE_URL="http://localhost:3000/"
NEXT_PUBLIC_API_URL="https://api.example.com"

# Features
NEXT_PUBLIC_IS_LOCAL_STORAGE="true"

# Services
GOOGLE_MAPS_API_KEY="your-key-here"
```

---

## Useful Commands

```bash
# Development
yarn dev                 # Start dev server
yarn build               # Build production
yarn start               # Start production server

# Code Quality
yarn lint                # Run linter
yarn lint:fix            # Fix linting issues
yarn prettier:write      # Format code

# Package Management
yarn add [package]       # Add dependency
yarn remove [package]    # Remove dependency
```

---

## Tips & Tricks

1. **Dark Mode**: Use `dark:` prefix for dark mode styles
2. **Responsive**: Use `md:`, `lg:`, `xl:` for responsive design
3. **Icons**: Import from `lucide-react` for consistent icons
4. **Toast**: Use `react-toastify` for notifications
5. **Loading States**: Show loaders during async operations
6. **Error Handling**: Always wrap API calls in try-catch
7. **TypeScript**: Define interfaces for all props and data
8. **Performance**: Use `React.memo` for expensive components
9. **Accessibility**: Add `aria-label` to interactive elements
10. **SEO**: Use Next.js metadata API for page titles

---

## Getting Help

- Check [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) for detailed documentation
- Refer to component examples in `src/views/`
- Look at existing pages for patterns
- Check Redux state in browser DevTools
- Use TypeScript errors as guides

---

**Happy Coding!**
