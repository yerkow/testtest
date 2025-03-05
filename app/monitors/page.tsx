"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  Plus, 
  Search, 
  Settings, 
  Trash2, 
  XCircle 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for monitors
const mockMonitors = [
  { 
    id: 1, 
    name: 'Main Website', 
    url: 'https://example.com', 
    type: 'http', 
    interval: 60, 
    status: 'up', 
    lastChecked: '2 minutes ago',
    uptime: 99.98, 
    responseTime: 132 
  },
  { 
    id: 2, 
    name: 'API Server', 
    url: 'https://api.example.com', 
    type: 'http', 
    interval: 30, 
    status: 'up', 
    lastChecked: '1 minute ago',
    uptime: 99.95, 
    responseTime: 89 
  },
  { 
    id: 3, 
    name: 'Database Server', 
    url: 'db.example.com', 
    type: 'tcp', 
    interval: 60, 
    port: 5432,
    status: 'up', 
    lastChecked: '1 minute ago',
    uptime: 100, 
    responseTime: 45 
  },
  { 
    id: 4, 
    name: 'Payment Gateway', 
    url: 'https://payments.example.com', 
    type: 'http', 
    interval: 30, 
    status: 'down', 
    lastChecked: '3 minutes ago',
    uptime: 98.72, 
    responseTime: 0 
  },
  { 
    id: 5, 
    name: 'Admin Dashboard', 
    url: 'https://admin.example.com', 
    type: 'http', 
    interval: 60, 
    status: 'up', 
    lastChecked: '2 minutes ago',
    uptime: 99.87, 
    responseTime: 156 
  },
];

export default function MonitorsPage() {
  const [monitors, setMonitors] = useState(mockMonitors);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredMonitors = monitors.filter(monitor => 
    monitor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    monitor.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddMonitor = (e) => {
    e.preventDefault();
    // In a real app, this would add the monitor to the database
    setIsAddDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Monitors</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Monitor
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleAddMonitor}>
                <DialogHeader>
                  <DialogTitle>Add New Monitor</DialogTitle>
                  <DialogDescription>
                    Create a new monitor to track the uptime of your service.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="My Website"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="url" className="text-right">
                      URL
                    </Label>
                    <Input
                      id="url"
                      placeholder="https://example.com"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select defaultValue="http">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="http">HTTP(S)</SelectItem>
                        <SelectItem value="ping">Ping</SelectItem>
                        <SelectItem value="tcp">TCP Port</SelectItem>
                        <SelectItem value="keyword">Keyword</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="interval" className="text-right">
                      Check Interval
                    </Label>
                    <Select defaultValue="60">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select interval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30 seconds</SelectItem>
                        <SelectItem value="60">1 minute</SelectItem>
                        <SelectItem value="300">5 minutes</SelectItem>
                        <SelectItem value="600">10 minutes</SelectItem>
                        <SelectItem value="1800">30 minutes</SelectItem>
                        <SelectItem value="3600">1 hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Monitor</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search monitors..."
            className="max-w-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Monitors</TabsTrigger>
            <TabsTrigger value="up">Up</TabsTrigger>
            <TabsTrigger value="down">Down</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <MonitorTable monitors={filteredMonitors} />
          </TabsContent>
          <TabsContent value="up">
            <MonitorTable monitors={filteredMonitors.filter(m => m.status === 'up')} />
          </TabsContent>
          <TabsContent value="down">
            <MonitorTable monitors={filteredMonitors.filter(m => m.status === 'down')} />
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}

function MonitorTable({ monitors }) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>URL</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Uptime</TableHead>
            <TableHead>Response Time</TableHead>
            <TableHead>Last Checked</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monitors.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                No monitors found.
              </TableCell>
            </TableRow>
          ) : (
            monitors.map((monitor) => (
              <TableRow key={monitor.id}>
                <TableCell className="font-medium">{monitor.name}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground truncate max-w-[200px]">
                      {monitor.url}
                      {monitor.port ? `:${monitor.port}` : ''}
                    </span>
                    <a 
                      href={monitor.type === 'http' ? monitor.url : `#`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={monitor.type !== 'http' ? 'pointer-events-none opacity-50' : ''}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </TableCell>
                <TableCell>
                  {monitor.status === 'up' ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Up
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">
                      <XCircle className="h-3 w-3 mr-1" />
                      Down
                    </Badge>
                  )}
                </TableCell>
                <TableCell>{monitor.uptime}%</TableCell>
                <TableCell>
                  {monitor.status === 'up' ? `${monitor.responseTime}ms` : '-'}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">{monitor.lastChecked}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon">
                      <Activity className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}