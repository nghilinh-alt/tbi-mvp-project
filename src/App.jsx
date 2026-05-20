import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Projects from './components/Projects';
import JobsDatabase from './components/JobsDatabase';
import Dashboard from './components/Dashboard';
import UserProfile from './components/UserProfile';

function App() {
  const [activeSection, setActiveSection] = useState('projects');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-lg bg-slate-900/70 border-b border-slate-700 shadow-lg">
        <Header activeSection={activeSection} setActiveSection={setActiveSection} />
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-16 px-4">
        {activeSection === 'hero' && (
          <>
            <Hero />
            <Projects />
          </>
        )}

        {activeSection === 'projects' && (
          <div className="max-w-7xl mx-auto">
            <Projects />
          </div>
        )}

        {activeSection === 'jobs' && (
          <div className="max-w-7xl mx-auto">
            <JobsDatabase />
          </div>
        )}

        {activeSection === 'dashboard' && (
          <div className="max-w-7xl mx-auto">
            <Dashboard />
          </div>
        )}

        {activeSection === 'profile' && (
          <div className="max-w-4xl mx-auto">
            <UserProfile />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
