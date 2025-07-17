import { supabase } from '@/lib/supabase';
import { Monitor, MonitorCheck } from '@/lib/types';
import fetch from 'node-fetch';

export class MonitoringService {
  private static instance: MonitoringService;
  private checkIntervals: Map<string, NodeJS.Timeout> = new Map();

  private constructor() {}

  static getInstance(): MonitoringService {
    if (!MonitoringService.instance) {
      MonitoringService.instance = new MonitoringService();
    }
    return MonitoringService.instance;
  }

  async startMonitoring(monitor: Monitor) {
    // Clear existing interval if any
    this.stopMonitoring(monitor.id);

    // Start new monitoring interval
    const interval = setInterval(async () => {
      await this.checkMonitor(monitor);
    }, monitor.interval * 1000);

    this.checkIntervals.set(monitor.id, interval);
  }

  stopMonitoring(monitorId: string) {
    const interval = this.checkIntervals.get(monitorId);
    if (interval) {
      clearInterval(interval);
      this.checkIntervals.delete(monitorId);
    }
  }

  private async checkMonitor(monitor: Monitor) {
    const startTime = Date.now();
    let status: 'up' | 'down' = 'down';
    let error: string | undefined;
    let responseTime = 0;

    try {
      if (monitor.type === 'http') {
        const response = await fetch(monitor.url, {
          timeout: 10000, // 10 second timeout
        });

        responseTime = Date.now() - startTime;

        if (monitor.expected_status_code) {
          status = response.status === monitor.expected_status_code ? 'up' : 'down';
          if (status === 'down') {
            error = `Expected status ${monitor.expected_status_code}, got ${response.status}`;
          }
        } else {
          status = response.ok ? 'up' : 'down';
          if (status === 'down') {
            error = `HTTP status ${response.status}`;
          }
        }

        if (monitor.keyword) {
          const text = await response.text();
          if (!text.includes(monitor.keyword)) {
            status = 'down';
            error = 'Keyword not found';
          }
        }
      }
      // Add other monitor types here (TCP, PING, etc.)
    } catch (err) {
      status = 'down';
      error = err instanceof Error ? err.message : 'Unknown error';
      responseTime = Date.now() - startTime;
    }

    // Save check result
    const check: Partial<MonitorCheck> = {
      monitor_id: monitor.id,
      status,
      response_time: responseTime,
      error,
    };

    // Update monitor status in database
    await this.saveCheckResult(check);
    await this.updateMonitorStatus(monitor.id, status, responseTime);
  }

  private async saveCheckResult(check: Partial<MonitorCheck>) {
    const { error } = await supabase
      .from('monitor_checks')
      .insert(check);

    if (error) {
      console.error('Error saving check result:', error);
    }
  }

  private async updateMonitorStatus(
    monitorId: string,
    status: 'up' | 'down',
    responseTime: number
  ) {
    // Calculate uptime percentage
    const { data: checks } = await supabase
      .from('monitor_checks')
      .select('status')
      .eq('monitor_id', monitorId)
      .order('created_at', { ascending: false })
      .limit(100);

    const upChecks = checks?.filter(check => check.status === 'up').length || 0;
    const uptime = checks?.length ? (upChecks / checks.length) * 100 : 100;

    const { error } = await supabase
      .from('monitors')
      .update({
        status,
        response_time: responseTime,
        uptime_percentage: uptime,
        last_check: new Date().toISOString(),
      })
      .eq('id', monitorId);

    if (error) {
      console.error('Error updating monitor status:', error);
    }
  }
}