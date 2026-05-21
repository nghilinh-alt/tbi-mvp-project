import './JobMatching.css'

interface Job {
  id: string
  title: string
  employer: string
  location: string
  type: 'part-time' | 'full-time' | 'contract' | 'remote'
  salary: string
  requirements: string[]
  benefits?: string[]
  description: string
  matchedSkills: number
}

const sampleJobs: Job[] = [
  {
    id: '1',
    title: 'Data Entry Specialist',
    employer: 'Healthcare Administration Office',
    location: 'Hybrid (On-site + Remote)',
    type: 'part-time',
    salary: '$28-35/hr',
    requirements: ['Basic computer literacy', 'Email management', 'Document handling'],
    benefits: ['Flexible schedule', 'Paid training'],
    description: 'Organize and maintain digital records for healthcare operations. Enter patient data, update files, and generate reports.',
    matchedSkills: 85
  },
  {
    id: '2',
    title: 'Customer Service Representative',
    employer: 'Regional Retail Chain',
    location: 'Remote',
    type: 'part-time',
    salary: '$24-30/hr',
    requirements: ['Communication skills', 'Patience', 'Problem-solving'],
    benefits: ['Work from home', 'Employee discounts'],
    description: 'Answer customer inquiries via phone and email. Handle complaints, provide product information, and process orders.',
    matchedSkills: 78
  },
  {
    id: '3',
    title: 'Office Administrator Assistant',
    employer: 'Small Law Firm',
    location: 'On-site',
    type: 'full-time',
    salary: '$32-40/hr',
    requirements: ['Organization skills', 'Time management', 'Computer literacy'],
    benefits: ['Health insurance', '401k'],
    description: 'Manage office correspondence, schedule meetings, prepare documents, and support daily administrative operations.',
    matchedSkills: 82
  },
  {
    id: '4',
    title: 'Warehouse Coordinator',
    employer: 'Distribution Center',
    location: 'On-site',
    type: 'full-time',
    salary: '$30-38/hr',
    requirements: ['Physical stamina', 'Safety awareness', 'Basic equipment use'],
    benefits: ['Shift differential', 'Uniform provided'],
    description: 'Coordinate incoming shipments, manage inventory levels, and assist with order fulfillment. Basic forklift training provided.',
    matchedSkills: 72
  },
  {
    id: '5',
    title: 'Email Support Technician',
    employer: 'Educational Non-Profit',
    location: 'Remote',
    type: 'part-time',
    salary: '$26-34/hr',
    requirements: ['Written communication', 'Email management', 'Empathy'],
    benefits: ['Flexible hours', 'Mission-driven work'],
    description: 'Respond to student and parent emails, troubleshoot basic technical issues, and provide guidance on online learning platforms.',
    matchedSkills: 80
  },
  {
    id: '6',
    title: 'Content Moderator',
    employer: 'Online Platform Company',
    location: 'Remote',
    type: 'part-time',
    salary: '$25-32/hr',
    requirements: ['Attention to detail', 'Boundary setting', 'Resilience'],
    benefits: ['Remote work', 'Training provided'],
    description: 'Review and flag inappropriate content, report violations, and maintain community standards. Training and support available.',
    matchedSkills: 76
  }
]

export default function JobMatching() {
  const [filterType, setFilterType] = React.useState<string>('all')
  const [searchTerm, setSearchTerm] = React.useState('')

  return (
    <div className="job-matching">
      {/* Header */}
      <header className="jobs-header">
        <h1>Available Jobs</h1>
        <p>Browse positions matching your skills and interests</p>
      </header>

      {/* Filters */}
      <section className="filter-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search jobs, employers, or keywords..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="part-time">Part-Time</option>
            <option value="full-time">Full-Time</option>
            <option value="remote">Remote Only</option>
          </select>
        </div>

        <button className="btn-secondary">Reset Filters</button>
      </section>

      {/* Jobs Grid */}
      <div className="jobs-grid">
        {sampleJobs.map((job) => (
          <div key={job.id} className={`job-card ${job.matchedSkills > 80 ? 'high-match' : ''}`}>
            <div className="job-header">
              <h3>{job.title}</h3>
              <span className={`type-badge ${job.type}`}>{job.type}</span>
            </div>

            <div className="job-employer">
              <strong>{job.employer}</strong>
              {job.location && (
                <span className="location">{job.location}</span>
              )}
            </div>

            <div className="job-details">
              <p className="salary">{job.salary}</p>
              <button className="match-badge matched">
                Match: {job.matchedSkills}%
              </button>
            </div>

            <p className="job-description">{job.description}</p>

            {job.requirements && (
              <ul className="requirements-list">
                <li><strong>Requirements:</strong></li>
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            )}

            {job.benefits && (
              <ul className="benefits-list">
                <li><strong>Benefits:</strong></li>
                {job.benefits.map((bene, idx) => (
                  <li key={idx}>{bene}</li>
                ))}
              </ul>
            )}

            <div className="job-actions">
              <button className="btn-secondary view-details">View Details</button>
              <button className="btn-primary apply-btn">Apply Now</button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {searchTerm && (
        <div className="empty-state">
          <p>No jobs found matching "{searchTerm}"</p>
          <button onClick={() => setSearchTerm('')} className="btn-secondary">Clear Search</button>
        </div>
      )}

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to find the perfect role?</h2>
        <p>Complete your skills assessment and get personalized job recommendations</p>
        <a href="/skills" className="btn-primary btn-large">Start Skills Assessment</a>
      </section>
    </div>
  )
}
