import { db } from "./db";
import { eq, and, desc, asc, sql } from "drizzle-orm";
import {
  users,
  leads,
  clients,
  quotations,
  invoices,
  payments,
  serviceTickets,
  callLogs,
  type User,
  type Lead,
  type Client,
  type Quotation,
  type Invoice,
  type Payment,
  type ServiceTicket,
  type CallLog,
  type InsertUser,
  type InsertLead,
  type InsertClient,
  type InsertQuotation,
  type InsertInvoice,
  type InsertPayment,
  type InsertServiceTicket,
  type InsertCallLog,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;

  // Leads
  getLeads(filters?: { assignedTo?: string; status?: string }): Promise<Lead[]>;
  getLead(id: string): Promise<Lead | undefined>;
  createLead(lead: InsertLead): Promise<Lead>;
  updateLead(id: string, lead: Partial<InsertLead>): Promise<Lead>;
  deleteLead(id: string): Promise<void>;

  // Clients
  getClients(): Promise<Client[]>;
  getClient(id: string): Promise<Client | undefined>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client>;
  deleteClient(id: string): Promise<void>;

  // Quotations
  getQuotations(filters?: { clientId?: string; status?: string }): Promise<Quotation[]>;
  getQuotation(id: string): Promise<Quotation | undefined>;
  createQuotation(quotation: InsertQuotation): Promise<Quotation>;
  updateQuotation(id: string, quotation: Partial<InsertQuotation>): Promise<Quotation>;
  deleteQuotation(id: string): Promise<void>;

  // Invoices
  getInvoices(filters?: { clientId?: string; status?: string }): Promise<Invoice[]>;
  getInvoice(id: string): Promise<Invoice | undefined>;
  createInvoice(invoice: InsertInvoice): Promise<Invoice>;
  updateInvoice(id: string, invoice: Partial<InsertInvoice>): Promise<Invoice>;
  deleteInvoice(id: string): Promise<void>;

  // Payments
  getPayments(filters?: { invoiceId?: string }): Promise<Payment[]>;
  getPayment(id: string): Promise<Payment | undefined>;
  createPayment(payment: InsertPayment): Promise<Payment>;
  updatePayment(id: string, payment: Partial<InsertPayment>): Promise<Payment>;
  deletePayment(id: string): Promise<void>;

  // Service Tickets
  getServiceTickets(filters?: { assignedTo?: string; status?: string }): Promise<ServiceTicket[]>;
  getServiceTicket(id: string): Promise<ServiceTicket | undefined>;
  createServiceTicket(ticket: InsertServiceTicket): Promise<ServiceTicket>;
  updateServiceTicket(id: string, ticket: Partial<InsertServiceTicket>): Promise<ServiceTicket>;
  deleteServiceTicket(id: string): Promise<void>;

  // Call Logs
  getCallLogs(filters?: { leadId?: string; clientId?: string }): Promise<CallLog[]>;
  getCallLog(id: string): Promise<CallLog | undefined>;
  createCallLog(log: InsertCallLog): Promise<CallLog>;
  updateCallLog(id: string, log: Partial<InsertCallLog>): Promise<CallLog>;
  deleteCallLog(id: string): Promise<void>;

  // Analytics
  getDashboardMetrics(userId?: string, role?: string): Promise<any>;
}

export class PostgresStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(users);
  }

  // Leads
  async getLeads(filters?: { assignedTo?: string; status?: string }): Promise<Lead[]> {
    const conditions = [];
    if (filters?.assignedTo) {
      conditions.push(eq(leads.assignedTo, filters.assignedTo));
    }
    if (filters?.status) {
      conditions.push(eq(leads.status, filters.status as any));
    }

    if (conditions.length > 0) {
      return await db.select().from(leads)
        .where(and(...conditions))
        .orderBy(desc(leads.createdAt));
    }
    return await db.select().from(leads).orderBy(desc(leads.createdAt));
  }

  async getLead(id: string): Promise<Lead | undefined> {
    const result = await db.select().from(leads).where(eq(leads.id, id));
    return result[0];
  }

  async createLead(lead: InsertLead): Promise<Lead> {
    const [newLead] = await db.insert(leads).values(lead).returning();
    return newLead;
  }

  async updateLead(id: string, lead: Partial<InsertLead>): Promise<Lead> {
    const [updated] = await db
      .update(leads)
      .set({ ...lead, updatedAt: new Date() })
      .where(eq(leads.id, id))
      .returning();
    return updated;
  }

  async deleteLead(id: string): Promise<void> {
    await db.delete(leads).where(eq(leads.id, id));
  }

  // Clients
  async getClients(): Promise<Client[]> {
    return await db.select().from(clients).orderBy(asc(clients.companyName));
  }

  async getClient(id: string): Promise<Client | undefined> {
    const result = await db.select().from(clients).where(eq(clients.id, id));
    return result[0];
  }

  async createClient(client: InsertClient): Promise<Client> {
    const [newClient] = await db.insert(clients).values(client).returning();
    return newClient;
  }

  async updateClient(id: string, client: Partial<InsertClient>): Promise<Client> {
    const [updated] = await db
      .update(clients)
      .set(client)
      .where(eq(clients.id, id))
      .returning();
    return updated;
  }

  async deleteClient(id: string): Promise<void> {
    await db.delete(clients).where(eq(clients.id, id));
  }

  // Quotations
  async getQuotations(filters?: { clientId?: string; status?: string }): Promise<Quotation[]> {
    const conditions = [];
    if (filters?.clientId) {
      conditions.push(eq(quotations.clientId, filters.clientId));
    }
    if (filters?.status) {
      conditions.push(eq(quotations.status, filters.status as any));
    }

    if (conditions.length > 0) {
      return await db.select().from(quotations)
        .where(and(...conditions))
        .orderBy(desc(quotations.createdAt));
    }
    return await db.select().from(quotations).orderBy(desc(quotations.createdAt));
  }

  async getQuotation(id: string): Promise<Quotation | undefined> {
    const result = await db.select().from(quotations).where(eq(quotations.id, id));
    return result[0];
  }

  async createQuotation(quotation: InsertQuotation): Promise<Quotation> {
    const [newQuotation] = await db.insert(quotations).values(quotation).returning();
    return newQuotation;
  }

  async updateQuotation(id: string, quotation: Partial<InsertQuotation>): Promise<Quotation> {
    const [updated] = await db
      .update(quotations)
      .set({ ...quotation, updatedAt: new Date() })
      .where(eq(quotations.id, id))
      .returning();
    return updated;
  }

  async deleteQuotation(id: string): Promise<void> {
    await db.delete(quotations).where(eq(quotations.id, id));
  }

  // Invoices
  async getInvoices(filters?: { clientId?: string; status?: string }): Promise<Invoice[]> {
    const conditions = [];
    if (filters?.clientId) {
      conditions.push(eq(invoices.clientId, filters.clientId));
    }
    if (filters?.status) {
      conditions.push(eq(invoices.status, filters.status as any));
    }

    if (conditions.length > 0) {
      return await db.select().from(invoices)
        .where(and(...conditions))
        .orderBy(desc(invoices.createdAt));
    }
    return await db.select().from(invoices).orderBy(desc(invoices.createdAt));
  }

  async getInvoice(id: string): Promise<Invoice | undefined> {
    const result = await db.select().from(invoices).where(eq(invoices.id, id));
    return result[0];
  }

  async createInvoice(invoice: InsertInvoice): Promise<Invoice> {
    const [newInvoice] = await db.insert(invoices).values(invoice).returning();
    return newInvoice;
  }

  async updateInvoice(id: string, invoice: Partial<InsertInvoice>): Promise<Invoice> {
    const [updated] = await db
      .update(invoices)
      .set({ ...invoice, updatedAt: new Date() })
      .where(eq(invoices.id, id))
      .returning();
    return updated;
  }

  async deleteInvoice(id: string): Promise<void> {
    await db.delete(invoices).where(eq(invoices.id, id));
  }

  // Payments
  async getPayments(filters?: { invoiceId?: string }): Promise<Payment[]> {
    if (filters?.invoiceId) {
      return await db.select().from(payments)
        .where(eq(payments.invoiceId, filters.invoiceId))
        .orderBy(desc(payments.paymentDate));
    }
    return await db.select().from(payments).orderBy(desc(payments.paymentDate));
  }

  async getPayment(id: string): Promise<Payment | undefined> {
    const result = await db.select().from(payments).where(eq(payments.id, id));
    return result[0];
  }

  async updatePayment(id: string, payment: Partial<InsertPayment>): Promise<Payment> {
    const [updated] = await db
      .update(payments)
      .set(payment)
      .where(eq(payments.id, id))
      .returning();
    return updated;
  }

  async createPayment(payment: InsertPayment): Promise<Payment> {
    const [newPayment] = await db.insert(payments).values(payment).returning();
    
    // Update invoice paid amount
    const invoice = await this.getInvoice(payment.invoiceId);
    if (invoice) {
      const currentPaid = parseFloat(invoice.paidAmount || "0");
      const newPaid = currentPaid + parseFloat(payment.amount);
      const total = parseFloat(invoice.total);
      
      let paymentStatus: "pending" | "partial" | "paid" = "pending";
      if (newPaid >= total) {
        paymentStatus = "paid";
      } else if (newPaid > 0) {
        paymentStatus = "partial";
      }
      
      await this.updateInvoice(payment.invoiceId, {
        paidAmount: newPaid.toFixed(2),
        paymentStatus,
      });
    }
    
    return newPayment;
  }

  async deletePayment(id: string): Promise<void> {
    await db.delete(payments).where(eq(payments.id, id));
  }

  // Service Tickets
  async getServiceTickets(filters?: { assignedTo?: string; status?: string }): Promise<ServiceTicket[]> {
    const conditions = [];
    if (filters?.assignedTo) {
      conditions.push(eq(serviceTickets.assignedTo, filters.assignedTo));
    }
    if (filters?.status) {
      conditions.push(eq(serviceTickets.status, filters.status as any));
    }

    if (conditions.length > 0) {
      return await db.select().from(serviceTickets)
        .where(and(...conditions))
        .orderBy(desc(serviceTickets.createdAt));
    }
    return await db.select().from(serviceTickets).orderBy(desc(serviceTickets.createdAt));
  }

  async getServiceTicket(id: string): Promise<ServiceTicket | undefined> {
    const result = await db.select().from(serviceTickets).where(eq(serviceTickets.id, id));
    return result[0];
  }

  async createServiceTicket(ticket: InsertServiceTicket): Promise<ServiceTicket> {
    const [newTicket] = await db.insert(serviceTickets).values(ticket).returning();
    return newTicket;
  }

  async updateServiceTicket(id: string, ticket: Partial<InsertServiceTicket>): Promise<ServiceTicket> {
    const [updated] = await db
      .update(serviceTickets)
      .set({ ...ticket, updatedAt: new Date() })
      .where(eq(serviceTickets.id, id))
      .returning();
    return updated;
  }

  async deleteServiceTicket(id: string): Promise<void> {
    await db.delete(serviceTickets).where(eq(serviceTickets.id, id));
  }

  // Call Logs
  async getCallLogs(filters?: { leadId?: string; clientId?: string }): Promise<CallLog[]> {
    const conditions = [];
    if (filters?.leadId) {
      conditions.push(eq(callLogs.leadId, filters.leadId));
    }
    if (filters?.clientId) {
      conditions.push(eq(callLogs.clientId, filters.clientId));
    }

    if (conditions.length > 0) {
      return await db.select().from(callLogs)
        .where(and(...conditions))
        .orderBy(desc(callLogs.createdAt));
    }
    return await db.select().from(callLogs).orderBy(desc(callLogs.createdAt));
  }

  async getCallLog(id: string): Promise<CallLog | undefined> {
    const result = await db.select().from(callLogs).where(eq(callLogs.id, id));
    return result[0];
  }

  async createCallLog(log: InsertCallLog): Promise<CallLog> {
    const [newLog] = await db.insert(callLogs).values(log).returning();
    return newLog;
  }

  async updateCallLog(id: string, log: Partial<InsertCallLog>): Promise<CallLog> {
    const [updated] = await db
      .update(callLogs)
      .set(log)
      .where(eq(callLogs.id, id))
      .returning();
    return updated;
  }

  async deleteCallLog(id: string): Promise<void> {
    await db.delete(callLogs).where(eq(callLogs.id, id));
  }

  // Analytics
  async getDashboardMetrics(userId?: string, role?: string): Promise<any> {
    const [leadsCount] = await db.select({ count: sql<number>`count(*)::int` }).from(leads);
    const [clientsCount] = await db.select({ count: sql<number>`count(*)::int` }).from(clients);
    const [quotationsCount] = await db.select({ count: sql<number>`count(*)::int` }).from(quotations);
    const [invoicesCount] = await db.select({ count: sql<number>`count(*)::int` }).from(invoices);
    const [ticketsCount] = await db.select({ count: sql<number>`count(*)::int` }).from(serviceTickets);

    // Calculate revenue
    const invoiceResults = await db.select().from(invoices).where(eq(invoices.paymentStatus, "paid"));
    const totalRevenue = invoiceResults.reduce((sum, inv) => sum + parseFloat(inv.total), 0);

    // Outstanding amount
    const pendingInvoices = await db.select().from(invoices).where(eq(invoices.paymentStatus, "pending"));
    const outstandingAmount = pendingInvoices.reduce((sum, inv) => sum + parseFloat(inv.total), 0);

    return {
      totalLeads: leadsCount.count,
      totalClients: clientsCount.count,
      totalQuotations: quotationsCount.count,
      totalInvoices: invoicesCount.count,
      totalTickets: ticketsCount.count,
      totalRevenue,
      outstandingAmount,
    };
  }
}

export const storage = new PostgresStorage();
