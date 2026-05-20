import React from 'react';

export default function Header({ activeSection, setActiveSection }) {
  return (
    <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">🎨</span>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Portfolio</h1>
          <p className="text-xs text-gray-400">Photophobia-friendly Design</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="hidden md:flex items-center gap-1">
        {[
          { id: 'projects', label: 'Projects' },
          { id: 'jobs', label: 'Job Board' },
          { id: 'dashboard', label: 'Dashboard' },
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeSection === item.id
                ? 'bg-indigo-500/20 text-indigo-300'
                : 'text-gray-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden p-2 text-gray-300 hover:text-white">
        <span className="text-2xl">☰</span>
      </button>
    </nav>
  );
}
