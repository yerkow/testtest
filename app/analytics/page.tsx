"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock data for analytics
const responseTimeData = [
  { date: 'May 1', avg: 120, min: 89, max: 156 },
  { date: 'May 2', avg: 132, min: 95, max: 178 },
  { date: 'May 3', avg: 100, min: 78, max: 134 },
  { date: 'May 4', avg: 134, min: 92, max: 187 },
  { date: 'May 5', avg: 192, min: 120, max: 245 },
  { date: 'May 6', avg: 176, min: 110, max: 230 },
  { date: 'May 7', avg: 129, min: 88, max: 167 },
  { date: 'May 8', avg: 142, min: 95, max: 189 },
  { date: 'May 9', avg: 151, min: 102, max: 201 },
  { date: 'May 10', avg: 122, min: 85, max: 165 },
  { date: 'May 11', avg: 119, min: 82, max: 158 },
  { date: 'May 12', avg: 105, min: 75, max: 142 },
  { date: 'May 13', avg: 113, min: 80, max: 150 },
  { date: 'May 14', avg: 127, min: 88, max: 172 },
];

const uptimeData = [
  { date: 'May 1', uptime: 100 },
  { date: 'May 2', uptime: 100 },
  { date: 'May 3', uptime: 100 },
  { date: 'May 4', uptime: 99.8 },
  { date: 'May 5', uptime: 100 },
  { date: 'May 6', uptime: 100 },
  { date: 'May 7', uptime: 100 },
  { date: 'May 8', uptime: 100 },
  { date: 'May 9', uptime: 99.9 },
  { date: 'May 10', uptime: 98.5 },
  { date: 'May 11', uptime: 100 },
  { date: 'May 12', uptime: 100 },
  { date: 'May 13', uptime: 100 },
  { date: 'May 14', uptime: 99.7 },
];

const outageData = [
  { name: 'Network Issues', value: 45 },
  { name: 'Server Errors', value: 25 },
  { name: 'Database Problems', value: 20 },
  { name: 'External Dependencies', value: 10 },
];

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))'];

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("14d");
  
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Analytics</h2>
          <div className="flex items-center gap-2">
            <Select defaultValue={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="24h">Last 24 hours</SelectItem>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="14d">Last 14 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="response-time">Response Time</TabsTrigger>
            <TabsTrigger value="uptime">Uptime</TabsTrigger>
            <TabsTrigger value="outages">Outages</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Response Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">127ms</div>
                  <p className="text-xs text-muted-foreground">
                    +2% from previous period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Uptime
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">99.8%</div>
                  <p className="text-xs text-muted-foreground">
                    -0.1% from previous period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Outages
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">
                    +1 from previous period
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Checks
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">28,429</div>
                  <p className="text-xs text-muted-foreground">
                    +4% from previous period
                  </p>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Response Time</CardTitle>
                  <CardDescription>
                    Average response time over the last {timeRange === '24h' ? '24 hours' : timeRange === '7d' ? '7 days' : timeRange === '14d' ? '14 days' : timeRange === '30d' ? '30 days' : '90 days'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={responseTimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="avg" name="Average" stroke="hsl(var(--chart-1))" strokeWidth={2} />
                      <Line type="monotone" dataKey="min" name="Minimum" stroke="hsl(var(--chart-2))" strokeWidth={2} />
                      <Line type="monotone" dataKey="max" name="Maximum" stroke="hsl(var(--chart-3))" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Uptime Percentage</CardTitle>
                  <CardDescription>
                    Daily uptime percentage over the last {timeRange === '24h' ? '24 hours' : timeRange === '7d' ? '7 days' : timeRange === '14d' ? '14 days' : timeRange === '30d' ? '30 days' : '90 days'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={uptimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[98, 100]} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="uptime" name="Uptime %" fill="hsl(var(--chart-2))" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Outage Causes</CardTitle>
                <CardDescription>
                  Distribution of outage causes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                  <ResponsiveContainer width={300} height={300}>
                    <PieChart>
                      <Pie
                        data={outageData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {outageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  <div className="space-y-2">
                    {outageData.map((item, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <span className="text-sm">{item.name}: {item.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="response-time" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Response Time Analysis</CardTitle>
                <CardDescription>
                  Detailed response time metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Detailed response time analysis will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="uptime" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Uptime Analysis</CardTitle>
                <CardDescription>
                  Detailed uptime metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Detailed uptime analysis will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="outages" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Outage Analysis</CardTitle>
                <CardDescription>
                  Detailed outage metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px] flex items-center justify-center border rounded-md">
                  <p className="text-muted-foreground">Detailed outage analysis will be displayed here.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}