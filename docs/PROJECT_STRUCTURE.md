# Project Structure Reference

Detailed breakdown of the Domiex template project structure and file organization.

---

## Root Directory Structure

```
admin-template-pp-ui/
├── src/                      # Source code
├── public/                   # Static assets
├── plugins/                  # Tailwind & build plugins
├── docs/                     # Documentation (this folder)
├── node_modules/             # Dependencies
├── package.json              # Project manifest
├── tsconfig.json             # TypeScript configuration
├── next.config.mjs           # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.mjs        # PostCSS configuration
├── next-i18next.config.js    # Internationalization config
├── next-sitemap.config.js    # Sitemap generation config
├── .eslintrc.js              # ESLint configuration
├── .prettierrc.js            # Prettier configuration
├── .env                      # Environment variables
└── .gitignore                # Git ignore rules
```

---

## `/src` Directory

### Overview
```
src/
├── app/                      # Next.js 15 App Router
├── layout/                   # Layout components
├── components/               # Reusable components
├── views/                    # Page view components
├── slices/                   # Redux state management
├── data/                     # Mock/static data
├── apidata/                  # API data definitions
├── dtos/                     # TypeScript interfaces
├── assets/                   # Styles, fonts, images
└── styles/                   # Additional styles
```

---

## `/src/app` - Next.js App Router

### Structure
```
app/
├── (layout)/                 # Routes with main layout
│   ├── dashboards/           # Dashboard routes
│   ├── apps/                 # Application routes
│   ├── apexchart/            # Chart routes
│   ├── echart/               # EChart routes
│   ├── apexsankey/           # Sankey diagram routes
│   ├── apextree/             # Tree diagram routes
│   ├── ui/                   # UI component routes
│   ├── form/                 # Form routes
│   ├── table/                # Table routes
│   ├── page/                 # User page routes
│   ├── widgets/              # Widget routes
│   ├── icons/                # Icon routes
│   ├── maps/                 # Map routes
│   ├── layout.tsx            # Layout wrapper for this group
│   └── page.tsx              # Root page (/)
│
├── (non-layout)/             # Routes without main layout
│   └── landing/              # Landing page routes
│       ├── doctors/
│       ├── ecommerce/
│       ├── email/
│       ├── invoice/
│       ├── school/
│       └── general/
│
├── layout.tsx                # Root layout
├── globals.css               # Global styles
└── page.tsx                  # Root page handler
```

### Dashboard Routes
```
dashboards/
├── analytics/page.tsx        # Analytics dashboard
├── crm/page.tsx              # CRM dashboard
├── ecommerce/page.tsx        # E-commerce dashboard
├── email/page.tsx            # Email dashboard
├── filemanager/page.tsx      # File manager dashboard
├── hospital/page.tsx         # Hospital dashboard
├── music/page.tsx            # Music dashboard
├── projects/page.tsx         # Projects dashboard
├── school/page.tsx           # School dashboard
└── email-dashboard/page.tsx  # Alternative email dashboard
```

### App Routes
```
apps/
├── calendar/                 # Calendar app variants
│   ├── default/page.tsx
│   ├── date-clicking/page.tsx
│   ├── date-nav-link/page.tsx
│   ├── day-view/page.tsx
│   └── list-view/page.tsx
│
├── chat/                     # Chat app variants
│   ├── default/page.tsx
│   ├── group/page.tsx
│   └── contact/page.tsx
│
├── crm/                      # CRM modules
│   ├── contact/page.tsx
│   ├── deal/page.tsx
│   └── lead/page.tsx
│
├── ecommerce/                # E-commerce modules
│   ├── products/
│   │   ├── list/page.tsx
│   │   └── grid/page.tsx
│   ├── orders/page.tsx
│   ├── customers/page.tsx
│   ├── cart/page.tsx
│   ├── wishlist/page.tsx
│   ├── reviews/page.tsx
│   └── checkout/page.tsx
│
├── email/
│   ├── mailbox/page.tsx
│   └── compose/page.tsx
│
├── events/
│   ├── grid/page.tsx
│   └── list/page.tsx
│
├── file-manager/page.tsx
│
├── hospital/
│   ├── appointments/page.tsx
│   ├── patients/page.tsx
│   ├── staff/page.tsx
│   ├── departments/page.tsx
│   ├── payroll/page.tsx
│   └── overview/page.tsx
│
├── invoice/
│   ├── list/page.tsx
│   └── create/page.tsx
│
├── mailbox/page.tsx
│
├── order/
│   ├── list/page.tsx
│   └── details/page.tsx
│
├── projects/
│   ├── list/page.tsx
│   └── tasks/page.tsx
│
└── school/
    ├── students/page.tsx
    ├── teachers/page.tsx
    ├── exams/page.tsx
    ├── library/page.tsx
    ├── parents/page.tsx
    └── attendance/page.tsx
```

### UI Component Routes
```
ui/
├── accordion/page.tsx
├── alerts/page.tsx
├── avatar/page.tsx
├── badge/page.tsx
├── breadcrumb/page.tsx
├── button-group/page.tsx
├── button-navigation/page.tsx
├── buttons/page.tsx
├── cards/page.tsx
├── colors/page.tsx
├── cookie/page.tsx
├── drawer/page.tsx
├── dropdown/page.tsx
├── gallery/page.tsx
├── links/page.tsx
├── list-group/page.tsx
├── loader/page.tsx
├── modal/page.tsx
├── notification/page.tsx
├── pagination/page.tsx
├── progressbar/page.tsx
├── tabs/page.tsx
├── timeline/page.tsx
├── tooltips/page.tsx
├── typography/page.tsx
├── video/page.tsx
└── advanced/
    ├── 3d-effect/page.tsx
    ├── animation/page.tsx
    ├── bot/page.tsx
    ├── highlight/page.tsx
    ├── image-annotation/page.tsx
    ├── mask/page.tsx
    ├── simplebar/page.tsx
    ├── swiper/page.tsx
    ├── tree/page.tsx
    └── word-counter/page.tsx
```

### Form Routes
```
form/
├── autosize/page.tsx
├── basic-input/page.tsx
├── checkbox-radio/page.tsx
├── clipboard/page.tsx
├── file-input/page.tsx
├── input-group/page.tsx
├── input-spin/page.tsx
├── pickers/page.tsx
├── range/page.tsx
├── recaptcha/page.tsx
├── select/page.tsx
├── switches/page.tsx
└── wizard-basic/page.tsx
```

---

## `/src/layout` - Layout Components

```
layout/
├── Layout.tsx                # Main layout wrapper
├── Layout2.tsx               # Alternative layout variant
├── Topbar.tsx                # Top navigation bar
├── Sidebar.tsx               # Side navigation
├── Footer.tsx                # Footer component
└── components/               # Layout sub-components
    ├── TopbarSearch.tsx
    ├── TopbarNotifications.tsx
    ├── TopbarProfile.tsx
    ├── SidebarMenu.tsx
    └── SidebarFooter.tsx
```

**Purpose:**
- Layout structure and navigation
- Responsive behavior
- Theme switching
- User interface chrome

---

## `/src/components` - Reusable Components

```
components/
├── custom/                   # Custom UI components
│   ├── accordion/
│   │   └── index.tsx
│   ├── buttons/
│   │   ├── PrimaryButton.tsx
│   │   ├── SecondaryButton.tsx
│   │   └── IconButton.tsx
│   ├── drawer/
│   │   └── index.tsx
│   ├── dropdown/
│   │   └── index.tsx
│   ├── modal/
│   │   └── index.tsx
│   ├── table/
│   │   ├── CustomTable.tsx
│   │   └── DataTable.tsx
│   └── tabs/
│       └── index.tsx
│
├── common/                   # Shared components
│   ├── BreadCrumb.tsx
│   ├── Pagination.tsx
│   ├── DeleteModal.tsx
│   ├── DynamicTitle.tsx
│   ├── UserProfileHeader.tsx
│   ├── Widgets.tsx
│   └── ClientProviders.tsx
│
├── auth/                     # Authentication components
│   ├── LoginForm.tsx
│   ├── RegisterForm.tsx
│   └── ForgotPassword.tsx
│
└── constants/                # Component constants
    └── layout.ts
```

**Purpose:**
- Reusable UI building blocks
- Shared functionality
- Design system components

---

## `/src/views` - Page View Components

```
views/
├── Dashboards/               # Dashboard views
│   ├── AnalyticsDashboards/
│   │   └── index.tsx
│   ├── CrmDashboards/
│   │   └── index.tsx
│   ├── EcommerceDashboard/
│   │   ├── index.tsx
│   │   ├── Welcome.tsx
│   │   ├── EcommerceInfo.tsx
│   │   ├── ProductStock.tsx
│   │   └── TopSellingProducts.tsx
│   └── ...more dashboards
│
├── Apexcharts/               # Chart views
│   ├── AreaChart.tsx
│   ├── BarChart.tsx
│   ├── LineChart.tsx
│   └── ...21 chart types
│
├── Apps/                     # App views
│   ├── chat/
│   │   ├── default/
│   │   ├── group/
│   │   └── contact/
│   ├── calendar/
│   ├── ecommerce/
│   ├── hospital/
│   ├── school/
│   └── ...more apps
│
├── Forms/                    # Form views
├── Tables/                   # Table views
├── Pages/                    # User page views
└── UI/                       # UI component demos
```

**Purpose:**
- Page-level components
- Feature implementations
- Business logic containers

---

## `/src/slices` - Redux State Management

```
slices/
├── layout/                   # Layout state
│   ├── reducer.ts
│   ├── thunk.ts
│   └── utils.ts
│
├── calendar/                 # Calendar state
│   ├── reducer.ts
│   └── thunk.ts
│
├── chat/                     # Chat state
│   ├── default/
│   │   ├── reducer.ts
│   │   └── thunk.ts
│   ├── group/
│   └── contact/
│
├── crm/                      # CRM state
│   ├── contact/
│   ├── deal/
│   └── lead/
│
├── ecommerce/                # E-commerce state
│   ├── category-list/
│   ├── checkout/
│   ├── customer/
│   ├── manage-reviews/
│   ├── order/
│   ├── products/
│   ├── shop-cart/
│   └── wishlist/
│
├── email/                    # Email state
├── events/                   # Events state
├── file-manager/             # File manager state
├── hospital/                 # Hospital state
├── invoice/                  # Invoice state
├── projects/                 # Projects state
├── school/                   # School state
│
├── reducer.ts                # Root reducer
└── thunk.ts                  # Root thunks
```

**Purpose:**
- Global state management
- Action creators
- Async operations (thunks)
- State selectors

**Key Files:**
- `reducer.ts` - State slice definition
- `thunk.ts` - Async actions
- `utils.ts` - Helper functions

---

## `/src/data` - Mock/Static Data

```
data/
├── Sidebar/
│   └── menu.ts               # Sidebar menu structure
│
├── analyticsDashboards/
│   ├── campaignData.ts
│   ├── trafficData.ts
│   └── conversionData.ts
│
├── ecommerce/
│   ├── products.ts
│   ├── orders.ts
│   └── customers.ts
│
├── hospital/
│   ├── patients.ts
│   ├── appointments.ts
│   └── staff.ts
│
├── school/
│   ├── students.ts
│   ├── teachers.ts
│   └── exams.ts
│
├── chat/
│   ├── messages.ts
│   └── contacts.ts
│
├── avatar/
│   └── users.ts
│
└── ...more data files
```

**Purpose:**
- Mock data for development
- Sample data for demos
- Default configurations

---

## `/src/apidata` - API Data Definitions

```
apidata/
├── calendar/
│   └── events.json
│
├── chat/
│   ├── messages.json
│   └── users.json
│
├── crm/
│   ├── contacts.json
│   ├── deals.json
│   └── leads.json
│
├── ecommerce/
│   ├── products.json
│   ├── orders.json
│   └── customers.json
│
├── hospital/
│   ├── patients.json
│   └── appointments.json
│
└── school/
    ├── students.json
    └── teachers.json
```

**Purpose:**
- API response mock data
- JSON data files
- Test data fixtures

---

## `/src/dtos` - TypeScript Interfaces

```
dtos/
├── index.ts                  # Main exports
├── layout.ts                 # Layout types
│
├── apps/
│   ├── calendar.ts
│   ├── chat.ts
│   ├── ecommerce.ts
│   ├── hospital.ts
│   └── school.ts
│
├── dashboards/
│   ├── analytics.ts
│   ├── ecommerce.ts
│   └── crm.ts
│
└── pages/
    ├── user.ts
    └── invoice.ts
```

**Purpose:**
- TypeScript type definitions
- Interface declarations
- Type exports

**Example:**
```typescript
// dtos/apps/ecommerce.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  stock: number;
}

export interface Order {
  id: string;
  customerId: string;
  products: Product[];
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  createdAt: Date;
}
```

---

## `/src/assets` - Static Assets

```
assets/
├── css/                      # Stylesheets
│   ├── tailwind.css          # Main Tailwind import
│   ├── components/
│   │   ├── theme.css         # Theme variables
│   │   ├── buttons.css
│   │   ├── form.css
│   │   ├── animation/
│   │   │   ├── fade.css
│   │   │   ├── slide.css
│   │   │   └── zoom.css
│   │   ├── drawer.css
│   │   ├── helper.css
│   │   └── ...more components
│   │
│   ├── layouts/              # Layout styles
│   │   ├── sidebar.css
│   │   ├── topbar.css
│   │   ├── footer.css
│   │   └── responsive.css
│   │
│   ├── fonts/                # Font imports
│   │   └── fonts.css
│   │
│   ├── themes-color/         # Theme colors
│   │   ├── primary-color.css
│   │   ├── sidebar-color.css
│   │   └── dark-color.css
│   │
│   ├── plugins/              # Plugin styles
│   │   ├── apexchart.css
│   │   ├── calendar.css
│   │   ├── simplebar.css
│   │   ├── flatpicker.css
│   │   ├── select.css
│   │   ├── swiper.css
│   │   └── range-slider.css
│   │
│   └── next/                 # Next.js specific
│
├── fonts/                    # Font files
│   ├── Inter/
│   ├── RobotoSlab/
│   └── RemixIcon/
│
└── images/                   # Images
    ├── avatar/
    ├── auth/
    ├── brands/
    ├── dashboards/
    ├── chat/
    ├── products/
    ├── hospital/
    ├── school/
    └── ...more images
```

---

## `/public` - Public Assets

```
public/
├── apidata/                  # Static API data files
│   ├── calendar/
│   ├── chat/
│   ├── ecommerce/
│   └── ...
│
├── assets/                   # Public assets
│   └── images/
│
├── locales/                  # i18n translation files
│   ├── en/
│   │   └── common.json
│   ├── es/
│   │   └── common.json
│   ├── fr/
│   │   └── common.json
│   └── ...14 languages
│
├── favicon.ico
├── robots.txt
└── sitemap.xml
```

---

## `/plugins` - Build Plugins

```
plugins/
├── layouts/                  # Layout plugins
│   ├── topbar.js
│   ├── sidebar.js
│   ├── horizontal.js
│   ├── semibox.js
│   ├── boxed.js
│   ├── footer.js
│   ├── page-heading.js
│   └── others.js
│
├── pixeleyezui/              # PixelEyez UI plugins
│   ├── accordion.js
│   ├── tabs.js
│   ├── modal.js
│   └── ...
│
├── navbar.js
├── custom-calendar.js
└── invoice-landing.js
```

**Purpose:**
- Tailwind CSS plugins
- Custom utility classes
- Component styles

---

## Configuration Files

### `package.json`
- Project metadata
- Dependencies
- Scripts
- Build configuration

### `tsconfig.json`
- TypeScript compiler options
- Path aliases:
  - `@src/*` → `./src/*`
  - `@assets/*` → `./src/assets/*`
  - `@views/*` → `./src/views/*`
  - `@components/*` → `./src/components/*`
  - `@dtos/*` → `./src/dtos/*`

### `next.config.mjs`
- Next.js configuration
- Image optimization
- Build settings

### `tailwind.config.ts`
- Tailwind customization
- Theme extensions
- Plugins

### `postcss.config.mjs`
- PostCSS plugins
- CSS processing

### `next-i18next.config.js`
- Internationalization setup
- Language configuration

### `.env`
- Environment variables
- API keys
- Configuration

---

## File Naming Conventions

### Components
- PascalCase: `MyComponent.tsx`
- Index files: `index.tsx`

### Pages (App Router)
- Lowercase with hyphens: `my-page/page.tsx`

### Data Files
- camelCase: `myData.ts`
- Plural for collections: `products.ts`

### Types/Interfaces
- PascalCase: `UserProfile.ts`

### Constants
- UPPERCASE: `LAYOUT_CONSTANTS.ts`

---

## Import Paths

### Absolute Imports
```typescript
// Using path aliases (preferred)
import { Button } from '@components/custom/buttons';
import { Product } from '@dtos/apps/ecommerce';
import MyView from '@views/MyFeature';
```

### Relative Imports
```typescript
// Within same directory
import { helper } from './utils';

// Parent directory
import { Layout } from '../layout/Layout';
```

---

## Best Practices

1. **Page Structure:**
   - Route in `/app/(layout)/feature/page.tsx`
   - View in `/views/Feature/index.tsx`
   - Components in `/views/Feature/SubComponent.tsx`

2. **State Management:**
   - Global state in `/slices/feature/reducer.ts`
   - Local state in component with `useState`

3. **Data:**
   - Mock data in `/data/feature/`
   - API definitions in `/apidata/feature/`
   - Types in `/dtos/feature.ts`

4. **Styling:**
   - Tailwind utility classes (preferred)
   - Component CSS in `/assets/css/components/`
   - Theme variables in `/assets/css/components/theme.css`

5. **Reusability:**
   - Generic components in `/components/custom/`
   - Page-specific in `/views/Feature/`
   - Layout elements in `/layout/`

---

This structure provides clear separation of concerns and makes the codebase maintainable and scalable.
