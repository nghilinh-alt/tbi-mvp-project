import React, { useState } from 'react';
import './ProviderConsole.css';

interface Alert {
  id: string;
  participantId: string;
  participantName: string;
  riskType: string;
  severity: 'high' | 'medium' | 'low';
  lastUpdated: string;
}

/**
 * Support Provider Console - Screen 1: Alerts Dashboard
 */
export function ProviderConsole() {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  
  const alerts: Alert[] = [
    {
      id: 'alert-1',
      participantId: 'P001',
      participantName: 'Alex',
      riskType: 'Risk of disengagement',
      severity: 'high',
      lastUpdated: '2 hours ago'
    },
    {
      id: 'alert-2',
      participantId: 'P003',
      participantName: 'Jamie',
      riskType: 'Cognitive overload detected',
      severity: 'high',
      lastUpdated: '1 hour ago'
    },
    {
      id: 'alert-3',
      participantId: 'P002',
      participantName: 'Sarah',
      riskType: 'Energy declining (5 days)',
      severity: 'medium',
      lastUpdated: '3 hours ago'
    }
  ];

  return (
    <div className="provider-console-container">
      {/* Header */}
      <header className="console-header">
        <h1>Support Provider Console</h1>
        <p>Exception handling & Human intervention</p>
      </header>

      {/* Alerts Dashboard */}
      <section 
        className="alerts-dashboard"
        aria-labelledby="alerts-heading"
      >
        <h2 id="alerts-heading">⚠ Active Alerts</h2>

        <div className="alerts-list" role="list">
          {alerts.map((alert) => (
            <button
              key={alert.id}
              onClick={() => setSelectedAlert(alert)}
              className={`alert-card ${alert.severity}`}
              aria-label={`${alert.riskType}, severity: ${alert.severity}`}
            >
              <div className="alert-icon">⚠</div>
              <div className="alert-content">
                <h3>{alert.participantName}</h3>
                <p>{alert.riskType}</p>
                <span className="alert-time">{alert.lastUpdated}</span>
              </div>
              <span className="arrow-icon">›</span>
            </button>
          ))}

          {alerts.length === 0 && (
            <div className="no-alerts">
              <p>No active alerts. System is running smoothly.</p>
            </div>
          )}
        </div>
      </section>

      {/* Participant Insight View */}
      {selectedAlert && (
        <section 
          className="participant-insight"
          aria-labelledby={`insight-heading-${selectedAlert.id}`}
        >
          <h2 id={`insight-heading-${selectedAlert.id}`}>
            {selectedAlert.participantName} - Detailed View
          </h2>

          {/* Trend */}
          <div className="trend-section">
            <h3>Trend:</h3>
            <p>{selectedAlert.riskType}</p>
            
            {/* Visual indicator */}
            <div className={`trend-indicator ${selectedAlert.severity}`} aria-label={`Trend: ${selectedAlert.severity}`}>
              {selectedAlert.severity === 'high' ? '⚠' : selectedAlert.severity === 'medium' ? '📉' : '📊'}
            </div>
          </div>

          {/* System Actions Taken */}
          <div className="system-actions">
            <h3>System Actions Taken:</h3>
            <ul role="list">
              <li role="listitem">✔ Reduced workload</li>
              <li role="listitem">✔ Simplified tasks</li>
              <li role="listitem">✔ Added extra time buffer</li>
            </ul>
          </div>

          {/* Recommended Actions */}
          <div className="recommended-actions">
            <h3>Recommended:</h3>
            <div className="action-buttons" role="group" aria-label="Recommended actions">
              <button 
                className="btn-action"
                aria-label="Contact participant via phone call"
              >
                📞 Call participant
              </button>
              
              <button 
                className="btn-action"
                aria-label="Adjust support plan for participant"
              >
                📋 Adjust support plan
              </button>
              
              <button 
                className="btn-action btn-secondary"
                aria-label="Review and modify adaptive role settings"
              >
                🔧 Review role configuration
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Legend */}
      <footer className="console-footer">
        <div className="legend-item">
          <span className="legend-dot high"></span>
          <span>High Priority - Immediate attention needed</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot medium"></span>
          <span>Medium Priority - Monitor closely</span>
        </div>
        <div className="legend-item">
          <span className="legend-dot low"></span>
          <span>Low Priority - Keep in mind</span>
        </div>
      </footer>
    </div>
  );
}
