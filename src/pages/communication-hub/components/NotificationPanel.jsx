import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationPanel = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState({
    messages: true,
    groupMessages: true,
    consultations: true,
    assignments: true,
    announcements: true,
    mentions: true
  });

  const [doNotDisturb, setDoNotDisturb] = useState({
    enabled: false,
    startTime: '22:00',
    endTime: '08:00'
  });

  const [soundSettings, setSoundSettings] = useState({
    messageSound: true,
    notificationSound: true,
    volume: 70
  });

  const handleNotificationChange = (key, value) => {
    setNotifications(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleDoNotDisturbChange = (key, value) => {
    setDoNotDisturb(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSoundChange = (key, value) => {
    setSoundSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const notificationOptions = [
    {
      key: 'messages',
      label: 'Mensajes Directos',
      description: 'Notificaciones de mensajes privados',
      icon: 'MessageSquare'
    },
    {
      key: 'groupMessages',
      label: 'Mensajes de Grupo',
      description: 'Notificaciones de chats grupales',
      icon: 'Users'
    },
    {
      key: 'consultations',
      label: 'Consultas con Profesores',
      description: 'Recordatorios y confirmaciones de citas',
      icon: 'Calendar'
    },
    {
      key: 'assignments',
      label: 'Tareas y Evaluaciones',
      description: 'Fechas límite y nuevas asignaciones',
      icon: 'FileText'
    },
    {
      key: 'announcements',
      label: 'Anuncios',
      description: 'Comunicados importantes de la institución',
      icon: 'Megaphone'
    },
    {
      key: 'mentions',
      label: 'Menciones',
      description: 'Cuando alguien te menciona en un chat',
      icon: 'AtSign'
    }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Bell" size={24} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Configuración de Notificaciones</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Notification Types */}
          <div>
            <h3 className="font-medium text-foreground mb-4">Tipos de Notificación</h3>
            <div className="space-y-4">
              {notificationOptions?.map((option) => (
                <div key={option?.key} className="flex items-start space-x-3">
                  <Checkbox
                    checked={notifications?.[option?.key]}
                    onChange={(e) => handleNotificationChange(option?.key, e?.target?.checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Icon name={option?.icon} size={16} className="text-primary" />
                      <span className="font-medium text-foreground">{option?.label}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{option?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Do Not Disturb */}
          <div className="border-t border-border pt-6">
            <h3 className="font-medium text-foreground mb-4">No Molestar</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={doNotDisturb?.enabled}
                  onChange={(e) => handleDoNotDisturbChange('enabled', e?.target?.checked)}
                />
                <div>
                  <span className="font-medium text-foreground">Activar modo No Molestar</span>
                  <p className="text-sm text-muted-foreground">Silencia todas las notificaciones durante las horas especificadas</p>
                </div>
              </div>

              {doNotDisturb?.enabled && (
                <div className="ml-6 grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Desde</label>
                    <input
                      type="time"
                      value={doNotDisturb?.startTime}
                      onChange={(e) => handleDoNotDisturbChange('startTime', e?.target?.value)}
                      className="w-full p-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Hasta</label>
                    <input
                      type="time"
                      value={doNotDisturb?.endTime}
                      onChange={(e) => handleDoNotDisturbChange('endTime', e?.target?.value)}
                      className="w-full p-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sound Settings */}
          <div className="border-t border-border pt-6">
            <h3 className="font-medium text-foreground mb-4">Configuración de Sonido</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={soundSettings?.messageSound}
                  onChange={(e) => handleSoundChange('messageSound', e?.target?.checked)}
                />
                <div>
                  <span className="font-medium text-foreground">Sonido de Mensajes</span>
                  <p className="text-sm text-muted-foreground">Reproducir sonido al recibir mensajes</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={soundSettings?.notificationSound}
                  onChange={(e) => handleSoundChange('notificationSound', e?.target?.checked)}
                />
                <div>
                  <span className="font-medium text-foreground">Sonido de Notificaciones</span>
                  <p className="text-sm text-muted-foreground">Reproducir sonido para otras notificaciones</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Volumen: {soundSettings?.volume}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={soundSettings?.volume}
                  onChange={(e) => handleSoundChange('volume', parseInt(e?.target?.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="border-t border-border pt-6">
            <h3 className="font-medium text-foreground mb-4">Acciones Rápidas</h3>
            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="justify-start" iconName="BellOff" iconPosition="left">
                Silenciar Todo
              </Button>
              <Button variant="outline" className="justify-start" iconName="Bell" iconPosition="left">
                Activar Todo
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="default" onClick={onClose}>
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationPanel;