import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../Context/AuthContext';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { user, userProfile, loading } = useAuth()
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-700">Verificando autenticación...</span>
          </div>
        </div>
      </div>
    )
  }

  // Redirect to auth page if not authenticated
  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />
  }

  // Check role-based access if required
  if (requiredRole && userProfile?.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user role
    const roleDashboards = {
      student: '/student-dashboard',
      teacher: '/instructor-dashboard',
      admin: '/administrative-panel'
    }
    
    const redirectPath = roleDashboards?.[userProfile?.role] || '/student-dashboard'
    return <Navigate to={redirectPath} replace />
  }

  return children
}

export default ProtectedRoute