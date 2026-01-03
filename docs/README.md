# Domiex Template Documentation

Welcome to the comprehensive documentation for the Domiex Next.js Admin Template. This documentation will help you understand, customize, and build with this premium admin dashboard template.

---

## Documentation Index

### 1. [Template Guide](./TEMPLATE_GUIDE.md) - **START HERE**
Complete overview of the template including:
- Project overview and tech stack
- Installation and setup
- Layout system and theming
- State management with Redux
- Available features (dashboards, apps, components)
- Development workflow
- Customization guide
- Best practices
- Troubleshooting

**Read this first** to get a comprehensive understanding of the entire template.

---

### 2. [Quick Start Guide](./QUICK_START.md)
Quick recipes and code snippets for common tasks:
- Create new pages
- Add components (cards, tables, forms)
- Implement charts
- Work with Redux state
- API integration
- Common Tailwind classes
- File locations reference
- Useful commands

**Use this** when you need quick code examples or want to accomplish specific tasks.

---

### 3. [Component Reference](./COMPONENT_REFERENCE.md)
Comprehensive reference for all UI components:
- Layout components
- UI elements (buttons, badges, alerts, etc.)
- Form components
- Data display (tables, lists, stats)
- Charts and graphs
- Navigation components
- Feedback components (toasts, loaders)
- Utility components

**Use this** when you need to implement specific UI components or features.

---

### 4. [Project Structure](./PROJECT_STRUCTURE.md)
Detailed breakdown of the project organization:
- Directory structure
- File naming conventions
- Import paths and aliases
- Redux state organization
- Asset management
- Configuration files

**Use this** to understand where files belong and how the project is organized.

---

## Quick Navigation

### Getting Started
1. Read [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Sections 1-4
2. Follow installation steps
3. Explore available features
4. Check [QUICK_START.md](./QUICK_START.md) for common tasks

### Building Features
1. Review [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) to understand organization
2. Check [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) for available components
3. Use [QUICK_START.md](./QUICK_START.md) for code recipes
4. Refer to [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) for detailed implementation

### Customization
1. [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Section 10: Customization Guide
2. [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - CSS and theming locations
3. [QUICK_START.md](./QUICK_START.md) - Layout customization

---

## What You Get

### 10 Dashboard Types
- eCommerce, Analytics, CRM, Email, Hospital, File Manager, Projects, School, Music

### 13 Full-Featured Apps
- Calendar, Chat, CRM, eCommerce, Email, Events, File Manager, Hospital, Invoice, Mailbox, Orders, Projects, School

### 35+ UI Components
- Accordion, Alerts, Avatar, Badge, Breadcrumb, Buttons, Cards, Drawer, Dropdown, Modal, Tabs, Timeline, and more

### 21 Chart Types
- Area, Bar, Line, Pie, Donut, Scatter, Radar, and many more with ApexCharts

### 13 Form Elements
- Inputs, Selects, Date pickers, Range sliders, File uploads, Validation

### Multiple Layout Options
- Vertical, Horizontal, Modern, Boxed, Semi-box

### Theming
- Light/Dark mode
- 8 accent color themes
- Customizable sidebar colors
- RTL support

### 14 Languages
- English, Spanish, French, German, Italian, Russian, Chinese, Arabic, Turkish, Hebrew, Vietnamese, Dutch, Korean, Portuguese

---

## Technology Stack

| Technology | Version | Purpose |
|-----------|---------|---------|
| Next.js | 15.1.7 | React framework |
| React | 19.1.0 | UI library |
| TypeScript | 5.8.2 | Type safety |
| Tailwind CSS | 4.0.17 | Styling |
| Redux Toolkit | 2.2.7 | State management |
| ApexCharts | 3.51.0 | Charts |
| React Hook Form | 7.52.2 | Form handling |
| i18next | 23.15.2 | Internationalization |

See [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) for complete tech stack.

---

## Common Use Cases

### Use Case 1: Building a Custom Dashboard
1. Read: [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Section 9: Development Workflow
2. Reference: [QUICK_START.md](./QUICK_START.md) - Recipe 1: Create a New Page
3. Components: [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Stats Card, Charts

### Use Case 2: Integrating with Your API
1. Read: [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Section 11: Common Tasks - Task 2
2. Reference: [QUICK_START.md](./QUICK_START.md) - Recipe 8: Add API Integration
3. Structure: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Redux slices

### Use Case 3: Customizing Theme
1. Read: [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Section 6: Theming & Styling
2. Reference: [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Section 10: Customization
3. Files: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - /src/assets/css

### Use Case 4: Adding Authentication
1. Read: [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Section 11: Common Tasks - Task 3
2. Components: [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Forms
3. Structure: Create new slice in [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - /src/slices

---

## File Locations Quick Reference

| What | Where |
|------|-------|
| Pages | `src/app/(layout)/[section]/page.tsx` |
| Views | `src/views/[Feature]/` |
| Components | `src/components/custom/` |
| Redux | `src/slices/[feature]/` |
| Styles | `src/assets/css/` |
| Types | `src/dtos/` |
| Mock Data | `src/data/` |
| Layout | `src/layout/` |

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for complete reference.

---

## Development Workflow

### Daily Development
```bash
# Start dev server
yarn dev

# Make changes to your code

# Format code
yarn prettier:write

# Check for issues
yarn lint

# Build for testing
yarn build
```

### Creating Features
1. **Plan** - Decide what you're building
2. **Structure** - Check [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for file locations
3. **Components** - Use [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) for UI elements
4. **Code** - Reference [QUICK_START.md](./QUICK_START.md) for patterns
5. **Test** - Build and verify
6. **Refine** - Follow [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) best practices

---

## Learning Path

### Beginner (New to template)
1. **Day 1:** Read [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) sections 1-5
2. **Day 2:** Explore the template, navigate dashboards and apps
3. **Day 3:** Create a simple page using [QUICK_START.md](./QUICK_START.md)
4. **Day 4:** Understand [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
5. **Week 2:** Build a custom feature

### Intermediate (Some experience)
1. Review [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md)
2. Customize theme using [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) Section 10
3. Integrate with API
4. Create custom components
5. Implement authentication

### Advanced (Production ready)
1. Optimize performance
2. Implement advanced state management
3. Add custom plugins
4. Deploy to production
5. Maintain and scale

---

## Frequently Asked Questions

### How do I change the primary color?
See [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Section 10: Customization Guide

### How do I add a new page?
See [QUICK_START.md](./QUICK_START.md) - Recipe 1

### Where do I put my components?
See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - `/src/components`

### How do I use Redux?
See [QUICK_START.md](./QUICK_START.md) - Recipe 6 and [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Section 7

### How do I add charts?
See [QUICK_START.md](./QUICK_START.md) - Recipe 5 and [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Charts section

### How do I integrate my API?
See [QUICK_START.md](./QUICK_START.md) - Recipe 8 and [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Section 11: Task 2

### Where are the icons?
See [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) - Icons section

### How do I change layouts?
See [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Section 5: Layout System

---

## Getting Help

### Documentation
- Start with this README to find the right document
- Use the search function (Ctrl/Cmd + F) within documents
- Check the Table of Contents in each document

### Code Examples
- Look at existing pages in `src/views/`
- Check component demos in `src/app/(layout)/ui/`
- Reference dashboard implementations

### Debugging
- Check browser console for errors
- Use React DevTools for component inspection
- Use Redux DevTools for state debugging
- Review [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Section 12: Troubleshooting

---

## Next Steps

### For New Users
1. **Read** [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) - Sections 1-4 (30 minutes)
2. **Install** and run the project (10 minutes)
3. **Explore** existing dashboards and apps (20 minutes)
4. **Build** a simple custom page using [QUICK_START.md](./QUICK_START.md) (1 hour)

### For Developers
1. **Review** [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) (20 minutes)
2. **Study** [COMPONENT_REFERENCE.md](./COMPONENT_REFERENCE.md) (30 minutes)
3. **Plan** your application structure
4. **Build** features using the template

### For Teams
1. **Share** this documentation with team members
2. **Establish** coding conventions based on best practices
3. **Create** a style guide for your project
4. **Document** custom components you create

---

## Document Summaries

### TEMPLATE_GUIDE.md (Main documentation)
- **Length:** Comprehensive (50+ pages equivalent)
- **Purpose:** Complete reference for all aspects of the template
- **Best for:** In-depth understanding, first-time setup, detailed features

### QUICK_START.md (Practical guide)
- **Length:** Medium (20+ pages equivalent)
- **Purpose:** Quick recipes and code snippets
- **Best for:** Day-to-day development, quick references, copy-paste solutions

### COMPONENT_REFERENCE.md (UI reference)
- **Length:** Comprehensive (40+ pages equivalent)
- **Purpose:** Every UI component with code examples
- **Best for:** Building interfaces, component implementation

### PROJECT_STRUCTURE.md (Architecture guide)
- **Length:** Detailed (30+ pages equivalent)
- **Purpose:** File organization and project architecture
- **Best for:** Understanding project layout, knowing where files belong

---

## Contribution

When you create custom features or components:
1. Follow the patterns described in these docs
2. Add documentation for complex features
3. Keep code organized per [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)
4. Follow best practices from [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md)

---

## Version Information

- **Template Version:** 2.2.0
- **Documentation Created:** January 2026
- **Next.js Version:** 15.1.7
- **React Version:** 19.1.0

---

## License

This is a commercial template. Refer to your purchase license for usage rights.

---

**Happy Building! 🚀**

For the best experience, start with [TEMPLATE_GUIDE.md](./TEMPLATE_GUIDE.md) and keep [QUICK_START.md](./QUICK_START.md) handy for daily reference.
