import React, { useState } from 'react';
import { getEmploymentJourneys, getStages } from '../services/journeys';
import { getUserRole } from '../services/auth';
import './DailyHome.css';

interface Task {
  id: string;
  title: string;
  estimatedTime: number; // minutes
  completed: boolean;
  optional: boolean;
}

/**
 * Screen 1: Daily Home (Anchor Screen)
 * "Reduce anxiety + guide action"
 * 1–2 tap interactions, low cognitive load
 */
export function DailyHome() {
  const [adaptiveMode, setAdaptiveMode] = useState<'good' | 'okay' | 'struggling'>('good');
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  
  // Dynamic capacity state (simulated)
  const [capacityLevel, setCapacityLevel] = useState<'high' | 'medium' | 'low'>('high');

  // Load today's plan from API or use mock data
  const [tasks, setTasks] = useState<Task[]>([]);
  const [aiCoachMessage, setAiCoachMessage] = useState<string>('');

  React.useEffect(() => {
    // Fetch employment journey stages
    const loadTasks = async () => {
      try {
        const journeys = await getEmploymentJourneys();
        const stages = await getStages();
        
        // Convert stages to today's plan tasks
        setTasks(stages.map((stage, index) => ({
          id: `task-${index}`,
          title: `${capitalize(stage.stage)} Stage`,
          estimatedTime: stage.date ? 15 : 0,
          completed: false,
          optional: stage.stage === 'retention'
        })));
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };

    loadTasks();
  }, []);

  const handleModeChange = (mode: 'good' | 'okay' | 'struggling') => {
    setAdaptiveMode(mode);
    setAiCoachMessage(getCoachTip(mode));
    
    // Adaptive adjustments based on user state
    adjustTasksByCapacity(mode);
  };

  const handleStartTask = (taskId: string) => {
    setActiveTaskId(taskId);
    showToast('Task started! Follow the AI coach for step-by-step guidance.');
  };

  const handleCheckIn = async () => {
    // Record check-in to capacity model
    const timestamp = new Date().toISOString();
    await saveCheckIn(adaptiveMode, timestamp);
    
    // If struggling, offer help
    if (adaptiveMode === 'struggling') {
      setAdaptiveMode('okay'); // Reset for now
      showToast('Thank you for your check-in. We noticed you might need extra support.');
    }
  };

  // Adaptive Work Mode Logic
  const adjustTasksByCapacity = (mode: string) => {
    let adjustedTasks = [...tasks];

    if (mode === 'good') {
      // Increase difficulty: reduce estimated time, show optional tasks
      setCapacityLevel('high');
    } else if (mode === 'okay') {
      // Medium difficulty
      setCapacityLevel('medium');
    } else {
      // Struggling mode: simplify tasks
      setCapacityLevel('low');
      
      // Remove or delay some tasks
      adjustedTasks = tasks.filter(task => !task.optional);
    }

    setTasks(adjustedTasks);
  };

  const showToast = (message: string) => {
    console.log(message);
    // In production, implement toast notification system
  };

  const saveCheckIn = async (mode: string, timestamp: string) => {
    // Save to local storage or API
    const checkIns = JSON.parse(localStorage.getItem('checkIns') || '[]');
    checkIns.push({ mode, timestamp });
    localStorage.setItem('checkIns', JSON.stringify(checkIns));
  };

  if (tasks.length === 0) {
    return <div className="skeleton-loader">Loading your plan...</div>;
  }

  return (
    <div className="daily-home-container">
      {/* Good Morning Greeting */}
      <header className="home-header">
        <h1 className="home-title">Good morning, Alex!</h1>
        <p className="home-subtitle">Let's tackle your tasks today</p>
      </header>

      {/* Adaptive Work Mode Toggle */}
      <section 
        className="adaptive-mode-toggle"
        role="group" 
        aria-label="Adaptive Work Mode"
        aria-describedby="adaptive-mode-desc"
      >
        <h2 id="adaptive-mode-desc">How are you feeling today?</h2>
        <div className="mode-buttons" role="radiogroup" aria-labelledby="adaptive-mode-desc">
          <button
            onClick={() => handleModeChange('good')}
            className={`mode-button ${adaptiveMode === 'good' ? 'active' : ''}`}
            aria-checked={adaptiveMode === 'good'}
            data-testid="mode-good"
          >
            <span className="mode-icon">😊</span>
            <span className="mode-label">Good</span>
            {adaptiveMode === 'good' && <span className="mode-status">More tasks shown</span>}
          </button>
          
          <button
            onClick={() => handleModeChange('okay')}
            className={`mode-button ${adaptiveMode === 'okay' ? 'active' : ''}`}
            aria-checked={adaptiveMode === 'okay'}
            data-testid="mode-okay"
          >
            <span className="mode-icon">😐</span>
            <span className="mode-label">Okay</span>
          </button>
          
          <button
            onClick={() => handleModeChange('struggling')}
            className={`mode-button ${adaptiveMode === 'struggling' ? 'active' : ''}`}
            aria-checked={adaptiveMode === 'struggling'}
            data-testid="mode-struggling"
          >
            <span className="mode-icon">😔</span>
            <span className="mode-label">Struggling</span>
          </button>
        </div>
      </section>

      {/* Today's Plan */}
      <section className="todays-plan" aria-labelledby="plan-heading">
        <h2 id="plan-heading">Today&apos;s Plan:</h2>
        
        <div className="task-list" role="list" aria-label="Task list">
          {tasks.map((task, index) => (
            <div 
              key={task.id}
              className={`task-item ${task.completed ? 'completed' : ''} ${!task.optional ? 'required' : ''}`}
              role="listitem"
              aria-label={`${task.title}, ${task.estimatedTime} minutes, ${task.optional ? 'Optional' : 'Required'}`}
            >
              <div className="task-checkbox">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => {
                    const updatedTasks = tasks.map(t => 
                      t.id === task.id ? {...t, completed: !t.completed} : t
                    );
                    setTasks(updatedTasks);
                  }}
                  id={`task-${task.id}`}
                />
                <label htmlFor={`task-${task.id}`} className="checkbox-label"></label>
              </div>

              <div className="task-content">
                <h3>{task.title}</h3>
                <span className="task-estimate">⏱ {task.estimatedTime} mins</span>
              </div>

              {!task.optional && (
                <button
                  onClick={() => handleStartTask(task.id)}
                  className="btn-primary btn-start-task"
                  aria-label={`Start ${task.title}`}
                >
                  ▶ Start Next Task
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* AI Coach Tip */}
      <section 
        className={`ai-coach-tip adaptive-${capacityLevel}-background`}
        role="region"
        aria-labelledby="coach-heading"
      >
        <h3 id="coach-heading">AI Coach Tip:</h3>
        <p>{aiCoachMessage}</p>
        
        {adaptiveMode === 'struggling' && (
          <button 
            className="btn-secondary btn-small"
            onClick={handleCheckIn}
            aria-label="Report how you're feeling"
          >
            How are you doing?
          </button>
        )}
      </section>

      {/* Capacity Indicator */}
      <footer className="capacity-footer">
        <div className={`capacity-indicator capacity-${capacityLevel}`}>
          <span className="capacity-label">Your Energy Level</span>
          <span className={`capacity-bar capacity-${capacityLevel}-bar`}></span>
        </div>
        
        {/* Check-in Reminder */}
        <button
          onClick={handleCheckIn}
          className="btn-secondary btn-checkin"
          aria-label="Daily check-in"
          data-testid="checkin-button"
        >
          📅 Daily Check-in
        </button>
      </footer>

      {/* Accessibility: Screen Reader Content */}
      <div className="sr-only" aria-live="polite">
        Capacity level: {capacityLevel}. Adaptive mode: {adaptiveMode}. 
        Today has {tasks.length} tasks scheduled.
      </div>
    </div>
  );
}

/**
 * Helper functions
 */
function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function getCoachTip(mode: string): string {
  const tips = {
    good: 'You&apos;re doing great! Start with Task 1. I will guide you step-by-step.',
    okay: 'Let&apos;s take this one task at a time. I&apos;m here to help!',
    struggling: 'I understand. Let&apos;s simplify things. What do you need support with?'
  };
  return tips[mode as keyof typeof tips];
}
