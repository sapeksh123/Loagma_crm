import type {
  Lead,
  Client,
  Quotation,
  Invoice,
  Payment,
  ServiceTicket,
  CallLog,
  User,
  InsertLead,
  InsertClient,
  InsertQuotation,
  InsertInvoice,
  InsertPayment,
  InsertServiceTicket,
  InsertCallLog,
} from "@shared/schema";

// Mock data stores
const mockUsers: User[] = [
  { id: "1", username: "admin", password: "admin123", email: "admin@company.com", fullName: "John Admin", role: "admin", phone: "+1-555-0001", createdAt: new Date("2024-01-01") },
  { id: "2", username: "manager", password: "manager123", email: "manager@company.com", fullName: "Sarah Manager", role: "sales_manager", phone: "+1-555-0002", createdAt: new Date("2024-01-01") },
  { id: "3", username: "sales", password: "sales123", email: "sales@company.com", fullName: "Mike Executive", role: "sales_executive", phone: "+1-555-0003", createdAt: new Date("2024-01-01") },
  { id: "4", username: "accountant", password: "account123", email: "accountant@company.com", fullName: "Lisa Accountant", role: "accountant", phone: "+1-555-0004", createdAt: new Date("2024-01-01") },
  { id: "5", username: "engineer", password: "eng123", email: "engineer@company.com", fullName: "Tom Engineer", role: "engineer", phone: "+1-555-0005", createdAt: new Date("2024-01-01") },
  { id: "6", username: "client", password: "client123", email: "client@example.com", fullName: "Jane Client", role: "client", phone: "+1-555-0006", createdAt: new Date("2024-01-01") },
];

const mockLeads: Lead[] = [
  { id: "1", companyName: "Acme Corporation", contactPerson: "John Smith", email: "john@acme.com", phone: "+1-555-1001", status: "new", source: "website", assignedTo: "3", notes: "Interested in enterprise solution", estimatedValue: "50000", createdAt: new Date("2024-10-15"), updatedAt: new Date("2024-10-15") },
  { id: "2", companyName: "Tech Industries", contactPerson: "Sarah Johnson", email: "sarah@techindustries.com", phone: "+1-555-1002", status: "in_progress", source: "referral", assignedTo: "3", notes: "Follow-up scheduled for next week", estimatedValue: "75000", createdAt: new Date("2024-10-12"), updatedAt: new Date("2024-10-20") },
  { id: "3", companyName: "Global Solutions", contactPerson: "Mike Davis", email: "mike@globalsol.com", phone: "+1-555-1003", status: "converted", source: "cold_call", assignedTo: "3", notes: "Converted to client", estimatedValue: "120000", createdAt: new Date("2024-09-20"), updatedAt: new Date("2024-10-18") },
  { id: "4", companyName: "Innovation Labs", contactPerson: "Emily Brown", email: "emily@innovlabs.com", phone: "+1-555-1004", status: "in_progress", source: "social_media", assignedTo: "3", notes: "Sent proposal, awaiting feedback", estimatedValue: "45000", createdAt: new Date("2024-10-18"), updatedAt: new Date("2024-10-22") },
  { id: "5", companyName: "Digital Dynamics", contactPerson: "Robert Wilson", email: "robert@digitaldyn.com", phone: "+1-555-1005", status: "lost", source: "trade_show", assignedTo: "3", notes: "Went with competitor", estimatedValue: "60000", createdAt: new Date("2024-09-10"), updatedAt: new Date("2024-10-05") },
  { id: "6", companyName: "Future Systems", contactPerson: "Lisa Anderson", email: "lisa@futuresys.com", phone: "+1-555-1006", status: "new", source: "website", assignedTo: null, notes: "Initial contact made", estimatedValue: "35000", createdAt: new Date("2024-10-25"), updatedAt: new Date("2024-10-25") },
];

const mockClients: Client[] = [
  { id: "1", companyName: "Global Solutions Ltd", contactPerson: "Mike Davis", email: "mike@globalsol.com", phone: "+1-555-2001", address: "123 Business Ave", city: "New York", country: "USA", taxId: "TAX-001", accountManager: "2", createdAt: new Date("2024-09-20") },
  { id: "2", companyName: "Tech Innovations Inc", contactPerson: "Jennifer Lee", email: "jennifer@techinno.com", phone: "+1-555-2002", address: "456 Tech Street", city: "San Francisco", country: "USA", taxId: "TAX-002", accountManager: "2", createdAt: new Date("2024-08-15") },
  { id: "3", companyName: "Enterprise Systems Corp", contactPerson: "David Wilson", email: "david@entsys.com", phone: "+1-555-2003", address: "789 Corporate Blvd", city: "Chicago", country: "USA", taxId: "TAX-003", accountManager: "2", createdAt: new Date("2024-07-10") },
  { id: "4", companyName: "Digital Marketing Pro", contactPerson: "Amanda Chen", email: "amanda@digmarket.com", phone: "+1-555-2004", address: "321 Marketing Lane", city: "Austin", country: "USA", taxId: "TAX-004", accountManager: "2", createdAt: new Date("2024-10-01") },
  { id: "5", companyName: "CloudTech Solutions", contactPerson: "Robert Brown", email: "robert@cloudtech.com", phone: "+1-555-2005", address: "654 Cloud Drive", city: "Seattle", country: "USA", taxId: "TAX-005", accountManager: "2", createdAt: new Date("2024-06-20") },
];

const mockQuotations: Quotation[] = [
  { id: "1", quotationNumber: "QUO-2024-001", clientId: "1", leadId: null, status: "approved", items: JSON.stringify([{ id: "1", description: "Enterprise Software License", quantity: 10, unitPrice: 5000, total: 50000 }]), subtotal: "50000", taxRate: "10", taxAmount: "5000", total: "55000", validUntil: new Date("2024-11-30"), notes: "Annual subscription", createdBy: "3", approvedBy: "2", createdAt: new Date("2024-10-10"), updatedAt: new Date("2024-10-15") },
  { id: "2", quotationNumber: "QUO-2024-002", clientId: "2", leadId: null, status: "pending_approval", items: JSON.stringify([{ id: "1", description: "Consulting Services", quantity: 40, unitPrice: 150, total: 6000 }]), subtotal: "6000", taxRate: "10", taxAmount: "600", total: "6600", validUntil: new Date("2024-11-15"), notes: "Project phase 1", createdBy: "3", approvedBy: null, createdAt: new Date("2024-10-20"), updatedAt: new Date("2024-10-20") },
  { id: "3", quotationNumber: "QUO-2024-003", clientId: "3", leadId: null, status: "draft", items: JSON.stringify([{ id: "1", description: "Support Package", quantity: 1, unitPrice: 12000, total: 12000 }]), subtotal: "12000", taxRate: "10", taxAmount: "1200", total: "13200", validUntil: new Date("2024-12-01"), notes: "Premium support", createdBy: "3", approvedBy: null, createdAt: new Date("2024-10-25"), updatedAt: new Date("2024-10-25") },
  { id: "4", quotationNumber: "QUO-2024-004", clientId: "4", leadId: null, status: "converted", items: JSON.stringify([{ id: "1", description: "Marketing Platform", quantity: 1, unitPrice: 8500, total: 8500 }]), subtotal: "8500", taxRate: "10", taxAmount: "850", total: "9350", validUntil: new Date("2024-10-31"), notes: "Converted to invoice", createdBy: "3", approvedBy: "2", createdAt: new Date("2024-09-15"), updatedAt: new Date("2024-10-01") },
  { id: "5", quotationNumber: "QUO-2024-005", clientId: "5", leadId: null, status: "rejected", items: JSON.stringify([{ id: "1", description: "Cloud Infrastructure", quantity: 5, unitPrice: 3000, total: 15000 }]), subtotal: "15000", taxRate: "10", taxAmount: "1500", total: "16500", validUntil: new Date("2024-10-20"), notes: "Budget constraints", createdBy: "3", approvedBy: null, createdAt: new Date("2024-09-28"), updatedAt: new Date("2024-10-10") },
];

const mockInvoices: Invoice[] = [
  { id: "1", invoiceNumber: "INV-2024-001", quotationId: "1", clientId: "1", status: "paid", paymentStatus: "paid", items: JSON.stringify([{ id: "1", description: "Enterprise Software License", quantity: 10, unitPrice: 5000, total: 50000 }]), subtotal: "50000", taxRate: "10", taxAmount: "5000", total: "55000", paidAmount: "55000", dueDate: new Date("2024-11-15"), notes: "Paid in full", createdBy: "4", createdAt: new Date("2024-10-16"), updatedAt: new Date("2024-10-20") },
  { id: "2", invoiceNumber: "INV-2024-002", quotationId: null, clientId: "2", status: "sent", paymentStatus: "partial", items: JSON.stringify([{ id: "1", description: "Consulting Services", quantity: 40, unitPrice: 150, total: 6000 }]), subtotal: "6000", taxRate: "10", taxAmount: "600", total: "6600", paidAmount: "3300", dueDate: new Date("2024-11-10"), notes: "50% advance received", createdBy: "4", createdAt: new Date("2024-10-18"), updatedAt: new Date("2024-10-22") },
  { id: "3", invoiceNumber: "INV-2024-003", quotationId: null, clientId: "3", status: "sent", paymentStatus: "pending", items: JSON.stringify([{ id: "1", description: "Support Package", quantity: 1, unitPrice: 12000, total: 12000 }]), subtotal: "12000", taxRate: "10", taxAmount: "1200", total: "13200", paidAmount: "0", dueDate: new Date("2024-11-20"), notes: "Quarterly billing", createdBy: "4", createdAt: new Date("2024-10-22"), updatedAt: new Date("2024-10-22") },
  { id: "4", invoiceNumber: "INV-2024-004", quotationId: "4", clientId: "4", status: "overdue", paymentStatus: "pending", items: JSON.stringify([{ id: "1", description: "Marketing Platform", quantity: 1, unitPrice: 8500, total: 8500 }]), subtotal: "8500", taxRate: "10", taxAmount: "850", total: "9350", paidAmount: "0", dueDate: new Date("2024-10-15"), notes: "Payment overdue", createdBy: "4", createdAt: new Date("2024-10-02"), updatedAt: new Date("2024-10-15") },
  { id: "5", invoiceNumber: "INV-2024-005", quotationId: null, clientId: "1", status: "draft", paymentStatus: "pending", items: JSON.stringify([{ id: "1", description: "Additional Services", quantity: 5, unitPrice: 1200, total: 6000 }]), subtotal: "6000", taxRate: "10", taxAmount: "600", total: "6600", paidAmount: "0", dueDate: new Date("2024-11-30"), notes: "Draft - not sent", createdBy: "4", createdAt: new Date("2024-10-26"), updatedAt: new Date("2024-10-26") },
];

const mockPayments: Payment[] = [
  { id: "1", invoiceId: "1", amount: "55000", paymentMethod: "bank_transfer", transactionId: "TXN-001-BT", notes: "Full payment", recordedBy: "4", paymentDate: new Date("2024-10-20"), createdAt: new Date("2024-10-20") },
  { id: "2", invoiceId: "2", amount: "3300", paymentMethod: "credit_card", transactionId: "TXN-002-CC", notes: "50% advance", recordedBy: "4", paymentDate: new Date("2024-10-22"), createdAt: new Date("2024-10-22") },
  { id: "3", invoiceId: "1", amount: "6000", paymentMethod: "check", transactionId: "CHK-12345", notes: "Additional services", recordedBy: "4", paymentDate: new Date("2024-10-24"), createdAt: new Date("2024-10-24") },
  { id: "4", invoiceId: "3", amount: "13200", paymentMethod: "online", transactionId: "TXN-004-ONL", notes: "Online payment", recordedBy: "4", paymentDate: new Date("2024-10-25"), createdAt: new Date("2024-10-25") },
];

const mockServiceTickets: ServiceTicket[] = [
  { id: "1", ticketNumber: "TKT-2024-001", clientId: "1", title: "Network connectivity issue", description: "Intermittent network drops in Building A", status: "in_progress", priority: "high", assignedTo: "5", resolvedAt: null, createdBy: "1", createdAt: new Date("2024-10-20"), updatedAt: new Date("2024-10-22") },
  { id: "2", ticketNumber: "TKT-2024-002", clientId: "2", title: "Software installation required", description: "Need to install latest version on 20 machines", status: "assigned", priority: "medium", assignedTo: "5", resolvedAt: null, createdBy: "2", createdAt: new Date("2024-10-21"), updatedAt: new Date("2024-10-21") },
  { id: "3", ticketNumber: "TKT-2024-003", clientId: "3", title: "Server maintenance", description: "Scheduled maintenance for database server", status: "resolved", priority: "medium", assignedTo: "5", resolvedAt: new Date("2024-10-24"), createdBy: "3", createdAt: new Date("2024-10-18"), updatedAt: new Date("2024-10-24") },
  { id: "4", ticketNumber: "TKT-2024-004", clientId: "4", title: "Email server down", description: "Cannot send or receive emails", status: "open", priority: "urgent", assignedTo: null, resolvedAt: null, createdBy: "4", createdAt: new Date("2024-10-26"), updatedAt: new Date("2024-10-26") },
  { id: "5", ticketNumber: "TKT-2024-005", clientId: "5", title: "Printer configuration", description: "New printer not showing in network", status: "closed", priority: "low", assignedTo: "5", resolvedAt: new Date("2024-10-19"), createdBy: "5", createdAt: new Date("2024-10-15"), updatedAt: new Date("2024-10-19") },
];

const mockCallLogs: CallLog[] = [
  { id: "1", leadId: "1", clientId: null, type: "call", subject: "Initial consultation", notes: "Discussed requirements for enterprise solution. Follow-up scheduled for next week.", scheduledFor: new Date("2024-10-30"), completed: 0, createdBy: "3", createdAt: new Date("2024-10-20") },
  { id: "2", leadId: "2", clientId: null, type: "email", subject: "Proposal sent", notes: "Sent detailed proposal document. Awaiting response.", scheduledFor: null, completed: 1, createdBy: "3", createdAt: new Date("2024-10-22") },
  { id: "3", leadId: null, clientId: "1", type: "meeting", subject: "Quarterly review meeting", notes: "Reviewed service performance and discussed expansion plans.", scheduledFor: new Date("2024-11-05"), completed: 0, createdBy: "3", createdAt: new Date("2024-10-23") },
  { id: "4", leadId: "4", clientId: null, type: "call", subject: "Follow-up on proposal", notes: "Client requested modifications to proposal. Agreed to send revised version by Friday.", scheduledFor: null, completed: 1, createdBy: "3", createdAt: new Date("2024-10-24") },
  { id: "5", leadId: null, clientId: "2", type: "note", subject: "Payment reminder", notes: "Sent friendly reminder about pending invoice INV-2024-002.", scheduledFor: null, completed: 1, createdBy: "3", createdAt: new Date("2024-10-25") },
  { id: "6", leadId: "1", clientId: null, type: "call", subject: "Pricing discussion", notes: "Discussed volume discounts and payment terms.", scheduledFor: new Date("2024-10-28"), completed: 0, createdBy: "3", createdAt: new Date("2024-10-26") },
];

// Helper to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Mock Services
export const mockServices = {
  // Auth
  async authenticate(username: string, password: string): Promise<User | null> {
    await delay(500);
    const user = mockUsers.find(u => u.username === username && u.password === password);
    return user ? { ...user, password: "" } : null;
  },

  // Leads
  async getLeads(userId?: string, role?: string): Promise<Lead[]> {
    await delay(300);
    if (role === "sales_executive") {
      return mockLeads.filter(lead => lead.assignedTo === userId);
    }
    return mockLeads;
  },

  async createLead(lead: InsertLead): Promise<Lead> {
    await delay(400);
    const newLead: Lead = {
      ...lead,
      id: `lead-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    mockLeads.push(newLead);
    return newLead;
  },

  // Clients
  async getClients(): Promise<Client[]> {
    await delay(300);
    return mockClients;
  },

  async createClient(client: InsertClient): Promise<Client> {
    await delay(400);
    const newClient: Client = {
      ...client,
      id: `client-${Date.now()}`,
      createdAt: new Date(),
    };
    mockClients.push(newClient);
    return newClient;
  },

  // Quotations
  async getQuotations(role?: string): Promise<Quotation[]> {
    await delay(300);
    if (role === "accountant") {
      return mockQuotations.filter(q => q.status === "approved");
    }
    return mockQuotations;
  },

  // Invoices
  async getInvoices(): Promise<Invoice[]> {
    await delay(300);
    return mockInvoices;
  },

  // Payments
  async getPayments(): Promise<Payment[]> {
    await delay(300);
    return mockPayments;
  },

  // Service Tickets
  async getServiceTickets(userId?: string, role?: string): Promise<ServiceTicket[]> {
    await delay(300);
    if (role === "engineer") {
      return mockServiceTickets.filter(ticket => ticket.assignedTo === userId);
    }
    return mockServiceTickets;
  },

  // Call Logs / Follow-ups
  async getCallLogs(): Promise<CallLog[]> {
    await delay(300);
    return mockCallLogs;
  },

  // Users (for assignment dropdowns)
  async getUsers(): Promise<User[]> {
    await delay(200);
    return mockUsers.map(u => ({ ...u, password: "" }));
  },

  // Enriched data with relationships
  async getLeadsWithAssignees(): Promise<(Lead & { assignedToName?: string })[]> {
    await delay(300);
    return mockLeads.map(lead => ({
      ...lead,
      assignedToName: lead.assignedTo ? mockUsers.find(u => u.id === lead.assignedTo)?.fullName : undefined,
    }));
  },

  async getClientsWithManagers(): Promise<(Client & { accountManagerName?: string })[]> {
    await delay(300);
    return mockClients.map(client => ({
      ...client,
      accountManagerName: client.accountManager ? mockUsers.find(u => u.id === client.accountManager)?.fullName : undefined,
    }));
  },

  async getQuotationsWithDetails(): Promise<(Quotation & { clientName?: string; createdByName?: string })[]> {
    await delay(300);
    return mockQuotations.map(quote => ({
      ...quote,
      clientName: mockClients.find(c => c.id === quote.clientId)?.companyName,
      createdByName: mockUsers.find(u => u.id === quote.createdBy)?.fullName,
    }));
  },

  async getInvoicesWithDetails(): Promise<(Invoice & { clientName?: string })[]> {
    await delay(300);
    return mockInvoices.map(invoice => ({
      ...invoice,
      clientName: mockClients.find(c => c.id === invoice.clientId)?.companyName,
    }));
  },

  async getPaymentsWithDetails(): Promise<(Payment & { invoiceNumber?: string; clientName?: string })[]> {
    await delay(300);
    return mockPayments.map(payment => {
      const invoice = mockInvoices.find(inv => inv.id === payment.invoiceId);
      return {
        ...payment,
        invoiceNumber: invoice?.invoiceNumber,
        clientName: invoice ? mockClients.find(c => c.id === invoice.clientId)?.companyName : undefined,
      };
    });
  },

  async getServiceTicketsWithDetails(): Promise<(ServiceTicket & { clientName?: string; assignedToName?: string })[]> {
    await delay(300);
    return mockServiceTickets.map(ticket => ({
      ...ticket,
      clientName: mockClients.find(c => c.id === ticket.clientId)?.companyName,
      assignedToName: ticket.assignedTo ? mockUsers.find(u => u.id === ticket.assignedTo)?.fullName : undefined,
    }));
  },

  async getCallLogsWithDetails(): Promise<(CallLog & { leadName?: string; clientName?: string })[]> {
    await delay(300);
    return mockCallLogs.map(log => ({
      ...log,
      leadName: log.leadId ? mockLeads.find(l => l.id === log.leadId)?.companyName : undefined,
      clientName: log.clientId ? mockClients.find(c => c.id === log.clientId)?.companyName : undefined,
    }));
  },
};
