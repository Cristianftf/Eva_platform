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
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Actividad Reciente</h2>
        <button className="text-primary hover:text-primary/80 text-sm font-medium">
          Ver todo
        </button>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200">
            <div className={`w-8 h-8 rounded-full bg-muted flex items-center justify-center ${getActivityColor(activity?.type)}`}>
              <Icon name={getActivityIcon(activity?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity?.user}</span>
                <span className="mx-1">{activity?.action}</span>
                <span className="font-medium">{activity?.target}</span>
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-xs text-muted-foreground">{activity?.course}</span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">{formatTimeAgo(activity?.timestamp)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;