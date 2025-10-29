import { db } from "./db";
import { users, leads, clients, quotations, invoices, payments, serviceTickets, callLogs } from "@shared/schema";
import bcrypt from "bcrypt";

async function seed() {
  console.log("🌱 Seeding database...");

  // Clear existing data
  await db.delete(callLogs);
  await db.delete(payments);
  await db.delete(serviceTickets);
  await db.delete(invoices);
  await db.delete(quotations);
  await db.delete(leads);
  await db.delete(clients);
  await db.delete(users);

  // Create users
  const hashedPassword = await bcrypt.hash("demo123", 10);
  
  const [admin] = await db.insert(users).values({
    username: "admin",
    password: await bcrypt.hash("admin123", 10),
    email: "admin@company.com",
    fullName: "John Admin",
    role: "admin",
    phone: "+1-555-0001",
  }).returning();

  const [manager] = await db.insert(users).values({
    username: "manager",
    password: await bcrypt.hash("manager123", 10),
    email: "manager@company.com",
    fullName: "Sarah Manager",
    role: "sales_manager",
    phone: "+1-555-0002",
  }).returning();

  const [salesExec] = await db.insert(users).values({
    username: "sales",
    password: await bcrypt.hash("sales123", 10),
    email: "sales@company.com",
    fullName: "Mike Executive",
    role: "sales_executive",
    phone: "+1-555-0003",
  }).returning();

  const [accountant] = await db.insert(users).values({
    username: "accountant",
    password: await bcrypt.hash("account123", 10),
    email: "accountant@company.com",
    fullName: "Lisa Accountant",
    role: "accountant",
    phone: "+1-555-0004",
  }).returning();

  const [engineer] = await db.insert(users).values({
    username: "engineer",
    password: await bcrypt.hash("eng123", 10),
    email: "engineer@company.com",
    fullName: "Tom Engineer",
    role: "engineer",
    phone: "+1-555-0005",
  }).returning();

  const [client] = await db.insert(users).values({
    username: "client",
    password: await bcrypt.hash("client123", 10),
    email: "client@example.com",
    fullName: "Jane Client",
    role: "client",
    phone: "+1-555-0006",
  }).returning();

  console.log("✓ Created users");

  // Create leads
  const leadsData = await db.insert(leads).values([
    {
      companyName: "Acme Corporation",
      contactPerson: "John Smith",
      email: "john@acme.com",
      phone: "+1-555-1001",
      status: "new",
      source: "website",
      assignedTo: salesExec.id,
      notes: "Interested in enterprise solution",
      estimatedValue: "50000",
    },
    {
      companyName: "Tech Industries",
      contactPerson: "Sarah Johnson",
      email: "sarah@techindustries.com",
      phone: "+1-555-1002",
      status: "in_progress",
      source: "referral",
      assignedTo: salesExec.id,
      notes: "Follow-up scheduled for next week",
      estimatedValue: "75000",
    },
    {
      companyName: "Global Solutions",
      contactPerson: "Mike Davis",
      email: "mike@globalsol.com",
      phone: "+1-555-1003",
      status: "converted",
      source: "cold_call",
      assignedTo: salesExec.id,
      notes: "Converted to client",
      estimatedValue: "120000",
    },
    {
      companyName: "Innovation Labs",
      contactPerson: "Emily Brown",
      email: "emily@innovlabs.com",
      phone: "+1-555-1004",
      status: "in_progress",
      source: "social_media",
      assignedTo: salesExec.id,
      notes: "Sent proposal, awaiting feedback",
      estimatedValue: "45000",
    },
    {
      companyName: "Digital Dynamics",
      contactPerson: "Robert Wilson",
      email: "robert@digitaldyn.com",
      phone: "+1-555-1005",
      status: "lost",
      source: "trade_show",
      assignedTo: salesExec.id,
      notes: "Went with competitor",
      estimatedValue: "60000",
    },
    {
      companyName: "Future Systems",
      contactPerson: "Lisa Anderson",
      email: "lisa@futuresys.com",
      phone: "+1-555-1006",
      status: "new",
      source: "website",
      assignedTo: null,
      notes: "Initial contact made",
      estimatedValue: "35000",
    },
  ]).returning();

  console.log("✓ Created leads");

  // Create clients
  const clientsData = await db.insert(clients).values([
    {
      companyName: "Global Solutions Ltd",
      contactPerson: "Mike Davis",
      email: "mike@globalsol.com",
      phone: "+1-555-2001",
      address: "123 Business Ave",
      city: "New York",
      country: "USA",
      taxId: "TAX-001",
      accountManager: manager.id,
    },
    {
      companyName: "Tech Innovations Inc",
      contactPerson: "Jennifer Lee",
      email: "jennifer@techinno.com",
      phone: "+1-555-2002",
      address: "456 Tech Street",
      city: "San Francisco",
      country: "USA",
      taxId: "TAX-002",
      accountManager: manager.id,
    },
    {
      companyName: "Enterprise Systems Corp",
      contactPerson: "David Wilson",
      email: "david@entsys.com",
      phone: "+1-555-2003",
      address: "789 Corporate Blvd",
      city: "Chicago",
      country: "USA",
      taxId: "TAX-003",
      accountManager: manager.id,
    },
    {
      companyName: "Digital Marketing Pro",
      contactPerson: "Amanda Chen",
      email: "amanda@digmarket.com",
      phone: "+1-555-2004",
      address: "321 Marketing Lane",
      city: "Austin",
      country: "USA",
      taxId: "TAX-004",
      accountManager: manager.id,
    },
    {
      companyName: "CloudTech Solutions",
      contactPerson: "Robert Brown",
      email: "robert@cloudtech.com",
      phone: "+1-555-2005",
      address: "654 Cloud Drive",
      city: "Seattle",
      country: "USA",
      taxId: "TAX-005",
      accountManager: manager.id,
    },
  ]).returning();

  console.log("✓ Created clients");

  // Create quotations
  const quotationsData = await db.insert(quotations).values([
    {
      quotationNumber: "QUO-2024-001",
      clientId: clientsData[0].id,
      status: "approved",
      items: JSON.stringify([
        { id: "1", description: "Enterprise Software License", quantity: 10, unitPrice: 5000, total: 50000 }
      ]),
      subtotal: "50000",
      taxRate: "10",
      taxAmount: "5000",
      total: "55000",
      validUntil: new Date("2024-11-30"),
      notes: "Annual subscription",
      createdBy: salesExec.id,
      approvedBy: manager.id,
    },
    {
      quotationNumber: "QUO-2024-002",
      clientId: clientsData[1].id,
      status: "pending_approval",
      items: JSON.stringify([
        { id: "1", description: "Consulting Services", quantity: 40, unitPrice: 150, total: 6000 }
      ]),
      subtotal: "6000",
      taxRate: "10",
      taxAmount: "600",
      total: "6600",
      validUntil: new Date("2024-11-15"),
      notes: "Project phase 1",
      createdBy: salesExec.id,
      approvedBy: null,
    },
    {
      quotationNumber: "QUO-2024-003",
      clientId: clientsData[2].id,
      status: "draft",
      items: JSON.stringify([
        { id: "1", description: "Support Package", quantity: 1, unitPrice: 12000, total: 12000 }
      ]),
      subtotal: "12000",
      taxRate: "10",
      taxAmount: "1200",
      total: "13200",
      validUntil: new Date("2024-12-01"),
      notes: "Premium support",
      createdBy: salesExec.id,
      approvedBy: null,
    },
    {
      quotationNumber: "QUO-2024-004",
      clientId: clientsData[3].id,
      status: "converted",
      items: JSON.stringify([
        { id: "1", description: "Marketing Platform", quantity: 1, unitPrice: 8500, total: 8500 }
      ]),
      subtotal: "8500",
      taxRate: "10",
      taxAmount: "850",
      total: "9350",
      validUntil: new Date("2024-10-31"),
      notes: "Converted to invoice",
      createdBy: salesExec.id,
      approvedBy: manager.id,
    },
    {
      quotationNumber: "QUO-2024-005",
      clientId: clientsData[4].id,
      status: "rejected",
      items: JSON.stringify([
        { id: "1", description: "Cloud Infrastructure", quantity: 5, unitPrice: 3000, total: 15000 }
      ]),
      subtotal: "15000",
      taxRate: "10",
      taxAmount: "1500",
      total: "16500",
      validUntil: new Date("2024-10-20"),
      notes: "Budget constraints",
      createdBy: salesExec.id,
      approvedBy: null,
    },
  ]).returning();

  console.log("✓ Created quotations");

  // Create invoices
  const invoicesData = await db.insert(invoices).values([
    {
      invoiceNumber: "INV-2024-001",
      quotationId: quotationsData[0].id,
      clientId: clientsData[0].id,
      status: "paid",
      paymentStatus: "paid",
      items: JSON.stringify([
        { id: "1", description: "Enterprise Software License", quantity: 10, unitPrice: 5000, total: 50000 }
      ]),
      subtotal: "50000",
      taxRate: "10",
      taxAmount: "5000",
      total: "55000",
      paidAmount: "55000",
      dueDate: new Date("2024-11-15"),
      notes: "Paid in full",
      createdBy: accountant.id,
    },
    {
      invoiceNumber: "INV-2024-002",
      quotationId: null,
      clientId: clientsData[1].id,
      status: "sent",
      paymentStatus: "partial",
      items: JSON.stringify([
        { id: "1", description: "Consulting Services", quantity: 40, unitPrice: 150, total: 6000 }
      ]),
      subtotal: "6000",
      taxRate: "10",
      taxAmount: "600",
      total: "6600",
      paidAmount: "3300",
      dueDate: new Date("2024-11-10"),
      notes: "50% advance received",
      createdBy: accountant.id,
    },
    {
      invoiceNumber: "INV-2024-003",
      quotationId: null,
      clientId: clientsData[2].id,
      status: "sent",
      paymentStatus: "pending",
      items: JSON.stringify([
        { id: "1", description: "Support Package", quantity: 1, unitPrice: 12000, total: 12000 }
      ]),
      subtotal: "12000",
      taxRate: "10",
      taxAmount: "1200",
      total: "13200",
      paidAmount: "0",
      dueDate: new Date("2024-11-20"),
      notes: "Quarterly billing",
      createdBy: accountant.id,
    },
    {
      invoiceNumber: "INV-2024-004",
      quotationId: quotationsData[3].id,
      clientId: clientsData[3].id,
      status: "overdue",
      paymentStatus: "pending",
      items: JSON.stringify([
        { id: "1", description: "Marketing Platform", quantity: 1, unitPrice: 8500, total: 8500 }
      ]),
      subtotal: "8500",
      taxRate: "10",
      taxAmount: "850",
      total: "9350",
      paidAmount: "0",
      dueDate: new Date("2024-10-15"),
      notes: "Payment overdue",
      createdBy: accountant.id,
    },
    {
      invoiceNumber: "INV-2024-005",
      quotationId: null,
      clientId: clientsData[0].id,
      status: "draft",
      paymentStatus: "pending",
      items: JSON.stringify([
        { id: "1", description: "Additional Services", quantity: 5, unitPrice: 1200, total: 6000 }
      ]),
      subtotal: "6000",
      taxRate: "10",
      taxAmount: "600",
      total: "6600",
      paidAmount: "0",
      dueDate: new Date("2024-11-30"),
      notes: "Draft - not sent",
      createdBy: accountant.id,
    },
  ]).returning();

  console.log("✓ Created invoices");

  // Create payments
  await db.insert(payments).values([
    {
      invoiceId: invoicesData[0].id,
      amount: "55000",
      paymentMethod: "bank_transfer",
      transactionId: "TXN-001-BT",
      notes: "Full payment",
      recordedBy: accountant.id,
      paymentDate: new Date("2024-10-20"),
    },
    {
      invoiceId: invoicesData[1].id,
      amount: "3300",
      paymentMethod: "credit_card",
      transactionId: "TXN-002-CC",
      notes: "50% advance",
      recordedBy: accountant.id,
      paymentDate: new Date("2024-10-22"),
    },
    {
      invoiceId: invoicesData[0].id,
      amount: "6000",
      paymentMethod: "check",
      transactionId: "CHK-12345",
      notes: "Additional services",
      recordedBy: accountant.id,
      paymentDate: new Date("2024-10-24"),
    },
    {
      invoiceId: invoicesData[2].id,
      amount: "13200",
      paymentMethod: "online",
      transactionId: "TXN-004-ONL",
      notes: "Online payment",
      recordedBy: accountant.id,
      paymentDate: new Date("2024-10-25"),
    },
  ]);

  console.log("✓ Created payments");

  // Create service tickets
  await db.insert(serviceTickets).values([
    {
      ticketNumber: "TKT-2024-001",
      clientId: clientsData[0].id,
      title: "Network connectivity issue",
      description: "Intermittent network drops in Building A",
      status: "in_progress",
      priority: "high",
      assignedTo: engineer.id,
      createdBy: admin.id,
    },
    {
      ticketNumber: "TKT-2024-002",
      clientId: clientsData[1].id,
      title: "Software installation required",
      description: "Need to install latest version on 20 machines",
      status: "assigned",
      priority: "medium",
      assignedTo: engineer.id,
      createdBy: manager.id,
    },
    {
      ticketNumber: "TKT-2024-003",
      clientId: clientsData[2].id,
      title: "Server maintenance",
      description: "Scheduled maintenance for database server",
      status: "resolved",
      priority: "medium",
      assignedTo: engineer.id,
      resolvedAt: new Date("2024-10-24"),
      createdBy: accountant.id,
    },
    {
      ticketNumber: "TKT-2024-004",
      clientId: clientsData[3].id,
      title: "Email server down",
      description: "Cannot send or receive emails",
      status: "open",
      priority: "urgent",
      assignedTo: null,
      createdBy: client.id,
    },
    {
      ticketNumber: "TKT-2024-005",
      clientId: clientsData[4].id,
      title: "Printer configuration",
      description: "New printer not showing in network",
      status: "closed",
      priority: "low",
      assignedTo: engineer.id,
      resolvedAt: new Date("2024-10-19"),
      createdBy: engineer.id,
    },
  ]);

  console.log("✓ Created service tickets");

  // Create call logs
  await db.insert(callLogs).values([
    {
      leadId: leadsData[0].id,
      type: "call",
      subject: "Initial consultation",
      notes: "Discussed requirements for enterprise solution. Follow-up scheduled for next week.",
      scheduledFor: new Date("2024-10-30"),
      completed: 0,
      createdBy: salesExec.id,
    },
    {
      leadId: leadsData[1].id,
      type: "email",
      subject: "Proposal sent",
      notes: "Sent detailed proposal document. Awaiting response.",
      completed: 1,
      createdBy: salesExec.id,
    },
    {
      clientId: clientsData[0].id,
      type: "meeting",
      subject: "Quarterly review meeting",
      notes: "Reviewed service performance and discussed expansion plans.",
      scheduledFor: new Date("2024-11-05"),
      completed: 0,
      createdBy: salesExec.id,
    },
    {
      leadId: leadsData[3].id,
      type: "call",
      subject: "Follow-up on proposal",
      notes: "Client requested modifications to proposal. Agreed to send revised version by Friday.",
      completed: 1,
      createdBy: salesExec.id,
    },
    {
      clientId: clientsData[1].id,
      type: "note",
      subject: "Payment reminder",
      notes: "Sent friendly reminder about pending invoice INV-2024-002.",
      completed: 1,
      createdBy: salesExec.id,
    },
    {
      leadId: leadsData[0].id,
      type: "call",
      subject: "Pricing discussion",
      notes: "Discussed volume discounts and payment terms.",
      scheduledFor: new Date("2024-10-28"),
      completed: 0,
      createdBy: salesExec.id,
    },
  ]);

  console.log("✓ Created call logs");
  console.log("✅ Database seeding complete!");
}

seed().catch(console.error);
