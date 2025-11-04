import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverview = () => {
  const stats = [
    {
      id: 'total-courses',
      title: 'Cursos Activos',
      value: '24',
      change: '+12%',
      changeType: 'positive',
      icon: 'BookOpen',
      description: 'Cursos en progreso este semestre'
    },
    {
      id: 'total-students',
      title: 'Estudiantes Inscritos',
      value: '1,247',
      change: '+8%',
      changeType: 'positive',
      icon: 'Users',
      description: 'Estudiantes activos en la plataforma'
    },
    {
      id: 'completion-rate',
      title: 'Tasa de Finalización',
      value: '87%',
      change: '+5%',
      changeType: 'positive',
      icon: 'TrendingUp',
      description: 'Promedio de cursos completados'
    },
    {
      id: 'engagement-score',
      title: 'Puntuación de Participación',
      value: '92',
      change: '-2%',
      changeType: 'negative',
      icon: 'Activity',
      description: 'Nivel de actividad estudiantil'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.map((stat) => (
        <div key={stat?.id} className="academic-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name={stat?.icon} size={20} className="text-primary" />
            </div>
            <span className={`text-sm font-medium px-2 py-1 rounded-full ${
              stat?.changeType === 'positive' ?'text-success bg-success/10' :'text-destructive bg-destructive/10'
            }`}>
              {stat?.change}
            </span>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">{stat?.value}</h3>
            <p className="text-sm font-medium text-foreground">{stat?.title}</p>
            <p className="text-xs text-muted-foreground">{stat?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;