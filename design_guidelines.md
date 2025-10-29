# CRM + Accounting Management System - Design Guidelines

## Design Approach

**Selected Framework**: Ant Design System-Inspired Enterprise UI
**Justification**: Enterprise data-heavy application requiring professional table layouts, complex forms, and analytical dashboards. Ant Design's component patterns excel at information density while maintaining clarity.

---

## Core Design Principles

1. **Information Hierarchy First**: Clear visual distinction between primary actions, secondary data, and contextual information
2. **Scannable Layouts**: Data tables and lists optimized for quick comprehension
3. **Consistent Density**: Balanced information density - neither cramped nor wasteful
4. **Progressive Disclosure**: Show essential data first, details on demand
5. **Action Clarity**: Primary actions always visually prominent

---

## Typography System

### Font Stack
- **Primary**: 'Inter', system-ui, -apple-system, sans-serif
- **Monospace** (for IDs, amounts): 'JetBrains Mono', monospace

### Hierarchy
- **Page Titles**: 28px, font-weight 700, tracking-tight
- **Section Headers**: 20px, font-weight 600
- **Card Titles**: 16px, font-weight 600
- **Body Text**: 14px, font-weight 400, line-height 1.6
- **Captions/Meta**: 12px, font-weight 400
- **Table Headers**: 13px, font-weight 600, uppercase, letter-spacing 0.5px
- **Table Data**: 14px, font-weight 400
- **Dashboard Stats**: 32px, font-weight 700 (numbers), 12px labels

---

## Layout & Spacing System

### Tailwind Units
**Primary Spacing Scale**: 2, 3, 4, 6, 8, 12, 16, 20, 24
- Micro spacing: `p-2`, `gap-3`
- Standard component spacing: `p-4`, `p-6`
- Section spacing: `p-8`, `py-12`
- Large containers: `p-16`, `p-20`

### Grid System
- **Dashboard Cards**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`
- **Stat Widgets**: `grid-cols-2 md:grid-cols-4`
- **Form Layouts**: `grid-cols-1 md:grid-cols-2` with `gap-6`
- **Table Containers**: Full width with `max-w-full overflow-x-auto`

### Container Widths
- **Main Content**: `max-w-7xl mx-auto px-6`
- **Forms**: `max-w-3xl`
- **Modals**: `max-w-2xl` (standard), `max-w-4xl` (wide forms)
- **Sidebars**: `w-64` (collapsed: `w-20`)

---

## Navigation Structure

### Primary Navigation (Sidebar)
- **Position**: Fixed left, full height
- **Width**: 256px expanded, 80px collapsed
- **Structure**: Logo (h-16), menu items (h-12 each), user profile at bottom
- **Icons**: Heroicons (24px), aligned left with 16px gap to text
- **Active State**: Distinct visual treatment with subtle indicator
- **Grouping**: Logical sections (CRM, Accounting, Reports, Settings) with dividers

### Top Bar
- **Height**: 64px fixed
- **Elements**: Breadcrumbs (left), search (center), notifications + profile (right)
- **Search**: 320px width, rounded full, with icon prefix
- **Actions**: Icon buttons (40px square) with badge indicators for notifications

---

## Component Library

### 1. Dashboard Cards
- **Structure**: Card with 16px padding, rounded-lg borders
- **Header**: Icon + Title + Action menu (right-aligned)
- **Body**: Primary metric (large) + trend indicator + sparkline/mini chart
- **Footer**: Subtitle/comparison data (small text)
- **Dimensions**: Min height 140px for stat cards

### 2. Data Tables
- **Header**: Sticky, elevated visual treatment, sortable columns with icons
- **Rows**: 56px height, hover state, alternating row treatment optional
- **Actions Column**: Right-aligned, icon buttons (view/edit/delete)
- **Status Badges**: Pill-shaped, 24px height, inline with text
- **Pagination**: Bottom-right, showing "1-10 of 243 items"
- **Empty State**: Centered icon + text + action button

### 3. Forms
- **Label Position**: Above input, 12px bottom margin
- **Input Height**: 40px standard, 48px for prominent fields
- **Input Style**: Border, rounded-md, focus state with ring
- **Required Indicator**: Asterisk beside label
- **Validation**: Inline error below field, success checkmark right-aligned
- **Action Buttons**: Right-aligned group, 12px gap, primary + secondary pattern
- **Field Groups**: Border-wrapped sections with header for complex forms

### 4. Modals & Dialogs
- **Overlay**: Semi-transparent backdrop
- **Container**: Centered, shadow-2xl, rounded-lg
- **Header**: 20px padding, border-bottom, close button (top-right)
- **Body**: 24px padding, scrollable if content exceeds viewport
- **Footer**: Border-top, right-aligned actions, 16px padding

### 5. Status Indicators
- **Pills/Badges**: 
  - New leads: Rounded-full, px-3, py-1, text-xs, uppercase
  - Payment status: Rectangle with rounded corners
  - Service tickets: With dot indicator prefix
- **Progress Bars**: 8px height, rounded-full, with percentage label
- **Avatars**: 32px (list items), 40px (cards), 56px (profiles), rounded-full

### 6. Charts & Visualizations
- **Dashboard Charts**: 
  - Revenue charts: Line/Area, 300px height
  - Lead funnel: Horizontal bars, 240px height
  - Performance: Donut/pie, 280px diameter
- **Container**: Card wrapper with title and time period selector
- **Legend**: Bottom or right-aligned, 12px text
- **Tooltips**: On hover, semi-transparent with data details

---

## Page-Specific Layouts

### Dashboard View
- **Top Section**: 4-column grid of stat cards (Total Leads, Revenue, Outstanding, Active Tickets)
- **Mid Section**: 2-column grid (Revenue chart left, Lead status right)
- **Bottom Section**: Recent activity table, full width
- **Spacing**: 24px gaps between sections

### Lead Management
- **Filters Bar**: Horizontal layout with dropdowns (Status, Assigned To, Date Range), 16px padding
- **Action Bar**: Create Lead button (right), bulk actions (left)
- **Table View**: Full width with sortable columns (Name, Company, Status, Assigned, Last Contact, Actions)
- **Side Panel**: Slide-in drawer (400px) for lead details/edit

### Client Portal
- **Simplified Layout**: Centered max-w-5xl container
- **Card-Based**: Each quotation/invoice as individual card (not table)
- **Download Actions**: Prominent PDF download buttons
- **Status Timeline**: Vertical timeline showing quotation→invoice→payment flow

### Invoice Generation
- **Split View**: 2-column layout (Form left 40%, Preview right 60%)
- **Preview**: Live PDF-style preview with proper invoice formatting
- **Line Items**: Editable table with add/remove rows
- **Totals**: Right-aligned calculation section with subtotal, tax, total

---

## Icons & Assets

**Icon Library**: Heroicons (outline for navigation, solid for actions)
**Icon Sizes**: 
- Navigation: 24px
- Buttons: 20px
- Table actions: 16px
- Status indicators: 14px

**Illustrations**: Use abstract/geometric illustrations for empty states (e.g., "No leads yet" with simple line art)

---

## Responsive Behavior

### Breakpoints
- Mobile: < 768px (stack everything, hide sidebar, hamburger menu)
- Tablet: 768px - 1024px (2-column grids become single, simplified tables)
- Desktop: > 1024px (full layout)

### Mobile Adaptations
- **Navigation**: Bottom tab bar or hamburger menu
- **Tables**: Card view instead of table rows
- **Forms**: Single column, larger touch targets (48px)
- **Charts**: Full width, reduced height (200px)

---

## Animations

**Minimal Animation Strategy**: Only where functional value exists
- **Page Transitions**: Fade in content (200ms)
- **Dropdown Menus**: Slide down (150ms)
- **Modal Entry**: Scale + fade (250ms)
- **Loading States**: Skeleton screens (no spinners)
- **Data Updates**: Subtle highlight flash (300ms)

**No Animations For**: Table sorting, form validation states, button hovers

---

## Accessibility

- **Focus Indicators**: 2px ring on all interactive elements
- **Color Independence**: Never rely solely on color for status
- **Form Labels**: Always visible, properly associated
- **ARIA Labels**: On icon-only buttons
- **Keyboard Navigation**: Full keyboard support for tables and forms
- **Contrast**: Text meets WCAG AA minimum (design system ensures this)