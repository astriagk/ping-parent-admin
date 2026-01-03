# Component Reference Guide

Complete reference for all available components, widgets, and utilities in the Domiex template.

---

## Table of Contents

1. [Layout Components](#layout-components)
2. [UI Components](#ui-components)
3. [Form Components](#form-components)
4. [Data Display](#data-display)
5. [Charts & Graphs](#charts--graphs)
6. [Navigation](#navigation)
7. [Feedback](#feedback)
8. [Utility Components](#utility-components)

---

## Layout Components

### Layout Wrapper
Main layout component that wraps your pages.

```typescript
// Automatically applied to routes in (layout) group
// Includes Topbar, Sidebar, and Footer
```

### Grid System
```typescript
<div className="grid grid-cols-12 gap-4">
  <div className="col-span-12 md:col-span-6 lg:col-span-4">
    {/* Content */}
  </div>
</div>
```

### Container
```typescript
<div className="container mx-auto px-4 max-w-7xl">
  {/* Centered content with max width */}
</div>
```

### Card
```typescript
<div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
  <h3 className="text-lg font-semibold mb-4">Card Title</h3>
  <p>Card content</p>
</div>
```

---

## UI Components

### Buttons

**Basic Button**
```typescript
<button className="px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition">
  Click Me
</button>
```

**Button Variants**
```typescript
// Primary
<button className="btn-primary">Primary</button>

// Secondary
<button className="btn-secondary">Secondary</button>

// Outline
<button className="border-2 border-primary-500 text-primary-500 hover:bg-primary-50">
  Outline
</button>

// Icon Button
<button className="p-2 rounded-lg hover:bg-slate-100">
  <Icon size={20} />
</button>

// With Icon
<button className="flex items-center gap-2">
  <Icon size={18} />
  <span>Button Text</span>
</button>
```

**Button Sizes**
```typescript
<button className="px-2 py-1 text-sm">Small</button>
<button className="px-4 py-2">Medium</button>
<button className="px-6 py-3 text-lg">Large</button>
```

**Loading Button**
```typescript
<button disabled className="flex items-center gap-2 opacity-50 cursor-not-allowed">
  <Loader2 className="animate-spin" size={18} />
  <span>Loading...</span>
</button>
```

### Badges

```typescript
// Status badges
<span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
  Active
</span>

<span className="px-2 py-1 text-xs font-medium rounded-full bg-red-100 text-red-800">
  Inactive
</span>

<span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
  Pending
</span>

// Pill badge
<span className="px-3 py-1 text-sm rounded-full bg-primary-100 text-primary-700">
  New
</span>
```

### Alerts

```typescript
// Success
<div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-800 rounded">
  <p className="font-medium">Success!</p>
  <p className="text-sm">Your action was completed successfully.</p>
</div>

// Error
<div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-800 rounded">
  <p className="font-medium">Error!</p>
  <p className="text-sm">Something went wrong.</p>
</div>

// Warning
<div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800 rounded">
  <p className="font-medium">Warning!</p>
  <p className="text-sm">Please check your input.</p>
</div>

// Info
<div className="p-4 bg-blue-50 border-l-4 border-blue-500 text-blue-800 rounded">
  <p className="font-medium">Info</p>
  <p className="text-sm">Here's some important information.</p>
</div>
```

### Avatar

```typescript
// Single avatar
<div className="w-10 h-10 rounded-full overflow-hidden">
  <img src="/avatar.jpg" alt="User" className="w-full h-full object-cover" />
</div>

// Avatar with status
<div className="relative">
  <div className="w-10 h-10 rounded-full overflow-hidden">
    <img src="/avatar.jpg" alt="User" />
  </div>
  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
</div>

// Avatar group
<div className="flex -space-x-2">
  <img className="w-8 h-8 rounded-full border-2 border-white" src="/avatar1.jpg" />
  <img className="w-8 h-8 rounded-full border-2 border-white" src="/avatar2.jpg" />
  <img className="w-8 h-8 rounded-full border-2 border-white" src="/avatar3.jpg" />
</div>

// Avatar with initials
<div className="w-10 h-10 rounded-full bg-primary-500 text-white flex items-center justify-center font-medium">
  JD
</div>
```

### Accordion

```typescript
import { CustomAccordion } from '@/components/custom/accordion';

const items = [
  {
    title: 'Section 1',
    content: 'Content for section 1'
  },
  {
    title: 'Section 2',
    content: 'Content for section 2'
  }
];

<CustomAccordion items={items} />
```

### Tabs

```typescript
import { CustomTabs } from '@/components/custom/tabs';

const tabs = [
  { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
  { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  { id: 'tab3', label: 'Tab 3', content: <div>Content 3</div> }
];

<CustomTabs tabs={tabs} defaultTab="tab1" />
```

### Breadcrumb

```typescript
import { BreadCrumb } from '@/components/common/BreadCrumb';

<BreadCrumb
  items={[
    { label: 'Home', link: '/' },
    { label: 'Products', link: '/products' },
    { label: 'Details' }
  ]}
/>
```

### Dropdown

```typescript
import { CustomDropdown } from '@/components/custom/dropdown';

<CustomDropdown
  trigger={<button>Open Menu</button>}
  items={[
    { label: 'Edit', onClick: () => {} },
    { label: 'Delete', onClick: () => {} },
    { label: 'Share', onClick: () => {} }
  ]}
/>
```

---

## Form Components

### Text Input

```typescript
<div className="space-y-2">
  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
    Email
  </label>
  <input
    type="email"
    placeholder="Enter your email"
    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-slate-800 dark:border-slate-600 dark:text-white"
  />
</div>
```

### Textarea

```typescript
<textarea
  rows={4}
  placeholder="Enter description"
  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:border-slate-600"
></textarea>
```

### Select

```typescript
<select className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-slate-800 dark:border-slate-600">
  <option>Select option</option>
  <option value="1">Option 1</option>
  <option value="2">Option 2</option>
</select>
```

### React Select (Advanced)

```typescript
import Select from 'react-select';

<Select
  options={[
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' }
  ]}
  isSearchable
  isClearable
  placeholder="Select..."
/>
```

### Checkbox

```typescript
<label className="flex items-center gap-2 cursor-pointer">
  <input
    type="checkbox"
    className="w-4 h-4 text-primary-500 border-slate-300 rounded focus:ring-primary-500"
  />
  <span className="text-sm">I agree to terms and conditions</span>
</label>
```

### Radio Button

```typescript
<div className="space-y-2">
  <label className="flex items-center gap-2 cursor-pointer">
    <input
      type="radio"
      name="option"
      value="1"
      className="w-4 h-4 text-primary-500 border-slate-300 focus:ring-primary-500"
    />
    <span className="text-sm">Option 1</span>
  </label>
  <label className="flex items-center gap-2 cursor-pointer">
    <input type="radio" name="option" value="2" />
    <span className="text-sm">Option 2</span>
  </label>
</div>
```

### Toggle Switch

```typescript
<label className="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" className="sr-only peer" />
  <div className="w-11 h-6 bg-slate-200 peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
  <span className="ml-3 text-sm">Enable feature</span>
</label>
```

### Date Picker (Flatpickr)

```typescript
import Flatpickr from 'react-flatpickr';

<Flatpickr
  options={{
    dateFormat: 'Y-m-d',
    enableTime: false
  }}
  className="w-full px-4 py-2 border rounded-lg"
  placeholder="Select date"
/>
```

### File Upload

```typescript
<div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
  <input
    type="file"
    id="file-upload"
    className="hidden"
    onChange={(e) => {}}
  />
  <label htmlFor="file-upload" className="cursor-pointer">
    <Upload className="mx-auto mb-2 text-slate-400" size={40} />
    <p className="text-sm text-slate-600">Click to upload or drag and drop</p>
    <p className="text-xs text-slate-400">PNG, JPG up to 10MB</p>
  </label>
</div>
```

### Range Slider

```typescript
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

<Slider
  min={0}
  max={100}
  defaultValue={50}
  onChange={(value) => console.log(value)}
/>
```

---

## Data Display

### Table

```typescript
<div className="overflow-x-auto">
  <table className="w-full border-collapse">
    <thead>
      <tr className="bg-slate-50 dark:bg-slate-800">
        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
          Name
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
          Email
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
          Status
        </th>
      </tr>
    </thead>
    <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
      <tr className="hover:bg-slate-50 dark:hover:bg-slate-800">
        <td className="px-6 py-4 text-sm">John Doe</td>
        <td className="px-6 py-4 text-sm">john@example.com</td>
        <td className="px-6 py-4 text-sm">
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            Active
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Pagination

```typescript
import { Pagination } from '@/components/common/Pagination';

<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={(page) => setCurrentPage(page)}
/>
```

### List Group

```typescript
<ul className="divide-y divide-slate-200 dark:divide-slate-700 border rounded-lg">
  <li className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
    Item 1
  </li>
  <li className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
    Item 2
  </li>
  <li className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer">
    Item 3
  </li>
</ul>
```

### Timeline

```typescript
<div className="space-y-4">
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
      <div className="w-0.5 h-full bg-slate-200"></div>
    </div>
    <div className="pb-8">
      <p className="font-medium">Event Title</p>
      <p className="text-sm text-slate-600">Event description</p>
      <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
    </div>
  </div>
</div>
```

### Stats Card

```typescript
<div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-slate-600 dark:text-slate-400">Total Revenue</p>
      <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
        $45,231
      </p>
    </div>
    <div className="p-3 bg-primary-100 dark:bg-primary-900/20 rounded-lg">
      <DollarSign className="text-primary-500" size={24} />
    </div>
  </div>
  <div className="mt-4 flex items-center text-sm">
    <TrendingUp className="text-green-500" size={16} />
    <span className="text-green-500 ml-1">12%</span>
    <span className="text-slate-600 ml-2">vs last month</span>
  </div>
</div>
```

---

## Charts & Graphs

### Line Chart

```typescript
import ReactApexChart from 'react-apexcharts';

const LineChart = () => {
  const options = {
    chart: { type: 'line', toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 2 },
    colors: ['#6366f1'],
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] }
  };

  const series = [{
    name: 'Sales',
    data: [30, 40, 35, 50, 49, 60]
  }];

  return <ReactApexChart options={options} series={series} type="line" height={350} />;
};
```

### Bar Chart

```typescript
const BarChart = () => {
  const options = {
    chart: { type: 'bar' },
    colors: ['#6366f1'],
    xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] }
  };

  const series = [{
    name: 'Revenue',
    data: [44, 55, 57, 56, 61]
  }];

  return <ReactApexChart options={options} series={series} type="bar" height={350} />;
};
```

### Pie Chart

```typescript
const PieChart = () => {
  const options = {
    chart: { type: 'pie' },
    labels: ['Product A', 'Product B', 'Product C'],
    colors: ['#6366f1', '#ec4899', '#10b981']
  };

  const series = [44, 55, 41];

  return <ReactApexChart options={options} series={series} type="pie" height={350} />;
};
```

### Donut Chart

```typescript
const DonutChart = () => {
  const options = {
    chart: { type: 'donut' },
    labels: ['Desktop', 'Mobile', 'Tablet'],
    colors: ['#6366f1', '#ec4899', '#10b981']
  };

  const series = [44, 33, 23];

  return <ReactApexChart options={options} series={series} type="donut" height={350} />;
};
```

### Area Chart

```typescript
const AreaChart = () => {
  const options = {
    chart: { type: 'area' },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
    colors: ['#6366f1'],
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May'] }
  };

  const series = [{
    name: 'Visitors',
    data: [31, 40, 28, 51, 42]
  }];

  return <ReactApexChart options={options} series={series} type="area" height={350} />;
};
```

---

## Navigation

### Navbar

```typescript
<nav className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
  <div className="max-w-7xl mx-auto px-4">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center gap-8">
        <a href="/" className="text-xl font-bold">Logo</a>
        <div className="flex gap-4">
          <a href="/home" className="text-slate-600 hover:text-primary-500">Home</a>
          <a href="/about" className="text-slate-600 hover:text-primary-500">About</a>
        </div>
      </div>
    </div>
  </div>
</nav>
```

### Sidebar Menu Item

```typescript
<a
  href="/dashboard"
  className="flex items-center gap-3 px-4 py-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg"
>
  <Home size={20} />
  <span>Dashboard</span>
</a>
```

---

## Feedback

### Toast Notifications

```typescript
import { toast } from 'react-toastify';

// Success
toast.success('Operation successful!');

// Error
toast.error('Something went wrong!');

// Warning
toast.warning('Please check your input!');

// Info
toast.info('Here is some information.');

// Custom
toast('Custom message', {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false
});
```

### Progress Bar

```typescript
<div className="w-full bg-slate-200 rounded-full h-2">
  <div
    className="bg-primary-500 h-2 rounded-full transition-all"
    style={{ width: '60%' }}
  ></div>
</div>
```

### Spinner/Loader

```typescript
import { Loader2 } from 'lucide-react';

<Loader2 className="animate-spin text-primary-500" size={24} />
```

### Skeleton Loader

```typescript
<div className="animate-pulse">
  <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
  <div className="h-4 bg-slate-200 rounded w-1/2"></div>
</div>
```

---

## Utility Components

### Tooltip

```typescript
import { Tooltip } from 'react-tooltip';

<button data-tooltip-id="my-tooltip" data-tooltip-content="Hello world!">
  Hover me
</button>
<Tooltip id="my-tooltip" />
```

### Modal/Dialog

```typescript
import { CustomModal } from '@/components/custom/modal';

<CustomModal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
>
  <div className="p-6">
    Modal content goes here
  </div>
</CustomModal>
```

### Drawer

```typescript
import { CustomDrawer } from '@/components/custom/drawer';

<CustomDrawer
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  position="right" // left, right, top, bottom
>
  Drawer content
</CustomDrawer>
```

### Empty State

```typescript
<div className="text-center py-12">
  <Inbox className="mx-auto text-slate-400" size={48} />
  <h3 className="mt-4 text-lg font-medium text-slate-900">No data found</h3>
  <p className="mt-2 text-sm text-slate-600">
    Get started by creating a new item.
  </p>
  <button className="mt-6 px-4 py-2 bg-primary-500 text-white rounded-lg">
    Create New
  </button>
</div>
```

---

## Responsive Helpers

### Breakpoint Classes
```typescript
// Mobile first approach
<div className="
  w-full          // Mobile
  md:w-1/2        // Tablet
  lg:w-1/3        // Desktop
  xl:w-1/4        // Large desktop
">
  Responsive div
</div>
```

### Show/Hide on Breakpoints
```typescript
<div className="hidden md:block">Desktop only</div>
<div className="block md:hidden">Mobile only</div>
```

---

## Color Palette

### Primary Colors
- `bg-primary-50` to `bg-primary-900`
- `text-primary-500`, `border-primary-500`

### Slate (Grays)
- `bg-slate-50` to `bg-slate-900`
- Common for text and borders

### Status Colors
- Success: `green-500`
- Error: `red-500`
- Warning: `yellow-500`
- Info: `blue-500`

---

## Icons

### Lucide React (Primary)
```typescript
import {
  Home,
  User,
  Settings,
  ChevronRight,
  Plus,
  Edit,
  Trash,
  Search
} from 'lucide-react';

<Home size={20} className="text-primary-500" />
```

### Remix Icon
```typescript
<i className="ri-home-line text-xl"></i>
```

---

This reference covers the most commonly used components. For more specific implementations, check the actual component files in `src/components/custom/` and `src/views/`.
