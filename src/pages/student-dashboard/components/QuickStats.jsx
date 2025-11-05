import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Cursos Activos',
      value: stats?.activeCourses,
      icon: 'BookOpen',
      color: 'bg-blue-500',
      change: '+2 este mes'
    },
    {
      title: 'Tareas Pendientes',
      value: stats?.pendingAssignments,
      icon: 'Clock',
      color: 'bg-amber-500',
      change: '3 esta semana'
    },
    {
      title: 'Progreso General',
      value: `${stats?.overallProgress}%`,
      icon: 'TrendingUp',
      color: 'bg-emerald-500',
      change: '+12% este mes'
    },
    {
      title: 'Mensajes Nuevos',
      value: stats?.newMessages,
      icon: 'MessageSquare',
      color: 'bg-purple-500',
      change: 'Últimas 24h'
    }
  ];

  // Solo mostrar stats con datos reales
  const validStats = [
    stats?.activeCourses && {
      title: 'Cursos Activos',
      value: stats.activeCourses,
      icon: 'BookOpen',
      color: 'bg-blue-500'
    },
    stats?.pendingAssignments && {
      title: 'Tareas Pendientes',
      value: stats.pendingAssignments,
      icon: 'Clock',
      color: 'bg-amber-500'
    },
    typeof stats?.overallProgress === 'number' && {
      title: 'Progreso General',
      value: `${stats.overallProgress}%`,
      icon: 'TrendingUp',
      color: 'bg-emerald-500'
    },
    typeof stats?.newMessages === 'number' && {
      title: 'Mensajes Nuevos',
      value: stats.newMessages,
      icon: 'MessageSquare',
      color: 'bg-purple-500'
    }
  ].filter(Boolean);

  if (!validStats.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
      {validStats.map((stat, index) => (
        <div 
          key={index} 
          className="bg-card border border-border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-200 transform hover:scale-102"
        >
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <div className={`w-8 sm:w-10 h-8 sm:h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
              <Icon 
                name={stat.icon} 
                size={16} 
                className="text-white sm:scale-125" 
              />
            </div>
            <span className="text-xl sm:text-2xl font-bold text-foreground">
              {stat.value}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">
              {stat.title}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;