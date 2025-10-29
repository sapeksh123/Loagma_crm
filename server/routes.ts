import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { 
  insertLeadSchema, 
  insertClientSchema,
  insertQuotationSchema,
  insertInvoiceSchema,
  insertPaymentSchema,
  insertServiceTicketSchema,
  insertCallLogSchema,
  type User 
} from "@shared/schema";

if (!process.env.SESSION_SECRET) {
  throw new Error("SESSION_SECRET environment variable is required for JWT authentication");
}
const JWT_SECRET = process.env.SESSION_SECRET;

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// Auth middleware
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Authentication required" });
  }

  jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired token" });
    }

    const user = await storage.getUser(decoded.userId);
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }

    req.user = user;
    next();
  });
}

// Role-based access control
function requireRole(...roles: string[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ error: "Authentication required" });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }

    next();
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  
  // ============================================================================
  // AUTH ROUTES
  // ============================================================================
  
  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: "Username and password required" });
      }

      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(401).json({ error: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "7d" });
      
      // Don't send password back
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({ user: userWithoutPassword, token });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: "Login failed" });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: Request, res: Response) => {
    const { password: _, ...userWithoutPassword } = req.user!;
    res.json(userWithoutPassword);
  });

  app.post("/api/auth/logout", authenticateToken, (req: Request, res: Response) => {
    res.json({ message: "Logged out successfully" });
  });

  // ============================================================================
  // LEADS ROUTES
  // ============================================================================
  
  app.get("/api/leads", authenticateToken, requireRole("admin", "sales_manager", "sales_executive"), async (req: Request, res: Response) => {
    try {
      const filters: any = {};
      
      // Sales executives only see their assigned leads
      if (req.user!.role === "sales_executive") {
        filters.assignedTo = req.user!.id;
      }
      
      // Optional filter by status
      if (req.query.status) {
        filters.status = req.query.status;
      }

      const leads = await storage.getLeads(filters);
      res.json(leads);
    } catch (error) {
      console.error("Get leads error:", error);
      res.status(500).json({ error: "Failed to fetch leads" });
    }
  });

  app.post("/api/leads", authenticateToken, requireRole("admin", "sales_manager", "sales_executive"), async (req: Request, res: Response) => {
    try {
      const validatedData = insertLeadSchema.parse(req.body);
      const lead = await storage.createLead(validatedData);
      res.status(201).json(lead);
    } catch (error: any) {
      console.error("Create lead error:", error);
      res.status(400).json({ error: error.message || "Failed to create lead" });
    }
  });

  app.patch("/api/leads/:id", authenticateToken, requireRole("admin", "sales_manager", "sales_executive"), async (req: Request, res: Response) => {
    try {
      const lead = await storage.updateLead(req.params.id, req.body);
      res.json(lead);
    } catch (error) {
      console.error("Update lead error:", error);
      res.status(500).json({ error: "Failed to update lead" });
    }
  });

  app.delete("/api/leads/:id", authenticateToken, requireRole("admin", "sales_manager"), async (req: Request, res: Response) => {
    try {
      await storage.deleteLead(req.params.id);
      res.json({ message: "Lead deleted successfully" });
    } catch (error) {
      console.error("Delete lead error:", error);
      res.status(500).json({ error: "Failed to delete lead" });
    }
  });

  // ============================================================================
  // CLIENTS ROUTES
  // ============================================================================
  
  app.get("/api/clients", authenticateToken, requireRole("admin", "sales_manager", "sales_executive", "accountant"), async (req: Request, res: Response) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      console.error("Get clients error:", error);
      res.status(500).json({ error: "Failed to fetch clients" });
    }
  });

  app.post("/api/clients", authenticateToken, requireRole("admin", "sales_manager"), async (req: Request, res: Response) => {
    try {
      const validatedData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validatedData);
      res.status(201).json(client);
    } catch (error: any) {
      console.error("Create client error:", error);
      res.status(400).json({ error: error.message || "Failed to create client" });
    }
  });

  app.patch("/api/clients/:id", authenticateToken, requireRole("admin", "sales_manager"), async (req: Request, res: Response) => {
    try {
      const client = await storage.updateClient(req.params.id, req.body);
      res.json(client);
    } catch (error) {
      console.error("Update client error:", error);
      res.status(500).json({ error: "Failed to update client" });
    }
  });

  app.delete("/api/clients/:id", authenticateToken, requireRole("admin"), async (req: Request, res: Response) => {
    try {
      await storage.deleteClient(req.params.id);
      res.json({ message: "Client deleted successfully" });
    } catch (error) {
      console.error("Delete client error:", error);
      res.status(500).json({ error: "Failed to delete client" });
    }
  });

  // ============================================================================
  // QUOTATIONS ROUTES
  // ============================================================================
  
  app.get("/api/quotations", authenticateToken, async (req: Request, res: Response) => {
    try {
      const filters: any = {};
      if (req.query.clientId) {
        filters.clientId = req.query.clientId;
      }
      if (req.query.status) {
        filters.status = req.query.status;
      }

      const quotations = await storage.getQuotations(filters);
      res.json(quotations);
    } catch (error) {
      console.error("Get quotations error:", error);
      res.status(500).json({ error: "Failed to fetch quotations" });
    }
  });

  app.post("/api/quotations", authenticateToken, requireRole("admin", "sales_manager", "sales_executive"), async (req: Request, res: Response) => {
    try {
      const validatedData = insertQuotationSchema.parse(req.body);
      const quotation = await storage.createQuotation(validatedData);
      res.status(201).json(quotation);
    } catch (error: any) {
      console.error("Create quotation error:", error);
      res.status(400).json({ error: error.message || "Failed to create quotation" });
    }
  });

  app.patch("/api/quotations/:id", authenticateToken, requireRole("admin", "sales_manager", "sales_executive"), async (req: Request, res: Response) => {
    try {
      const quotation = await storage.updateQuotation(req.params.id, req.body);
      res.json(quotation);
    } catch (error) {
      console.error("Update quotation error:", error);
      res.status(500).json({ error: "Failed to update quotation" });
    }
  });

  app.delete("/api/quotations/:id", authenticateToken, requireRole("admin", "sales_manager"), async (req: Request, res: Response) => {
    try {
      await storage.deleteQuotation(req.params.id);
      res.json({ message: "Quotation deleted successfully" });
    } catch (error) {
      console.error("Delete quotation error:", error);
      res.status(500).json({ error: "Failed to delete quotation" });
    }
  });

  // ============================================================================
  // INVOICES ROUTES
  // ============================================================================
  
  app.get("/api/invoices", authenticateToken, async (req: Request, res: Response) => {
    try {
      const filters: any = {};
      if (req.query.clientId) {
        filters.clientId = req.query.clientId;
      }
      if (req.query.status) {
        filters.status = req.query.status;
      }

      const invoices = await storage.getInvoices(filters);
      res.json(invoices);
    } catch (error) {
      console.error("Get invoices error:", error);
      res.status(500).json({ error: "Failed to fetch invoices" });
    }
  });

  app.post("/api/invoices", authenticateToken, requireRole("admin", "accountant"), async (req: Request, res: Response) => {
    try {
      const validatedData = insertInvoiceSchema.parse(req.body);
      const invoice = await storage.createInvoice(validatedData);
      res.status(201).json(invoice);
    } catch (error: any) {
      console.error("Create invoice error:", error);
      res.status(400).json({ error: error.message || "Failed to create invoice" });
    }
  });

  app.patch("/api/invoices/:id", authenticateToken, requireRole("admin", "accountant"), async (req: Request, res: Response) => {
    try {
      const invoice = await storage.updateInvoice(req.params.id, req.body);
      res.json(invoice);
    } catch (error) {
      console.error("Update invoice error:", error);
      res.status(500).json({ error: "Failed to update invoice" });
    }
  });

  app.delete("/api/invoices/:id", authenticateToken, requireRole("admin"), async (req: Request, res: Response) => {
    try {
      await storage.deleteInvoice(req.params.id);
      res.json({ message: "Invoice deleted successfully" });
    } catch (error) {
      console.error("Delete invoice error:", error);
      res.status(500).json({ error: "Failed to delete invoice" });
    }
  });

  // ============================================================================
  // PAYMENTS ROUTES
  // ============================================================================
  
  app.get("/api/payments", authenticateToken, async (req: Request, res: Response) => {
    try {
      const filters: any = {};
      if (req.query.invoiceId) {
        filters.invoiceId = req.query.invoiceId;
      }

      const payments = await storage.getPayments(filters);
      res.json(payments);
    } catch (error) {
      console.error("Get payments error:", error);
      res.status(500).json({ error: "Failed to fetch payments" });
    }
  });

  app.post("/api/payments", authenticateToken, requireRole("admin", "accountant"), async (req: Request, res: Response) => {
    try {
      const validatedData = insertPaymentSchema.parse(req.body);
      const payment = await storage.createPayment(validatedData);
      res.status(201).json(payment);
    } catch (error: any) {
      console.error("Create payment error:", error);
      res.status(400).json({ error: error.message || "Failed to create payment" });
    }
  });

  app.delete("/api/payments/:id", authenticateToken, requireRole("admin"), async (req: Request, res: Response) => {
    try {
      await storage.deletePayment(req.params.id);
      res.json({ message: "Payment deleted successfully" });
    } catch (error) {
      console.error("Delete payment error:", error);
      res.status(500).json({ error: "Failed to delete payment" });
    }
  });

  // ============================================================================
  // SERVICE TICKETS ROUTES
  // ============================================================================
  
  app.get("/api/service-tickets", authenticateToken, async (req: Request, res: Response) => {
    try {
      const filters: any = {};
      
      // Engineers only see their assigned tickets
      if (req.user!.role === "engineer") {
        filters.assignedTo = req.user!.id;
      }
      
      if (req.query.status) {
        filters.status = req.query.status;
      }

      const tickets = await storage.getServiceTickets(filters);
      res.json(tickets);
    } catch (error) {
      console.error("Get service tickets error:", error);
      res.status(500).json({ error: "Failed to fetch service tickets" });
    }
  });

  app.post("/api/service-tickets", authenticateToken, async (req: Request, res: Response) => {
    try {
      const validatedData = insertServiceTicketSchema.parse(req.body);
      const ticket = await storage.createServiceTicket(validatedData);
      res.status(201).json(ticket);
    } catch (error: any) {
      console.error("Create service ticket error:", error);
      res.status(400).json({ error: error.message || "Failed to create service ticket" });
    }
  });

  app.patch("/api/service-tickets/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
      const ticket = await storage.updateServiceTicket(req.params.id, req.body);
      res.json(ticket);
    } catch (error) {
      console.error("Update service ticket error:", error);
      res.status(500).json({ error: "Failed to update service ticket" });
    }
  });

  app.delete("/api/service-tickets/:id", authenticateToken, requireRole("admin"), async (req: Request, res: Response) => {
    try {
      await storage.deleteServiceTicket(req.params.id);
      res.json({ message: "Service ticket deleted successfully" });
    } catch (error) {
      console.error("Delete service ticket error:", error);
      res.status(500).json({ error: "Failed to delete service ticket" });
    }
  });

  // ============================================================================
  // CALL LOGS / FOLLOW-UPS ROUTES
  // ============================================================================
  
  app.get("/api/call-logs", authenticateToken, async (req: Request, res: Response) => {
    try {
      const filters: any = {};
      if (req.query.leadId) {
        filters.leadId = req.query.leadId;
      }
      if (req.query.clientId) {
        filters.clientId = req.query.clientId;
      }

      const logs = await storage.getCallLogs(filters);
      res.json(logs);
    } catch (error) {
      console.error("Get call logs error:", error);
      res.status(500).json({ error: "Failed to fetch call logs" });
    }
  });

  app.post("/api/call-logs", authenticateToken, requireRole("admin", "sales_manager", "sales_executive"), async (req: Request, res: Response) => {
    try {
      const validatedData = insertCallLogSchema.parse(req.body);
      const log = await storage.createCallLog(validatedData);
      res.status(201).json(log);
    } catch (error: any) {
      console.error("Create call log error:", error);
      res.status(400).json({ error: error.message || "Failed to create call log" });
    }
  });

  app.patch("/api/call-logs/:id", authenticateToken, requireRole("admin", "sales_manager", "sales_executive"), async (req: Request, res: Response) => {
    try {
      const log = await storage.updateCallLog(req.params.id, req.body);
      res.json(log);
    } catch (error) {
      console.error("Update call log error:", error);
      res.status(500).json({ error: "Failed to update call log" });
    }
  });

  app.delete("/api/call-logs/:id", authenticateToken, requireRole("admin", "sales_manager"), async (req: Request, res: Response) => {
    try {
      await storage.deleteCallLog(req.params.id);
      res.json({ message: "Call log deleted successfully" });
    } catch (error) {
      console.error("Delete call log error:", error);
      res.status(500).json({ error: "Failed to delete call log" });
    }
  });

  // ============================================================================
  // ANALYTICS / DASHBOARD ROUTES
  // ============================================================================
  
  app.get("/api/dashboard/metrics", authenticateToken, async (req: Request, res: Response) => {
    try {
      const metrics = await storage.getDashboardMetrics(req.user!.id, req.user!.role);
      res.json(metrics);
    } catch (error) {
      console.error("Get dashboard metrics error:", error);
      res.status(500).json({ error: "Failed to fetch dashboard metrics" });
    }
  });

  // ============================================================================
  // USERS ROUTES (for dropdowns, etc.)
  // ============================================================================
  
  app.get("/api/users", authenticateToken, async (req: Request, res: Response) => {
    try {
      const users = await storage.getAllUsers();
      // Don't send passwords
      const usersWithoutPasswords = users.map(({ password: _, ...user }) => user);
      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error("Get users error:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
