import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockDataService, type QuotationStatus } from "@/services/mockData";
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

const statusColors: Record<QuotationStatus, string> = {
  draft: "bg-muted text-muted-foreground",
  sent: "bg-chart-4 text-white",
  approved: "bg-chart-2 text-white",
  rejected: "bg-destructive text-destructive-foreground",
};

export default function Quotations() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<QuotationStatus | "all">("all");

  const isClient = user?.role === "client";
  const isAccountant = user?.role === "accountant";

  const allQuotations = useMemo(() => mockDataService.getQuotations(), []);

  const filteredQuotations = allQuotations.filter(quote => {
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
