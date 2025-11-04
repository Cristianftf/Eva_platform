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
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold text-foreground">Notificaciones</h2>
          {unreadCount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
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
        >
          {isExpanded ? 'Contraer' : 'Expandir'}
        </Button>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 bg-muted rounded-lg p-1">
        {[
          { key: 'all', label: 'Todas' },
          { key: 'assignment', label: 'Tareas' },
          { key: 'message', label: 'Mensajes' },
          { key: 'announcement', label: 'Anuncios' }
        ]?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => setFilter(tab?.key)}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors duration-200 ${
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
      <div className={`space-y-3 ${isExpanded ? 'max-h-96' : 'max-h-48'} overflow-y-auto`}>
        {filteredNotifications?.slice(0, isExpanded ? undefined : 5)?.map((notification) => (
          <div 
            key={notification?.id} 
            className={`p-3 rounded-lg border-l-4 ${getNotificationColor(notification?.priority)} ${
              !notification?.read ? 'border-2 border-primary/20' : ''
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <Icon 
                  name={getNotificationIcon(notification?.type)} 
                  size={16} 
                  className="text-muted-foreground" 
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="text-sm font-medium text-foreground line-clamp-1">
                    {notification?.title}
                  </h4>
                  <span className="text-xs text-muted-foreground">
                    {formatTimeAgo(notification?.timestamp)}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {notification?.message}
                </p>
                {notification?.course && (
                  <span className="inline-block mt-1 px-2 py-1 bg-muted rounded text-xs text-muted-foreground">
                    {notification?.course}
                  </span>
                )}
              </div>
              <div className="flex flex-col items-end space-y-2">
                {!notification?.read ? (
                  <button
                    className="text-xs text-primary hover:underline"
                    onClick={() => handleMarkAsRead(notification?.id)}
                  >
                    Marcar leída
                  </button>
                ) : (
                  <span className="text-xs text-muted-foreground">Leída</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredNotifications?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">No hay notificaciones</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPanel;