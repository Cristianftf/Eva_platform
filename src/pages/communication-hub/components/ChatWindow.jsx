import React, { useState, useRef, useEffect, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatWindow = ({ selectedChat }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const messagesEndRef = useRef(null);

  const messages = useMemo(() => [
    {
      id: 1,
      sender: "Dr. María González",
      avatar: "https://images.unsplash.com/photo-1704455304918-9096fc53e795",
      avatarAlt: "Professional headshot of Hispanic woman with dark hair in white lab coat",
      content: "Hola Alex, espero que estés bien. ¿Has tenido oportunidad de revisar los ejercicios de cálculo que asigné la semana pasada?",
      timestamp: new Date(Date.now() - 3600000),
      isOwn: false,
      type: 'text'
    },
    {
      id: 2,
      sender: "Tú",
      content: "¡Hola profesora! Sí, he estado trabajando en ellos. Tengo algunas dudas sobre los límites infinitos.",
      timestamp: new Date(Date.now() - 3300000),
      isOwn: true,
      type: 'text'
    },
    {
      id: 3,
      sender: "Dr. María González",
      avatar: "https://images.unsplash.com/photo-1704455304918-9096fc53e795",
      avatarAlt: "Professional headshot of Hispanic woman with dark hair in white lab coat",
      content: "Perfecto, es normal tener dudas con ese tema. ¿Podrías ser más específica sobre qué parte te resulta más difícil?",
      timestamp: new Date(Date.now() - 3000000),
      isOwn: false,
      type: 'text'
    },
    {
      id: 4,
      sender: "Tú",
      content: "Principalmente cuando tengo que evaluar límites que tienden a infinito con funciones racionales.",
      timestamp: new Date(Date.now() - 2700000),
      isOwn: true,
      type: 'text'
    },
    {
      id: 5,
      sender: "Dr. María González",
      avatar: "https://images.unsplash.com/photo-1704455304918-9096fc53e795",
      avatarAlt: "Professional headshot of Hispanic woman with dark hair in white lab coat",
      content: "Te voy a compartir un documento que explica paso a paso cómo resolver este tipo de límites.",
      timestamp: new Date(Date.now() - 2400000),
      isOwn: false,
      type: 'text'
    },
    { 
      id: 6,
      sender: "Dr. María González",
      avatar: "https://images.unsplash.com/photo-1704455304918-9096fc53e795",
      avatarAlt: "Professional headshot of Hispanic woman with dark hair in white lab coat",
      attachment: {
        type: 'file',
        name: 'Límites_Infinitos_Guía.pdf',
        size: '2.4 MB',
        icon: 'FileText'
      },
      timestamp: new Date(Date.now() - 2100000),
      isOwn: false,
      type: 'file'
    },
    {
      id: 7,
      sender: "Tú",
      content: "¡Muchas gracias profesora! Lo revisaré esta tarde y le haré saber si tengo más preguntas.",
      timestamp: new Date(Date.now() - 1800000),
      isOwn: true,
      type: 'text'
    },
    {
      id: 8,
      sender: "Dr. María González",
      avatar: "https://images.unsplash.com/photo-1704455304918-9096fc53e795",
      avatarAlt: "Professional headshot of Hispanic woman with dark hair in white lab coat",
      content: "Excelente. También recuerda que tengo horario de consulta los martes y jueves de 2 a 4 PM si necesitas ayuda adicional.",
      timestamp: new Date(Date.now() - 1500000),
      isOwn: false,
      type: 'text'
    },
    {
      id: 9,
      sender: "Tú",
      content: "Perfecto, lo tendré en cuenta. ¡Que tenga un buen día! 😊",
      timestamp: new Date(Date.now() - 900000),
      isOwn: true,
      type: 'text'
    }
  ], []); // Sin dependencias ya que los mensajes son estáticos


  const emojis = ['😊', '👍', '❤️', '😂', '🤔', '👏', '🙏', '💡', '📚', '✅'];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (date) => {
    const today = new Date();
    const messageDate = new Date(date);

    if (messageDate?.toDateString() === today?.toDateString()) {
      return 'Hoy';
    }

    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (messageDate?.toDateString() === yesterday?.toDateString()) {
      return 'Ayer';
    }

    return messageDate?.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long'
    });
  };

  const handleSendMessage = () => {
    if (message?.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessage((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  if (!selectedChat) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <Icon name="MessageSquare" size={64} className="mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Selecciona una conversación</h3>
          <p className="text-muted-foreground">Elige un chat de la lista para comenzar a conversar</p>
        </div>
      </div>);

  }

  return (
    <div className="flex-1 flex flex-col bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 bg-card border-b border-border">
        <div className="flex items-center space-x-3">
          <Image
            src={selectedChat?.avatar}
            alt={selectedChat?.avatarAlt}
            className="w-10 h-10 rounded-full object-cover" />

          <div>
            <h3 className="font-medium text-foreground">{selectedChat?.name}</h3>
            <div className="flex items-center space-x-2">
              {selectedChat?.online &&
              <>
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-xs text-muted-foreground">En línea</span>
                </>
              }
              {selectedChat?.members &&
              <span className="text-xs text-muted-foreground">
                  {selectedChat?.members} miembros
                </span>
              }
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon">
            <Icon name="Phone" size={18} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Video" size={18} />
          </Button>
          <Button variant="ghost" size="icon">
            <Icon name="Info" size={18} />
          </Button>
        </div>
      </div>
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((msg, index) => {
          const showDate = index === 0 ||
          formatDate(messages?.[index - 1]?.timestamp) !== formatDate(msg?.timestamp);

          return (
            <div key={msg?.id}>
              {showDate &&
              <div className="flex justify-center mb-4">
                  <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-xs">
                    {formatDate(msg?.timestamp)}
                  </span>
                </div>
              }
              <div className={`flex ${msg?.isOwn ? 'justify-end' : 'justify-start'} mb-2`}>
                <div className={`flex max-w-xs lg:max-w-md ${msg?.isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
                  {!msg?.isOwn &&
                  <Image
                    src={msg?.avatar}
                    alt={msg?.avatarAlt}
                    className="w-8 h-8 rounded-full object-cover mr-2 mt-1" />

                  }
                  
                  <div className={`px-4 py-2 rounded-lg ${
                  msg?.isOwn ?
                  'bg-primary text-primary-foreground' :
                  'bg-card border border-border'}`
                  }>
                    {msg?.type === 'file' && msg?.attachment ?
                    <div className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
                        <Icon name={msg?.attachment?.icon} size={24} className="text-primary" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{msg?.attachment?.name}</p>
                          <p className="text-xs text-muted-foreground">{msg?.attachment?.size}</p>
                        </div>
                        <Button variant="ghost" size="icon">
                          <Icon name="Download" size={16} />
                        </Button>
                      </div> :

                    <p className="text-sm whitespace-pre-wrap">{msg?.content}</p>
                    }
                    
                    <div className={`flex items-center justify-end mt-1 space-x-1 ${
                    msg?.isOwn ? 'text-primary-foreground/70' : 'text-muted-foreground'}`
                    }>
                      <span className="text-xs">{formatTime(msg?.timestamp)}</span>
                      {msg?.isOwn &&
                      <Icon name="Check" size={12} className="text-success" />
                      }
                    </div>
                  </div>
                </div>
              </div>
            </div>);

        })}
        <div ref={messagesEndRef} />
      </div>
      {/* Message Input */}
      <div className="p-4 bg-card border-t border-border">
        <div className="flex items-end space-x-2">
          <Button variant="ghost" size="icon">
            <Icon name="Paperclip" size={18} />
          </Button>
          
          <div className="flex-1 relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e?.target?.value)}
              onKeyPress={handleKeyPress}
              placeholder="Escribe un mensaje..."
              className="w-full p-3 pr-12 bg-muted border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              rows="1"
              style={{ minHeight: '44px', maxHeight: '120px' }} />

            
            <div className="absolute right-2 bottom-2 flex items-center space-x-1">
              <div className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}>

                  <Icon name="Smile" size={16} />
                </Button>
                
                {showEmojiPicker &&
                <div className="absolute bottom-full right-0 mb-2 bg-popover border border-border rounded-lg shadow-lg p-2 grid grid-cols-5 gap-1">
                    {emojis?.map((emoji, index) =>
                  <button
                    key={index}
                    onClick={() => handleEmojiClick(emoji)}
                    className="p-2 hover:bg-muted rounded text-lg">

                        {emoji}
                      </button>
                  )}
                  </div>
                }
              </div>
            </div>
          </div>
          
          <Button
            variant="default"
            size="icon"
            onClick={handleSendMessage}
            disabled={!message?.trim()}>

            <Icon name="Send" size={18} />
          </Button>
        </div>
      </div>
    </div>);

};

export default ChatWindow;