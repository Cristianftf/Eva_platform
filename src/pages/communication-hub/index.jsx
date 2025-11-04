import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import ConsultationScheduler from './components/ConsultationScheduler';
import NotificationPanel from './components/NotificationPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const CommunicationHub = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedChat, setSelectedChat] = useState(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  const professors = [
  {
    id: 1,
    name: "Dr. María González",
    department: "Departamento de Matemáticas",
    avatar: "https://images.unsplash.com/photo-1704455304918-9096fc53e795",
    avatarAlt: "Professional headshot of Hispanic woman with dark hair in white lab coat",
    specialties: ["Cálculo", "Álgebra Lineal", "Estadística"],
    availability: "Martes y Jueves 2:00 - 4:00 PM"
  },
  {
    id: 2,
    name: "Prof. Luis Hernández",
    department: "Departamento de Física",
    avatar: "https://images.unsplash.com/photo-1713946598186-8e28275719b9",
    avatarAlt: "Middle-aged man with glasses wearing dark suit in professional setting",
    specialties: ["Física Cuántica", "Mecánica", "Termodinámica"],
    availability: "Lunes, Miércoles y Viernes 10:00 AM - 12:00 PM"
  }];


  const handleChatSelect = (chat) => {
    setSelectedChat(chat);

    // If it's a consultation, show the scheduler
    if (chat?.type === 'consultation') {
      const professor = professors?.find((p) => p?.name === chat?.name?.replace('Consulta - ', ''));
      setSelectedProfessor(professor);
      setShowScheduler(true);
    }
  };

  const handleScheduleConsultation = () => {
    if (selectedChat && selectedChat?.type !== 'consultation') {
      // Find professor from the current chat if it's a direct message with a professor
      const professor = professors?.find((p) => p?.name === selectedChat?.name);
      setSelectedProfessor(professor);
      setShowScheduler(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex pt-16">
        <Sidebar
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

        
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'} lg:ml-0`}>
          <div className="flex h-[calc(100vh-4rem)]">
            {/* Chat Sidebar */}
            <ChatSidebar
              activeTab={activeTab}
              onTabChange={setActiveTab}
              selectedChat={selectedChat}
              onChatSelect={handleChatSelect} />


            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedChat ?
              <>
                  <ChatWindow selectedChat={selectedChat} />
                  
                  {/* Chat Actions Bar */}
                  <div className="bg-card border-t border-border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                        variant="ghost"
                        size="sm"
                        iconName="Calendar"
                        iconPosition="left"
                        onClick={handleScheduleConsultation}>

                          Agendar Consulta
                        </Button>
                        <Button
                        variant="ghost"
                        size="sm"
                        iconName="FileText"
                        iconPosition="left">

                          Compartir Archivo
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setShowNotifications(true)}>

                          <Icon name="Bell" size={16} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Icon name="Search" size={16} />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Icon name="MoreVertical" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </> :

              <div className="flex-1 flex items-center justify-center bg-background">
                  <div className="text-center max-w-md">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Icon name="MessageSquare" size={48} className="text-primary" />
                    </div>
                    <h2 className="text-2xl font-semibold text-foreground mb-4">
                      Centro de Comunicación
                    </h2>
                    <p className="text-muted-foreground mb-6">
                      Conecta con tus compañeros y profesores. Selecciona una conversación para comenzar 
                      o inicia una nueva para colaborar en tus estudios.
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-card border border-border rounded-lg p-4 text-left">
                        <Icon name="Users" size={24} className="text-primary mb-2" />
                        <h3 className="font-medium text-foreground mb-1">Grupos de Estudio</h3>
                        <p className="text-sm text-muted-foreground">
                          Únete a discusiones grupales organizadas por curso y tema
                        </p>
                      </div>
                      
                      <div className="bg-card border border-border rounded-lg p-4 text-left">
                        <Icon name="Calendar" size={24} className="text-primary mb-2" />
                        <h3 className="font-medium text-foreground mb-1">Consultas</h3>
                        <p className="text-sm text-muted-foreground">
                          Agenda citas con profesores para resolver dudas académicas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              }
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <ConsultationScheduler
        isOpen={showScheduler}
        onClose={() => {
          setShowScheduler(false);
          setSelectedProfessor(null);
        }}
        professor={selectedProfessor} />


      <NotificationPanel
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)} />

    </div>);

};

export default CommunicationHub;