import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockDataService } from "@/services/mockData";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search, Eye, Download, DollarSign } from "lucide-react";

type InvoiceStatus = "draft" | "sent" | "paid" | "partial" | "overdue";

const statusColors: Record<InvoiceStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  sent: "bg-chart-1 text-white",
  paid: "bg-chart-2 text-white",
  overdue: "bg-destructive text-destructive-foreground",
  partial: "bg-chart-3 text-white",
};

const paymentStatusColors = {
  pending: "bg-chart-4 text-white",
  partial: "bg-chart-3 text-white",
  paid: "bg-chart-2 text-white",
};

export default function Invoices() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const isClient = user?.role === "client";

  const allInvoices = useMemo(() => mockDataService.getInvoices(), []);

  const filteredInvoices = allInvoices.filter(invoice =>
    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.clientName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalOutstanding = filteredInvoices
    .filter(inv => inv.status !== "paid")
    .reduce((sum, inv) => sum + (inv.totalAmount - inv.paidAmount), 0);

  const totalPaid = filteredInvoices
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.totalAmount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Invoices</h1>
          <p className="text-muted-foreground mt-1">
            {isClient ? "View your invoices and payment status" : "Manage invoices and track payments"}
          </p>
        </div>
        {!isClient && (
          <Button data-testid="button-add-invoice">
            <Plus className="h-4 w-4 mr-2" />
            New Invoice
          </Button>
        )}
      </div>

      {!isClient && (
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Outstanding</CardTitle>
              <DollarSign className="h-4 w-4 text-chart-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalOutstanding.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">Across {filteredInvoices.filter(inv => inv.paymentStatus !== "paid").length} invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Paid This Month</CardTitle>
              <DollarSign className="h-4 w-4 text-chart-2" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPaid.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground mt-1">{filteredInvoices.filter(inv => inv.paymentStatus === "paid").length} invoices</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overdue</CardTitle>
              <DollarSign className="h-4 w-4 text-destructive" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{filteredInvoices.filter(inv => inv.status === "overdue").length}</div>
              <p className="text-xs text-muted-foreground mt-1">Requires immediate attention</p>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>All Invoices</CardTitle>
          <CardDescription>
            {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice number or client..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-invoices"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Paid Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                      No invoices found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredInvoices.map((invoice) => (
                    <TableRow key={invoice.id} data-testid={`invoice-row-${invoice.id}`}>
                      <TableCell className="font-mono font-medium">{invoice.invoiceNumber}</TableCell>
                      <TableCell>{invoice.clientName}</TableCell>
                      <TableCell className="font-mono font-semibold">
                        ${parseFloat(invoice.total).toLocaleString()}
                      </TableCell>
                      <TableCell className="font-mono">
                        ${parseFloat(invoice.paidAmount).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[invoice.status]} data-testid={`badge-status-${invoice.id}`}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={paymentStatusColors[invoice.paymentStatus]} data-testid={`badge-payment-${invoice.id}`}>
                          {invoice.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(invoice.dueDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" data-testid={`button-view-${invoice.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" data-testid={`button-download-${invoice.id}`}>
                            <Download className="h-4 w-4" />
                          </Button>
                          {!isClient && invoice.paymentStatus !== "paid" && (
                            <Button variant="ghost" size="icon" className="text-chart-2" data-testid={`button-record-payment-${invoice.id}`}>
                              <DollarSign className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
