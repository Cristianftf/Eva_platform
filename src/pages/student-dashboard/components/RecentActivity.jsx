import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'forum': 'MessageCircle',
      'assignment': 'FileText',
      'quiz': 'HelpCircle',
      'interaction': 'Users',
      'grade': 'Award',
      'announcement': 'Megaphone'
    };
    return icons?.[type] || 'Bell';
  };

  const getActivityColor = (type) => {
    const colors = {
      'forum': 'text-blue-500',
      'assignment': 'text-emerald-500',
      'quiz': 'text-purple-500',
      'interaction': 'text-amber-500',
      'grade': 'text-pink-500',
      'announcement': 'text-red-500'
    };
    return colors?.[type] || 'text-gray-500';
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 60) return `hace ${diffInMinutes} min`;
    if (diffInMinutes < 1440) return `hace ${Math.floor(diffInMinutes / 60)} h`;
    return `hace ${Math.floor(diffInMinutes / 1440)} días`;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-3 sm:p-4 md:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-foreground">Actividad Reciente</h2>
        <button className="text-primary hover:text-primary/80 text-xs sm:text-sm font-medium">
          Ver todo
        </button>
      </div>
      <div className="space-y-2 sm:space-y-3 md:space-y-4 max-h-[60vh] sm:max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div 
            key={activity?.id} 
            className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-all duration-200"
          >
            <div 
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}
            >
              <Icon 
                name={getActivityIcon(activity?.type)} 
                size={14} 
                className="sm:scale-110" 
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs sm:text-sm text-foreground line-clamp-2">
                <span className="font-medium">{activity?.user}</span>
                <span className="mx-1">{activity?.action}</span>
                <span className="font-medium">{activity?.target}</span>
              </p>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mt-0.5 sm:mt-1">
                <span className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                  {activity?.course}
                </span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">•</span>
                <span className="text-[10px] sm:text-xs text-muted-foreground">
                  {formatTimeAgo(activity?.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
        {!activities?.length && (
          <div className="text-center py-4 text-sm text-muted-foreground">
            No hay actividad reciente
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivity;