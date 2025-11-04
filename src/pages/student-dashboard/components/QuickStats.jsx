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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between mb-3">
            <div className={`w-10 h-10 ${stat?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={20} className="text-white" />
            </div>
            <span className="text-2xl font-bold text-foreground">{stat?.value}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground mb-1">{stat?.title}</p>
            <p className="text-xs text-muted-foreground">{stat?.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickStats;