import React, { useState } from 'react';
import './EmployerPortal.css';

interface JobDecomposition {
  taskCluster: string;
  complexity: 'low' | 'medium' | 'high';
  tasks: string[];
  suggestedStructure: string[];
}

/**
 * Employer Portal - Screen 1: Role Input → Auto-Decomposition
 */
export function EmployerPortal() {
  const [jobTitle, setJobTitle] = useState('');
  const [descriptionFile, setDescriptionFile] = useState<File | null>(null);
  const [isDecomposing, setIsDecomposing] = useState(false);
  const [decompositionResult, setDecompositionResult] = useState<JobDecomposition | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setDescriptionFile(e.target.files[0]);
    }
  };

  const handleDecompose = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!jobTitle || !descriptionFile) {
      alert('Please enter a job title and upload the job description PDF');
      return;
    }

    setIsDecomposing(true);

    // Simulate AI decomposition
    setTimeout(() => {
      setDecompositionResult({
        taskCluster: 'Low Complexity',
        complexity: 'low',
        tasks: [
          'Data entry - Process invoices',
          'Filing - Organize documents by date',
          'Sorting - Categorize supply requests'
        ],
        suggestedStructure: [
          '✔ Start with low complexity tasks',
          '✔ Introduce medium complexity after 2 weeks',
          '✔ Monitor progress daily for first week'
        ]
      });
      
      setIsDecomposing(false);
    }, 2000);
  };

  return (
    <div className="employer-portal-container">
      {/* Header */}
      <header className="employer-header">
        <h1>Employer Portal</h1>
        <p>Create and manage adaptive roles for TBI participants</p>
      </header>

      {/* Role Creation Form */}
      <section 
        className="role-creation-card"
        aria-labelledby="role-heading"
      >
        <h2 id="role-heading">Create Adaptive Role</h2>

        <form onSubmit={handleDecompose}>
          {/* Job Title Input */}
          <div className="form-group">
            <label htmlFor="job-title" className="form-label">
              Job Title <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
            </label>
            <input
              id="job-title"
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g., Admin Assistant"
              required
              className="form-input"
              disabled={isDecomposing}
            />
          </div>

          {/* File Upload */}
          <div className="form-group">
            <label htmlFor="job-description" className="form-label">
              Job Description PDF <span aria-hidden="true">*</span><span className="sr-only">(required)</span>
            </label>
            <input
              id="job-description"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              disabled={isDecomposing || !!descriptionFile}
              className="form-input file-input"
            />
            {descriptionFile && (
              <p className="file-preview">
                Selected: {descriptionFile.name} 
                <button 
                  type="button"
                  onClick={() => setDescriptionFile(null)}
                  className="btn-remove-file"
                  aria-label={`Remove ${descriptionFile.name}`}
                >
                  × Remove
                </button>
              </p>
            )}
          </div>

          {/* Decompose Button */}
          <button
            type="submit"
            className="btn-primary btn-decompose"
            disabled={isDecomposing}
            aria-busy={isDecomposing}
          >
            {isDecomposing ? 'Decomposing Role...' : 'Generate Adaptive Role'}
          </button>
        </form>
      </section>

      {/* Decomposition Result */}
      {decompositionResult && (
        <section 
          className="role-result-card"
          aria-labelledby="result-heading"
        >
          <h2 id="result-heading">Your Role Has Been Adapted</h2>

          {/* Task Clusters */}
          <div className="task-clusters">
            <h3>{decompositionResult.taskCluster}</h3>

            <div className="cluster-items">
              {decompositionResult.tasks.map((task, index) => (
                <div key={index} className="cluster-item">
                  <span className="cluster-icon">▪️</span>
                  <span className="cluster-text">{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Suggested Structure */}
          <div className="suggested-structure">
            <h3>Suggested Structure:</h3>
            <ul role="list">
              {decompositionResult.suggestedStructure.map((item, index) => (
                <li key={index} role="listitem">{item}</li>
              ))}
            </ul>
          </div>

          {/* Approve & Post Button */}
          <button 
            className="btn-primary btn-post"
            aria-label="Post job opportunity to marketplace"
          >
            ✅ Approve & Post to Marketplace
          </button>
        </section>
      )}

      {/* Info Banner */}
      <footer className="info-banner">
        <p>💡 Employers don&apos;t need to understand ABI/TBI — our system handles task decomposition automatically.</p>
      </footer>
    </div>
  );
}
