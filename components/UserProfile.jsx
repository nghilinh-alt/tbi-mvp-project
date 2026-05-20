import React, { useState } from 'react';

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <aside className="w-72 p-6 border-r border-slate-800">
      {/* Profile Card */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white">
          JD
        </div>
        <h2 className="text-xl font-bold text-white">John Doe</h2>
        <p className="text-gray-400 text-sm">Full Stack Developer</p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-sm font-semibold text-gray-300 mb-3">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {['React', 'TypeScript', 'Node.js', 'Tailwind'].map((skill) => (
            <span key={skill} className="px-2 py-1 bg-indigo-500/20 text-indigo-400 text-xs rounded">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Activity Status */}
      <div className="p-3 bg-slate-800 rounded mb-4 border border-slate-700">
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-xs text-gray-300">Online</span>
        </div>
        <p className="text-xs text-gray-400">Typing in Code Editor...</p>
      </div>

      {/* Quick Stats */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-300">
          <span>Completion:</span>
          <span className="text-indigo-400 font-semibold">78%</span>
        </div>
        <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
          <div className="h-full w-[78%] bg-gradient-to-r from-indigo-500 to-purple-500"></div>
        </div>
      </div>
    </aside>
  );
}
