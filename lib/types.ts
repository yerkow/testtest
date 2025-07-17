export interface Monitor {
  id: number;
  name: string;
  url: string;
  interval: number; // in seconds
  type: 'http' | 'ping' | 'tcp' | 'keyword';
  keyword?: string;
  uptime: number;
  port?: number;
  expected_status_code?: number;
  created_at: string;
  last_check: string | null;
  status: 'up' | 'down' | 'pending';
  uptime_percentage: number;
  response_time: number;
}

export interface MonitorCheck {
  id: string;
  monitor_id: string;
  status: 'up' | 'down';
  response_time: number;
  created_at: string;
  error?: string;
}

export interface Notification {
  id: string;
  type: 'email' | 'webhook' | 'slack' | 'discord';
  name: string;
  config: Record<string, any>;
  created_at: string;
}

// export interface Monitor {
//     id: string name: string url: string checkInterval: number // in minutes
//     status?: 'up' | 'down' | 'checking'
//     lastChecked?: string // ISO date string
//     responseTime?: number // in milliseconds
//     createdAt: string // ISO date string
//     history?: {
//         status: 'up' | 'down' | 'checking'
//         timestamp: string // ISO date string
//         responseTime?: number // in milliseconds
//     }[]
// }
