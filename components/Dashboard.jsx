import React from 'react';

export default function Dashboard() {
  return (
    <div className="p-6 space-y-6">
      {/* Progress Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <h3 className="text-sm text-gray-400 mb-2">Projects Completed</h3>
          <p className="text-3xl font-bold text-indigo-400">12</p>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <h3 className="text-sm text-gray-400 mb-2">Hours This Week</h3>
          <p className="text-3xl font-bold text-indigo-400">42</p>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <h3 className="text-sm text-gray-400 mb-2">Active Tasks</h3>
          <p className="text-3xl font-bold text-indigo-400">5</p>
        </div>
      </div>

      {/* Simple Chart Placeholder */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Weekly Activity</h3>
        <div className="h-32 flex items-end justify-between gap-2">
          {[40, 65, 30, 85, 55, 70, 90].map((height, i) => (
            <div key={i} className="flex-1 bg-indigo-600/30 rounded-t hover:bg-indigo-500 transition-colors" style={{ height: `${height}%` }}></div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <ul className="space-y-3">
          {['Project X deployed to production', 'Pull request merged: auth-refactor', 'New issue resolved'].map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-1.5"></span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
