import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { useRecentActivity } from '../hooks/useAdmin';

const RecentActivity = () => {
  const { activities, loading, error, refetch } = useRecentActivity(5);
  
  if (loading) {
    return (
      <div className="academic-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Actividad Reciente</h3>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-start space-x-4 p-3 animate-pulse">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-muted rounded-full"></div>
            </div>
            <div className="flex-1">
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
              <div className="h-2 bg-muted rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="academic-card p-6">
        <div className="text-center text-destructive">
          <Icon name="AlertTriangle" className="w-12 h-12 mx-auto mb-2" />
          <p className="text-lg font-semibold">Error al cargar las actividades</p>
          <button 
            onClick={refetch}
            className="mt-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const mockActivities = [
    {
      id: 1,
      type: 'course_created',
      title: 'Nuevo curso creado',
      description: 'Matemáticas Avanzadas - Cálculo Diferencial',
      user: 'Dr. María González',
      userAvatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      userAvatarAlt: 'Professional woman with brown hair in white blazer smiling at camera',
      timestamp: '2025-11-03T16:30:00',
      icon: 'Plus',
      iconColor: 'text-success'
    },
    {
      id: 2,
      type: 'content_uploaded',
      title: 'Contenido multimedia subido',
      description: '15 videos de conferencias añadidos al curso de Física',
      user: 'Prof. Carlos Ruiz',
      userAvatar: "https://images.unsplash.com/photo-1713946598186-8e28275719b9",
      userAvatarAlt: 'Middle-aged man with glasses and beard in dark suit jacket',
      timestamp: '2025-11-03T15:45:00',
      icon: 'Upload',
      iconColor: 'text-primary'
    },
    {
      id: 3,
      type: 'user_enrolled',
      title: 'Inscripciones masivas procesadas',
      description: '47 estudiantes inscritos en cursos de ingeniería',
      user: 'Sistema Automático',
      userAvatar: "https://images.unsplash.com/photo-1726440464439-81579d883f5e",
      userAvatarAlt: 'Young professional man in blue shirt smiling confidently',
      timestamp: '2025-11-03T14:20:00',
      icon: 'UserPlus',
      iconColor: 'text-secondary'
    },
    {
      id: 4,
      type: 'grade_updated',
      title: 'Calificaciones actualizadas',
      description: 'Examen final de Química Orgánica - 89 estudiantes',
      user: 'Dra. Ana López',
      userAvatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
      userAvatarAlt: 'Professional woman with blonde hair in navy blue blazer',
      timestamp: '2025-11-03T13:15:00',
      icon: 'Award',
      iconColor: 'text-warning'
    },
    {
      id: 5,
      type: 'system_backup',
      title: 'Respaldo del sistema completado',
      description: 'Respaldo automático de base de datos y contenido',
      user: 'Sistema',
      userAvatar: "https://images.unsplash.com/photo-1714974528889-d51109fb6ae9",
      userAvatarAlt: 'Professional man with dark hair in gray suit and tie',
      timestamp: '2025-11-03T12:00:00',
      icon: 'Shield',
      iconColor: 'text-muted-foreground'
    }
  ];


  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `hace ${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      return `hace ${Math.floor(diffInMinutes / 60)} h`;
    } else {
      return date?.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  return (
    <div className="academic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Actividad Reciente</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium">
          Ver todo
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) =>
        <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <div className="flex-shrink-0">
              <div className="relative">
                <Image
                src={activity?.userAvatar}
                alt={activity?.userAvatarAlt}
                className="w-10 h-10 rounded-full object-cover" />

                <div className="absolute -bottom-1 -right-1 p-1 bg-card rounded-full border border-border">
                  <Icon name={activity?.icon} size={12} className={activity?.iconColor} />
                </div>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity?.title}</p>
                  <p className="text-sm text-muted-foreground mt-1">{activity?.description}</p>
                  <div className="flex items-center mt-2 text-xs text-muted-foreground">
                    <span>{activity?.user}</span>
                    <span className="mx-2">•</span>
                    <span>{formatTime(activity?.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

};

export default RecentActivity;