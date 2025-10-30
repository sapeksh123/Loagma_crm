import { useState, useMemo } from "react";
import { mockDataService } from "@/services/mockData";

// Define PaymentMethod type locally
type PaymentMethod = "cash" | "cheque" | "bank_transfer" | "upi" | "card";
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
import { Search, DollarSign, TrendingUp } from "lucide-react";

const paymentMethodColors: Record<PaymentMethod, string> = {
  cash: "bg-chart-2 text-white",
  cheque: "bg-chart-4 text-white",
  bank_transfer: "bg-chart-1 text-white",
  upi: "bg-chart-3 text-white",
  card: "bg-chart-1 text-white",
};

export default function Payments() {
  const [searchQuery, setSearchQuery] = useState("");

  const allPayments = useMemo(() => mockDataService.getPayments(), []);

  const filteredPayments = allPayments.filter(payment =>
    payment.invoiceNumber?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.clientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    payment.referenceNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPayments = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground mt-1">
            Track all payment transactions and receipts
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs.{totalPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1 text-chart-2" />
              Across {filteredPayments.length} transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPayments.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1">October 2024</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Payment</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${filteredPayments.length > 0 ? Math.round(totalPayments / filteredPayments.length).toLocaleString() : "0"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per transaction</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            {filteredPayments.length} payment{filteredPayments.length !== 1 ? "s" : ""} recorded
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by invoice, client, or transaction ID..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-payments"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Transaction ID</TableHead>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Notes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPayments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No payments found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredPayments.map((payment) => (
                    <TableRow key={payment.id} data-testid={`payment-row-${payment.id}`}>
                      <TableCell className="font-mono text-sm">{payment.referenceNumber}</TableCell>
                      <TableCell className="font-mono">{payment.invoiceNumber}</TableCell>
                      <TableCell>{payment.clientName}</TableCell>
                      <TableCell className="font-mono font-semibold text-chart-2">
                        {payment.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <Badge className={paymentMethodColors[payment.paymentMethod]} data-testid={`badge-method-${payment.id}`}>
                          {payment.paymentMethod.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{payment.notes}</TableCell>
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
