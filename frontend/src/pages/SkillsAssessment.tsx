import './SkillsAssessment.css'

export default function SkillsAssessment() {
  const skillCategories = [
    {
      category: 'Communication',
      subcategories: ['Written Communication', 'Verbal Communication', 'Active Listening', 'Conflict Resolution']
    },
    {
      category: 'Technical Skills',
      subcategories: ['Computer Literacy', 'Data Entry', 'Document Management', 'Email Management']
    },
    {
      category: 'Professional Skills',
      subcategories: ['Time Management', 'Problem Solving', 'Attention to Detail', 'Organization']
    },
    {
      category: 'Interpersonal Skills',
      subcategories: ['Teamwork', 'Empathy', 'Patience', 'Adaptability']
    }
  ]

  const levelOptions = [
    { value: 'beginner', label: 'Beginner', desc: 'I need lots of help and training' },
    { value: 'intermediate', label: 'Intermediate', desc: 'Some experience, could use more practice' },
    { value: 'advanced', label: 'Advanced', desc: 'Comfortable with it, ready to apply' }
  ]

  const handleLevelSelect = (category: string, subcategory: string, level: string) => {
    console.log(`${category} > ${subcategory}: ${level}`)
  }

  return (
    <div className="skills-assessment">
      {/* Header */}
      <header className="assessment-header">
        <h1>Skills Assessment</h1>
        <p>This helps us understand your strengths and create personalized recommendations</p>
      </header>

      {/* Intro Card */}
      <section className="intro-card">
        <div className="intro-icon">📝</div>
        <h2>About This Assessment</h2>
        <div className="intro-content">
          <p><strong>Purpose:</strong> We want to learn about your existing skills and interests.</p>
          <p><strong>Benefits:</strong> Get personalized job recommendations and training suggestions.</p>
          <p><strong>Time Required:</strong> About 15-20 minutes</p>
          <p><strong>You can:</strong> Skip any question, come back later, or change answers anytime</p>
        </div>
        <button className="btn-primary btn-large">Start Assessment</button>
      </section>

      {/* Skills Categories */}
      <section className="skills-section">
        <h2>Skill Areas</h2>
        <p>Select your current comfort level for each skill area</p>

        <div className="categories-grid">
          {skillCategories.map((cat, idx) => (
            <div key={idx} className="category-card">
              <div className="category-header">
                <h3>{cat.category}</h3>
              </div>

              <div className="subcategories-list">
                {cat.subcategories.map((sub, subIdx) => (
                  <div key={subIdx} className="skill-item">
                    <label className="skill-label">{sub}</label>
                    <div className="level-selection">
                      {levelOptions.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          type="button"
                          className={`level-btn ${idx === 0 && subIdx === 0 && optIdx === 1 ? 'selected' : ''}`}
                          onClick={() => handleLevelSelect(cat.category, sub, opt.value)}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                    <span className="skill-tooltip">{levelOptions[1].desc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="save-section">
          <button className="btn-secondary">Save Progress</button>
          <button className="btn-primary btn-large">Finish Assessment</button>
        </div>
      </section>

      {/* Tips Section */}
      <section className="tips-section">
        <h2>Tips for Completing the Assessment</h2>
        <ul className="tips-list">
          <li>✓ Be honest about what you can do - there are no wrong answers</li>
          <li>✓ If you're unsure, pick "Beginner" and we'll help you learn</li>
          <li>✓ You don't have to answer every question right away</li>
          <li>✓ Your progress is automatically saved</li>
        </ul>
      </section>

      {/* Progress Indicator */}
      <div className="progress-section">
        <div className="progress-bar-container">
          <div className="progress-fill" style={{ width: '25%' }}></div>
        </div>
        <span className="progress-text">1 of 4 sections completed</span>
      </div>
    </div>
  )
}
