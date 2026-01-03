# Domiex Admin Template - Complete Guide

> **Version:** 2.2.0
> **Author:** SRBThemes
> **Framework:** Next.js 15 + TypeScript + Tailwind CSS

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Getting Started](#getting-started)
5. [Layout System](#layout-system)
6. [Theming & Styling](#theming--styling)
7. [State Management](#state-management)
8. [Available Features](#available-features)
9. [Development Workflow](#development-workflow)
10. [Customization Guide](#customization-guide)
11. [Best Practices](#best-practices)

---

## Project Overview

**Domiex** is a premium, production-ready Next.js TypeScript admin dashboard template with extensive features including:

- 10 pre-built dashboard types (eCommerce, Analytics, CRM, Hospital, School, etc.)
- 13 full-featured application modules
- 35+ UI components with accessibility support
- 21 chart types (ApexCharts + ECharts)
- Multi-layout support (Vertical, Horizontal, Modern, Boxed, Semi-box)
- Internationalization (14 languages)
- Dark/Light mode with theme customization
- RTL support
- Redux state management
- Fully responsive design

---

## Tech Stack

### Core Framework
| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.1.7 | React framework with App Router |
| React | 19.1.0 | UI library |
| TypeScript | 5.8.2 | Type safety |
| Tailwind CSS | 4.0.17 | Utility-first styling |

### State Management
- Redux Toolkit 2.2.7
- React-Redux 9.2.0
- Next-Redux-Wrapper 8.1.0

### UI & Components
- Lucide React (Primary icons)
- Remix Icon, Boxicons, Line Awesome
- ApexCharts 3.51.0
- ECharts 5.5.1
- FullCalendar 6.1.15
- React Hook Form 7.52.2
- TanStack React Table 8.20.1

### Utilities
- Axios 1.7.7 (HTTP client)
- i18next 23.15.2 (Internationalization)
- Swiper 11.1.9 (Carousels)
- React Toastify 11.0.5 (Notifications)
- Simplebar React 3.2.6 (Custom scrollbars)

---

## Project Structure

```
admin-template-pp-ui/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (layout)/                 # Main layout routes
│   │   │   ├── dashboards/           # 10 Dashboard types
│   │   │   ├── apps/                 # 13 Feature apps
│   │   │   ├── apexchart/            # 21 Chart types
│   │   │   ├── ui/                   # 35+ UI components
│   │   │   ├── form/                 # Form elements
│   │   │   ├── table/                # Table components
│   │   │   ├── page/                 # User pages
│   │   │   ├── widgets/              # Widgets
│   │   │   ├── icons/                # Icon libraries
│   │   │   ├── maps/                 # Maps integration
│   │   │   ├── layout.tsx            # Main layout
│   │   │   └── page.tsx              # Root page
│   │   │
│   │   ├── (non-layout)/             # Routes without main layout
│   │   │   └── landing/              # 6 Landing page types
│   │   │
│   │   └── layout.tsx                # Root layout
│   │
│   ├── layout/                       # Layout components
│   │   ├── Layout.tsx                # Main layout wrapper
│   │   ├── Topbar.tsx                # Top navigation bar
│   │   ├── Sidebar.tsx               # Side navigation
│   │   └── Footer.tsx                # Footer
│   │
│   ├── components/
│   │   ├── custom/                   # Custom UI components
│   │   │   ├── accordion/
│   │   │   ├── buttons/
│   │   │   ├── drawer/
│   │   │   ├── dropdown/
│   │   │   ├── modal/
│   │   │   ├── table/
│   │   │   └── tabs/
│   │   │
│   │   ├── common/                   # Shared components
│   │   │   ├── BreadCrumb.tsx
│   │   │   ├── Pagination.tsx
│   │   │   ├── DeleteModal.tsx
│   │   │   └── ...
│   │   │
│   │   ├── auth/                     # Authentication components
│   │   ├── constants/                # Constants
│   │   └── layout/                   # Layout sub-components
│   │
│   ├── views/                        # Page view components
│   │   ├── Dashboards/               # Dashboard views
│   │   ├── Apexcharts/               # Chart views
│   │   ├── Apps/                     # App views
│   │   └── ...
│   │
│   ├── slices/                       # Redux state slices
│   │   ├── layout/                   # Layout state
│   │   ├── calendar/
│   │   ├── chat/
│   │   ├── ecommerce/
│   │   └── ...
│   │
│   ├── data/                         # Mock/static data
│   ├── apidata/                      # API data definitions
│   ├── dtos/                         # TypeScript interfaces
│   │
│   ├── assets/
│   │   ├── css/                      # Stylesheets
│   │   │   ├── tailwind.css
│   │   │   ├── components/
│   │   │   ├── themes-color/
│   │   │   └── plugins/
│   │   ├── fonts/                    # Font files
│   │   └── images/                   # Images & assets
│   │
│   └── styles/                       # Additional styles
│
├── plugins/                          # Tailwind plugins
│   ├── layouts/                      # Layout plugins
│   └── pixeleyezui/                  # Custom UI plugins
│
├── public/                           # Static assets
│   ├── apidata/                      # Static API data
│   └── assets/                       # Public assets
│
├── docs/                             # Documentation
│
└── Configuration Files
    ├── package.json
    ├── tsconfig.json
    ├── next.config.mjs
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── next-i18next.config.js
    └── .env
```

---

## Getting Started

### Prerequisites
- Node.js 18+ or 20+
- Yarn 4.12.0 (or npm/pnpm)

### Installation

1. **Install Dependencies**
```bash
yarn install
# or
npm install
```

2. **Configure Environment Variables**
```bash
cp .env.example .env
```

Edit `.env`:
```env
NEXT_PUBLIC_BRAND_NAME="Your Brand Name"
NEXT_PUBLIC_IS_API_ACTIVE="false"
NEXT_PUBLIC_IS_LOCAL_STORAGE="true"
NEXT_PUBLIC_BASE_URL="http://localhost:3000/"
GOOGLE_MAPS_API_KEY="your-google-maps-api-key"
```

3. **Start Development Server**
```bash
yarn dev
# or
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
yarn build
yarn start
# or
npm run build
npm run start
```

### Other Commands

```bash
yarn lint              # Run ESLint
yarn lint:fix          # Fix linting issues
yarn prettier:write    # Format code with Prettier
```

---

## Layout System

### Layout Types

The template supports 5 layout configurations:

1. **VERTICAL** (Default)
   - Traditional left sidebar
   - Best for: Most admin panels

2. **HORIZONTAL**
   - Top navigation bar
   - Best for: Content-focused apps

3. **MODERN**
   - Modern sidebar variant
   - Responsive behavior
   - Best for: Contemporary designs

4. **BOXED**
   - Centered content box
   - Best for: Focused workflows

5. **SEMIBOX**
   - Semi-boxed layout
   - Best for: Hybrid approach

### Sidebar Configuration

**Sizes:**
- `DEFAULT` - Full width (240px)
- `MEDIUM` - Medium (160px)
- `SMALL` - Icon-only (75px)

**Colors:**
- `LIGHT` - Light background
- `DARK` - Dark background
- `BRAND` - Brand color
- `PURPLE` - Purple theme
- `SKY` - Sky blue theme

### Changing Layout Programmatically

```typescript
import { useDispatch } from 'react-redux';
import {
  changeLayout,
  changeSidebarSize,
  changeSidebarColor
} from '@/slices/layout/reducer';

// Change layout type
dispatch(changeLayout('HORIZONTAL'));

// Change sidebar size
dispatch(changeSidebarSize('SMALL'));

// Change sidebar color
dispatch(changeSidebarColor('DARK'));
```

### Responsive Behavior

- **Desktop (>1000px):** Full sidebar with toggle
- **Mobile (<1000px):** Collapsible overlay sidebar
- **Tablet (768px-1000px):** Adaptive layout

---

## Theming & Styling

### Color System

**Primary Colors:** Uses oklch color space
```css
--primary-50: oklch(96.69% 0.0164 255.54);
--primary-500: oklch(65.26% 0.1828 255.54);
--primary-900: oklch(29.24% 0.0856 263.87);
```

### Theme Modes

**Layout Mode:**
- `LIGHT` - Light background
- `DARK` - Dark background
- `DEFAULT` - System preference
- `BLACK_WHITE` - High contrast

**Dark Mode Variants:**
- `DEFAULT`, `ZINC`, `STONE`, `NEUTRAL`, `GRAY`

**Data Colors (Accent):**
- `DEFAULT`, `GREEN`, `VIOLET`, `ORANGE`, `TEAL`, `FUCHSIA`, `LIME`, `AMBER`

### Switching Themes

```typescript
import { changeLayoutMode, changeDataColor } from '@/slices/layout/reducer';

// Toggle dark mode
dispatch(changeLayoutMode('DARK'));

// Change accent color
dispatch(changeDataColor('VIOLET'));
```

### Custom CSS Variables

Edit theme variables in `src/assets/css/components/theme.css`:

```css
:root {
  --primary-500: oklch(65.26% 0.1828 255.54);
  --sidebar: 15rem;
  --topbar: 4.6875rem;
  /* ... more variables */
}
```

### Styling Architecture

```
assets/css/
├── tailwind.css              # Main entry
├── components/
│   ├── theme.css             # Theme variables
│   ├── buttons.css
│   ├── form.css
│   └── ...
├── themes-color/
│   ├── primary-color.css
│   ├── sidebar-color.css
│   └── dark-color.css
└── plugins/
    ├── apexchart.css
    ├── calendar.css
    └── ...
```

---

## State Management

### Redux Store Structure

```
Store
├── layout          # Layout configuration
├── calendar        # Calendar events
├── chat            # Chat messages (default/group/contact)
├── crm             # CRM data (contacts/deals/leads)
├── ecommerce       # E-commerce (products/orders/cart/wishlist)
├── email           # Email management
├── events          # Event management
├── fileManager     # File operations
├── hospital        # Hospital data
├── invoice         # Invoice management
├── projects        # Project management
└── school          # School management
```

### Using Redux State

```typescript
import { useSelector, useDispatch } from 'react-redux';

// Select state
const layoutMode = useSelector((state: any) => state.Layout.layoutMode);

// Dispatch actions
const dispatch = useDispatch();
dispatch(changeLayoutMode('DARK'));
```

### Creating New Slices

1. Create slice file: `src/slices/myfeature/reducer.ts`

```typescript
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false
};

const myFeatureSlice = createSlice({
  name: 'myfeature',
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload;
    }
  }
});

export const { setData } = myFeatureSlice.actions;
export default myFeatureSlice.reducer;
```

2. Register in root reducer: `src/slices/reducer.ts`

```typescript
import myFeature from './myfeature/reducer';

const rootReducer = combineReducers({
  Layout,
  myFeature,
  // ... other reducers
});
```

---

## Available Features

### Dashboards (10 Types)

1. **eCommerce** - Sales, products, orders, customers
2. **Analytics** - Campaign metrics, traffic, conversions
3. **CRM** - Leads, deals, contacts, pipeline
4. **Email** - Email statistics, campaigns
5. **Hospital** - Patients, appointments, staff
6. **File Manager** - File browser, upload
7. **Projects** - Project tracking, tasks
8. **School** - Students, teachers, exams
9. **Music** - Artists, albums, plays
10. **Email** (Alternative) - Email management

**Location:** `src/app/(layout)/dashboards/[type]/page.tsx`

### Apps (13 Types)

1. **Calendar** - FullCalendar with 5 view variants
2. **Chat** - Real-time messaging (default/group)
3. **CRM** - Contact/deal/lead management
4. **eCommerce** - Products, orders, cart, checkout
5. **Email** - Mailbox, composition
6. **Events** - Event grid/list views
7. **File Manager** - File operations
8. **Hospital** - Healthcare management
9. **Invoice** - Invoice creation/tracking
10. **Mailbox** - Message management
11. **Order** - Order management
12. **Projects** - Project collaboration
13. **School** - Educational system

**Location:** `src/app/(layout)/apps/[app]/page.tsx`

### UI Components (35+)

**Basic Components:**
- Accordion, Alerts, Avatar, Badge, Breadcrumb
- Button Group, Buttons, Cards, Colors
- Drawer, Dropdown, Gallery, Links
- List Group, Loader, Modal, Notification
- Pagination, Progress Bar, Tabs, Timeline
- Tooltips, Typography, Video

**Advanced Components:**
- 3D Effects, Animations, Chatbot
- Code Highlighting, Image Annotation
- Image Masking, Custom Scrollbars
- Swiper Carousels, Tree View
- Word Counter

**Location:** `src/app/(layout)/ui/[component]/page.tsx`

### Form Elements (13 Types)

1. Auto-sizing inputs
2. Basic inputs
3. Checkbox/Radio
4. Clipboard
5. File inputs
6. Input groups
7. Number spinners
8. Date/time pickers (Flatpickr)
9. Range sliders
10. reCAPTCHA
11. Dropdown selects (virtualized)
12. Toggle switches
13. Multi-step wizards

**Location:** `src/app/(layout)/form/[element]/page.tsx`

### Charts (21+ Types)

**ApexCharts:**
Area, Bar, Box & Whisker, Bubble, Candlestick, Column, Funnel, Heat Map, Line, Mixed, Pie/Doughnut, Polar Area, Radar, Radial Bar, Range Area, Scatter, Slope, Timeline, Treemap, Sankey, Tree

**ECharts:**
Bar, Line, Pie

**Location:** `src/app/(layout)/apexchart/[type]/page.tsx`

---

## Development Workflow

### Adding a New Page

1. **Create Page Route**

```typescript
// src/app/(layout)/mypage/page.tsx
import MyPageView from '@/views/MyPage';

const MyPage = () => {
  return <MyPageView />;
};

export default MyPage;
```

2. **Create View Component**

```typescript
// src/views/MyPage/index.tsx
const MyPageView = () => {
  return (
    <div>
      <h1>My Custom Page</h1>
      {/* Your content */}
    </div>
  );
};

export default MyPageView;
```

3. **Add to Sidebar Menu**

Edit `src/data/Sidebar/menu.ts`:

```typescript
{
  id: 'my-page',
  label: 'My Page',
  link: '/mypage',
  icon: <IconComponent />
}
```

### Creating Custom Components

```typescript
// src/components/custom/MyComponent/index.tsx
interface MyComponentProps {
  title: string;
  data: any[];
}

const MyComponent: React.FC<MyComponentProps> = ({ title, data }) => {
  return (
    <div className="p-4 bg-white dark:bg-slate-800 rounded-lg">
      <h3 className="text-lg font-semibold">{title}</h3>
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

### Working with Forms

```typescript
import { useForm } from 'react-hook-form';

const MyForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('email', { required: true })}
        className="form-input"
      />
      {errors.email && <span>Email is required</span>}

      <button type="submit">Submit</button>
    </form>
  );
};
```

### Using Charts

```typescript
import ReactApexChart from 'react-apexcharts';

const MyChart = () => {
  const options = {
    chart: { type: 'line' },
    xaxis: { categories: ['Jan', 'Feb', 'Mar'] }
  };

  const series = [{
    name: 'Sales',
    data: [30, 40, 45]
  }];

  return (
    <ReactApexChart
      options={options}
      series={series}
      type="line"
      height={350}
    />
  );
};
```

### Internationalization

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
```

Add translations in `public/locales/[lang]/common.json`:

```json
{
  "welcome": "Welcome",
  "description": "This is a description"
}
```

---

## Customization Guide

### Changing Primary Color

Edit `src/assets/css/themes-color/primary-color.css`:

```css
:root {
  --primary-500: oklch(65% 0.18 250); /* Your color */
}
```

### Adding Custom Fonts

1. Add font files to `src/assets/fonts/`
2. Import in `src/assets/css/fonts/fonts.css`:

```css
@font-face {
  font-family: 'MyFont';
  src: url('../fonts/MyFont.woff2') format('woff2');
}
```

3. Use in Tailwind config:

```javascript
theme: {
  extend: {
    fontFamily: {
      custom: ['MyFont', 'sans-serif']
    }
  }
}
```

### Customizing Sidebar

Edit `src/layout/Sidebar.tsx`:

```typescript
// Change sidebar width
<aside className="w-[280px]"> {/* Custom width */}

// Add custom sections
<div className="my-custom-section">
  {/* Custom content */}
</div>
```

### Adding Custom Tailwind Utilities

Edit `plugins/` directory or add to `tailwind.config.ts`:

```javascript
plugins: [
  function({ addUtilities }) {
    addUtilities({
      '.my-custom-class': {
        padding: '1rem',
        backgroundColor: 'blue'
      }
    })
  }
]
```

### Customizing Layout Behavior

Edit `src/slices/layout/reducer.ts` to add custom layout logic.

---

## Best Practices

### 1. Component Organization
- Keep components small and focused
- Use TypeScript interfaces for props
- Place reusable components in `src/components/custom/`
- Page-specific components in `src/views/`

### 2. State Management
- Use Redux for global state
- Use React hooks for local state
- Keep slices focused on single features
- Use selectors for derived state

### 3. Styling
- Use Tailwind utility classes
- Leverage dark mode classes: `dark:bg-slate-800`
- Use CSS variables for theme consistency
- Avoid inline styles

### 4. Performance
- Use dynamic imports for large components
- Implement lazy loading for routes
- Optimize images with Next.js Image component
- Use React.memo for expensive renders

### 5. Type Safety
- Define TypeScript interfaces in `src/dtos/`
- Use strict TypeScript settings
- Avoid `any` types
- Export and reuse type definitions

### 6. Code Quality
- Run linters before committing
- Follow consistent naming conventions
- Write self-documenting code
- Keep functions small and pure

### 7. Accessibility
- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation
- Test with screen readers
- Maintain color contrast ratios

### 8. Internationalization
- Extract all text to translation files
- Support RTL languages
- Test with different locales
- Provide fallback translations

---

## Common Tasks

### Task 1: Add a New Dashboard

1. Create view: `src/views/Dashboards/MyDashboard/index.tsx`
2. Create route: `src/app/(layout)/dashboards/mydashboard/page.tsx`
3. Add menu item in sidebar data
4. Create Redux slice if needed
5. Add mock data in `src/data/`

### Task 2: Integrate Real API

1. Update `.env`:
```env
NEXT_PUBLIC_IS_API_ACTIVE="true"
NEXT_PUBLIC_API_URL="https://api.example.com"
```

2. Create API service:
```typescript
// src/services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

export const fetchData = () => api.get('/endpoint');
```

3. Update Redux thunk:
```typescript
// src/slices/myfeature/thunk.ts
import { fetchData } from '@/services/api';

export const getData = createAsyncThunk(
  'myfeature/getData',
  async () => {
    const response = await fetchData();
    return response.data;
  }
);
```

### Task 3: Add Authentication

1. Create auth context/slice
2. Implement login/logout logic
3. Add protected route wrapper
4. Store token in localStorage/cookies
5. Add token to API requests

### Task 4: Deploy to Production

1. Build the project:
```bash
yarn build
```

2. Test production build:
```bash
yarn start
```

3. Deploy to platform (Vercel/Netlify/etc.)
4. Configure environment variables
5. Set up domain and SSL

---

## Troubleshooting

### Common Issues

**Issue: Dark mode not working**
- Check Redux state: `layoutMode`
- Verify `dark:` classes in components
- Check theme CSS files are loaded

**Issue: Sidebar not responsive**
- Verify layout state updates
- Check media query breakpoints
- Ensure layout wrapper is correct

**Issue: Icons not displaying**
- Install icon package
- Import icon component correctly
- Check icon name spelling

**Issue: Charts not rendering**
- Verify chart data format
- Check ApexCharts options
- Ensure chart container has height

**Issue: i18n not working**
- Check language files exist
- Verify i18next configuration
- Ensure provider wraps app

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [ApexCharts](https://apexcharts.com/docs/)
- [React Hook Form](https://react-hook-form.com/)

### Support
- Template Documentation: Check original package
- GitHub Issues: Create issues for bugs
- Community: Stack Overflow

---

## Changelog

### Version 2.2.0
- Next.js 15 support
- Tailwind CSS 4 upgrade
- React 19 compatibility
- Performance improvements
- Bug fixes

---

## License

This is a commercial template purchased from SRBThemes. Refer to your purchase license for usage rights.

---

**Last Updated:** January 2026

For more information or questions, refer to the original template documentation or contact SRBThemes support.
