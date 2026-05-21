import React from 'react';
import './CheckIn.css';

interface CheckInProps {
  onSubmit: (feeling: string, additionalNotes?: string) => void;
}

/**
 * Screen 3: Check-In (Micro Interaction)
 * Triggered at end of task, midday, end of day
 */
export function CheckIn({ onSubmit }: CheckInProps) {
  const [selectedFeeling, setSelectedFeeling] = useState<'good' | 'okay' | 'struggling' | null>(null);
  const [showDetailedQuestions, setShowDetailedQuestions] = useState(false);

  const handleSubmit = () => {
    if (!selectedFeeling) return;
    
    onSubmit(selectedFeeling);
    // Reset for next check-in
    setSelectedFeeling(null);
    setShowDetailedQuestions(false);
  };

  return (
    <div className="checkin-container">
      {/* Header */}
      <header className="checkin-header">
        <div className="header-icon">📅</div>
        <h1>Daily Check-In</h1>
        <p>Tell us how you&apos;re feeling</p>
      </header>

      {/* Feeling Selection */}
      <section 
        className="feeling-selection"
        aria-labelledby="feeling-heading"
      >
        <h2 id="feeling-heading">How are you feeling today?</h2>
        
        <div className="feeling-buttons" role="radiogroup" aria-label="Feeling selection">
          {/* Good */}
          <button
            onClick={() => setSelectedFeeling('good')}
            className={`feeling-button ${selectedFeeling === 'good' ? 'selected' : ''}`}
            data-testid="feeling-good"
          >
            <span className="feeling-icon">😊</span>
            <span className="feeling-label">Good</span>
            {selectedFeeling === 'good' && (
              <span className="feeling-status">You&apos;re doing great!</span>
            )}
          </button>

          {/* Okay */}
          <button
            onClick={() => setSelectedFeeling('okay')}
            className={`feeling-button ${selectedFeeling === 'okay' ? 'selected' : ''}`}
            data-testid="feeling-okay"
          >
            <span className="feeling-icon">😐</span>
            <span className="feeling-label">Okay</span>
          </button>

          {/* Struggling */}
          <button
            onClick={() => setSelectedFeeling('struggling')}
            className={`feeling-button ${selectedFeeling === 'struggling' ? 'selected' : ''}`}
            data-testid="feeling-struggling"
          >
            <span className="feeling-icon">😔</span>
            <span className="feeling-label">Struggling</span>
            {selectedFeeling === 'struggling' && (
              <span className="feeling-status">We&apos;re here to help</span>
            )}
          </button>
        </div>
      </section>

      {/* Optional Detailed Questions - Only for Struggling */}
      {selectedFeeling === 'struggling' && showDetailedQuestions && (
        <section 
          className="detailed-questions"
          aria-labelledby="details-heading"
          role="region"
        >
          <h3 id="details-heading">What&apos;s making it hard?</h3>
          
          <div className="checkbox-list" role="group" aria-label="Detailed concerns">
            <label className="checkbox-item">
              <input 
                type="checkbox" 
                id="too-tired" 
                data-testid="checkbox-too-tired"
              />
              <span htmlFor="too-tired">Too tired</span>
            </label>

            <label className="checkbox-item">
              <input 
                type="checkbox" 
                id="confusing-task" 
                data-testid="checkbox-confusing-task"
              />
              <span htmlFor="confusing-task">Confusing task</span>
            </label>

            <label className="checkbox-item">
              <input 
                type="checkbox" 
                id="too-fast" 
                data-testid="checkbox-too-fast"
              />
              <span htmlFor="too-fast">Too fast / Rushed</span>
            </label>

            <label className="checkbox-item">
              <input 
                type="checkbox" 
                id="other" 
                data-testid="checkbox-other"
              />
              <span htmlFor="other">Other (tell us)</span>
            </label>
          </div>
        </section>
      )}

      {/* Submit Button */}
      <footer className="checkin-footer">
        {selectedFeeling === 'struggling' ? (
          <>
            {!showDetailedQuestions && (
              <button
                onClick={() => setShowDetailedQuestions(true)}
                className="btn-secondary"
                data-testid="show-details-button"
              >
                Optional: Tell us more...
              </button>
            )}

            {showDetailedQuestions && (
              <>
                <div className="help-message">
                  <p>We understand. Here&apos;s how we can help:</p>
                  <ul>
                    <li>Break tasks into smaller steps</li>
                    <li>Adjust task difficulty</li>
                    <li>Provide additional time</li>
                  </ul>
                </div>

                <button
                  onClick={handleSubmit}
                  className="btn-primary btn-submit"
                  data-testid="submit-checkin-button"
                >
                  Submit Check-In
                </button>
              </>
            )}
          </>
        ) : (
          <button
            onClick={handleSubmit}
            className="btn-primary btn-submit"
            disabled={!selectedFeeling}
            data-testid="submit-checkin-button-simple"
          >
            Submit Check-In ✅
          </button>
        )}
      </footer>

      {/* Info Note */}
      <p className="checkin-info">
        This check-in helps us adjust your tasks to match your energy levels.
      </p>
    </div>
  );
}
