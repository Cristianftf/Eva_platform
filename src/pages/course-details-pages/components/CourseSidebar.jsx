import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseSidebar = ({ onChatToggle, onResourceDownload }) => {
  const [activeChat, setActiveChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [messages, setMessages] = useState([
  {
    id: 1,
    sender: "María González",
    avatar: "https://images.unsplash.com/photo-1714917368530-368b8fa918bd",
    avatarAlt: "Professional headshot of Hispanic woman with shoulder-length dark hair smiling at camera",
    message: "¿Alguien puede ayudarme con el ejercicio 3 del módulo 2?",
    timestamp: new Date(Date.now() - 300000),
    isOnline: true
  },
  {
    id: 2,
    sender: "Carlos Rodríguez",
    avatar: "https://images.unsplash.com/photo-1667575949231-fbf430640797",
    avatarAlt: "Professional headshot of male instructor with beard wearing dark shirt",
    message: "Claro María, te puedo ayudar. ¿En qué parte específica tienes dudas?",
    timestamp: new Date(Date.now() - 240000),
    isOnline: true,
    isInstructor: true
  },
  {
    id: 3,
    sender: "Ana Martín",
    avatar: "https://images.unsplash.com/photo-1648466982925-65dac4ed0814",
    avatarAlt: "Professional headshot of young woman with blonde hair in business attire",
    message: "Yo también tengo la misma duda. ¿Podríamos hacer una sesión de estudio grupal?",
    timestamp: new Date(Date.now() - 180000),
    isOnline: false
  }]
  );

  const resources = [
  {
    id: 1,
    name: "Guía de React Hooks",
    type: "PDF",
    size: "2.4 MB",
    icon: "FileText",
    downloadUrl: "#"
  },
  {
    id: 2,
    name: "Código de Ejemplos",
    type: "ZIP",
    size: "15.8 MB",
    icon: "Archive",
    downloadUrl: "#"
  },
  {
    id: 3,
    name: "Presentación del Módulo",
    type: "PPTX",
    size: "8.2 MB",
    icon: "Presentation",
    downloadUrl: "#"
  },
  {
    id: 4,
    name: "Ejercicios Prácticos",
    type: "PDF",
    size: "1.8 MB",
    icon: "FileText",
    downloadUrl: "#"
  }];


  const studyGroup = [
  {
    id: 1,
    name: "María González",
    avatar: "https://images.unsplash.com/photo-1714917368530-368b8fa918bd",
    avatarAlt: "Professional headshot of Hispanic woman with shoulder-length dark hair smiling at camera",
    status: "online",
    progress: 85
  },
  {
    id: 2,
    name: "David López",
    avatar: "https://images.unsplash.com/photo-1641479160067-5ae7bde244b0",
    avatarAlt: "Professional headshot of young man with short brown hair in casual shirt",
    status: "away",
    progress: 72
  },
  {
    id: 3,
    name: "Ana Martín",
    avatar: "https://images.unsplash.com/photo-1648466982925-65dac4ed0814",
    avatarAlt: "Professional headshot of young woman with blonde hair in business attire",
    status: "offline",
    progress: 91
  },
  {
    id: 4,
    name: "Luis Fernández",
    avatar: "https://images.unsplash.com/photo-1585066047759-3438c34cf676",
    avatarAlt: "Professional headshot of man with glasses and beard in business suit",
    status: "online",
    progress: 68
  }];


  const handleSendMessage = () => {
    if (chatMessage?.trim()) {
      const newMessage = {
        id: messages?.length + 1,
        sender: "Tú",
        avatar: "https://images.unsplash.com/photo-1715433493294-3522e8dbe6e1",
        avatarAlt: "Current user profile photo showing person with friendly smile",
        message: chatMessage,
        timestamp: new Date(),
        isOnline: true,
        isCurrentUser: true
      };
      setMessages([...messages, newMessage]);
      setChatMessage('');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'online':return 'bg-success';
      case 'away':return 'bg-warning';
      case 'offline':return 'bg-muted-foreground';
      default:return 'bg-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));

    if (diffInMinutes < 1) return 'Ahora';
    if (diffInMinutes < 60) return `${diffInMinutes}min`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h`;

    return timestamp?.toLocaleDateString('es-ES');
  };

  return (
    <div className="w-80 bg-card border-l border-border h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Users" size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Grupo de Estudio</h3>
            <p className="text-sm text-muted-foreground">{studyGroup?.length} miembros</p>
          </div>
        </div>
        
        <Button
          variant={activeChat ? "default" : "outline"}
          onClick={() => {
            setActiveChat(!activeChat);
            onChatToggle?.(!activeChat);
          }}
          iconName="MessageSquare"
          iconPosition="left"
          fullWidth>

          {activeChat ? 'Ocultar Chat' : 'Abrir Chat'}
        </Button>
      </div>
      {/* Chat Section */}
      {activeChat &&
      <div className="flex-1 flex flex-col border-b border-border">
          <div className="p-3 border-b border-border">
            <h4 className="font-medium text-foreground">Chat del Curso</h4>
          </div>
          
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 max-h-60">
            {messages?.map((msg) =>
          <div key={msg?.id} className={`flex gap-2 ${msg?.isCurrentUser ? 'flex-row-reverse' : ''}`}>
                <Image
              src={msg?.avatar}
              alt={msg?.avatarAlt}
              className="w-8 h-8 rounded-full object-cover flex-shrink-0" />

                <div className={`flex-1 ${msg?.isCurrentUser ? 'text-right' : ''}`}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-foreground">{msg?.sender}</span>
                    {msg?.isInstructor &&
                <span className="px-1 py-0.5 bg-primary bg-opacity-10 text-primary text-xs rounded">
                        Profesor
                      </span>
                }
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(msg?.timestamp)}
                    </span>
                  </div>
                  <div className={`p-2 rounded-lg text-sm ${
              msg?.isCurrentUser ?
              'bg-primary text-primary-foreground ml-4' :
              'bg-muted text-foreground mr-4'}`
              }>
                    {msg?.message}
                  </div>
                </div>
              </div>
          )}
          </div>
          
          {/* Message Input */}
          <div className="p-3 border-t border-border">
            <div className="flex gap-2">
              <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={chatMessage}
              onChange={(e) => setChatMessage(e?.target?.value)}
              onKeyPress={(e) => e?.key === 'Enter' && handleSendMessage()}
              className="flex-1 p-2 text-sm border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent" />

              <Button
              variant="default"
              size="icon"
              onClick={handleSendMessage}
              disabled={!chatMessage?.trim()}>

                <Icon name="Send" size={16} />
              </Button>
            </div>
          </div>
        </div>
      }
      {/* Study Group Members */}
      <div className="p-4 border-b border-border">
        <h4 className="font-medium text-foreground mb-3">Compañeros de Estudio</h4>
        <div className="space-y-2">
          {studyGroup?.map((member) =>
          <div key={member?.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
              <div className="relative">
                <Image
                src={member?.avatar}
                alt={member?.avatarAlt}
                className="w-8 h-8 rounded-full object-cover" />

                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-card ${getStatusColor(member?.status)}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{member?.name}</p>
                <div className="flex items-center gap-2">
                  <div className="flex-1 bg-background rounded-full h-1">
                    <div
                    className="bg-success h-1 rounded-full transition-all duration-300"
                    style={{ width: `${member?.progress}%` }} />

                  </div>
                  <span className="text-xs text-muted-foreground">{member?.progress}%</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Course Resources */}
      <div className="p-4">
        <h4 className="font-medium text-foreground mb-3">Recursos del Curso</h4>
        <div className="space-y-2">
          {resources?.map((resource) =>
          <div key={resource?.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
              <div className="w-8 h-8 bg-primary bg-opacity-10 rounded-lg flex items-center justify-center">
                <Icon name={resource?.icon} size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{resource?.name}</p>
                <p className="text-xs text-muted-foreground">{resource?.type} • {resource?.size}</p>
              </div>
              <Button
              variant="ghost"
              size="icon"
              onClick={() => onResourceDownload?.(resource)}
              className="flex-shrink-0">

                <Icon name="Download" size={16} />
              </Button>
            </div>
          )}
        </div> 
        
        <Button
          variant="outline"
          fullWidth
          iconName="FolderOpen"
          iconPosition="left"
          className="mt-3">

          Ver Todos los Recursos
        </Button>
      </div>
    </div>);

};

export default CourseSidebar;