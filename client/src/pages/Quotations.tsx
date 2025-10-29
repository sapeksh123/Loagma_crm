import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
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
import { Plus, Search, Eye, Edit, Check, X, Download } from "lucide-react";
import type { Quotation, QuotationStatus } from "@shared/schema";

const mockQuotations: (Quotation & { clientName?: string; createdByName?: string })[] = [
  { id: "1", quotationNumber: "QUO-2024-001", clientId: "1", clientName: "Global Solutions Ltd", leadId: null, status: "approved", items: JSON.stringify([{ id: "1", description: "Enterprise Software License", quantity: 10, unitPrice: 5000, total: 50000 }]), subtotal: "50000", taxRate: "10", taxAmount: "5000", total: "55000", validUntil: new Date("2024-11-30"), notes: "Annual subscription", createdBy: "3", createdByName: "Mike Executive", approvedBy: "2", createdAt: new Date("2024-10-10"), updatedAt: new Date("2024-10-15") },
  { id: "2", quotationNumber: "QUO-2024-002", clientId: "2", clientName: "Tech Innovations Inc", leadId: null, status: "pending_approval", items: JSON.stringify([{ id: "1", description: "Consulting Services", quantity: 40, unitPrice: 150, total: 6000 }]), subtotal: "6000", taxRate: "10", taxAmount: "600", total: "6600", validUntil: new Date("2024-11-15"), notes: "Project phase 1", createdBy: "3", createdByName: "Mike Executive", approvedBy: null, createdAt: new Date("2024-10-20"), updatedAt: new Date("2024-10-20") },
  { id: "3", quotationNumber: "QUO-2024-003", clientId: "3", clientName: "Enterprise Systems Corp", leadId: null, status: "draft", items: JSON.stringify([{ id: "1", description: "Support Package", quantity: 1, unitPrice: 12000, total: 12000 }]), subtotal: "12000", taxRate: "10", taxAmount: "1200", total: "13200", validUntil: new Date("2024-12-01"), notes: "Premium support", createdBy: "3", createdByName: "Mike Executive", approvedBy: null, createdAt: new Date("2024-10-25"), updatedAt: new Date("2024-10-25") },
  { id: "4", quotationNumber: "QUO-2024-004", clientId: "4", clientName: "Digital Marketing Pro", leadId: null, status: "converted", items: JSON.stringify([{ id: "1", description: "Marketing Platform", quantity: 1, unitPrice: 8500, total: 8500 }]), subtotal: "8500", taxRate: "10", taxAmount: "850", total: "9350", validUntil: new Date("2024-10-31"), notes: "Converted to invoice", createdBy: "3", createdByName: "Mike Executive", approvedBy: "2", createdAt: new Date("2024-09-15"), updatedAt: new Date("2024-10-01") },
  { id: "5", quotationNumber: "QUO-2024-005", clientId: "5", clientName: "CloudTech Solutions", leadId: null, status: "rejected", items: JSON.stringify([{ id: "1", description: "Cloud Infrastructure", quantity: 5, unitPrice: 3000, total: 15000 }]), subtotal: "15000", taxRate: "10", taxAmount: "1500", total: "16500", validUntil: new Date("2024-10-20"), notes: "Budget constraints", createdBy: "3", createdByName: "Mike Executive", approvedBy: null, createdAt: new Date("2024-09-28"), updatedAt: new Date("2024-10-10") },
];

const statusColors: Record<QuotationStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  pending_approval: "bg-chart-4 text-white",
  approved: "bg-chart-2 text-white",
  rejected: "bg-destructive text-destructive-foreground",
  converted: "bg-chart-1 text-white",
};

export default function Quotations() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuotationStatus | "all">("all");

  const isClient = user?.role === "client";
  const isAccountant = user?.role === "accountant";

  const filteredQuotations = mockQuotations.filter(quote => {
    const matchesSearch = quote.quotationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quote.clientName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || quote.status === statusFilter;
    const matchesRole = isAccountant ? quote.status === "approved" : true;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Quotations</h1>
          <p className="text-muted-foreground mt-1">
            {isClient ? "View your quotations and pricing proposals" : "Manage quotations and pricing proposals"}
          </p>
        </div>
        {!isClient && !isAccountant && (
          <Button data-testid="button-add-quotation">
            <Plus className="h-4 w-4 mr-2" />
            New Quotation
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Quotations</CardTitle>
          <CardDescription>
            {filteredQuotations.length} quotation{filteredQuotations.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by quotation number or client..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-quotations"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quote #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valid Until</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQuotations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No quotations found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuotations.map((quote) => (
                    <TableRow key={quote.id} data-testid={`quote-row-${quote.id}`}>
                      <TableCell className="font-mono font-medium">{quote.quotationNumber}</TableCell>
                      <TableCell>{quote.clientName}</TableCell>
                      <TableCell className="font-mono font-semibold">
                        ${parseFloat(quote.total).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[quote.status]} data-testid={`badge-status-${quote.id}`}>
                          {quote.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(quote.validUntil).toLocaleDateString()}</TableCell>
                      <TableCell>{quote.createdByName}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" data-testid={`button-view-${quote.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" data-testid={`button-download-${quote.id}`}>
                            <Download className="h-4 w-4" />
                          </Button>
                          {!isClient && quote.status === "pending_approval" && user?.role === "sales_manager" && (
                            <>
                              <Button variant="ghost" size="icon" className="text-chart-2" data-testid={`button-approve-${quote.id}`}>
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="text-destructive" data-testid={`button-reject-${quote.id}`}>
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {!isClient && !isAccountant && quote.status === "draft" && (
                            <Button variant="ghost" size="icon" data-testid={`button-edit-${quote.id}`}>
                              <Edit className="h-4 w-4" />
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
