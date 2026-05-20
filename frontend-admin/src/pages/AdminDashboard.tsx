import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

// User role types for filtering and display
export type UserRole = 'participant' | 'employer' | 'provider' | 'admin';

export interface AdminUserEntry {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'suspended' | 'pending';
  lastActive?: string;
  department?: string;
}

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'email' | 'status' | 'lastActive'>('name');

  // Mock admin data based on dummy_users.json (would come from API in production)
  const adminUsers: AdminUserEntry[] = [
    {
      id: 'p-001',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@participant.example.com',
      role: 'participant',
      status: 'active',
      lastActive: '2024-05-22T14:30:00Z',
      department: 'Employment Journey'
    },
    {
      id: 'p-002',
      name: 'Marcus Williams',
      email: 'marcus.williams@participant.example.com',
      role: 'participant',
      status: 'active',
      lastActive: '2024-05-21T09:15:00Z',
      department: 'Employment Journey'
    },
    {
      id: 'e-001',
      name: 'TechCorp HR Team',
      email: 'hr@techcorp.example.com',
      role: 'employer',
      status: 'active',
      lastActive: '2024-05-22T16:45:00Z',
      department: 'Technology & Software'
    },
    {
      id: 'e-002',
      name: 'DataFlow HR',
      email: 'hr@dataentry.example.com',
      role: 'employer',
      status: 'active',
      lastActive: '2024-05-22T11:20:00Z',
      department: 'Data & Analytics'
    },
    {
      id: 'prov-001',
      name: 'Alex Rivera',
      email: 'support@vocational.example.com',
      role: 'provider',
      status: 'active',
      lastActive: '2024-05-22T13:00:00Z',
      department: 'Vocational Rehabilitation'
    },
    {
      id: 'prov-002',
      name: 'Dr. Emily Chen',
      email: 'therapy@rehab.example.com',
      role: 'provider',
      status: 'active',
      lastActive: '2024-05-22T10:30:00Z',
      department: 'Occupational Therapy'
    },
    {
      id: 'admin-001',
      name: 'Jennifer Martinez',
      email: 'admin@tbi-mvp.example.com',
      role: 'admin',
      status: 'active',
      lastActive: '2024-05-22T17:00:00Z',
      department: 'Operations'
    },
    {
      id: 'admin-002',
      name: 'David Kim',
      email: 'analytics@tbi-mvp.example.com',
      role: 'admin',
      status: 'active',
      lastActive: '2024-05-22T16:30:00Z',
      department: 'Analytics'
    }
  ];

  // Filter and sort users
  const filteredUsers = adminUsers
    .filter(user => filterRole === 'all' || user.role === filterRole)
    .filter(user => {
      const searchLower = searchQuery.toLowerCase();
      return (
        user.name.toLowerCase().includes(searchLower) ||
        user.email.toLowerCase().includes(searchLower) ||
        user.department?.toLowerCase().includes(searchLower)
      );
    })
    .sort((a, b) => {
      const aVal = a[sortBy].toString().toLowerCase();
      const bVal = b[sortBy].toString().toLowerCase();
      return aVal.localeCompare(bVal);
    });

  // Get role counts for dashboard summary
  const roleCounts = adminUsers.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<UserRole, number>);

  const handleViewProfile = (userId: string) => {
    navigate(`/admin/user/${userId}`, { state: { action: 'view' } });
  };

  const handleEditUser = (userId: string) => {
    navigate(`/admin/user/${userId}`, { state: { action: 'edit' } });
  };

  const handleSuspendUser = (userId: string, userName: string) => {
    if (window.confirm(`⚠️ Are you sure you want to suspend "${userName}"? This will restrict their access.`)) {
      // Suspend user logic would go here (API call)
      alert(`✓ User "${userName}" has been suspended`);
    }
  };

  const roleBadgeColor = (role: UserRole): string => {
    switch (role) {
      case 'participant': return 'blue';
      case 'employer': return 'green';
      case 'provider': return 'purple';
      case 'admin': return 'red';
    }
  };

  const statusIndicator = (status: string) => {
    if (status === 'active') return <span className="status-indicator active" aria-label="Active user"></span>;
    return <span className="status-indicator suspended" aria-label="Suspended user"></span>;
  };

  return (
    <div className="admin-dashboard" role="main" aria-labelledby="dashboard-title">
      {/* Dashboard Header */}
      <header className="admin-header" data-testid="admin-header">
        <div className="header-content">
          <h1 id="dashboard-title">👥 User Management Dashboard</h1>
          <p className="subtitle">
            Manage platform users, monitor activity, and handle moderation tasks
          </p>
        </div>

        {/* Quick Stats */}
        <aside className="stats-overview" aria-label="User statistics by role">
          <div className="stat-card blue">
            <span className="stat-count">{roleCounts.participant || 0}</span>
            <span className="stat-label">Participants</span>
          </div>
          <div className="stat-card green">
            <span className="stat-count">{roleCounts.employer || 0}</span>
            <span className="stat-label">Employers</span>
          </div>
          <div className="stat-card purple">
            <span className="stat-count">{roleCounts.provider || 0}</span>
            <span className="stat-label">Providers</span>
          </div>
          <div className="stat-card red">
            <span className="stat-count">{roleCounts.admin || 0}</span>
            <span className="stat-label">Admins</span>
          </div>
        </aside>
      </header>

      {/* Filters and Search */}
      <section className="admin-filters" aria-label="User management filters">
        <div className="search-wrapper">
          <label htmlFor="user-search" className="sr-only">Search users</label>
          <input
            id="user-search"
            type="text"
            placeholder="Search by name, email, or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="admin-search-input"
            aria-describedby="search-hint"
          />
          <span id="search-hint" className="sr-only">Type to filter users by name, email, or department</span>
        </div>

        <div className="filter-buttons-wrapper" role="group" aria-label="Filter users by role">
          {(['all', 'participant', 'employer', 'provider', 'admin'] as const).map((role) => (
            <button
              key={role}
              onClick={() => setFilterRole(role)}
              className={`filter-btn ${filterRole === role ? 'active' : ''}`}
              aria-pressed={filterRole === role}
              aria-label={`Filter by ${role} users`}
            >
              {role.charAt(0).toUpperCase() + role.slice(1)} Users
            </button>
          ))}
        </div>

        <div className="sort-wrapper">
          <label htmlFor="sort-select" className="sr-only">Sort by</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="sort-select"
            aria-label="Sort users by field"
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="status">Status</option>
            <option value="lastActive">Last Active</option>
          </select>
        </div>

        <button
          onClick={() => {
            setSearchQuery('');
            setFilterRole('all');
            setSortBy('name');
          }}
          className="reset-filters-btn"
          aria-label="Reset all filters and sorting"
        >
          🔄 Reset Filters
        </button>

        <span className="results-count" aria-live="polite">
          Showing <strong>{filteredUsers.length}</strong> user{filteredUsers.length !== 1 ? 's' : ''}
        </span>
      </section>

      {/* Users Table */}
      <main className="users-table-wrapper" role="table" aria-label="User management table">
        <table className="admin-users-table">
          <thead>
            <tr role="row">
              <th scope="col" role="columnheader">Status</th>
              <th scope="col" role="columnheader">Name</th>
              <th scope="col" role="columnheader">Email</th>
              <th scope="col" role="columnheader">Role</th>
              <th scope="col" role="columnheader">Department</th>
              <th scope="col" role="columnheader">Last Active</th>
              <th scope="col" role="columnheader" style={{ width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr 
                key={user.id} 
                role="row" 
                tabIndex={-1}
                aria-label={`${user.name}, ${user.role} user from ${user.department || 'N/A'}`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <td role="cell">
                  {statusIndicator(user.status)}
                  <span className="status-text">{user.status}</span>
                </td>
                <td role="cell">
                  <span className="name-cell">{user.name}</span>
                </td>
                <td role="cell">{user.email}</td>
                <td role="cell">
                  <span 
                    className={`role-badge ${roleBadgeColor(user.role)}`}
                    aria-label={`${user.role} user`}
                  >
                    {user.role.toUpperCase()}
                  </span>
                </td>
                <td role="cell">{user.department || '-'}</td>
                <td role="cell">
                  {user.lastActive 
                    ? new Date(user.lastActive).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })
                    : 'Never'
                  }
                </td>
                <td role="cell">
                  <div className="action-buttons" role="group">
                    <button
                      onClick={() => handleViewProfile(user.id)}
                      className="btn-icon btn-view"
                      aria-label={`View profile for ${user.name}`}
                      title="View Profile"
                    >
                      👁️
                    </button>
                    <button
                      onClick={() => handleEditUser(user.id)}
                      className="btn-icon btn-edit"
                      aria-label={`Edit ${user.name}}`}
                      title="Edit User"
                    >
                      ✏️
                    </button>
                    {user.role !== 'admin' && (
                      <button
                        onClick={() => handleSuspendUser(user.id, user.name)}
                        className="btn-icon btn-suspend"
                        aria-label={`Suspend ${user.name}}`}
                        title="Suspend User"
                      >
                        🛑
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <div className="no-users-message" role="status" aria-live="polite">
            <p>🔍 No users found matching your filters.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setFilterRole('all');
              }}
              className="btn btn-primary"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </main>

      {/* Action Bar */}
      <footer className="admin-footer" data-testid="admin-footer">
        <div className="footer-content">
          <span className="help-text">💡 Tip: Click the 👁️ icon to view full user details and journey information.</span>
          <span className="help-text">⚙️ Admin users cannot be suspended - they have special privileges.</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminDashboard;
