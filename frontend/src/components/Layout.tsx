import React from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import './Layout.css'

const Layout: React.FC = () => {
  const location = useLocation()
  
  return (
    <div className="app-layout">
      {/* Skip to main content link for keyboard users */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Navigation Header */}
      <header className="app-header">
        <div className="header-container">
          <h1>TBI Employment Pathways MVP</h1>
          
          <nav className="header-nav" aria-label="Main navigation">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link 
              to="/dashboard" 
              className={location.pathname.startsWith('/dashboard') ? 'active' : ''}
            >
              Dashboard
            </Link>
            <span aria-hidden="true">/</span>
            <Link 
              to="/journey" 
              className={location.pathname.startsWith('/journey') ? 'active' : ''}
            >
              Journey
            </Link>
            <span aria-hidden="true">/</span>
            <Link 
              to="/skills" 
              className={location.pathname.startsWith('/skills') ? 'active' : ''}
            >
              Skills
            </Link>
            <span aria-hidden="true">/</span>
            <Link 
              to="/jobs" 
              className={location.pathname.startsWith('/jobs') ? 'active' : ''}
            >
              Jobs
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content area */}
      <main id="main-content" className="app-main" tabIndex={-1}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-container">
          <p>TBI Employment Pathways MVP - Supporting Rehabilitation Success</p>
          <nav aria-label="Footer navigation">
            <a href="/privacy" aria-label="Privacy Policy">Privacy Policy</a> | 
            <a href="/help" aria-label="Help Documentation"> Help</a>
          </nav>
        </div>
      </footer>
    </div>
  )
}

export default Layout
