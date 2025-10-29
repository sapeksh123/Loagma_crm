const API_BASE = "";

export async function apiRequest(endpoint: string, options?: RequestInit) {
  const token = localStorage.getItem("crm_token");
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(options?.headers || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: "Request failed" }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
}

export const api = {
  // Auth
  async login(username: string, password: string) {
    return apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    });
  },

  async logout() {
    return apiRequest("/api/auth/logout", { method: "POST" });
  },

  async getMe() {
    return apiRequest("/api/auth/me");
  },

  // Leads
  async getLeads(filters?: { status?: string }) {
    const params = new URLSearchParams(filters as any);
    return apiRequest(`/api/leads?${params}`);
  },

  async createLead(data: any) {
    return apiRequest("/api/leads", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async updateLead(id: string, data: any) {
    return apiRequest(`/api/leads/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  },

  async deleteLead(id: string) {
    return apiRequest(`/api/leads/${id}`, { method: "DELETE" });
  },

  // Clients
  async getClients() {
    return apiRequest("/api/clients");
  },

  // Quotations
  async getQuotations(filters?: { clientId?: string; status?: string }) {
    const params = new URLSearchParams(filters as any);
    return apiRequest(`/api/quotations?${params}`);
  },

  // Invoices
  async getInvoices(filters?: { clientId?: string; status?: string }) {
    const params = new URLSearchParams(filters as any);
    return apiRequest(`/api/invoices?${params}`);
  },

  // Payments
  async getPayments(filters?: { invoiceId?: string }) {
    const params = new URLSearchParams(filters as any);
    return apiRequest(`/api/payments?${params}`);
  },

  // Service Tickets
  async getServiceTickets(filters?: { status?: string }) {
    const params = new URLSearchParams(filters as any);
    return apiRequest(`/api/service-tickets?${params}`);
  },

  // Call Logs
  async getCallLogs(filters?: { leadId?: string; clientId?: string }) {
    const params = new URLSearchParams(filters as any);
    return apiRequest(`/api/call-logs?${params}`);
  },

  // Dashboard
  async getDashboardMetrics() {
    return apiRequest("/api/dashboard/metrics");
  },

  // Users
  async getUsers() {
    return apiRequest("/api/users");
  },
};
