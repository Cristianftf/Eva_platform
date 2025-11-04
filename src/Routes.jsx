import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import { AuthProvider } from './Context/AuthContext';
import AuthPage from './pages/auth/AuthPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdministrativePanel from './pages/administrative-panel';
import ProfileProgressCenter from './pages/profile-progress-center';
import CourseDetailPages from './pages/course-details-pages';
import CommunicationHub from './pages/communication-hub';
import AssessmentInterface from './pages/assessment-interface';
import StudentDashboard from './pages/student-dashboard';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Public routes */}
            <Route path="/auth" element={<AuthPage />} />
            
            {/* Protected routes */}
            <Route 
              path="/" 
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/administrative-panel" 
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdministrativePanel />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile-progress-center" 
              element={
                <ProtectedRoute>
                  <ProfileProgressCenter />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/course-detail-pages" 
              element={
                <ProtectedRoute>
                  <CourseDetailPages />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/communication-hub" 
              element={
                <ProtectedRoute>
                  <CommunicationHub />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/assessment-interface" 
              element={
                <ProtectedRoute>
                  <AssessmentInterface />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/student-dashboard" 
              element={
                <ProtectedRoute>
                  <StudentDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
