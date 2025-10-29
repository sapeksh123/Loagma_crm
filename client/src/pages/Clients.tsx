import { useState } from "react";
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
import { Plus, Search, Eye, Edit, Mail, Phone, MapPin } from "lucide-react";
import type { Client } from "@shared/schema";

const mockClients: (Client & { accountManagerName?: string })[] = [
  { id: "1", companyName: "Global Solutions Ltd", contactPerson: "Mike Davis", email: "mike@globalsol.com", phone: "+1-555-2001", address: "123 Business Ave", city: "New York", country: "USA", taxId: "TAX-001", accountManager: "2", accountManagerName: "Sarah Manager", createdAt: new Date("2024-09-20") },
  { id: "2", companyName: "Tech Innovations Inc", contactPerson: "Jennifer Lee", email: "jennifer@techinno.com", phone: "+1-555-2002", address: "456 Tech Street", city: "San Francisco", country: "USA", taxId: "TAX-002", accountManager: "2", accountManagerName: "Sarah Manager", createdAt: new Date("2024-08-15") },
  { id: "3", companyName: "Enterprise Systems Corp", contactPerson: "David Wilson", email: "david@entsys.com", phone: "+1-555-2003", address: "789 Corporate Blvd", city: "Chicago", country: "USA", taxId: "TAX-003", accountManager: "2", accountManagerName: "Sarah Manager", createdAt: new Date("2024-07-10") },
  { id: "4", companyName: "Digital Marketing Pro", contactPerson: "Amanda Chen", email: "amanda@digmarket.com", phone: "+1-555-2004", address: "321 Marketing Lane", city: "Austin", country: "USA", taxId: "TAX-004", accountManager: "2", accountManagerName: "Sarah Manager", createdAt: new Date("2024-10-01") },
  { id: "5", companyName: "CloudTech Solutions", contactPerson: "Robert Brown", email: "robert@cloudtech.com", phone: "+1-555-2005", address: "654 Cloud Drive", city: "Seattle", country: "USA", taxId: "TAX-005", accountManager: "2", accountManagerName: "Sarah Manager", createdAt: new Date("2024-06-20") },
];

export default function Clients() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredClients = mockClients.filter(client =>
    client.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Database</h1>
          <p className="text-muted-foreground mt-1">
            Manage your client relationships and information
          </p>
        </div>
        <Button data-testid="button-add-client">
          <Plus className="h-4 w-4 mr-2" />
          Add Client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Clients</CardTitle>
          <CardDescription>
            {filteredClients.length} client{filteredClients.length !== 1 ? "s" : ""} in database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by company or contact..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-clients"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact Person</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Account Manager</TableHead>
                  <TableHead>Since</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                      No clients found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredClients.map((client) => (
                    <TableRow key={client.id} data-testid={`client-row-${client.id}`}>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="font-medium">{client.companyName}</p>
                          <p className="text-xs text-muted-foreground font-mono">{client.taxId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{client.contactPerson}</p>
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              <span className="truncate max-w-[120px]">{client.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-3 w-3" />
                              <span>{client.phone}</span>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start gap-1 text-sm">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <p>{client.city}</p>
                            <p className="text-xs text-muted-foreground">{client.country}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{client.accountManagerName || "Unassigned"}</TableCell>
                      <TableCell>{new Date(client.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" data-testid={`button-view-${client.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" data-testid={`button-edit-${client.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
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
