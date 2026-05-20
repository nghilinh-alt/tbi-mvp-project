import React, { useState } from 'react';

// Sample jobs database with filtering functionality
const sampleJobs = [
  { id: 1, title: 'Senior React Developer', company: 'TechCorp', type: 'Full-time', salary: '$120k-$160k' },
  { id: 2, title: 'Frontend Engineer', company: 'StartupXYZ', type: 'Full-time', salary: '$100k-$140k' },
  { id: 3, title: 'UI/UX Designer', company: 'DesignCo', type: 'Contract', salary: '$80-$120/hr' },
];

export default function JobsDatabase() {
  const [filterType, setFilterType] = useState('all');

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Open Positions</h2>
        
        {/* Filters */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {['all', 'full-time', 'part-time', 'contract'].map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-full text-sm ${
                filterType === type 
                  ? 'bg-indigo-500 text-white' 
                  : 'bg-slate-700 text-gray-300 hover:bg-slate-600'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        {/* Job Listings */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleJobs.map(job => (
            <div key={job.id} className="p-6 rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 hover:border-indigo-500 transition-all cursor-pointer group">
              <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
              <p className="text-indigo-400 font-semibold mb-3">{job.company}</p>
              <div className="flex justify-between text-sm text-gray-400">
                <span>{job.type}</span>
                <span>{job.salary}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
