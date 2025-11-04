import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import ProfileHeader from './components/ProfileHeader';
import AchievementBadges from './components/AchievementBadges';
import ProgressAnalytics from './components/ProgressAnalytics';
import GoalTracker from './components/GoalTracker';
import SettingsPanel from './components/SettingsPanel';

const ProfileProgressCenter = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const tabs = [
    { id: 'overview', name: 'Resumen', icon: 'LayoutDashboard' },
    { id: 'analytics', name: 'Análisis', icon: 'BarChart3' },
    { id: 'achievements', name: 'Logros', icon: 'Award' },
    { id: 'goals', name: 'Objetivos', icon: 'Target' },
    { id: 'settings', name: 'Configuración', icon: 'Settings' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <ProfileHeader />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AchievementBadges />
              </div>
              <div className="space-y-6">
                <GoalTracker />
              </div>
            </div>
          </div>
        );
      case 'analytics':
        return <ProgressAnalytics />;
      case 'achievements':
        return <AchievementBadges />;
      case 'goals':
        return <GoalTracker />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return (
          <div className="space-y-6">
            <ProfileHeader />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <AchievementBadges />
              </div>
              <div className="space-y-6">
                <GoalTracker />
              </div>
            </div>
          </div>
        );
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
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Centro de Perfil y Progreso
                </h1>
                <p className="text-muted-foreground">
                  Gestiona tu perfil académico, visualiza tu progreso y establece objetivos de aprendizaje
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Icon name="Download" size={16} className="mr-2" />
                  Exportar Datos
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Share2" size={16} className="mr-2" />
                  Compartir Perfil
                </Button>
                <Button variant="default" size="sm">
                  <Icon name="FileText" size={16} className="mr-2" />
                  Generar Reporte
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="pb-8">
            {renderTabContent()}
          </div>

          {/* Quick Actions Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="bg-card rounded-lg border border-border academic-shadow p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Acciones Rápidas</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Icon name="BookOpen" size={24} />
                  <span className="text-sm">Ver Cursos</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Icon name="MessageSquare" size={24} />
                  <span className="text-sm">Mensajes</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Icon name="Calendar" size={24} />
                  <span className="text-sm">Calendario</span>
                </Button>
                <Button variant="outline" className="flex flex-col items-center gap-2 h-auto py-4">
                  <Icon name="HelpCircle" size={24} />
                  <span className="text-sm">Ayuda</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileProgressCenter;