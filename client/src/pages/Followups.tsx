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
import { Plus, Search, Eye, CheckCircle2, Phone, Mail, Calendar, MessageSquare } from "lucide-react";
import type { CallLog, CallType } from "@shared/schema";

const mockCallLogs: (CallLog & { leadName?: string; clientName?: string })[] = [
  { id: "1", leadId: "1", clientId: null, leadName: "Acme Corporation", type: "call", subject: "Initial consultation", notes: "Discussed requirements for enterprise solution. Follow-up scheduled for next week.", scheduledFor: new Date("2024-10-30"), completed: 0, createdBy: "3", createdAt: new Date("2024-10-20") },
  { id: "2", leadId: "2", clientId: null, leadName: "Tech Industries", type: "email", subject: "Proposal sent", notes: "Sent detailed proposal document. Awaiting response.", scheduledFor: null, completed: 1, createdBy: "3", createdAt: new Date("2024-10-22") },
  { id: "3", leadId: null, clientId: "1", clientName: "Global Solutions Ltd", type: "meeting", subject: "Quarterly review meeting", notes: "Reviewed service performance and discussed expansion plans.", scheduledFor: new Date("2024-11-05"), completed: 0, createdBy: "3", createdAt: new Date("2024-10-23") },
  { id: "4", leadId: "4", clientId: null, leadName: "Innovation Labs", type: "call", subject: "Follow-up on proposal", notes: "Client requested modifications to proposal. Agreed to send revised version by Friday.", scheduledFor: null, completed: 1, createdBy: "3", createdAt: new Date("2024-10-24") },
  { id: "5", leadId: null, clientId: "2", clientName: "Tech Innovations Inc", type: "note", subject: "Payment reminder", notes: "Sent friendly reminder about pending invoice INV-2024-002.", scheduledFor: null, completed: 1, createdBy: "3", createdAt: new Date("2024-10-25") },
  { id: "6", leadId: "1", clientId: null, leadName: "Acme Corporation", type: "call", subject: "Pricing discussion", notes: "Discussed volume discounts and payment terms.", scheduledFor: new Date("2024-10-28"), completed: 0, createdBy: "3", createdAt: new Date("2024-10-26") },
];

const typeIcons: Record<CallType, typeof Phone> = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  note: MessageSquare,
};

const typeColors: Record<CallType, string> = {
  call: "bg-chart-1 text-white",
  email: "bg-chart-2 text-white",
  meeting: "bg-chart-4 text-white",
  note: "bg-muted text-muted-foreground",
};

export default function Followups() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPending, setShowPending] = useState(false);

  const filteredLogs = mockCallLogs.filter(log => {
    const matchesSearch = log.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.leadName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.clientName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPending = !showPending || log.completed === 0;
    return matchesSearch && matchesPending;
  });

  const upcomingCount = mockCallLogs.filter(log => log.completed === 0 && log.scheduledFor).length;
  const completedCount = mockCallLogs.filter(log => log.completed === 1).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Follow-ups & Call Logs</h1>
          <p className="text-muted-foreground mt-1">
            Track communication history and schedule follow-ups
          </p>
        </div>
        <Button data-testid="button-add-followup">
          <Plus className="h-4 w-4 mr-2" />
          Log Activity
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Calendar className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingCount}</div>
            <p className="text-xs text-muted-foreground mt-1">Scheduled follow-ups</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground mt-1">This month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Calls</CardTitle>
            <Phone className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCallLogs.filter(log => log.type === "call").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Phone calls logged</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings</CardTitle>
            <Calendar className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockCallLogs.filter(log => log.type === "meeting").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Meetings scheduled</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Activity Log</CardTitle>
          <CardDescription>
            {filteredLogs.length} activit{filteredLogs.length !== 1 ? "ies" : "y"} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by subject, lead, or client..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                data-testid="input-search-followups"
              />
            </div>
            <Button
              variant={showPending ? "default" : "outline"}
              onClick={() => setShowPending(!showPending)}
              data-testid="button-filter-pending"
            >
              {showPending ? "Show All" : "Pending Only"}
            </Button>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Lead/Client</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead>Scheduled</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No activities found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => {
                    const Icon = typeIcons[log.type];
                    return (
                      <TableRow key={log.id} data-testid={`followup-row-${log.id}`}>
                        <TableCell>
                          <Badge className={typeColors[log.type]} data-testid={`badge-type-${log.id}`}>
                            <Icon className="h-3 w-3 mr-1" />
                            {log.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{log.subject}</TableCell>
                        <TableCell>{log.leadName || log.clientName || "N/A"}</TableCell>
                        <TableCell className="max-w-[250px] truncate text-sm text-muted-foreground">
                          {log.notes}
                        </TableCell>
                        <TableCell>
                          {log.scheduledFor ? new Date(log.scheduledFor).toLocaleDateString() : "-"}
                        </TableCell>
                        <TableCell>
                          {log.completed === 1 ? (
                            <Badge className="bg-chart-2 text-white">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Done
                            </Badge>
                          ) : (
                            <Badge className="bg-chart-4 text-white">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" data-testid={`button-view-${log.id}`}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {log.completed === 0 && (
                              <Button variant="ghost" size="icon" className="text-chart-2" data-testid={`button-complete-${log.id}`}>
                                <CheckCircle2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
