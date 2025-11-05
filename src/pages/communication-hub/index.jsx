import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ChatSidebar from './components/ChatSidebar';
import ChatWindow from './components/ChatWindow';
import ConsultationScheduler from './components/ConsultationScheduler';
import NotificationPanel from './components/NotificationPanel';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import http from '../../config/http';

const CommunicationHub = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('messages');
  const [selectedChat, setSelectedChat] = useState(null);
  const [showScheduler, setShowScheduler] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [selectedProfessor, setSelectedProfessor] = useState(null);

  const [professors, setProfessors] = useState([]);
  const [professorsError, setProfessorsError] = useState(null);

  useEffect(() => {
    let mounted = true;

    const fetchProfessors = async () => {
      try {
        // Intentamos obtener la lista de profesores desde el backend.
        // Si la ruta exacta no existe, fallback será la lista vacía.
        const resp = await http.get('/users?role=ROLE_TEACHER');
        if (!mounted) return;
        setProfessors(resp.data || []);
        setProfessorsError(null);
      } catch (err) {
        console.warn('No se pudo obtener profesores desde /users?role=ROLE_TEACHER, intentando /users?role=teacher', err?.message);
        try {
          const resp2 = await http.get('/users?role=teacher');
          if (!mounted) return;
          setProfessors(resp2.data || []);
          setProfessorsError(null);
        } catch (err2) {
          console.warn('No se pudo obtener profesores desde /users?role=teacher', err2?.message);
          if (!mounted) return;
          setProfessorsError(err2?.message || 'Error al cargar profesores');
          // Fallback ligero: mantener empty array and UI will still work
          setProfessors([]);
        }
      }
    };

    fetchProfessors();

    return () => { mounted = false; };
  }, []);


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