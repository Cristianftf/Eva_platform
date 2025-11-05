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
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { Link } from 'react-router-dom';

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

  // Si hay error global, mostrar mensaje
  const hasGlobalError = error && typeof error === 'string';

  // Si hay error específico, mostrar mensaje contextual
  const hasSpecificError = error && typeof error === 'object';

  // Verificar si todos los datos necesarios están cargando
  const isLoading = loading || !userProfile;

  // Layout base que se reutiliza
  const DashboardLayout = ({ children }) => (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'}`}>
        <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );

  // Si hay error global, mostrar mensaje en todo el dashboard
  if (hasGlobalError) {
    return (
      <DashboardLayout>
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <Icon name="AlertTriangle" size={20} className="text-destructive shrink-0" />
            <p className="text-destructive text-sm sm:text-base">
              Error al cargar los datos: {error}
            </p>
          </div>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            <Icon name="RefreshCw" size={14} className="mr-2" />
            Reintentar
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  // Si está cargando inicialmente, mostrar spinner
  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center h-48 sm:h-64">
          <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-2 border-primary border-t-transparent"></div>
          <span className="mt-4 text-muted-foreground text-sm sm:text-base">
            Cargando dashboard...
          </span>
          {/* Mostrar progreso específico si está disponible */}
          {hasSpecificError && (
            <div className="mt-2 text-xs text-destructive">
              Error: {error.message}
            </div>
          )}
        </div>
      </DashboardLayout>
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
        <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-5 md:py-6 max-w-7xl mx-auto">
          {/* Welcome Header - Obtiene datos del AuthContext directamente */}
          <WelcomeHeader />
          
          {/* Quick Stats - Usa los stats calculados del hook */}
          {dashboardStats && <QuickStats stats={dashboardStats} />}
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-3 sm:mb-4 md:mb-6">
            {/* Left Column - Courses and Activity */}
            <div className="lg:col-span-2 space-y-3 sm:space-y-4 md:space-y-6">
              {/* Solo renderiza si hay datos */}
              {enrolledCourses?.length > 0 ? (
                <EnrolledCourses courses={enrolledCourses} />
              ) : !loading && (
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <Icon 
                    name="Book" 
                    size={32} 
                    className="mx-auto mb-2 text-muted-foreground"
                  />
                  <p className="text-muted-foreground">
                    No estás inscrito en ningún curso
                  </p>
                  <Button 
                    variant="default"
                    size="sm"
                    className="mt-4"
                  >
                    <Link to="/course-detail-pages">
                      Explorar cursos disponibles
                    </Link>
                  </Button>
                </div>
              )}

              {recentActivities?.length > 0 ? (
                <RecentActivity activities={recentActivities} />
              ) : !loading && (
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <Icon 
                    name="Activity" 
                    size={32} 
                    className="mx-auto mb-2 text-muted-foreground"
                  />
                  <p className="text-muted-foreground">
                    No hay actividad reciente para mostrar
                  </p>
                </div>
              )}
            </div>
            
            {/* Right Column - Deadlines and Actions */}
            <div className="space-y-3 sm:space-y-4 md:space-y-6">
              {upcomingAssignments?.length > 0 ? (
                <UpcomingDeadlines deadlines={upcomingAssignments} />
              ) : !loading && (
                <div className="bg-card border border-border rounded-lg p-4 text-center">
                  <Icon 
                    name="Calendar" 
                    size={32} 
                    className="mx-auto mb-2 text-muted-foreground"
                  />
                  <p className="text-muted-foreground">
                    No hay fechas límite próximas
                  </p>
                </div>
              )}
              {/* QuickActions es independiente del estado */}
              <QuickActions />
            </div>
          </div>
          
          {/* Bottom Section - Notifications */}
          {notifications?.length > 0 ? (
            <NotificationsPanel 
              notifications={notifications} 
              onMarkAsRead={async (id) => {
                try {
                  await markNotificationAsRead(id);
                } catch (err) {
                  console.error('Error marcando notificación como leída:', err);
                }
              }}
            />
          ) : !loading && (
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <Icon 
                name="Bell" 
                size={32} 
                className="mx-auto mb-2 text-muted-foreground"
              />
              <p className="text-muted-foreground">
                No tienes notificaciones nuevas
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;