import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const UpcomingDeadlines = ({ deadlines }) => {
  const getUrgencyColor = (daysLeft) => {
    if (daysLeft <= 1) return 'bg-red-100 text-red-800 border-red-200';
    if (daysLeft <= 3) return 'bg-amber-100 text-amber-800 border-amber-200';
    if (daysLeft <= 7) return 'bg-blue-100 text-blue-800 border-blue-200';
    return 'bg-emerald-100 text-emerald-800 border-emerald-200';
  };

  const getTypeIcon = (type) => {
    const icons = {
      'assignment': 'FileText',
      'quiz': 'HelpCircle',
      'exam': 'BookOpen',
      'project': 'Folder',
      'presentation': 'Monitor'
    };
    return icons?.[type] || 'Calendar';
  };

  const calculateDaysLeft = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDueDate = (dueDate) => {
    return new Date(dueDate)?.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 sm:p-4 md:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-foreground">Próximas Fechas Límite</h2>
        <Link 
          to="/assessment-interface" 
          className="text-primary hover:text-primary/80 text-xs sm:text-sm font-medium flex items-center gap-1"
        >
          <span>Ver calendario</span>
          <Icon name="Calendar" size={14} className="sm:scale-110" />
        </Link>
      </div>
      <div className="space-y-2 sm:space-y-3 max-h-[60vh] sm:max-h-80 overflow-y-auto">
        {deadlines?.map((deadline) => {
          const daysLeft = calculateDaysLeft(deadline?.dueDate);
          return (
            <div 
              key={deadline?.id} 
              className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg border border-border hover:shadow-sm transition-all duration-200 hover:border-primary/20"
            >
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-muted rounded-lg flex items-center justify-center">
                <Icon 
                  name={getTypeIcon(deadline?.type)} 
                  size={16} 
                  className="text-muted-foreground sm:scale-125" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground text-xs sm:text-sm line-clamp-1">
                  {deadline?.title}
                </h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                  {deadline?.course}
                </p>
                <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 sm:mt-1">
                  Vence: {formatDueDate(deadline?.dueDate)}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium border ${getUrgencyColor(daysLeft)}`}>
                  {daysLeft === 0 ? 'Hoy' : daysLeft === 1 ? 'Mañana' : `${daysLeft} días`}
                </span>
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={10} className="text-muted-foreground sm:scale-110" />
                  <span className="text-[10px] sm:text-xs text-muted-foreground">
                    {deadline?.estimatedTime}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
        {!deadlines?.length && (
          <div className="text-center py-4 text-sm text-muted-foreground">
            No hay fechas límite próximas
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcomingDeadlines;