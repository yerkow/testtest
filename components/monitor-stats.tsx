'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Monitor } from '@/lib/types'
import { AlertCircle, ArrowUpRight, CheckCircle, Clock } from 'lucide-react'

interface MonitorStatsProps {
    monitors: Monitor[]
}

export function MonitorStats({ monitors }: MonitorStatsProps) {
    // Calculate stats
    const totalMonitors = monitors.length
    const upMonitors = monitors.filter(m => m.status === 'up').length
    const downMonitors = monitors.filter(m => m.status === 'down').length
    const checkingMonitors = monitors.filter(m => m.status === 'pending').length

    // Calculate uptime percentage
    const uptimePercentage = totalMonitors > 0 ? Math.round((upMonitors / totalMonitors) * 100) : 0

    // Calculate average response time
    const responseTimes = monitors.filter(m => m.status === 'up' && m.response_time).map(m => m.response_time as number)

    const avgResponseTime =
        responseTimes.length > 0
            ? Math.round(responseTimes.reduce((sum, time) => sum + time, 0) / responseTimes.length)
            : 0

    return (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Monitors</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{totalMonitors}</div>
                    <p className="text-xs text-muted-foreground">
                        {checkingMonitors > 0 && `${checkingMonitors} currently checking`}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Uptime</CardTitle>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{uptimePercentage}%</div>
                    <p className="text-xs text-muted-foreground">
                        {upMonitors} of {totalMonitors} monitors online
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Downtime</CardTitle>
                    <AlertCircle className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{downMonitors}</div>
                    <p className="text-xs text-muted-foreground">
                        {downMonitors > 0 ? 'Monitors currently down' : 'All monitors are up'}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Avg. Response Time</CardTitle>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{avgResponseTime > 0 ? `${avgResponseTime}ms` : 'N/A'}</div>
                    <p className="text-xs text-muted-foreground">
                        {responseTimes.length > 0 ? `Based on ${responseTimes.length} monitors` : 'No data available'}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
