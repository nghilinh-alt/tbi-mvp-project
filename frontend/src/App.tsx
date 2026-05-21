import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import JourneyTimeline from './pages/JourneyTimeline'
import SkillsAssessment from './pages/SkillsAssessment'
import JobMatching from './pages/JobMatching'

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journey" element={<JourneyTimeline />} />
        <Route path="/skills" element={<SkillsAssessment />} />
        <Route path="/jobs" element={<JobMatching />} />
      </Routes>
    </Layout>
  )
}

export default App
