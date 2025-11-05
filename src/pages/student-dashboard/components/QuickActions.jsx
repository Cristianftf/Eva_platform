import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const quickActions = [
    {
      title: 'Unirse a Grupo de Estudio',
      description: 'Encuentra compañeros para estudiar juntos',
      icon: 'Users',
      color: 'bg-blue-500',
      link: '/communication-hub?tab=groups'
    },
    {
      title: 'Acceder a Contenido Multimedia',
      description: 'Videos, presentaciones y recursos',
      icon: 'Play',
      color: 'bg-purple-500',
      link: '/course-detail-pages?tab=multimedia'
    },
    {
      title: 'Consultar con Profesor',
      description: 'Programa una sesión de tutoría',
      icon: 'MessageCircle',
      color: 'bg-emerald-500',
      link: '/communication-hub?tab=professors'
    },
    {
      title: 'Realizar Quiz Rápido',
      description: 'Practica con evaluaciones cortas',
      icon: 'HelpCircle',
      color: 'bg-amber-500',
      link: '/assessment-interface?type=quick'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-3 sm:p-4 md:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">Acciones Rápidas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
        {quickActions?.map((action, index) => (
          <Link 
            key={index} 
            to={action?.link}
            className="block group"
          >
            <div className="p-2 sm:p-3 md:p-4 rounded-lg border border-border hover:shadow-md transition-all duration-200 group-hover:scale-[1.02]">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 ${action?.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <Icon 
                    name={action?.icon} 
                    size={16} 
                    className="text-white sm:scale-125" 
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-xs sm:text-sm mb-0.5 sm:mb-1">
                    {action?.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-2">
                    {action?.description}
                  </p>
                </div>
                <Icon 
                  name="ArrowRight" 
                  size={14} 
                  className="text-muted-foreground group-hover:text-primary transition-colors duration-200 sm:scale-110" 
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-2">
          <Button 
            variant="outline" 
            iconName="Calendar" 
            iconPosition="left"
            size="sm"
            className="flex-1 text-xs sm:text-sm"
          >
            <Link to="/profile-progress-center?tab=calendar" className="w-full">
              Ver Calendario
            </Link>
          </Button>
          <Button 
            variant="default" 
            iconName="BookOpen" 
            iconPosition="left"
            size="sm"
            className="flex-1 text-xs sm:text-sm"
          >
            <Link to="/course-detail-pages" className="w-full">
              Explorar Cursos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;