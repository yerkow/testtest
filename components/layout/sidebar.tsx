"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  BarChart3, 
  Bell, 
  Home, 
  LayoutDashboard, 
  Plus, 
  Settings, 
  Activity,
  Server
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Monitors",
    icon: Activity,
    href: "/monitors",
    color: "text-violet-500",
  },
  {
    label: "Status Page",
    icon: Server,
    href: "/status",
    color: "text-pink-700",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/analytics",
    color: "text-orange-500",
  },
  {
    label: "Notifications",
    icon: Bell,
    href: "/notifications",
    color: "text-emerald-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/settings",
    color: "text-gray-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-card text-card-foreground border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-8">
          <div className="relative w-8 h-8 mr-2">
            <Activity className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-xl font-bold">
            Uptime Monitor
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-lg transition",
                pathname === route.href ? "bg-accent text-accent-foreground" : "text-muted-foreground",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="px-3 py-2">
        <Button variant="outline" size="sm" className="w-full justify-start mb-2">
          <Plus className="mr-2 h-4 w-4" />
          Add Monitor
        </Button>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            © 2025 Uptime Monitor
          </p>
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
}