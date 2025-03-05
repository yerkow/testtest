'use client'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Activity, CheckCircle, Clock, Server, XCircle } from 'lucide-react'
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

// Mock data for the dashboard
const data = [
    { name: '00:00', responseTime: 120 },
    { name: '02:00', responseTime: 132 },
    { name: '04:00', responseTime: 100 },
    { name: '06:00', responseTime: 134 },
    { name: '08:00', responseTime: 192 },
    { name: '10:00', responseTime: 176 },
    { name: '12:00', responseTime: 129 },
    { name: '14:00', responseTime: 142 },
    { name: '16:00', responseTime: 151 },
    { name: '18:00', responseTime: 122 },
    { name: '20:00', responseTime: 119 },
    { name: '22:00', responseTime: 105 }
]

const monitors = [
    { id: 1, name: 'Main Website', url: 'https://example.com', status: 'up', uptime: 99.98, responseTime: 132 },
    { id: 2, name: 'API Server', url: 'https://api.example.com', status: 'up', uptime: 99.95, responseTime: 89 },
    { id: 3, name: 'Database Server', url: 'db.example.com:5432', status: 'up', uptime: 100, responseTime: 45 },
    {
        id: 4,
        name: 'Payment Gateway',
        url: 'https://payments.example.com',
        status: 'down',
        uptime: 98.72,
        responseTime: 0
    },
    { id: 5, name: 'Admin Dashboard', url: 'https://admin.example.com', status: 'up', uptime: 99.87, responseTime: 156 }
]

export default function DashboardPage() {
    return (
        <DashboardLayout>
            <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Last updated: Just now</span>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Monitors</CardTitle>
                            <Server className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">+1 from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                            <Activity className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">99.7%</div>
                            <p className="text-xs text-muted-foreground">+0.2% from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">124ms</div>
                            <p className="text-xs text-muted-foreground">-12ms from last month</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Incidents</CardTitle>
                            <XCircle className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1</div>
                            <p className="text-xs text-muted-foreground">-3 from last month</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                        <TabsTrigger value="reports">Reports</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Response Time</CardTitle>
                                    <CardDescription>Average response time over the last 24 hours</CardDescription>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <ResponsiveContainer width="100%" height={350}>
                                        <LineChart data={data}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="name" />
                                            <YAxis />
                                            <Tooltip />
                                            <Legend />
                                            <Line
                                                type="monotone"
                                                dataKey="responseTime"
                                                stroke="hsl(var(--chart-1))"
                                                strokeWidth={2}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Monitor Status</CardTitle>
                                    <CardDescription>Current status of all monitors</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {monitors.map(monitor => (
                                            <div key={monitor.id} className="flex items-center">
                                                <div className="flex items-center gap-2 w-[180px] md:w-[200px]">
                                                    {monitor.status === 'up' ? (
                                                        <CheckCircle className="h-4 w-4 text-green-500" />
                                                    ) : (
                                                        <XCircle className="h-4 w-4 text-red-500" />
                                                    )}
                                                    <span className="font-medium truncate">{monitor.name}</span>
                                                </div>
                                                <div className="ml-auto flex items-center gap-2">
                                                    <span className="text-sm">
                                                        {monitor.status === 'up' ? `${monitor.responseTime}ms` : 'Down'}
                                                    </span>
                                                    <div className="w-[80px] md:w-[100px]">
                                                        <Progress
                                                            value={monitor.uptime}
                                                            className={
                                                                monitor.status === 'up'
                                                                    ? 'bg-muted'
                                                                    : 'bg-red-100 dark:bg-red-900/20'
                                                            }
                                                        />
                                                    </div>
                                                    <span className="text-sm w-[40px] text-right">
                                                        {monitor.uptime}%
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="analytics" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Analytics</CardTitle>
                                <CardDescription>Detailed analytics will be displayed here.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px] flex items-center justify-center border rounded-md">
                                    <p className="text-muted-foreground">Analytics content will be displayed here.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="reports" className="space-y-4">
                        <Card>
                            <CardHeader>
                                <CardTitle>Reports</CardTitle>
                                <CardDescription>Generated reports will be displayed here.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="h-[400px] flex items-center justify-center border rounded-md">
                                    <p className="text-muted-foreground">Reports content will be displayed here.</p>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}
