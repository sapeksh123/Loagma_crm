# CRM + Accounting Management System

## Overview
This is a comprehensive frontend demo of an integrated enterprise CRM + Accounting Management System. The application bridges customer relationship workflows with financial accounting operations.

## Architecture
- **Frontend**: React + TypeScript + Tailwind CSS
- **UI Components**: Shadcn UI component library
- **Charts**: Chart.js with react-chartjs-2
- **Routing**: Wouter
- **State Management**: React Query + Context API
- **Authentication**: Mock JWT-based authentication (frontend only)
- **Data**: Mock data services simulating backend APIs

## Key Features

### 1. Role-Based Access Control
Six user roles with different permissions and dashboards:
- **Admin**: Full system access to all modules
- **Sales Manager**: Lead management, quotation approval, team oversight
- **Sales Executive**: Lead management, quotation creation, follow-ups
- **Accountant**: Invoice generation, payment tracking, financial reports
- **Engineer**: Service ticket management and resolution
- **Client**: View quotations, invoices, and service requests

### 2. CRM Module
- **Lead Management**: Track leads through sales pipeline (New → In Progress → Converted/Lost)
- **Client Database**: Centralized client information with contact details
- **Follow-up & Call Logs**: Communication history and scheduled reminders
- **Quotation Management**: Create, approve, and track quotations

### 3. Accounting Module
- **Invoice Generation**: Convert quotations to invoices
- **Payment Tracking**: Record and track payments with multiple methods
- **Financial Analytics**: Revenue metrics and outstanding balances

### 4. Service Management
- **Service Tickets**: Track service requests from open to closed
- **Engineer Assignment**: Assign tickets to field engineers
- **Priority Management**: Urgent, high, medium, low priorities
- **Status Tracking**: Open, assigned, in progress, resolved, closed

### 5. Analytics & Reports
- **Revenue Trends**: Monthly revenue visualization
- **Lead Distribution**: Source analysis and conversion rates
- **Performance Metrics**: KPIs across all modules
- **Interactive Charts**: Bar, line, and doughnut charts

## Demo Accounts

All passwords are in the format: `<username>123`

| Role | Username | Password | Access |
|------|----------|----------|--------|
| Admin | admin | admin123 | Full system access |
| Sales Manager | manager | manager123 | CRM, quotations, reports |
| Sales Executive | sales | sales123 | Assigned leads, quotations |
| Accountant | accountant | account123 | Invoices, payments, reports |
| Engineer | engineer | eng123 | Service tickets |
| Client | client | client123 | View-only portal |

## File Structure

```
client/src/
├── components/
│   ├── ui/              # Shadcn UI components
│   └── AppSidebar.tsx   # Navigation sidebar
├── contexts/
│   └── AuthContext.tsx  # Authentication context
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
│   └── Reports.tsx      # Analytics and reports
└── App.tsx              # Main app with routing

shared/
└── schema.ts            # TypeScript types and schemas
```

## Design System

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

## Business Workflows

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

## Mock Data
All data is simulated with realistic business scenarios:
- 120 mock leads across all statuses
- 87 active clients
- Quotations at various approval stages
- Invoices with different payment statuses
- Service tickets with priority levels
- Payment history with multiple methods
- Call logs and follow-up records

## Running the Application
1. Start the development server: `npm run dev`
2. Navigate to the login page
3. Select any demo account to see role-specific features
4. Explore different modules based on role permissions

## Future Enhancements (Not Implemented)
- Real backend API integration with Spring Boot
- MySQL database persistence
- Actual JWT authentication
- PDF generation and download
- Email notifications
- Real-time updates via WebSocket
- Advanced filtering and export features
- Multi-language support

## Technical Notes
- All backend functionality is simulated with mock data
- Authentication persists in localStorage
- No actual API calls are made
- Charts update with static data
- Ready for backend integration when needed
