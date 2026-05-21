import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout as AdminLayout from './components/AdminLayout'
import AdminDashboard from './pages/AdminDashboard'

const AdminApp: React.FC = () => {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
      </Routes>
    </AdminLayout>
  )
}

export default AdminApp
