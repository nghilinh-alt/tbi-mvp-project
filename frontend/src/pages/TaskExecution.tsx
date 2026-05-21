import React, { useState } from 'react';
import './TaskExecution.css';

interface Step {
  id: number;
  instruction: string;
  completed: boolean;
  tip?: string;
}

/**
 * Screen 2: Task Execution (AI Job Coach)
 * "Replace human job coach dependency"
 */
export function TaskExecution() {
  const [currentStep, setCurrentStep] = useState<Step[]>([
    { id: 1, instruction: 'Open the spreadsheet', completed: true, tip: 'Click the Excel or Google Sheets icon on your desktop' },
    { id: 2, instruction: 'Copy invoice number into column A', completed: false, tip: 'Look at the top right of the invoice document' },
    { id: 3, instruction: 'Verify the amount matches', completed: false },
    { id: 4, instruction: 'Save your work', completed: false }
  ]);

  const [feedback, setFeedback] = useState<'none' | 'positive' | 'negative'>('none');
  const [helpMode, setHelpMode] = useState(false);

  const handleStepComplete = (stepId: number) => {
    const updatedSteps = currentStep.map(step => 
      step.id === stepId ? {...step, completed: true} : step
    );
    setCurrentStep(updatedSteps);
    
    // AI detection: offer help after delay if slow progress
    setTimeout(() => {
      setFeedback('positive');
      showToast('Great job! You are making good progress.');
    }, 500);
  };

  const handleHelpClick = () => {
    setHelpMode(true);
    showToast('Need Help? Let me simplify this instruction...');
  };

  const nextStep = () => {
    setFeedback('none');
    setHelpMode(false);
  };

  return (
    <div className="task-execution-container">
      {/* AI Coach Header */}
      <header className="ai-coach-header">
        <div className="coach-avatar">🤖</div>
        <div className="coach-content">
          <h1>AI Job Coach</h1>
          <p>I am here to guide you through each task step-by-step</p>
          <button 
            className={`btn-help ${helpMode ? 'active' : ''}`}
            onClick={handleHelpClick}
            data-testid="help-button"
          >
            {helpMode ? 'Hide Simplified Mode' : 'Need Help?'}
          </button>
        </div>
      </header>

      {/* Simple Instruction */}
      <section 
        className={`instruction-card ${feedback === 'positive' ? 'success' : ''} ${feedback === 'negative' ? 'error' : ''}`}
        aria-live="polite"
      >
        <h2 id="instruction-heading">Current Task:</h2>
        <div className="instruction-content">
          {currentStep.find(s => !s.completed)?.instruction || 'All steps complete! 🎉'}
        </div>
        {helpMode && (
          <div className="simplified-instruction" aria-label="Simplified instruction">
            <p><strong>Simplified:</strong> Just click on cell A1 and type the invoice number</p>
          </div>
        )}
      </section>

      {/* Step-by-Step Progress */}
      <section 
        className="progress-section"
        aria-labelledby="progress-heading"
      >
        <h2 id="progress-heading">Progress:</h2>
        <div className="steps-container" role="list">
          {currentStep.map((step, index) => (
            <div 
              key={step.id}
              className={`step-item ${step.completed ? 'completed' : 'pending'} ${!currentStep.slice(0, index).some(s => s.completed) ? 'active' : ''}`}
              role="listitem"
            >
              <div className="step-indicator">
                {step.completed ? (
                  <span className="checkmark" aria-hidden="true">✓</span>
                ) : (
                  <span className="step-number">{index + 1}</span>
                )}
              </div>
              
              <div className="step-content">
                <p>{step.instruction}</p>
                {step.tip && (
                  <p className="step-tip" id={`tip-step-${step.id}`}>
                    💡 {step.tip}
                  </p>
                )}
              </div>

              {!step.completed && (
                <button
                  onClick={() => handleStepComplete(step.id)}
                  className="btn-complete"
                  aria-label={`Mark step ${index + 1} as complete`}
                >
                  ✓ Done
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Navigation */}
      <footer className="task-navigation">
        {currentStep.find(s => !s.completed) && (
          <>
            {helpMode && (
              <button 
                className="btn-secondary"
                onClick={nextStep}
                data-testid="hide-help-button"
              >
                Close Help Mode
              </button>
            )}
            <div className="nav-divider">or</div>
            <button 
              className="btn-primary btn-next"
              onClick={nextStep}
              disabled={!currentStep.find(s => !s.completed)}
              aria-label="Continue to next step"
              data-testid="next-step-button"
            >
              Next Step →
            </button>
          </>
        )}

        {currentStep.every(s => s.completed) && (
          <div className="completion-message">
            <h3>🎉 All Tasks Complete!</h3>
            <p>You have successfully completed today&apos;s tasks</p>
            <button 
              className="btn-primary"
              onClick={() => window.location.reload()}
              data-testid="next-task-button"
            >
              Start Next Task →
            </button>
          </div>
        )}
      </footer>

      {/* Auto-detection: Slow Progress Alert */}
      {feedback === 'positive' && (
        <div className="toast toast-success" role="status" aria-live="polite">
          ✓ You are making good progress! Keep it up!
        </div>
      )}

      {feedback === 'negative' && (
        <div className="toast toast-warning" role="alert" aria-live="assertive">
          ⏰ We noticed you&apos;re taking more time than usual. Need help?
        </div>
      )}
    </div>
  );
}

/**
 * Helper: Toast Notification
 */
function showToast(message: string) {
  // This would integrate with React Toastify or similar library
  console.log(message);
}
