import React, { useState } from 'react';
import './NIIQ.css';

interface SystemMetrics {
  uptimeMinutes: number;
  participantsOnline: number;
  avgCapacityUtilization: number;
  alertCount: number;
}

/**
 * NIISQ Intelligence Dashboard - Screen 1: System Health Monitor
 */
export function NIIQDashboard() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    uptimeMinutes: 4320,
    participantsOnline: 28,
    avgCapacityUtilization: 72,
    alertCount: 3
  });

  return (
    <div className="niiq-container">
      {/* Header */}
      <header className="niiq-header">
        <h1>NIISQ Intelligence Dashboard</h1>
        <p>System-level analytics & Adaptive Work System health monitoring</p>
      </header>

      {/* Metrics Grid */}
      <section 
        className="metrics-grid"
        aria-labelledby="metrics-heading"
      >
        <h2 id="metrics-heading">System Health Monitor</h2>

        {Object.entries(metrics).map(([key, value]) => (
          <div key={key} className="metric-card">
            <span className="metric-label">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            <span className="metric-value">{value}</span>
          </div>
        ))}
      </section>

      {/* Capacity Distribution Chart */}
      <section 
        className="capacity-chart"
        aria-label="Capacity distribution across participant base"
        role="img"
      >
        <h2>Capacity Distribution</h2>
        
        <div className="bar-chart">
          <div style={{ '--p': 'good', '--w': 1.0, '--c': 'var(--color-success)' } as any}>
            <span className="bar-label">High</span>
            <div className="bar-fill" style={{ width: '35%' }}></div>
          </div>
          
          <div style={{ '--p': 'okay', '--w': 0.7, '--c': 'var(--color-warning)' } as any}>
            <span className="bar-label">Medium</span>
            <div className="bar-fill" style={{ width: '50%' }}></div>
          </div>
          
          <div style={{ '--p': 'struggling', '--w': 0.4, '--c': 'var(--color-danger)' } as any}>
            <span className="bar-label">Low</span>
            <div className="bar-fill" style={{ width: '15%' }}></div>
          </div>
        </div>

        <p className="chart-note">Distribution reflects optimal workload allocation</p>
      </section>
    </div>
  );
}
