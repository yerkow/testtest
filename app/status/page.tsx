import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// Mock data for status page
const services = [
  { id: 1, name: 'Website', status: 'operational', uptime: '99.98%' },
  { id: 2, name: 'API', status: 'operational', uptime: '99.95%' },
  { id: 3, name: 'Database', status: 'operational', uptime: '100%' },
  { id: 4, name: 'Payment Processing', status: 'degraded', uptime: '98.72%' },
  { id: 5, name: 'Admin Dashboard', status: 'operational', uptime: '99.87%' },
];

const incidents = [
  {
    id: 1,
    title: 'Payment Processing Degraded Performance',
    status: 'investigating',
    date: 'May 15, 2025 - 10:23 AM',
    updates: [
      {
        id: 1,
        status: 'investigating',
        message: 'We are investigating reports of slow payment processing.',
        timestamp: '10:23 AM',
      },
      {
        id: 2,
        status: 'identified',
        message: 'The issue has been identified as a database connection problem.',
        timestamp: '10:45 AM',
      },
    ],
  },
];

const pastIncidents = [
  {
    id: 2,
    title: 'API Server Outage',
    status: 'resolved',
    date: 'May 10, 2025',
    duration: '23 minutes',
  },
  {
    id: 3,
    title: 'Database Maintenance',
    status: 'resolved',
    date: 'May 5, 2025',
    duration: '45 minutes',
  },
];

export default function StatusPage() {
  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Status Page</h2>
          <Button>Customize Status Page</Button>
        </div>
        
        <Tabs defaultValue="preview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="space-y-4">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">System Status</CardTitle>
                    <CardDescription>Current status of all systems</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Updated 2 minutes ago</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg bg-card">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <h3 className="font-semibold text-lg">All Systems Operational</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        All systems are operating normally. If you're experiencing issues, please contact support.
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg bg-card">
                      <h3 className="font-semibold text-lg mb-2">Uptime Last 30 Days</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Overall</p>
                          <p className="text-2xl font-bold">99.9%</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">API</p>
                          <p className="text-2xl font-bold">99.95%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Services</h3>
                    <div className="space-y-2">
                      {services.map((service) => (
                        <div key={service.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="font-medium">{service.name}</div>
                          <div className="flex items-center gap-4">
                            <div className="text-sm text-muted-foreground">
                              {service.uptime} uptime
                            </div>
                            {service.status === 'operational' ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Operational
                              </Badge>
                            ) : service.status === 'degraded' ? (
                              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800">
                                <Clock className="h-3 w-3 mr-1" />
                                Degraded
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">
                                <XCircle className="h-3 w-3 mr-1" />
                                Outage
                              </Badge>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Current Incidents</h3>
                    {incidents.length === 0 ? (
                      <div className="p-4 border rounded-lg bg-card text-center">
                        <p className="text-muted-foreground">No active incidents</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {incidents.map((incident) => (
                          <div key={incident.id} className="border rounded-lg overflow-hidden">
                            <div className="p-4 bg-muted">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{incident.title}</h4>
                                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-950 dark:text-yellow-300 dark:border-yellow-800">
                                  Investigating
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{incident.date}</p>
                            </div>
                            <div className="p-4 space-y-4">
                              {incident.updates.map((update) => (
                                <div key={update.id} className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className="capitalize">
                                      {update.status}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">{update.timestamp}</span>
                                  </div>
                                  <p className="text-sm">{update.message}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-semibold text-lg">Past Incidents</h3>
                    {pastIncidents.length === 0 ? (
                      <div className="p-4 border rounded-lg bg-card text-center">
                        <p className="text-muted-foreground">No past incidents</p>
                      </div>
                    ) : (
                      <div className="border rounded-lg divide-y">
                        {pastIncidents.map((incident) => (
                          <div key={incident.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">{incident.title}</h4>
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                                Resolved
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-1">
                              <p className="text-sm text-muted-foreground">{incident.date}</p>
                              <p className="text-sm text-muted-foreground">Duration: {incident.duration}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Status Page Settings</CardTitle>
                <CardDescription>
                  Configure your public status page
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Status Page URL</h3>
                  <div className="flex items-center gap-2">
                    <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm">
                      https://status.example.com
                    </code>
                    <Button variant="outline" size="sm">Copy</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Appearance</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize the look and feel of your status page
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <Button variant="outline">Customize Logo</Button>
                    <Button variant="outline">Change Colors</Button>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Services Display</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose which services to display on your status page
                  </p>
                  <div className="mt-2">
                    <Button>Configure Services</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}