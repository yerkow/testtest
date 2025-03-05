export interface Monitor {
  id: string;
  name: string;
  url: string;
  interval: number; // in seconds
  type: 'http' | 'ping' | 'tcp' | 'keyword';
  keyword?: string;
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