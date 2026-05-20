import './Dashboard.css'

interface UserStats {
  completedModules: number
  hoursLearned: number
  nextStep: string
}

export default function Dashboard() {
  const stats: UserStats = {
    completedModules: 0,
    hoursLearned: 0,
    nextStep: 'Start your first skill assessment'
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's where your employment journey begins.</p>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-icon">✓</span>
          <span className="stat-label">Completed Modules</span>
          <span className="stat-value">{stats.completedModules}</span>
        </div>

        <div className="stat-card">
          <span className="stat-icon">📚</span>
          <span className="stat-label">Hours Learned</span>
          <span className="stat-value">{stats.hoursLearned}h</span>
        </div>

        <div className="stat-card highlight">
          <span className="stat-icon">🎯</span>
          <span className="stat-label">Next Step</span>
          <span className="stat-value">{stats.nextStep}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <a href="/skills" className="action-card skill-btn">
            <span className="action-icon">📝</span>
            <span className="action-title">Start Skills Assessment</span>
            <span className="action-desc">Complete your skills evaluation</span>
          </a>

          <a href="/jobs" className="action-card job-btn">
            <span className="action-icon">💼</span>
            <span className="action-title">View Available Jobs</span>
            <span className="action-desc">See open positions matching your skills</span>
          </a>

          <a href="/journey" className="action-card journey-btn">
            <span className="action-icon">📍</span>
            <span className="action-title">View Journey Timeline</span>
            <span className="action-desc">Track your progress and milestones</span>
          </a>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="feature-highlights">
        <h2>Why TBI Employment Pathways?</h2>
        <div className="features-list">
          <div className="feature-item">
            <span className="feature-icon">🎯</span>
            <span className="feature-title">Personalized Pathway</span>
            <span className="feature-desc">AI-driven recommendations based on your skills and interests</span>
          </div>

          <div className="feature-item">
            <span className="feature-icon">📚</span>
            <span className="feature-title">Structured Learning</span>
            <span className="feature-desc">Step-by-step modules to build confidence before applying</span>
          </div>

          <div className="feature-item">
            <span className="feature-icon">💼</span>
            <span className="feature-title">Job Matching</span>
            <span className="feature-desc">Connect directly with employers hiring for TBI roles</span>
          </div>

          <div className="feature-item">
            <span className="feature-icon">👥</span>
            <span className="feature-title">Community Support</span>
            <span className="feature-desc">Access to mentors and peer networks</span>
          </div>
        </div>
      </section>
    </div>
  )
}
