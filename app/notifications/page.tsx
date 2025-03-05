"use client";

import { useState } from "react";
import { DashboardLayout } from "@/components/layout/dashboard-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
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
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Plus, 
  Trash2, 
  Settings, 
  Slack, 
  Globe 
} from "lucide-react";

// Mock data for notification channels
const notificationChannels = [
  { 
    id: 1, 
    name: 'Admin Email', 
    type: 'email', 
    target: 'admin@example.com', 
    enabled: true,
    events: ['down', 'up', 'certificate']
  },
  { 
    id: 2, 
    name: 'Tech Team Slack', 
    type: 'slack', 
    target: '#monitoring', 
    enabled: true,
    events: ['down', 'up']
  },
  { 
    id: 3, 
    name: 'Status Webhook', 
    type: 'webhook', 
    target: 'https://hooks.example.com/status', 
    enabled: false,
    events: ['down', 'up', 'certificate', 'maintenance']
  },
  { 
    id: 4, 
    name: 'Discord Alerts', 
    type: 'discord', 
    target: '#alerts', 
    enabled: true,
    events: ['down']
  },
];

export default function NotificationsPage() {
  const [channels, setChannels] = useState(notificationChannels);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const handleToggleChannel = (id) => {
    setChannels(channels.map(channel => 
      channel.id === id ? { ...channel, enabled: !channel.enabled } : channel
    ));
  };

  const handleAddChannel = (e) => {
    e.preventDefault();
    // In a real app, this would add the channel to the database
    setIsAddDialogOpen(false);
  };

  return (
    <DashboardLayout>
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Notifications</h2>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Channel
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleAddChannel}>
                <DialogHeader>
                  <DialogTitle>Add Notification Channel</DialogTitle>
                  <DialogDescription>
                    Create a new notification channel to receive alerts.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      placeholder="Team Email"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="type" className="text-right">
                      Type
                    </Label>
                    <Select defaultValue="email">
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="slack">Slack</SelectItem>
                        <SelectItem value="discord">Discord</SelectItem>
                        <SelectItem value="webhook">Webhook</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="target" className="text-right">
                      Target
                    </Label>
                    <Input
                      id="target"
                      placeholder="email@example.com"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">
                      Events
                    </Label>
                    <div className="col-span-3 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch id="down" defaultChecked />
                        <Label htmlFor="down">Down alerts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="up" defaultChecked />
                        <Label htmlFor="up">Up alerts</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch id="certificate" />
                        <Label htmlFor="certificate">Certificate expiry</Label>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Add Channel</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        <Tabs defaultValue="channels" className="space-y-4">
          <TabsList>
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          <TabsContent value="channels" className="space-y-4">
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type </TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead>Events</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {channels.map((channel) => (
                    <TableRow key={channel.id}>
                      <TableCell>
                        {channel.type === 'email' && <Mail className="h-4 w-4 text-muted-foreground" />}
                        {channel.type === 'slack' && <Slack className="h-4 w-4 text-muted-foreground" />}
                        {channel.type === 'webhook' && <Globe className="h-4 w-4 text-muted-foreground" />}
                        {channel.type === 'discord' && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                      </TableCell>
                      <TableCell className="font-medium">{channel.name}</TableCell>
                      <TableCell className="capitalize">{channel.type}</TableCell>
                      <TableCell className="font-mono text-xs">{channel.target}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {channel.events.includes('down') && (
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Down
                            </span>
                          )}
                          {channel.events.includes('up') && (
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Up
                            </span>
                          )}
                          {channel.events.includes('certificate') && (
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Certificate
                            </span>
                          )}
                          {channel.events.includes('maintenance') && (
                            <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                              Maintenance
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch 
                          checked={channel.enabled} 
                          onCheckedChange={() => handleToggleChannel(channel.id)}
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon">
                            <Settings className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Configure global notification settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Alert Thresholds</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="down-threshold">Down Alert Threshold</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="down-threshold">
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">After 1 check</SelectItem>
                          <SelectItem value="2">After 2 checks</SelectItem>
                          <SelectItem value="3">After 3 checks</SelectItem>
                          <SelectItem value="5">After 5 checks</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Number of consecutive failed checks before sending a down alert
                      </p>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="up-threshold">Up Alert Threshold</Label>
                      <Select defaultValue="1">
                        <SelectTrigger id="up-threshold">
                          <SelectValue placeholder="Select threshold" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">After 1 check</SelectItem>
                          <SelectItem value="2">After 2 checks</SelectItem>
                          <SelectItem value="3">After 3 checks</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Number of consecutive successful checks before sending an up alert
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Notification Schedule</h3>
                  <div className="flex items-center space-x-2">
                    <Switch id="quiet-hours" />
                    <Label htmlFor="quiet-hours">Enable quiet hours</Label>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    <div className="space-y-2">
                      <Label htmlFor="start-time">Start Time</Label>
                      <Input type="time" id="start-time" defaultValue="22:00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-time">End Time</Label>
                      <Input type="time" id="end-time" defaultValue="08:00" />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    During quiet hours, only critical alerts will be sent
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification History</CardTitle>
                <CardDescription>
                  Recent notifications sent from the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Monitor</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Channel</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>May 15, 2025 10:23 AM</TableCell>
                        <TableCell>Payment Gateway</TableCell>
                        <TableCell>Down</TableCell>
                        <TableCell>Admin Email, Tech Team Slack</TableCell>
                        <TableCell>Delivered</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 10, 2025 3:45 PM</TableCell>
                        <TableCell>API Server</TableCell>
                        <TableCell>Down</TableCell>
                        <TableCell>Admin Email, Tech Team Slack, Discord Alerts</TableCell>
                        <TableCell>Delivered</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 10, 2025 4:08 PM</TableCell>
                        <TableCell>API Server</TableCell>
                        <TableCell>Up</TableCell>
                        <TableCell>Admin Email, Tech Team Slack</TableCell>
                        <TableCell>Delivered</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>May 5, 2025 9:15 AM</TableCell>
                        <TableCell>Main Website</TableCell>
                        <TableCell>Certificate Expiry</TableCell>
                        <TableCell>Admin Email</TableCell>
                        <TableCell>Delivered</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}