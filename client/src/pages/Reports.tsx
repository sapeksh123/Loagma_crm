import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import { DollarSign, Users, TrendingUp, FileText } from "lucide-react";

export default function Reports() {
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Revenue',
        data: [45000, 52000, 48000, 61000, 58000, 67000, 71000, 69000, 75000, 82000],
        borderColor: 'hsl(217, 91%, 52%)',
        backgroundColor: 'hsla(217, 91%, 52%, 0.1)',
        tension: 0.4,
      },
    ],
  };

  const leadSourceData = {
    labels: ['Website', 'Referral', 'Cold Call', 'Social Media', 'Trade Show'],
    datasets: [
      {
        label: 'Lead Sources',
        data: [35, 25, 15, 20, 5],
        backgroundColor: [
          'hsl(217, 91%, 52%)',
          'hsl(142, 76%, 36%)',
          'hsl(32, 95%, 48%)',
          'hsl(262, 83%, 58%)',
          'hsl(340, 82%, 52%)',
        ],
      },
    ],
  };

  const conversionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Leads',
        data: [45, 52, 48, 61, 58, 67, 71, 69, 75, 82],
        backgroundColor: 'hsl(217, 91%, 52%)',
      },
      {
        label: 'Conversions',
        data: [12, 15, 13, 18, 16, 22, 24, 21, 26, 28],
        backgroundColor: 'hsl(142, 76%, 36%)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
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

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom' as const,
      },
    },
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Business insights and performance metrics
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$658,000</div>
            <p className="text-xs text-muted-foreground mt-1">
              <TrendingUp className="h-3 w-3 inline mr-1 text-chart-2" />
              <span className="text-chart-2">+18.2%</span> from last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-chart-2" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">34.2%</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-chart-2">+4.1%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
            <Users className="h-4 w-4 text-chart-1" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-chart-2">+12</span> new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Deal Size</CardTitle>
            <FileText className="h-4 w-4 text-chart-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$7,563</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-chart-2">+8.4%</span> from last quarter
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue" data-testid="tab-revenue">Revenue</TabsTrigger>
          <TabsTrigger value="leads" data-testid="tab-leads">Leads</TabsTrigger>
          <TabsTrigger value="conversion" data-testid="tab-conversion">Conversion</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the past 10 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Line data={salesData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leads" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Lead Sources</CardTitle>
                <CardDescription>Distribution of lead acquisition channels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[350px]">
                  <Doughnut data={leadSourceData} options={doughnutOptions} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Lead Source Performance</CardTitle>
                <CardDescription>Number of leads by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'hsl(217, 91%, 52%)' }} />
                      <span className="text-sm">Website</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">35 leads</span>
                      <span className="text-xs text-muted-foreground">35%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'hsl(142, 76%, 36%)' }} />
                      <span className="text-sm">Referral</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">25 leads</span>
                      <span className="text-xs text-muted-foreground">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'hsl(262, 83%, 58%)' }} />
                      <span className="text-sm">Social Media</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">20 leads</span>
                      <span className="text-xs text-muted-foreground">20%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'hsl(32, 95%, 48%)' }} />
                      <span className="text-sm">Cold Call</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">15 leads</span>
                      <span className="text-xs text-muted-foreground">15%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full" style={{ backgroundColor: 'hsl(340, 82%, 52%)' }} />
                      <span className="text-sm">Trade Show</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">5 leads</span>
                      <span className="text-xs text-muted-foreground">5%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="conversion" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Lead Conversion Funnel</CardTitle>
              <CardDescription>Comparison of leads vs conversions over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Bar data={conversionData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
