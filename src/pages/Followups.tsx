import { useState, useMemo } from "react";
import { mockDataService, type CallType } from "@/services/mockData";
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

const typeIcons: Record<CallType, typeof Phone> = {
  outgoing: Phone,
  incoming: Mail,
};

const typeColors: Record<CallType, string> = {
  outgoing: "bg-chart-1 text-white",
  incoming: "bg-chart-2 text-white",
};

export default function Followups() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showPending, setShowPending] = useState(false);

  const allLogs = useMemo(() => mockDataService.getCallLogs(), []);

  const filteredLogs = allLogs.filter(log => {
    const matchesSearch = log.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.leadName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         log.clientName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPending = !showPending || (log.followUpDate && new Date(log.followUpDate) > new Date());
    return matchesSearch && matchesPending;
  });

  const upcomingCount = allLogs.filter(log => log.followUpDate && new Date(log.followUpDate) > new Date()).length;
  const completedCount = allLogs.filter(log => !log.followUpDate || new Date(log.followUpDate) < new Date()).length;

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
            <CardTitle className="text-sm font-medium">Outgoing</CardTitle>
            <Phone className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allLogs.filter(log => log.callType === "outgoing").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Outgoing calls</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incoming</CardTitle>
            <Calendar className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {allLogs.filter(log => log.callType === "incoming").length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Incoming calls</p>
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
                    const Icon = typeIcons[log.callType];
                    const isPending = log.followUpDate && new Date(log.followUpDate) > new Date();
                    return (
                      <TableRow key={log.id} data-testid={`followup-row-${log.id}`}>
                        <TableCell>
                          <Badge className={typeColors[log.callType]} data-testid={`badge-type-${log.id}`}>
                            <Icon className="h-3 w-3 mr-1" />
                            {log.callType}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-medium">{log.purpose}</TableCell>
                        <TableCell>{log.leadName || log.clientName || "N/A"}</TableCell>
                        <TableCell className="max-w-[250px] truncate text-sm text-muted-foreground">
                          {log.notes}
                        </TableCell>
                        <TableCell>
                          {log.followUpDate ? new Date(log.followUpDate).toLocaleDateString() : "-"}
                        </TableCell>
                        <TableCell>
                          {isPending ? (
                            <Badge className="bg-chart-4 text-white">Pending</Badge>
                          ) : (
                            <Badge className="bg-chart-2 text-white">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Done
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" data-testid={`button-view-${log.id}`}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            {isPending && (
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
