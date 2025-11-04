import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActionsGrid = ({ onActionClick }) => {
  const quickActions = [
    {
      id: 'create-course',
      title: 'Crear Curso',
      description: 'Configurar nuevo curso con módulos y recursos',
      icon: 'Plus',
      color: 'bg-primary',
      textColor: 'text-primary-foreground',
      count: null
    },
    {
      id: 'manage-users',
      title: 'Gestionar Usuarios',
      description: 'Administrar estudiantes y profesores',
      icon: 'Users',
      color: 'bg-secondary',
      textColor: 'text-secondary-foreground',
      count: '1,247'
    },
    {
      id: 'upload-content',
      title: 'Subir Contenido',
      description: 'Cargar materiales multimedia y documentos',
      icon: 'Upload',
      color: 'bg-accent',
      textColor: 'text-accent-foreground',
      count: null
    },
    {
      id: 'view-analytics',
      title: 'Ver Analíticas',
      description: 'Revisar métricas de participación y progreso',
      icon: 'BarChart3',
      color: 'bg-success',
      textColor: 'text-success-foreground',
      count: '15'
    },
    {
      id: 'grade-management',
      title: 'Gestión de Calificaciones',
      description: 'Administrar evaluaciones y rúbricas',
      icon: 'GraduationCap',
      color: 'bg-warning',
      textColor: 'text-warning-foreground',
      count: '89'
    },
    {
      id: 'system-settings',
      title: 'Configuración del Sistema',
      description: 'Ajustes generales y permisos',
      icon: 'Settings',
      color: 'bg-muted',
      textColor: 'text-muted-foreground',
      count: null
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quickActions?.map((action) => (
        <div
          key={action?.id}
          className="academic-card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
          onClick={() => onActionClick(action?.id)}
        >
          <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-lg ${action?.color} group-hover:scale-110 transition-transform duration-300`}>
              <Icon name={action?.icon} size={24} className={action?.textColor} />
            </div>
            {action?.count && (
              <span className="text-sm font-semibold text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {action?.count}
              </span>
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {action?.title}
          </h3>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {action?.description}
          </p>
          
          <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span>Acceder</span>
            <Icon name="ArrowRight" size={16} className="ml-2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuickActionsGrid;