import React from 'react';
import './Progress.css';

interface ProgressData {
  tasksCompleted: number;
  avgFocusTimeMinutes: number;
  improvementTrend: 'increasing' | 'stable' | 'decreasing';
  weeklyBreakdown: WeekStats[];
  messages: string[];
}

interface WeekStats {
  day: string;
  tasks: number;
  minutes: number;
  satisfaction: 'good' | 'okay' | 'struggling';
}

/**
 * Screen 4: Progress & Confidence
 * "Builds motivation + independence"
 */
export function ProgressDashboard({ progress }: { progress: ProgressData }) {
  const weekDays = [
    { day: 'Mon', tasks: 3, minutes: 18, satisfaction: 'good' },
    { day: 'Tue', tasks: 2, minutes: 22, satisfaction: 'okay' },
    { day: 'Wed', tasks: 4, minutes: 25, satisfaction: 'good' },
    { day: 'Thu', tasks: 2, minutes: 15, satisfaction: 'struggling' },
    { day: 'Fri', tasks: 3, minutes: 20, satisfaction: 'okay' }
  ];

  return (
    <div className="progress-container">
      {/* Header */}
      <header className="progress-header">
        <h1>Your Progress</h1>
        <p>Building confidence and independence every day</p>
      </header>

      {/* This Week Summary Cards */}
      <section 
        className="summary-cards"
        aria-labelledby="summary-heading"
      >
        <h2 id="summary-heading">This Week:</h2>

        {/* Tasks Completed */}
        <div className="stat-card stat-primary">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{progress.tasksCompleted}</div>
          <div className="stat-label">Tasks Completed</div>
        </div>

        {/* Avg Focus Time */}
        <div className="stat-card stat-secondary">
          <div className="stat-icon">⏱</div>
          <div className="stat-value">{progress.avgFocusTimeMinutes} min</div>
          <div className="stat-label">Avg Focus Time</div>
        </div>

        {/* Improvement Message */}
        <div className="stat-card stat-success">
          <div className="stat-icon">🚀</div>
          <div className="stat-value">Improving!</div>
          <div className="stat-label">{progress.improvementTrend === 'increasing' ? 'You&apos;re doing better each week!' : progress.improvementTrend === 'stable' ? 'Consistent performance' : 'Keep trying - you can do it!'}</div>
        </div>
      </section>

      {/* Specific Achievement Message */}
      <section className="achievement-message" aria-live="polite">
        <h3>🌟 This Week&apos;s Highlight</h3>
        <p>&quot;You handled email tasks better this week!&quot;</p>
      </section>

      {/* Weekly Breakdown Chart */}
      <section 
        className="weekly-breakdown"
        aria-labelledby="breakdown-heading"
        role="img"
        aria-label="Weekly task completion chart showing progress over the week"
      >
        <h2 id="breakdown-heading">Weekly Activity</h2>

        <div className="chart-container">
          {weekDays.map((day) => (
            <div 
              key={day.day}
              className="day-chart-bar"
              role="graphics-symbol"
              aria-label={`${day.day}, ${day.tasks} tasks completed in ${day.minutes} minutes`}
              style={{
                '--height': `${(day.tasks / 4) * 100}%`,
                '--color': day.satisfaction === 'good' ? 'var(--color-success)' : 
                           day.satisfaction === 'okay' ? 'var(--color-warning)' : 
                           'var(--color-danger)'
              } as React.CSSProperties}
            >
              <div className="day-label">{day.day}</div>
              <div className="day-bar" style={{ height: `calc(var(--height) * 2)` }}></div>
              <span className="day-stats">
                {day.tasks} tasks
              </span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="chart-legend" role="contentinfo">
          <div className="legend-item">
            <span className="legend-color good"></span>
            <span className="legend-label">Good</span>
          </div>
          <div className="legend-item">
            <span className="legend-color okay"></span>
            <span className="legend-label">Okay</span>
          </div>
          <div className="legend-item">
            <span className="legend-color struggling"></span>
            <span className="legend-label">Struggling</span>
          </div>
        </div>
      </section>

      {/* Motivational Quote */}
      <section 
        className="motivational-quote"
        aria-hidden="true"
      >
        &ldquo;Every small step forward is progress.&rdquo;
      </section>

      {/* Confidence Score (Visual) */}
      <section 
        className="confidence-meter"
        aria-label="Confidence meter showing current confidence level"
      >
        <h3>Your Confidence Level</h3>
        <div className="meter-container">
          <div className="meter-bar">
            <div 
              className="meter-fill" 
              style={{ width: '75%' }}
              aria-label="Confidence at 75%"
            ></div>
          </div>
          <span className="meter-value">75%</span>
        </div>
      </section>
    </div>
  );
}
