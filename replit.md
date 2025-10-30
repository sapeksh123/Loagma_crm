# CRM + Accounting Management System
## Frontend-Only Demo Application

## Overview
A professional, fast, and minimal frontend-only CRM + Accounting Management System built with React, TypeScript, and Tailwind CSS. Features comprehensive role-based dashboards, lead management, client database, quotations, invoices, payments, service tickets, and analytics - all powered by in-memory mock data for instant performance.

## ✨ Key Features

### 1. **Lightning Fast Performance**
- No backend required - instant data loading
- In-memory mock data service
- Zero API latency
- Smooth, responsive UI

### 2. **Role-Based Access Control**
Six user roles with different permissions and dashboards:
- **Admin**: Full system access to all modules
- **Sales Manager**: Lead management, quotation approval, team oversight
- **Sales Executive**: Lead management, quotation creation, follow-ups
- **Accountant**: Invoice generation, payment tracking, financial reports
- **Engineer**: Service ticket management and resolution
- **Client**: View quotations, invoices, and service requests

### 3. **Complete CRM Module**
- Lead Management: Track leads through sales pipeline (New → In Progress → Converted/Lost)
- Client Database: Centralized client information with contact details
- Follow-up & Call Logs: Communication history and scheduled reminders
- Quotation Management: Create, approve, and track quotations

### 4. **Accounting Module**
- Invoice Generation: Convert quotations to invoices
- Payment Tracking: Record and track payments with multiple methods
- Financial Analytics: Revenue metrics and outstanding balances

### 5. **Service Management**
- Service Tickets: Track requests from open to closed
- Engineer Assignment: Assign tickets to field engineers
- Priority Management: Urgent, high, medium, low priorities
- Status Tracking: Open, assigned, in progress, resolved, closed

### 6. **Analytics & Reports**
- Revenue Trends: Monthly revenue visualization
- Lead Distribution: Source analysis and conversion rates
- Performance Metrics: KPIs across all modules
- Interactive Charts: Bar, line, and doughnut charts

## 🎮 Demo Accounts

All passwords follow the pattern: `<username>123`

| Role | Username | Password | Access |
|------|----------|----------|--------|
| Admin | admin | admin123 | Full system access |
| Sales Manager | manager | manager123 | CRM, quotations, reports |
| Sales Executive | sales | sales123 | Assigned leads, quotations |
| Accountant | accountant | account123 | Invoices, payments, reports |
| Engineer | engineer | eng123 | Service tickets |
| Client | client | client123 | View-only portal |

## 🏗️ Architecture

### Technology Stack
- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **UI Components**: Shadcn UI component library
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Routing**: Wouter
- **Icons**: Lucide React

### Data Layer
- **Mock Data Service**: `client/src/services/mockData.ts`
- **Authentication**: localStorage-based session persistence
- **State Management**: React useState + useMemo
- **No Backend**: All data in-memory for maximum performance

## 📁 File Structure

```
client/src/
├── components/
│   ├── ui/              # Shadcn UI components
│   └── AppSidebar.tsx   # Navigation sidebar
├── contexts/
│   └── AuthContext.tsx  # Mock authentication context
├── services/
│   └── mockData.ts      # Mock data service (all data here)
├── pages/
│   ├── Login.tsx        # Login page with demo accounts
│   ├── Dashboard.tsx    # Role-specific dashboards
│   ├── Leads.tsx        # Lead management
│   ├── Clients.tsx      # Client database
│   ├── Quotations.tsx   # Quotation management
│   ├── Invoices.tsx     # Invoice management
│   ├── Payments.tsx     # Payment tracking
│   ├── ServiceTickets.tsx # Service ticket management
│   ├── Followups.tsx    # Follow-up and call logs
│   ├── Reports.tsx      # Analytics and reports
│   └── Settings.tsx     # User profile settings
└── App.tsx              # Main app with routing
```

## 🎨 Design System

### Colors
- **Primary**: Blue (#2563eb) - Main actions, links, primary buttons
- **Success**: Green (#16a34a) - Paid status, conversions, positive metrics
- **Warning**: Orange (#f59e0b) - Pending items, in-progress status
- **Destructive**: Red (#dc2626) - Overdue, rejected, urgent items
- **Muted**: Gray - Secondary information, backgrounds

### Typography
- **Font Family**: Inter (primary), JetBrains Mono (monospace for IDs/amounts)
- **Headings**: Bold, tracking-tight
- **Body**: Regular weight, proper line-height
- **Mono**: Used for invoice numbers, amounts, IDs

### Components
- **Cards**: Elevated containers with rounded corners
- **Tables**: Responsive data tables with hover states
- **Badges**: Status indicators with appropriate colors
- **Buttons**: Multiple variants (default, outline, ghost)
- **Forms**: Accessible form inputs with labels and validation states

## 🚀 Running the Application

### Local Development
```bash
# The app runs automatically on Replit
# Access at the Webview URL
```

### Build for Production
```bash
npm run build
# Output: dist/ folder ready for deployment
```

## 📦 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Deploy!

### Netlify
1. Connect repository
2. Build settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
3. Deploy!

### Static Hosting (Any Platform)
```bash
npm run build
# Upload the dist/ folder to any static host
# (GitHub Pages, Cloudflare Pages, AWS S3, etc.)
```

## 💡 Mock Data

All data is defined in `client/src/services/mockData.ts`:
- **6 Demo Users**: One for each role
- **6 Leads**: Various statuses and sources
- **5 Clients**: Active client companies
- **3 Quotations**: Draft, sent, and approved
- **5 Invoices**: Various payment statuses
- **3 Payments**: Different payment methods
- **5 Service Tickets**: Different priorities and statuses
- **5 Call Logs**: Follow-ups and communications

### Modifying Data
Edit `client/src/services/mockData.ts` to:
- Add more demo records
- Change existing data
- Adjust user roles and permissions
- Customize business logic

## 🔐 Authentication

- **Method**: Mock authentication with credential validation
- **Storage**: localStorage (`crm_user` key)
- **Persistence**: Survives page refreshes
- **Demo**: Click any demo account card to auto-fill credentials

## 🎯 Business Workflows

### Lead to Client Conversion
1. Sales Executive creates lead
2. Regular follow-ups logged
3. Quotation created for qualified lead
4. Sales Manager approves quotation
5. Client accepts quotation
6. Accountant generates invoice
7. Payment recorded
8. Lead converted to client

### Service Request Flow
1. Client creates service ticket
2. Admin assigns to engineer
3. Engineer updates status to in progress
4. Engineer resolves issue
5. Admin closes ticket

## 📊 Performance

- ⚡ **Instant Load**: No API calls or database queries
- 🚀 **Fast Navigation**: Client-side routing with Wouter
- 💨 **Smooth UI**: Optimized React components with useMemo
- 📱 **Responsive**: Works on all devices (desktop, tablet, mobile)

## 🛠️ Customization

### Adding New Pages
1. Create page component in `client/src/pages/`
2. Add route in `client/src/App.tsx`
3. Update sidebar in `client/src/components/AppSidebar.tsx`

### Adding New Data
1. Define types in `client/src/services/mockData.ts`
2. Add mock data arrays
3. Create service functions
4. Use in pages via `mockDataService`

### Styling Changes
- Update Tailwind config in `tailwind.config.ts`
- Modify design tokens in `client/src/index.css`
- Customize Shadcn components in `client/src/components/ui/`

## 📝 Technical Notes

- **No Database**: All data in memory (resets on page refresh except auth)
- **No Backend**: Pure frontend application
- **No API Calls**: Instant data from mockDataService
- **Type-Safe**: Full TypeScript coverage
- **Accessible**: WCAG compliant components
- **Responsive**: Mobile-first design

## 🎉 Ready to Deploy!

This is a complete, production-ready frontend demo. Deploy to Vercel, Netlify, or any static hosting platform for a fast, professional CRM showcase.

**Perfect for**:
- Portfolio projects
- Client demos
- UI/UX showcases
- Frontend interviews
- Quick prototypes

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and Shadcn UI
