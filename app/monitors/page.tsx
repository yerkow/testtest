'use client'

import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { MonitorStats } from '@/components/monitor-stats'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Monitor } from '@/lib/types'
import {
  Activity,
  CheckCircle,
  Clock,
  ExternalLink,
  Loader2,
  Plus,
  Search,
  Settings,
  Trash2,
  XCircle
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'; // Если используете sonner для уведомлений

const API_BASE_URL = 'http://localhost:4000/api'

export default function MonitorsPage() {
    const [monitors, setMonitors] = useState<Monitor[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        url: '',
        type: 'http',
        interval: '60',
        port: ''
    })

    // Загрузка мониторов при монтировании компонента
    useEffect(() => {
        fetchMonitors()
    }, [])

    const fetchMonitors = async () => {
        try {
            setLoading(true)
            const response = await fetch(`${API_BASE_URL}/monitors`)
            if (!response.ok) {
                throw new Error('Failed to fetch monitors')
            }
            const data = await response.json()
            setMonitors(data)
        } catch (error) {
            console.error('Error fetching monitors:', error)
            toast?.error('Failed to load monitors')
        } finally {
            setLoading(false)
        }
    }

    const filteredMonitors = monitors.filter(
        monitor =>
            monitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            monitor.url.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const handleAddMonitor = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const payload = {
                name: formData.name,
                url: formData.url,
                type: formData.type,
                interval: parseInt(formData.interval),
                ...(formData.type === 'tcp' && formData.port && { port: parseInt(formData.port) })
            }

            const response = await fetch(`${API_BASE_URL}/monitors`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.error || 'Failed to create monitor')
            }

            // Обновляем список мониторов
            await fetchMonitors()

            // Сбрасываем форму и закрываем диалог
            setFormData({
                name: '',
                url: '',
                type: 'http',
                interval: '60',
                port: ''
            })
            setIsAddDialogOpen(false)

            toast?.success('Monitor created successfully')
        } catch (error) {
            console.error('Error creating monitor:', error)
            toast?.error(error.message || 'Failed to create monitor')
        }
    }

    const handleDeleteMonitor = async (id: number) => {
        if (!confirm('Are you sure you want to delete this monitor?')) {
            return
        }

        try {
            const response = await fetch(`${API_BASE_URL}/monitors/${id}`, {
                method: 'DELETE'
            })

            if (!response.ok) {
                throw new Error('Failed to delete monitor')
            }

            // Обновляем список мониторов
            await fetchMonitors()
            toast?.success('Monitor deleted successfully')
        } catch (error) {
            console.error('Error deleting monitor:', error)
            toast?.error('Failed to delete monitor')
        }
    }

    const handleCheckMonitor = async (id: number) => {
        try {
            const response = await fetch(`${API_BASE_URL}/monitors/${id}/check`, {
                method: 'POST'
            })

            if (!response.ok) {
                throw new Error('Failed to check monitor')
            }

            // Обновляем список мониторов после проверки
            await fetchMonitors()
            toast?.success('Monitor checked successfully')
        } catch (error) {
            console.error('Error checking monitor:', error)
            toast?.error('Failed to check monitor')
        }
    }

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
                    <div className="flex items-center justify-center h-64">
                        <Loader2 className="h-8 w-8 animate-spin" />
                    </div>
                </div>
            </DashboardLayout>
        )
    }

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
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
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
                                            value={formData.url}
                                            onChange={e => setFormData({ ...formData, url: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="type" className="text-right">
                                            Type
                                        </Label>
                                        <Select
                                            value={formData.type}
                                            onValueChange={value => setFormData({ ...formData, type: value })}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="http">HTTP(S)</SelectItem>
                                                <SelectItem value="tcp">TCP Port</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    {formData.type === 'tcp' && (
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="port" className="text-right">
                                                Port
                                            </Label>
                                            <Input
                                                id="port"
                                                placeholder="5432"
                                                type="number"
                                                className="col-span-3"
                                                value={formData.port}
                                                onChange={e => setFormData({ ...formData, port: e.target.value })}
                                                required={formData.type === 'tcp'}
                                            />
                                        </div>
                                    )}
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="interval" className="text-right">
                                            Check Interval
                                        </Label>
                                        <Select
                                            value={formData.interval}
                                            onValueChange={value => setFormData({ ...formData, interval: value })}
                                        >
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
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>

                <MonitorStats monitors={monitors} />
                <Tabs defaultValue="all" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="all">All Monitors</TabsTrigger>
                        <TabsTrigger value="up">Up</TabsTrigger>
                        <TabsTrigger value="down">Down</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                        <MonitorTable
                            monitors={filteredMonitors}
                            onDelete={handleDeleteMonitor}
                            onCheck={handleCheckMonitor}
                        />
                    </TabsContent>
                    <TabsContent value="up">
                        <MonitorTable
                            monitors={filteredMonitors.filter(m => m.status === 'up')}
                            onDelete={handleDeleteMonitor}
                            onCheck={handleCheckMonitor}
                        />
                    </TabsContent>
                    <TabsContent value="down">
                        <MonitorTable
                            monitors={filteredMonitors.filter(m => m.status === 'down')}
                            onDelete={handleDeleteMonitor}
                            onCheck={handleCheckMonitor}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}

interface MonitorTableProps {
    monitors: Monitor[]
    onDelete: (id: number) => void
    onCheck: (id: number) => void
}

function MonitorTable({ monitors, onDelete, onCheck }: MonitorTableProps) {
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
                        monitors.map(monitor => (
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
                                        <Badge
                                            variant="outline"
                                            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800"
                                        >
                                            <CheckCircle className="h-3 w-3 mr-1" />
                                            Up
                                        </Badge>
                                    ) : (
                                        <Badge
                                            variant="outline"
                                            className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800"
                                        >
                                            <XCircle className="h-3 w-3 mr-1" />
                                            Down
                                        </Badge>
                                    )}
                                </TableCell>
                                <TableCell>{monitor.uptime}%</TableCell>
                                <TableCell>{monitor.status === 'up' ? `${monitor.response_time}ms` : '-'}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3 text-muted-foreground" />
                                        <span className="text-muted-foreground">{monitor.last_check}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onCheck(monitor.id)}
                                            title="Check now"
                                        >
                                            <Activity className="h-4 w-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" title="Settings">
                                            <Settings className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDelete(monitor.id)}
                                            title="Delete"
                                        >
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
    )
}
