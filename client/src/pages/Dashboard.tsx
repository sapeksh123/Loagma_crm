import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  UserPlus, 
  Users, 
  FileText, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Receipt,
  Wrench,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard() {
  const { user } = useAuth();

  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue',
        data: [45000, 52000, 48000, 61000, 58000, 67000],
        borderColor: 'hsl(217, 91%, 52%)',
        backgroundColor: 'hsla(217, 91%, 52%, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const leadConversionData = {
    labels: ['New', 'In Progress', 'Converted', 'Lost'],
    datasets: [
      {
        label: 'Leads',
        data: [45, 32, 28, 15],
        backgroundColor: [
          'hsl(217, 91%, 52%)',
          'hsl(32, 95%, 48%)',
          'hsl(142, 76%, 36%)',
          'hsl(0, 84%, 42%)',
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'hsl(210, 8%, 88%)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const stats = {
    admin: [
      { title: "Total Leads", value: "120", change: "+12.5%", trend: "up", icon: UserPlus, color: "text-chart-1" },
      { title: "Active Clients", value: "87", change: "+8.2%", trend: "up", icon: Users, color: "text-chart-2" },
      { title: "Revenue (MTD)", value: "$67,450", change: "+15.3%", trend: "up", icon: DollarSign, color: "text-chart-2" },
      { title: "Open Tickets", value: "24", change: "-5.1%", trend: "down", icon: Wrench, color: "text-chart-4" },
    ],
    sales_manager: [
      { title: "Total Leads", value: "120", change: "+12.5%", trend: "up", icon: UserPlus, color: "text-chart-1" },
      { title: "Conversions", value: "28", change: "+18.5%", trend: "up", icon: CheckCircle2, color: "text-chart-2" },
      { title: "Pending Quotes", value: "15", change: "+3", trend: "up", icon: FileText, color: "text-chart-4" },
      { title: "Team Performance", value: "92%", change: "+4.2%", trend: "up", icon: TrendingUp, color: "text-chart-2" },
    ],
    sales_executive: [
      { title: "My Leads", value: "32", change: "+5", trend: "up", icon: UserPlus, color: "text-chart-1" },
      { title: "Follow-ups Today", value: "8", change: "Due", trend: "neutral", icon: Clock, color: "text-chart-4" },
      { title: "Quotations Sent", value: "12", change: "+2", trend: "up", icon: FileText, color: "text-chart-1" },
      { title: "Conversion Rate", value: "24%", change: "+3.1%", trend: "up", icon: TrendingUp, color: "text-chart-2" },
    ],
    accountant: [
      { title: "Total Invoices", value: "156", change: "+18", trend: "up", icon: Receipt, color: "text-chart-1" },
      { title: "Outstanding", value: "$42,300", change: "-$5.2k", trend: "down", icon: AlertCircle, color: "text-chart-4" },
      { title: "Paid (MTD)", value: "$67,450", change: "+15.3%", trend: "up", icon: DollarSign, color: "text-chart-2" },
      { title: "Overdue", value: "8", change: "-2", trend: "down", icon: AlertCircle, color: "text-chart-5" },
    ],
    engineer: [
      { title: "Assigned Tickets", value: "12", change: "+3", trend: "up", icon: Wrench, color: "text-chart-1" },
      { title: "In Progress", value: "5", change: "Active", trend: "neutral", icon: Clock, color: "text-chart-4" },
      { title: "Resolved Today", value: "4", change: "+2", trend: "up", icon: CheckCircle2, color: "text-chart-2" },
      { title: "Pending", value: "7", change: "+1", trend: "up", icon: AlertCircle, color: "text-chart-4" },
    ],
    client: [
      { title: "Active Quotes", value: "3", change: "Pending", trend: "neutral", icon: FileText, color: "text-chart-1" },
      { title: "Invoices", value: "8", change: "2 Unpaid", trend: "neutral", icon: Receipt, color: "text-chart-4" },
      { title: "Open Tickets", value: "2", change: "In Progress", trend: "neutral", icon: Wrench, color: "text-chart-4" },
      { title: "Total Spent", value: "$24,560", change: "YTD", trend: "neutral", icon: DollarSign, color: "text-chart-1" },
    ],
  };

  const roleStats = stats[user?.role || "admin"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back, {user?.fullName}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {roleStats.map((stat, index) => {
          const Icon = stat.icon;
          const isPositive = stat.trend === "up";
          const isNegative = stat.trend === "down";
          
          return (
            <Card key={index} data-testid={`stat-card-${index}`}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" data-testid={`stat-value-${index}`}>{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  {isPositive && <TrendingUp className="h-3 w-3 text-chart-2" />}
                  {isNegative && <TrendingDown className="h-3 w-3 text-chart-5" />}
                  <span className={isPositive ? "text-chart-2" : isNegative ? "text-chart-5" : ""}>
                    {stat.change}
                  </span>
                  <span className="text-muted-foreground">from last month</span>
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {(user?.role === "admin" || user?.role === "sales_manager" || user?.role === "accountant") && (
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Line data={revenueData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Lead Distribution</CardTitle>
              <CardDescription>Current status of all leads</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <Bar data={leadConversionData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and actions in the system</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { action: "New lead created", detail: "Acme Corp - Software Solution", time: "2 hours ago", type: "lead" },
              { action: "Invoice paid", detail: "INV-2024-156 - $12,450", time: "3 hours ago", type: "payment" },
              { action: "Quotation approved", detail: "QUO-2024-089 - Tech Industries", time: "5 hours ago", type: "quote" },
              { action: "Service ticket resolved", detail: "TKT-445 - Network Issue", time: "1 day ago", type: "ticket" },
              { action: "New client onboarded", detail: "Global Solutions Ltd", time: "2 days ago", type: "client" },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-0 last:pb-0" data-testid={`activity-${index}`}>
                <div className="h-2 w-2 rounded-full bg-primary mt-2" />
                <div className="flex-1 space-y-1 min-w-0">
                  <p className="text-sm font-medium">{activity.action}</p>
                  <p className="text-sm text-muted-foreground truncate">{activity.detail}</p>
                </div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
