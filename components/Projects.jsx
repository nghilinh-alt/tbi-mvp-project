import React, { useState } from 'react';

// Sample projects data
const projects = [
  { id: 1, title: 'E-commerce Dashboard', category: 'Web App', image: '📊' },
  { id: 2, title: 'Finance Tracker', category: 'SaaS Platform', image: '💰' },
  { id: 3, title: 'Portfolio Site', category: 'Design', image: '🎨' },
];

export default function Projects() {
  const [hoveredProject, setHoveredProject] = useState(null);

  return (
    <section className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Featured Projects</h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            A collection of photophobia-friendly web applications built with React and Tailwind CSS
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {projects.map(project => (
            <div
              key={project.id}
              className={`card cursor-pointer transition-all duration-500 ${
                hoveredProject === project.id ? 'scale-105 shadow-2xl' : ''
              }`}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {/* Project Image Placeholder */}
              <div className="text-8xl mb-6 text-center hover:scale-110 transition-transform duration-300">
                {project.image}
              </div>

              {/* Project Info */}
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-indigo-400 text-sm mb-4">{project.category}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['React', 'Tailwind', 'Node.js'].slice(0, 3).map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-700/50 text-gray-300 text-xs rounded-full">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Hover Actions */}
              <div className={`space-y-3 transition-opacity duration-300 ${
                hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <button className="w-full btn-primary py-2 text-sm">
                  View Demo
                </button>
                <button className="w-full bg-slate-700 hover:bg-slate-600 text-gray-300 py-2 rounded text-sm font-medium transition-colors">
                  View Code
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* More Projects Link */}
        <div className="text-center">
          <button className="px-8 py-3 bg-slate-700 hover:bg-slate-600 text-gray-300 rounded-lg font-medium transition-all">
            View All Projects →
          </button>
        </div>
      </div>
    </section>
  );
}
