import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";
import Leads from "@/pages/Leads";
import Clients from "@/pages/Clients";
import Quotations from "@/pages/Quotations";
import Invoices from "@/pages/Invoices";
import Payments from "@/pages/Payments";
import ServiceTickets from "@/pages/ServiceTickets";
import Followups from "@/pages/Followups";
import Reports from "@/pages/Reports";
import Settings from "@/pages/Settings";

function ProtectedRoute({ component: Component }: { component: React.ComponentType }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Component />;
}

function Router() {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <Switch>
        <Route path="/" component={Login} />
        <Route>
          <Redirect to="/" />
        </Route>
      </Switch>
    );
  }

  const style = {
    "--sidebar-width": "16rem",
    "--sidebar-width-icon": "3rem",
  };

  return (
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center h-16 px-6 border-b border-border bg-background">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex-1" />
          </header>
          <main className="flex-1 overflow-auto bg-background">
            <div className="container max-w-7xl mx-auto p-6">
              <Switch>
                <Route path="/dashboard">
                  <ProtectedRoute component={Dashboard} />
                </Route>
                <Route path="/leads">
                  <ProtectedRoute component={Leads} />
                </Route>
                <Route path="/clients">
                  <ProtectedRoute component={Clients} />
                </Route>
                <Route path="/quotations">
                  <ProtectedRoute component={Quotations} />
                </Route>
                <Route path="/invoices">
                  <ProtectedRoute component={Invoices} />
                </Route>
                <Route path="/payments">
                  <ProtectedRoute component={Payments} />
                </Route>
                <Route path="/tickets">
                  <ProtectedRoute component={ServiceTickets} />
                </Route>
                <Route path="/followups">
                  <ProtectedRoute component={Followups} />
                </Route>
                <Route path="/reports">
                  <ProtectedRoute component={Reports} />
                </Route>
                <Route path="/settings">
                  <ProtectedRoute component={Settings} />
                </Route>
                <Route>
                  <Redirect to="/dashboard" />
                </Route>
              </Switch>
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
