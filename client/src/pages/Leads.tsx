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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Search, Filter, Eye, Edit, Trash2, Phone, Mail } from "lucide-react";
import type { Lead, LeadStatus, LeadSource } from "@shared/schema";

const mockLeads: (Lead & { assignedToName?: string })[] = [
  { id: "1", companyName: "Acme Corporation", contactPerson: "John Smith", email: "john@acme.com", phone: "+1-555-1001", status: "new", source: "website", assignedTo: "3", assignedToName: "Mike Executive", notes: "Interested in enterprise solution", estimatedValue: "50000", createdAt: new Date("2024-10-15"), updatedAt: new Date("2024-10-15") },
  { id: "2", companyName: "Tech Industries", contactPerson: "Sarah Johnson", email: "sarah@techindustries.com", phone: "+1-555-1002", status: "in_progress", source: "referral", assignedTo: "3", assignedToName: "Mike Executive", notes: "Follow-up scheduled for next week", estimatedValue: "75000", createdAt: new Date("2024-10-12"), updatedAt: new Date("2024-10-20") },
  { id: "3", companyName: "Global Solutions", contactPerson: "Mike Davis", email: "mike@globalsol.com", phone: "+1-555-1003", status: "converted", source: "cold_call", assignedTo: "3", assignedToName: "Mike Executive", notes: "Converted to client", estimatedValue: "120000", createdAt: new Date("2024-09-20"), updatedAt: new Date("2024-10-18") },
  { id: "4", companyName: "Innovation Labs", contactPerson: "Emily Brown", email: "emily@innovlabs.com", phone: "+1-555-1004", status: "in_progress", source: "social_media", assignedTo: "3", assignedToName: "Mike Executive", notes: "Sent proposal, awaiting feedback", estimatedValue: "45000", createdAt: new Date("2024-10-18"), updatedAt: new Date("2024-10-22") },
  { id: "5", companyName: "Digital Dynamics", contactPerson: "Robert Wilson", email: "robert@digitaldyn.com", phone: "+1-555-1005", status: "lost", source: "trade_show", assignedTo: "3", assignedToName: "Mike Executive", notes: "Went with competitor", estimatedValue: "60000", createdAt: new Date("2024-09-10"), updatedAt: new Date("2024-10-05") },
  { id: "6", companyName: "Future Systems", contactPerson: "Lisa Anderson", email: "lisa@futuresys.com", phone: "+1-555-1006", status: "new", source: "website", assignedTo: null, notes: "Initial contact made", estimatedValue: "35000", createdAt: new Date("2024-10-25"), updatedAt: new Date("2024-10-25") },
];

const statusColors: Record<LeadStatus, string> = {
  new: "bg-chart-1 text-white",
  in_progress: "bg-chart-4 text-white",
  converted: "bg-chart-2 text-white",
  lost: "bg-muted text-muted-foreground",
};

export default function Leads() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesRole = user?.role === "sales_executive" ? lead.assignedTo === user.id : true;
    return matchesSearch && matchesStatus && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leads Management</h1>
          <p className="text-muted-foreground mt-1">
            Track and manage your sales pipeline
          </p>
        </div>
        {(user?.role === "admin" || user?.role === "sales_manager") && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-add-lead">
                <Plus className="h-4 w-4 mr-2" />
                Add Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Lead</DialogTitle>
                <DialogDescription>
                  Enter the details of the new lead
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input id="companyName" placeholder="Acme Corp" data-testid="input-company-name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input id="contactPerson" placeholder="John Doe" data-testid="input-contact-person" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" placeholder="john@acme.com" data-testid="input-email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone *</Label>
                    <Input id="phone" placeholder="+1-555-0000" data-testid="input-phone" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="source">Source *</Label>
                    <Select defaultValue="website">
                      <SelectTrigger data-testid="select-source">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Website</SelectItem>
                        <SelectItem value="referral">Referral</SelectItem>
                        <SelectItem value="cold_call">Cold Call</SelectItem>
                        <SelectItem value="social_media">Social Media</SelectItem>
                        <SelectItem value="trade_show">Trade Show</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedValue">Estimated Value</Label>
                    <Input id="estimatedValue" type="number" placeholder="50000" data-testid="input-estimated-value" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea id="notes" placeholder="Additional information..." data-testid="textarea-notes" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} data-testid="button-cancel">
                  Cancel
                </Button>
                <Button onClick={() => setIsDialogOpen(false)} data-testid="button-save-lead">
                  Create Lead
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
          <CardDescription>
            {filteredLeads.length} lead{filteredLeads.length !== 1 ? "s" : ""} found
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
                data-testid="input-search-leads"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as LeadStatus | "all")}>
              <SelectTrigger className="w-[180px]" data-testid="select-status-filter">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="converted">Converted</SelectItem>
                <SelectItem value="lost">Lost</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Est. Value</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                      No leads found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLeads.map((lead) => (
                    <TableRow key={lead.id} data-testid={`lead-row-${lead.id}`}>
                      <TableCell className="font-medium">{lead.companyName}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <p className="text-sm">{lead.contactPerson}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span className="truncate max-w-[150px]">{lead.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[lead.status]} data-testid={`badge-status-${lead.id}`}>
                          {lead.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="capitalize">{lead.source.replace("_", " ")}</TableCell>
                      <TableCell>{lead.assignedToName || "Unassigned"}</TableCell>
                      <TableCell className="font-mono">
                        {lead.estimatedValue ? `$${parseFloat(lead.estimatedValue).toLocaleString()}` : "-"}
                      </TableCell>
                      <TableCell>{new Date(lead.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" data-testid={`button-view-${lead.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" data-testid={`button-edit-${lead.id}`}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {(user?.role === "admin" || user?.role === "sales_manager") && (
                            <Button variant="ghost" size="icon" data-testid={`button-delete-${lead.id}`}>
                              <Trash2 className="h-4 w-4" />
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
