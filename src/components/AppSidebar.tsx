import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  FileText,
  Receipt,
  CreditCard,
  Wrench,
  Phone,
  BarChart3,
  Settings,
  ChevronUp,
  LogOut,
  User,
} from "lucide-react";

export function AppSidebar() {
  const { user, logout } = useAuth();
  const [location, setLocation] = useLocation();

  if (!user) return null;

  // ----------------------------
  // Navigation Configuration by Role
  // ----------------------------
  const navigation = {
    admin: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Leads", icon: UserPlus, path: "/leads" },
      { label: "Clients", icon: Users, path: "/clients" },
      { label: "Quotations", icon: FileText, path: "/quotations" },
      { label: "Invoices", icon: Receipt, path: "/invoices" },
      { label: "Payments", icon: CreditCard, path: "/payments" },
      { label: "Service Tickets", icon: Wrench, path: "/tickets" },
      { label: "Reports", icon: BarChart3, path: "/reports" },
    ],
    sales_manager: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Leads", icon: UserPlus, path: "/leads" },
      { label: "Clients", icon: Users, path: "/clients" },
      { label: "Quotations", icon: FileText, path: "/quotations" },
      { label: "Follow-ups", icon: Phone, path: "/followups" },
      { label: "Reports", icon: BarChart3, path: "/reports" },
    ],
    sales_executive: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "My Leads", icon: UserPlus, path: "/leads" },
      { label: "Quotations", icon: FileText, path: "/quotations" },
      { label: "Follow-ups", icon: Phone, path: "/followups" },
    ],
    accountant: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Quotations", icon: FileText, path: "/quotations" },
      { label: "Invoices", icon: Receipt, path: "/invoices" },
      { label: "Payments", icon: CreditCard, path: "/payments" },
      { label: "Reports", icon: BarChart3, path: "/reports" },
    ],
    engineer: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "My Tickets", icon: Wrench, path: "/tickets" },
    ],
    client: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/dashboard" },
      { label: "Quotations", icon: FileText, path: "/quotations" },
      { label: "Invoices", icon: Receipt, path: "/invoices" },
      { label: "Service Requests", icon: Wrench, path: "/tickets" },
    ],
  };

  const menuItems = navigation[user.role] || navigation.admin;

  // ----------------------------
  // Render Sidebar
  // ----------------------------
  return (
    <Sidebar>
      {/* ---------- Header ---------- */}
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <div className="flex justify-center items-center">
          <div className="flex flex-col items-center text-center">
            <img
              src="/image.png"
              alt="App Logo"
              width={100}
              height={100}
              className="rounded-xl object-contain drop-shadow-md"
            />
            <p className="mt-2 text-sm font-medium text-muted-foreground">
              CRM + Accounting
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* ---------- Main Navigation ---------- */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const isActive = location === item.path;

                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton
                      onClick={() => setLocation(item.path)}
                      isActive={isActive}
                      data-testid={`nav-${item.path.replace("/", "")}`}
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* ---------- Footer / User Menu ---------- */}
      <SidebarFooter className="border-t border-sidebar-border p-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="w-full flex items-center gap-3 rounded-md px-3 py-2 hover:bg-accent/10 transition-colors"
              data-testid="button-user-menu"
            >
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>

              <div className="flex-1 text-left min-w-0">
                <p className="text-sm font-medium truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {user.email}
                </p>
              </div>

              <ChevronUp className="h-4 w-4 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem
              onClick={() => setLocation("/settings")}
              data-testid="menu-settings"
            >
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logout} data-testid="menu-logout">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
