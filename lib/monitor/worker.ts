import { supabase } from '@/lib/supabase';
import { MonitoringService } from './service';

async function startWorker() {
  const monitoringService = MonitoringService.getInstance();

  // Get all active monitors
  const { data: monitors, error } = await supabase
    .from('monitors')
    .select('*');

  if (error) {
    console.error('Error fetching monitors:', error);
    return;
  }

  // Start monitoring each monitor
  for (const monitor of monitors) {
    monitoringService.startMonitoring(monitor);
  }

  // Listen for monitor changes
  const monitorChanges = supabase
    .channel('monitor-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'monitors',
      },
      async (payload) => {
        if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
          monitoringService.startMonitoring(payload.new);
        } else if (payload.eventType === 'DELETE') {
          monitoringService.stopMonitoring(payload.old.id);
        }
      }
    )
    .subscribe();

  // Handle process termination
  process.on('SIGTERM', () => {
    monitors.forEach(monitor => {
      monitoringService.stopMonitoring(monitor.id);
    });
    monitorChanges.unsubscribe();
    process.exit(0);
  });
}

startWorker().catch(console.error);