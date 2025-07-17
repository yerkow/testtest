import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { ReactNode, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/chart"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import data from '../data.json'

function formatDate(input: string) {
    const date = new Date(input);

    const pad = (n: number) => n.toString().padStart(2, '0');

    const dd = pad(date.getDate());
    const mm = pad(date.getMonth() + 1); // months are 0-indexed
    const yyyy = date.getFullYear();
    const hh = pad(date.getHours());
    const min = pad(date.getMinutes());

    return ` ${hh}:${min}`;
}
interface StatusDetailsProps {
    id: number
    trigger: ReactNode
    name: string
}
const summaryLabels: Record<string, string> = {
    "current_response": "Current response",
    "avg_response_24h": "Average response (24h)",
    "uptime_24h": "Uptime (24h)",
    "uptime_30d": "Uptime (30d)",
    "uptime_1y": "Uptime (1y)",
    "cert_exp": "Certificate expiration date",
    "cert_exp_days": "Days until certificate expires"
}
export const ShowStatusDetails = ({ id, trigger, name }: StatusDetailsProps) => {

    const statusData = data.monitors.find(monitor => monitor.id === id);
    if (!statusData) return
    console.log(statusData)
    return <Dialog>
        <DialogTrigger>
            {trigger}
        </DialogTrigger>
        <DialogContent className="min-w-[70vw] min-h-[80vh] flex flex-col overflow-auto">
            <DialogHeader>
                <DialogTitle>{name}</DialogTitle>
                <DialogDescription>
                    <div className="text-sm md:text-md">Status details for {name}</div>
                </DialogDescription>
            </DialogHeader>
            <section className="space-y-10">
                <section className="flex gap-5 flex-wrap justify-center">
                    {Object.keys(statusData.summary).map(key => <section key={key} className=" border px-2 py-4 text-center rounded-sm min-w-[30%]">
                        <h3 className="font-semibold text-md md:text-lg ">{summaryLabels[key]}</h3>
                        <span className="text-sm md:text-md">{statusData.summary[key as keyof typeof statusData.summary]}</span>
                    </section>)}
                </section>
                <ChartAreaInteractive chartData={statusData.history} />

            </section>
        </DialogContent>
    </Dialog>

}


export const description = "An interactive area chart"



const chartConfig = {
    response_time: {
        label: "Ping",
        color: "var(--bg-foreground)",
    },
} satisfies ChartConfig

interface ChartAreaInteractiveProps {
    chartData: typeof data.monitors[0]["history"]
}
function ChartAreaInteractive({ chartData }: ChartAreaInteractiveProps) {
    const [timeRange, setTimeRange] = useState("90d")

    const filteredData = chartData.filter((item) => {
        const itemDate = new Date(item.date); // parses ISO date correctly

        let daysToSubtract = 90;
        if (timeRange === "30d") {
            daysToSubtract = 30;
        } else if (timeRange === "7d") {
            daysToSubtract = 7;
        }

        const now = new Date(); // use current time as reference
        const startDate = new Date(now);
        startDate.setDate(now.getDate() - daysToSubtract);

        return itemDate >= startDate;
    });
    return (
        <Card className="pt-0">
            <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
                <div className="grid flex-1 gap-1">
                    <CardTitle>Server Ping Overview</CardTitle>
                    <CardDescription>
                        Tracks response time and uptime status of the monitored server over the last 3 months. Useful for detecting latency spikes, downtime, and overall network reliability.

                    </CardDescription>
                </div>
                <Select value={timeRange} onValueChange={setTimeRange}>
                    <SelectTrigger
                        className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
                        aria-label="Select a value"
                    >
                        <SelectValue placeholder="Last 3 months" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                        <SelectItem value="90d" className="rounded-lg">
                            Last 3 months
                        </SelectItem>
                        <SelectItem value="30d" className="rounded-lg">
                            Last 30 days
                        </SelectItem>
                        <SelectItem value="7d" className="rounded-lg">
                            Last 7 days
                        </SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={filteredData}>
                        <defs>
                            <linearGradient id="fillPing" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="10%"
                                    stopColor="#fff"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="#222"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            className="invisible"
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}

                            tickMargin={8}
                            tickFormatter={(value) => {
                                return new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" }) + formatDate(value)
                            }}

                        />
                        <ChartTooltip
                            cursor={false}

                            content={
                                <ChartTooltipContent

                                    labelFormatter={(value) => {
                                        return new Date(value).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                        }) + formatDate(value)
                                    }}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="response_time"
                            type="natural"
                            fill="url(#fillPing)"
                            stroke="#fff"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
const renderTick = (props: any) => {
    const { x, y, payload } = props
    const date = new Date(payload.value);
    const day = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });
    const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <text x={x} y={y + 10} textAnchor="middle" fill="#666">
            <tspan x={x} dy="0">{day}</tspan>
            <tspan x={x} dy="14">{time}</tspan>
        </text>
    );
};
