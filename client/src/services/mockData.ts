// Mock Data Service - Frontend Only CRM System

export type UserRole = "admin" | "sales_manager" | "sales_executive" | "accountant" | "engineer" | "client";

export interface User {
  id: number;
  username: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
}

export interface Lead {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: "new" | "in_progress" | "converted" | "lost";
  source: string;
  assignedTo: number;
  notes?: string;
  createdAt: string;
}

export interface Client {
  id: number;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  gst?: string;
  createdAt: string;
}

export interface Quotation {
  id: number;
  quotationNumber: string;
  leadId?: number;
  clientId?: number;
  items: Array<{ description: string; quantity: number; rate: number; amount: number }>;
  totalAmount: number;
  status: "draft" | "sent" | "approved" | "rejected";
  validUntil: string;
  notes?: string;
  createdBy: number;
  createdAt: string;
}

export interface Invoice {
  id: number;
  invoiceNumber: string;
  clientId: number;
  quotationId?: number;
  items: Array<{ description: string; quantity: number; rate: number; amount: number }>;
  totalAmount: number;
  paidAmount: number;
  status: "draft" | "sent" | "paid" | "partial" | "overdue";
  dueDate: string;
  createdBy: number;
  createdAt: string;
}

export interface Payment {
  id: number;
  invoiceId: number;
  amount: number;
  paymentMethod: "cash" | "bank_transfer" | "cheque" | "upi" | "card";
  paymentDate: string;
  referenceNumber?: string;
  notes?: string;
  recordedBy: number;
}

export interface ServiceTicket {
  id: number;
  ticketNumber: string;
  clientId: number;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "assigned" | "in_progress" | "resolved" | "closed";
  assignedTo?: number;
  createdAt: string;
  resolvedAt?: string;
}

export interface CallLog {
  id: number;
  leadId?: number;
  clientId?: number;
  callType: "outgoing" | "incoming";
  purpose: string;
  notes: string;
  followUpDate?: string;
  createdBy: number;
  createdAt: string;
}

// Demo users
export const mockUsers: User[] = [
  { id: 1, username: "admin", name: "Admin User", email: "admin@crm.com", role: "admin", phone: "+91 98765 43210" },
  { id: 2, username: "manager", name: "Sales Manager", email: "manager@crm.com", role: "sales_manager", phone: "+91 98765 43211" },
  { id: 3, username: "sales", name: "Sales Executive", email: "sales@crm.com", role: "sales_executive", phone: "+91 98765 43212" },
  { id: 4, username: "accountant", name: "Accountant User", email: "accountant@crm.com", role: "accountant", phone: "+91 98765 43213" },
  { id: 5, username: "engineer", name: "Field Engineer", email: "engineer@crm.com", role: "engineer", phone: "+91 98765 43214" },
  { id: 6, username: "client", name: "Client User", email: "client@company.com", role: "client", phone: "+91 98765 43215" },
];

// Mock leads
export const mockLeads: Lead[] = [
  { id: 1, companyName: "Tech Solutions Ltd", contactPerson: "Rajesh Kumar", email: "rajesh@techsol.com", phone: "+91 98765 11111", status: "new", source: "Website", assignedTo: 3, notes: "Interested in CRM software", createdAt: "2024-10-15T10:00:00Z" },
  { id: 2, companyName: "ABC Enterprises", contactPerson: "Priya Sharma", email: "priya@abcent.com", phone: "+91 98765 22222", status: "in_progress", source: "Referral", assignedTo: 3, notes: "Follow-up scheduled", createdAt: "2024-10-16T11:00:00Z" },
  { id: 3, companyName: "XYZ Industries", contactPerson: "Amit Patel", email: "amit@xyzind.com", phone: "+91 98765 33333", status: "converted", source: "Cold Call", assignedTo: 3, notes: "Converted to client", createdAt: "2024-10-10T09:00:00Z" },
  { id: 4, companyName: "Global Corp", contactPerson: "Sunita Reddy", email: "sunita@globalcorp.com", phone: "+91 98765 44444", status: "in_progress", source: "Trade Show", assignedTo: 3, notes: "Requested demo", createdAt: "2024-10-18T14:00:00Z" },
  { id: 5, companyName: "Startup Hub", contactPerson: "Vikram Singh", email: "vikram@startuphub.com", phone: "+91 98765 55555", status: "new", source: "LinkedIn", assignedTo: 3, notes: "New inquiry", createdAt: "2024-10-20T16:00:00Z" },
  { id: 6, companyName: "Retail Mart", contactPerson: "Anjali Verma", email: "anjali@retailmart.com", phone: "+91 98765 66666", status: "lost", source: "Website", assignedTo: 3, notes: "Went with competitor", createdAt: "2024-10-05T12:00:00Z" },
];

// Mock clients
export const mockClients: Client[] = [
  { id: 1, companyName: "XYZ Industries", contactPerson: "Amit Patel", email: "amit@xyzind.com", phone: "+91 98765 33333", address: "123 Business Park, Mumbai", gst: "27AABCU9603R1ZM", createdAt: "2024-10-11T10:00:00Z" },
  { id: 2, companyName: "Mega Retail Pvt Ltd", contactPerson: "Neha Gupta", email: "neha@megaretail.com", phone: "+91 98765 77777", address: "456 Commerce St, Delhi", gst: "07AACFM1234F1Z5", createdAt: "2024-09-20T11:00:00Z" },
  { id: 3, companyName: "Digital Solutions Inc", contactPerson: "Karthik Rao", email: "karthik@digitalsol.com", phone: "+91 98765 88888", address: "789 Tech Hub, Bangalore", gst: "29AADCD5678G1ZP", createdAt: "2024-09-15T09:00:00Z" },
  { id: 4, companyName: "Finance Pro Services", contactPerson: "Meera Nair", email: "meera@financepro.com", phone: "+91 98765 99999", address: "321 Finance Tower, Chennai", gst: "33AAECD1122H1ZT", createdAt: "2024-08-25T14:00:00Z" },
  { id: 5, companyName: "Healthcare Plus", contactPerson: "Dr. Ramesh Kumar", email: "ramesh@healthplus.com", phone: "+91 98765 00000", address: "654 Medical Center, Hyderabad", gst: "36AAFCH9876I1ZR", createdAt: "2024-08-10T16:00:00Z" },
];

// Mock quotations
export const mockQuotations: Quotation[] = [
  {
    id: 1,
    quotationNumber: "QUO-2024-001",
    leadId: 2,
    items: [
      { description: "CRM Software License (10 users)", quantity: 1, rate: 50000, amount: 50000 },
      { description: "Setup & Training", quantity: 1, rate: 15000, amount: 15000 },
    ],
    totalAmount: 65000,
    status: "sent",
    validUntil: "2024-11-30",
    notes: "Special discount applied",
    createdBy: 3,
    createdAt: "2024-10-17T10:00:00Z",
  },
  {
    id: 2,
    quotationNumber: "QUO-2024-002",
    clientId: 2,
    items: [
      { description: "Annual Maintenance Contract", quantity: 1, rate: 30000, amount: 30000 },
    ],
    totalAmount: 30000,
    status: "approved",
    validUntil: "2024-12-15",
    createdBy: 2,
    createdAt: "2024-10-10T11:00:00Z",
  },
  {
    id: 3,
    quotationNumber: "QUO-2024-003",
    clientId: 3,
    items: [
      { description: "Custom Dashboard Development", quantity: 1, rate: 75000, amount: 75000 },
      { description: "API Integration", quantity: 1, rate: 25000, amount: 25000 },
    ],
    totalAmount: 100000,
    status: "approved",
    validUntil: "2024-12-20",
    createdBy: 2,
    createdAt: "2024-10-05T09:00:00Z",
  },
];

// Mock invoices
export const mockInvoices: Invoice[] = [
  {
    id: 1,
    invoiceNumber: "INV-2024-001",
    clientId: 1,
    quotationId: 3,
    items: [
      { description: "CRM Software License (5 users)", quantity: 1, rate: 40000, amount: 40000 },
      { description: "Implementation", quantity: 1, rate: 20000, amount: 20000 },
    ],
    totalAmount: 60000,
    paidAmount: 60000,
    status: "paid",
    dueDate: "2024-10-31",
    createdBy: 4,
    createdAt: "2024-10-12T10:00:00Z",
  },
  {
    id: 2,
    invoiceNumber: "INV-2024-002",
    clientId: 2,
    quotationId: 2,
    items: [
      { description: "Annual Maintenance Contract", quantity: 1, rate: 30000, amount: 30000 },
    ],
    totalAmount: 30000,
    paidAmount: 15000,
    status: "partial",
    dueDate: "2024-11-15",
    createdBy: 4,
    createdAt: "2024-10-11T11:00:00Z",
  },
  {
    id: 3,
    invoiceNumber: "INV-2024-003",
    clientId: 3,
    quotationId: 3,
    items: [
      { description: "Custom Dashboard Development", quantity: 1, rate: 75000, amount: 75000 },
      { description: "API Integration", quantity: 1, rate: 25000, amount: 25000 },
    ],
    totalAmount: 100000,
    paidAmount: 0,
    status: "sent",
    dueDate: "2024-11-20",
    createdBy: 4,
    createdAt: "2024-10-06T09:00:00Z",
  },
  {
    id: 4,
    invoiceNumber: "INV-2024-004",
    clientId: 4,
    items: [
      { description: "Consulting Services", quantity: 20, rate: 2000, amount: 40000 },
    ],
    totalAmount: 40000,
    paidAmount: 40000,
    status: "paid",
    dueDate: "2024-10-25",
    createdBy: 4,
    createdAt: "2024-09-26T14:00:00Z",
  },
  {
    id: 5,
    invoiceNumber: "INV-2024-005",
    clientId: 5,
    items: [
      { description: "Healthcare Management Software", quantity: 1, rate: 120000, amount: 120000 },
    ],
    totalAmount: 120000,
    paidAmount: 0,
    status: "overdue",
    dueDate: "2024-10-10",
    createdBy: 4,
    createdAt: "2024-09-11T16:00:00Z",
  },
];

// Mock payments
export const mockPayments: Payment[] = [
  { id: 1, invoiceId: 1, amount: 60000, paymentMethod: "bank_transfer", paymentDate: "2024-10-30", referenceNumber: "TXN123456", notes: "Full payment received", recordedBy: 4 },
  { id: 2, invoiceId: 2, amount: 15000, paymentMethod: "upi", paymentDate: "2024-10-25", referenceNumber: "UPI789012", notes: "Partial payment 1", recordedBy: 4 },
  { id: 3, invoiceId: 4, amount: 40000, paymentMethod: "cheque", paymentDate: "2024-10-24", referenceNumber: "CHQ345678", notes: "Payment cleared", recordedBy: 4 },
];

// Mock service tickets
export const mockServiceTickets: ServiceTicket[] = [
  { id: 1, ticketNumber: "TKT-2024-001", clientId: 1, title: "Software installation issue", description: "Unable to install on Windows 11", priority: "high", status: "resolved", assignedTo: 5, createdAt: "2024-10-18T10:00:00Z", resolvedAt: "2024-10-19T14:00:00Z" },
  { id: 2, ticketNumber: "TKT-2024-002", clientId: 2, title: "Data export not working", description: "Export to Excel feature showing error", priority: "medium", status: "in_progress", assignedTo: 5, createdAt: "2024-10-20T11:00:00Z" },
  { id: 3, ticketNumber: "TKT-2024-003", clientId: 3, title: "API integration support", description: "Need help with third-party API setup", priority: "urgent", status: "assigned", assignedTo: 5, createdAt: "2024-10-22T09:00:00Z" },
  { id: 4, ticketNumber: "TKT-2024-004", clientId: 4, title: "User access issue", description: "New employees cannot login", priority: "high", status: "open", createdAt: "2024-10-23T14:00:00Z" },
  { id: 5, ticketNumber: "TKT-2024-005", clientId: 5, title: "Report generation slow", description: "Monthly reports taking too long to generate", priority: "low", status: "open", createdAt: "2024-10-24T16:00:00Z" },
];

// Mock call logs
export const mockCallLogs: CallLog[] = [
  { id: 1, leadId: 1, callType: "outgoing", purpose: "Initial contact", notes: "Discussed requirements, will send quotation", followUpDate: "2024-10-25", createdBy: 3, createdAt: "2024-10-15T10:30:00Z" },
  { id: 2, leadId: 2, callType: "outgoing", purpose: "Follow-up on quotation", notes: "Client reviewing, decision by next week", followUpDate: "2024-10-28", createdBy: 3, createdAt: "2024-10-17T15:00:00Z" },
  { id: 3, clientId: 2, callType: "incoming", purpose: "Payment confirmation", notes: "Partial payment made, remaining next month", createdBy: 4, createdAt: "2024-10-25T11:00:00Z" },
  { id: 4, leadId: 4, callType: "outgoing", purpose: "Demo scheduled", notes: "Demo set for Oct 30, 2PM", followUpDate: "2024-10-30", createdBy: 3, createdAt: "2024-10-18T14:30:00Z" },
  { id: 5, clientId: 3, callType: "incoming", purpose: "Support request", notes: "Created ticket TKT-2024-003", createdBy: 5, createdAt: "2024-10-22T09:15:00Z" },
];

// Passwords: <username>123 for all demo accounts
export const mockPasswords: Record<string, string> = {
  "admin": "admin123",
  "manager": "manager123",
  "sales": "sales123",
  "accountant": "account123",
  "engineer": "eng123",
  "client": "client123",
};

// Service functions
export const mockAuth = {
  login: (username: string, password: string): User | null => {
    if (mockPasswords[username] === password) {
      return mockUsers.find(u => u.username === username) || null;
    }
    return null;
  },
};

export const mockDataService = {
  getUsers: () => mockUsers,
  getLeads: (filters?: { status?: string; assignedTo?: number }) => {
    let leads = [...mockLeads];
    if (filters?.status) leads = leads.filter(l => l.status === filters.status);
    if (filters?.assignedTo) leads = leads.filter(l => l.assignedTo === filters.assignedTo);
    return leads.map(lead => ({
      ...lead,
      assignedToName: lead.assignedTo ? mockUsers.find(u => u.id === lead.assignedTo)?.name : undefined,
    }));
  },
  getClients: () => {
    return mockClients.map(client => ({
      ...client,
      accountManagerName: mockUsers.find(u => u.id === 2)?.name || "Sales Manager",
    }));
  },
  getQuotations: (filters?: { status?: string }) => {
    let quotations = [...mockQuotations];
    if (filters?.status) quotations = quotations.filter(q => q.status === filters.status);
    return quotations.map(quote => ({
      ...quote,
      clientName: mockClients.find(c => c.id === quote.clientId)?.companyName,
      createdByName: mockUsers.find(u => u.id === quote.createdBy)?.name,
    }));
  },
  getInvoices: (filters?: { status?: string }) => {
    let invoices = [...mockInvoices];
    if (filters?.status) invoices = invoices.filter(i => i.status === filters.status);
    return invoices.map(invoice => ({
      ...invoice,
      clientName: mockClients.find(c => c.id === invoice.clientId)?.companyName,
    }));
  },
  getPayments: () => {
    return mockPayments.map(payment => {
      const invoice = mockInvoices.find(inv => inv.id === payment.invoiceId);
      return {
        ...payment,
        invoiceNumber: invoice ? `INV-2024-${String(invoice.id).padStart(3, '0')}` : undefined,
        clientName: invoice ? mockClients.find(c => c.id === invoice.clientId)?.companyName : undefined,
      };
    });
  },
  getServiceTickets: (filters?: { status?: string; assignedTo?: number }) => {
    let tickets = [...mockServiceTickets];
    if (filters?.status) tickets = tickets.filter(t => t.status === filters.status);
    if (filters?.assignedTo) tickets = tickets.filter(t => t.assignedTo === filters.assignedTo);
    return tickets.map(ticket => ({
      ...ticket,
      clientName: mockClients.find(c => c.id === ticket.clientId)?.companyName,
      assignedToName: ticket.assignedTo ? mockUsers.find(u => u.id === ticket.assignedTo)?.name : undefined,
    }));
  },
  getCallLogs: () => {
    return mockCallLogs.map(log => ({
      ...log,
      leadName: log.leadId ? mockLeads.find(l => l.id === log.leadId)?.companyName : undefined,
      clientName: log.clientId ? mockClients.find(c => c.id === log.clientId)?.companyName : undefined,
    }));
  },
};
