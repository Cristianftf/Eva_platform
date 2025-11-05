import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationsPanel = ({ notifications }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [filter, setFilter] = useState('all');
  // local copy to support optimistic UI updates when marking read
  const [localNotifications, setLocalNotifications] = useState(notifications || []);

  useEffect(() => {
    setLocalNotifications(notifications || []);
  }, [notifications]);

  const getNotificationIcon = (type) => {
    const icons = {
      'assignment': 'FileText',
      'grade': 'Award',
      'message': 'MessageSquare',
      'announcement': 'Megaphone',
      'reminder': 'Clock',
      'system': 'Settings'
    };
    return icons?.[type] || 'Bell';
  };

  const getNotificationColor = (priority) => {
    const colors = {
      'high': 'border-l-red-500 bg-red-50',
      'medium': 'border-l-amber-500 bg-amber-50',
      'low': 'border-l-blue-500 bg-blue-50'
    };
    return colors?.[priority] || 'border-l-gray-500 bg-gray-50';
  };

  const filteredNotifications = localNotifications?.filter(notification => 
    filter === 'all' || notification?.type === filter
  );

  const unreadCount = localNotifications?.filter(n => !n?.read)?.length;

  const handleMarkAsRead = async (notificationId) => {
    // Optimistic UI update
    setLocalNotifications(prev => prev?.map(n => n?.id === notificationId ? { ...n, read: true } : n));

    if (typeof onMarkAsRead === 'function') {
      try {
        await onMarkAsRead(notificationId);
      } catch (err) {
        // revert if error
        console.error('Error marking notification as read:', err);
        setLocalNotifications(prev => prev?.map(n => n?.id === notificationId ? { ...n, read: false } : n));
      }
    }
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
        <div className="flex items-center gap-2">
          <h2 className="text-base sm:text-lg font-semibold text-foreground">Notificaciones</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          className="text-xs sm:text-sm"
        >
          {isExpanded ? 'Contraer' : 'Expandir'}
        </Button>
      </div>
      {/* Filter Tabs */}
      <div className="flex gap-1 mb-3 sm:mb-4 bg-muted rounded-lg p-1">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'assignment', label: 'Tareas' },
          { key: 'message', label: 'Mensajes' },
          { key: 'announcement', label: 'Anuncios' }
        ]?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => setFilter(tab?.key)}
            className={`px-2 sm:px-3 py-1 rounded-md text-[10px] sm:text-xs font-medium transition-colors duration-200 ${
              filter === tab?.key
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab?.label}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className={`space-y-2 sm:space-y-3 ${isExpanded ? 'max-h-[80vh] sm:max-h-96' : 'max-h-40 sm:max-h-48'} overflow-y-auto`}>
        {filteredNotifications?.slice(0, isExpanded ? undefined : 5)?.map((notification) => (
          <div 
            key={notification?.id} 
            className={`p-2 sm:p-3 rounded-lg border-l-4 ${getNotificationColor(notification?.priority)} ${
              !notification?.read ? 'border-2 border-primary/20' : ''
            }`}
          >
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
                <Icon 
                  name={getNotificationIcon(notification?.type)} 
                  size={14} 
                  className="text-muted-foreground sm:scale-110" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                  <h4 className="text-xs sm:text-sm font-medium text-foreground line-clamp-1">
                    {notification?.title}
                  </h4>
                  <span className="text-[10px] sm:text-xs text-muted-foreground ml-2">
                    {formatTimeAgo(notification?.timestamp)}
                  </span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">
                  {notification?.message}
                </p>
                {notification?.course && (
                  <span className="inline-block mt-1 px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted rounded text-[10px] sm:text-xs text-muted-foreground">
                    {notification?.course}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-end gap-1 sm:gap-2 ml-2">
                {!notification?.read ? (
                  <button
                    className="text-[10px] sm:text-xs text-primary hover:underline"
                    onClick={() => handleMarkAsRead(notification?.id)}
                  >
                    Marcar leída
                  </button>
                ) : (
                  <span className="text-[10px] sm:text-xs text-muted-foreground">Leída</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredNotifications?.length === 0 && (
        <div className="text-center py-6 sm:py-8">
          <Icon 
            name="Bell" 
            size={36} 
            className="text-muted-foreground mx-auto mb-2 sm:scale-125" 
          />
          <p className="text-xs sm:text-sm text-muted-foreground">No hay notificaciones</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;