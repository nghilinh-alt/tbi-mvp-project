import './JourneyTimeline.css'

export default function JourneyTimeline() {
  const steps = [
    {
      id: 'profile',
      title: 'Profile Setup',
      description: 'Create your profile and tell us about yourself',
      status: 'completed',
      icon: '👤'
    },
    {
      id: 'skills',
      title: 'Skills Assessment',
      description: 'Evaluate your existing skills and interests',
      status: 'pending',
      icon: '📝'
    },
    {
      id: 'matching',
      title: 'Job Matching',
      description: 'Discover roles that match your abilities',
      status: 'pending',
      icon: '💼'
    },
    {
      id: 'training',
      title: 'Training & Preparation',
      description: 'Complete recommended training modules',
      status: 'not-started',
      icon: '📚'
    },
    {
      id: 'hiring',
      title: 'Application Review',
      description: 'Get reviewed by hiring partners',
      status: 'not-started',
      icon: '🔍'
    },
    {
      id: 'success',
      title: 'Employment Success',
      description: 'Launch into your new career!',
      status: 'locked',
      icon: '🎉'
    }
  ]

  return (
    <div className="journey-timeline">
      {/* Header */}
      <header className="timeline-header">
        <h1>Your Employment Journey</h1>
        <p>Track your progress through our structured pathway to employment</p>
      </header>

      {/* Timeline Progress Indicator */}
      <div className="timeline-container">
        {steps.map((step, index) => {
          const isCompleted = step.status === 'completed'
          const isPending = step.status === 'pending'
          const isNotStarted = step.status === 'not-started'

          return (
            <div key={step.id} className="timeline-row">
              {/* Step Number */}
              <div className={`step-number ${isCompleted ? 'completed' : ''}`}>
                {isCompleted ? (
                  <span className="checkmark">✓</span>
                ) : isPending ? (
                  <span className="pending-icon">{step.icon}</span>
                ) : (
                  <span className={`locked ${index === 0 || index === 1 ? 'locked-border' : ''}`}>
                    {index + 1}
                  </span>
                )}
              </div>

              {/* Step Content */}
              <div className="step-content">
                <div className="step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>

              {/* Status Indicator */}
              {isCompleted && (
                <span className="status-badge completed">Completed</span>
              )}
              {isPending && (
                <span className="status-badge pending">Ready to Start</span>
              )}
              {(isNotStarted || step.status === 'locked') && (
                <span className="status-badge not-started">Locked</span>
              )}

              {/* Action Button */}
              {isPending && (
                <button className="btn-primary continue-btn">
                  Start Step
                </button>
              )}
            </div>
          )
        })}
      </div>

      {/* Tips Section */}
      <section className="tips-section">
        <h2>Tips for Success</h2>
        <ul className="tips-list">
          <li>✓ Complete each step before moving to the next</li>
          <li>✓ Be honest about your skills - we want realistic recommendations</li>
          <li>✓ Take breaks between steps to avoid burnout</li>
          <li>✓ Come back whenever you're ready - there's no deadline</li>
        </ul>
      </section>

      {/* Next Action CTA */}
      {steps.some(s => s.status === 'pending') && (
        <div className="next-action-card">
          <h3>You're making great progress!</h3>
          <p>Your next step is to complete the Skills Assessment</p>
          <a href="/skills" className="btn-primary btn-large">
            Start Now →
          </a>
        </div>
      )}
    </div>
  )
}
