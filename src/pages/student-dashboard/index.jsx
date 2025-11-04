import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useEducationalData } from '../../hooks/useEducationalData';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import WelcomeHeader from './components/WelcomeHeader';
import QuickStats from './components/QuickStats';
import EnrolledCourses from './components/EnrolledCourses';
import RecentActivity from './components/RecentActivity';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import QuickActions from './components/QuickActions';
import NotificationsPanel from './components/NotificationsPanel';

const StudentDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  
  const { userProfile } = useAuth();
  const {
    enrolledCourses,
    upcomingAssignments,
    notifications,
    recentActivities,
    dashboardStats,
    loading,
    error,
    markNotificationAsRead
  } = useEducationalData();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now?.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const userName = userProfile?.full_name || 'Estudiante';

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-700">Cargando dashboard...</span>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
        <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
          <div className="p-6 max-w-7xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-md p-4">
              <p className="text-red-700">Error al cargar los datos: {error}</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />

      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Welcome Header */}
          <WelcomeHeader userName={userName} currentTime={currentTime} />
          
          {/* Quick Stats */}
          <QuickStats stats={dashboardStats} />
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Left Column - Courses and Activity */}
            <div className="lg:col-span-2 space-y-6">
              <EnrolledCourses courses={enrolledCourses || []} />
              <RecentActivity activities={recentActivities || []} />
            </div>
            
            {/* Right Column - Deadlines and Actions */}
            <div className="space-y-6">
              <UpcomingDeadlines deadlines={upcomingAssignments || []} />
              <QuickActions />
            </div>
          </div>
          
          {/* Bottom Section - Notifications */}
          <NotificationsPanel 
            notifications={notifications || []} 
            onMarkAsRead={async (id) => {
              try {
                await markNotificationAsRead(id);
              } catch (err) {
                console.error('Error marcando notificación como leída:', err);
              }
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;