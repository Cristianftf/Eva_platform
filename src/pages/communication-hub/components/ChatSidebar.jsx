import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { useChat, useConsultations } from '../../../hooks/useCommunication';

const ChatSidebar = ({ activeTab, onTabChange, selectedChat, onChatSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { chats, loading: chatsLoading, error: chatsError } = useChat();
  const { consultations, loading: consultationsLoading, error: consultationsError } = useConsultations();

  // Derivar listas a partir de `chats` que provee el hook
  const directMessages = Array.isArray(chats) ? chats.filter(chat => !chat.isGroup) : [];
  const groupChats = Array.isArray(chats) ? chats.filter(chat => chat.isGroup) : [];

  // Usar consultas obtenidas desde el hook (si no hay, caer en arreglo vacío)
  const professorConsultations = Array.isArray(consultations) ? consultations : [];


  const formatTime = (date) => {
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'Ahora';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
    return date?.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  const filteredDirectMessages = directMessages?.filter((chat) =>
  chat?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const filteredGroupChats = groupChats?.filter((chat) =>
  chat?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  );

  const renderChatItem = (chat) =>
  <div
    key={chat?.id}
    onClick={() => onChatSelect(chat)}
    className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted ${
    selectedChat?.id === chat?.id ? 'bg-primary text-primary-foreground' : ''}`
    }>

      <div className="relative">
        <Image
        src={chat?.avatar}
        alt={chat?.avatarAlt}
        className="w-12 h-12 rounded-full object-cover" />

        {chat?.online &&
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full"></div>
      }
      </div>
      
      <div className="flex-1 ml-3 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h4 className="font-medium text-sm truncate">{chat?.name}</h4>
          <span className="text-xs opacity-70">
            {chat?.timestamp ? formatTime(chat?.timestamp) : chat?.nextSession}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <p className="text-xs opacity-80 truncate">
            {chat?.lastMessage || chat?.subject}
          </p>
          {chat?.unread > 0 &&
        <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
              {chat?.unread}
            </span>
        }
        </div>
        
        {chat?.members &&
      <div className="flex items-center mt-1">
            <Icon name="Users" size={12} className="opacity-60 mr-1" />
            <span className="text-xs opacity-60">{chat?.members} miembros</span>
          </div>
      }
      </div>
    </div>;


  return (
    <div className="w-80 bg-card border-r border-border h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Comunicación</h2>
          <Button variant="ghost" size="icon">
            <Icon name="Settings" size={18} />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar conversaciones..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary" />

        </div>
      </div>
      {/* Tabs */}
      <div className="flex border-b border-border">
        {[
        { id: 'messages', label: 'Mensajes', icon: 'MessageSquare' },
        { id: 'groups', label: 'Grupos', icon: 'Users' },
        { id: 'consultations', label: 'Consultas', icon: 'Calendar' }]?.
        map((tab) =>
        <button
          key={tab?.id}
          onClick={() => onTabChange(tab?.id)}
          className={`flex-1 flex items-center justify-center space-x-2 py-3 text-sm font-medium transition-colors ${
          activeTab === tab?.id ?
          'text-primary border-b-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`
          }>

            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        )}
      </div>
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {activeTab === 'messages' &&
        <>
          {chatsLoading ? (
            <div className="text-center py-8">
              <Icon name="Loader" size={32} className="animate-spin mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Cargando mensajes...</p>
            </div>
          ) : chatsError ? (
            <div className="text-center py-8 text-red-600">{String(chatsError)}</div>
          ) : filteredDirectMessages?.length > 0 ? (
            filteredDirectMessages?.map(renderChatItem)
          ) : (
            <div className="text-center py-8">
              <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron mensajes</p>
            </div>
          )}
        </>
        }

        {activeTab === 'groups' &&
        <>
          {chatsLoading ? (
            <div className="text-center py-8">
              <Icon name="Loader" size={32} className="animate-spin mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Cargando grupos...</p>
            </div>
          ) : chatsError ? (
            <div className="text-center py-8 text-red-600">{String(chatsError)}</div>
          ) : filteredGroupChats?.length > 0 ? (
            filteredGroupChats?.map(renderChatItem)
          ) : (
            <div className="text-center py-8">
              <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No se encontraron grupos</p>
            </div>
          )}
        </>
        }

        {activeTab === 'consultations' &&
        <>
          {consultationsLoading ? (
            <div className="text-center py-8">
              <Icon name="Loader" size={32} className="animate-spin mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Cargando consultas...</p>
            </div>
          ) : consultationsError ? (
            <div className="text-center py-8 text-red-600">{String(consultationsError)}</div>
          ) : (
            professorConsultations?.map((consultation) => (
              <div
                key={consultation?.id}
                onClick={() => onChatSelect(consultation)}
                className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-muted ${
                  selectedChat?.id === consultation?.id ? 'bg-primary text-primary-foreground' : ''}`
                }>

                <div className="flex items-center space-x-3">
                  <Image
                    src={consultation?.avatar}
                    alt={consultation?.avatarAlt}
                    className="w-12 h-12 rounded-full object-cover" />

                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{consultation?.name}</h4>
                    <p className="text-xs opacity-80">{consultation?.subject}</p>
                    <div className="flex items-center mt-1">
                      <Icon name="Clock" size={12} className="mr-1 opacity-60" />
                      <span className="text-xs opacity-60">{consultation?.nextSession}</span>
                      <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                        consultation?.status === 'confirmed' ? 'bg-success text-success-foreground' : 'bg-warning text-warning-foreground'}`
                      }>
                        {consultation?.status === 'confirmed' ? 'Confirmada' : 'Pendiente'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          </>
        }
      </div>
      {/* New Chat Button */}
      <div className="p-4 border-t border-border">
        <Button variant="default" className="w-full" iconName="Plus" iconPosition="left">
          Nueva Conversación
        </Button>
      </div>
    </div>);

};

export default ChatSidebar;