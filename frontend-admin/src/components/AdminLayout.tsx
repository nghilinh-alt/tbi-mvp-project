import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import './AdminLayout.css'

const AdminLayout: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <div className="admin-layout">
      {/* Skip link */}
      <a href="#main-content" className="skip-link">Skip to main content</a>
      
      {/* Header */}
      <header className="admin-header">
        <div className="admin-header-container">
          <h1>TBI-MVP Admin Portal</h1>
          
          <nav className="admin-nav" aria-label="Admin navigation">
            <Link to="/users" className="active">Users</Link>
            <Link to="/analytics">Analytics</Link>
            <Link to="/settings">Settings</Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main id="main-content" className="admin-main" tabIndex={-1}>
        {children}
      </main>

      {/* Footer */}
      <footer className="admin-footer">
        <p>&copy; 2024 TBI-MVP Platform Administration</p>
      </footer>
    </div>
  )
}

export default AdminLayout
