import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import QuickActionsGrid from './components/QuickActionsGrid';
import StatsOverview from './components/StatsOverview';
import RecentActivity from './components/RecentActivity';
import CourseManagement from './components/CourseManagement';
import UserManagement from './components/UserManagement';
import AnalyticsDashboard from './components/AnalyticsDashboard';

const AdministrativePanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const tabs = [
    { id: 'overview', label: 'Resumen General', icon: 'LayoutDashboard' },
    { id: 'courses', label: 'Gestión de Cursos', icon: 'BookOpen' },
    { id: 'users', label: 'Gestión de Usuarios', icon: 'Users' },
    { id: 'analytics', label: 'Analíticas', icon: 'BarChart3' },
    { id: 'content', label: 'Gestión de Contenido', icon: 'FolderOpen' },
    { id: 'settings', label: 'Configuración', icon: 'Settings' }
  ];

  const handleQuickAction = (actionId) => {
    switch (actionId) {
      case 'create-course': setActiveTab('courses');
        break;
      case 'manage-users': setActiveTab('users');
        break;
      case 'view-analytics': setActiveTab('analytics');
        break;
      case 'upload-content': setActiveTab('content');
        break;
      case 'grade-management': setActiveTab('courses');
        break;
      case 'system-settings': setActiveTab('settings');
        break;
      default:
        break;
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Panel de Administración</h2>
              <p className="text-muted-foreground">
                Gestiona cursos, usuarios y contenido de la plataforma EduConnect
              </p>
            </div>
            
            <StatsOverview />
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-6">Acciones Rápidas</h3>
              <QuickActionsGrid onActionClick={handleQuickAction} />
            </div>
            
            <RecentActivity />
          </div>
        );
      
      case 'courses':
        return <CourseManagement />;
      
      case 'users':
        return <UserManagement />;
      
      case 'analytics':
        return <AnalyticsDashboard />;
      
      case 'content':
        return (
          <div className="academic-card p-8 text-center">
            <Icon name="FolderOpen" size={64} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Gestión de Contenido</h3>
            <p className="text-muted-foreground mb-6">
              Sistema de gestión de contenido multimedia en desarrollo
            </p>
            <Button variant="default" iconName="Upload" iconPosition="left">
              Subir Contenido
            </Button>
          </div>
        );
      
      case 'settings':
        return (
          <div className="academic-card p-8 text-center">
            <Icon name="Settings" size={64} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">Configuración del Sistema</h3>
            <p className="text-muted-foreground mb-6">
              Ajustes generales y configuración de la plataforma
            </p>
            <Button variant="default" iconName="Wrench" iconPosition="left">
              Abrir Configuración
            </Button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`pt-16 transition-all duration-300 ${
        sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
      }`}>
        <div className="p-6">
          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="max-w-7xl mx-auto">
            {renderTabContent()}
          </div>
        </div>
      </main>
      {/* Floating Action Button for Mobile */}
      <div className="fixed bottom-6 right-6 lg:hidden">
        <Button
          variant="default"
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg"
        >
          <Icon name="Plus" size={24} />
        </Button>
      </div>
    </div>
  );
};

export default AdministrativePanel;