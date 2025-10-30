import { useState, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { mockDataService, type TicketStatus, type TicketPriority } from "@/services/mockData";
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
import { Plus, Search, Eye, Edit, AlertCircle } from "lucide-react";

const statusColors: Record<TicketStatus, string> = {
  open: "bg-chart-1 text-white",
  assigned: "bg-chart-4 text-white",
  in_progress: "bg-chart-3 text-white",
  resolved: "bg-chart-2 text-white",
  closed: "bg-muted text-muted-foreground",
};

const priorityColors: Record<TicketPriority, string> = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-chart-4 text-white",
  high: "bg-chart-4 text-white",
  urgent: "bg-destructive text-destructive-foreground",
};

export default function ServiceTickets() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const isEngineer = user?.role === "engineer";
  const isClient = user?.role === "client";

  const allTickets = useMemo(() => mockDataService.getServiceTickets(), []);

  const filteredTickets = allTickets.filter(ticket => {
    const matchesSearch = ticket.ticketNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         ticket.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = isEngineer ? ticket.assignedTo === user.id : true;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {isEngineer ? "My Service Tickets" : "Service Tickets"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {isClient ? "View and manage your service requests" : "Track and manage service requests"}
          </p>
        </div>
        {isClient && (
          <Button data-testid="button-add-ticket">
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open</CardTitle>
            <AlertCircle className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredTickets.filter(t => t.status === "open").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <AlertCircle className="h-4 w-4 text-chart-3" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredTickets.filter(t => t.status === "in_progress" || t.status === "assigned").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <AlertCircle className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredTickets.filter(t => t.status === "resolved").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertCircle className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {filteredTickets.filter(t => t.priority === "urgent").length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>
            {filteredTickets.length} ticket{filteredTickets.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by ticket number or title..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-tickets"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTickets.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-12 text-muted-foreground">
                      No tickets found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id} data-testid={`ticket-row-${ticket.id}`}>
                      <TableCell className="font-mono font-medium">{ticket.ticketNumber}</TableCell>
                      <TableCell>{ticket.clientName}</TableCell>
                      <TableCell>
                        <div className="max-w-[300px]">
                          <p className="font-medium truncate">{ticket.title}</p>
                          <p className="text-xs text-muted-foreground truncate">{ticket.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={statusColors[ticket.status]} data-testid={`badge-status-${ticket.id}`}>
                          {ticket.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={priorityColors[ticket.priority]} data-testid={`badge-priority-${ticket.id}`}>
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{ticket.assignedToName || "Unassigned"}</TableCell>
                      <TableCell>{new Date(ticket.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" data-testid={`button-view-${ticket.id}`}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          {isEngineer && ticket.status !== "closed" && (
                            <Button variant="ghost" size="icon" data-testid={`button-update-${ticket.id}`}>
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
