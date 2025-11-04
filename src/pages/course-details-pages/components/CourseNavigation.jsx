import React from 'react';
import Icon from '../../../components/AppIcon';

const CourseNavigation = ({ activeTab, onTabChange, progress }) => {
  const tabs = [
    { id: 'overview', label: 'Resumen', icon: 'Info' },
    { id: 'content', label: 'Contenido', icon: 'BookOpen' },
    { id: 'assignments', label: 'Tareas', icon: 'FileText' },
    { id: 'discussions', label: 'Discusiones', icon: 'MessageSquare' },
    { id: 'grades', label: 'Calificaciones', icon: 'Award' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg mb-6 academic-shadow">
      <div className="flex flex-wrap border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.id}
            onClick={() => onTabChange(tab?.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors duration-200 border-b-2 ${
              activeTab === tab?.id
                ? 'border-primary text-primary bg-primary bg-opacity-5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span className="hidden sm:inline">{tab?.label}</span>
          </button>
        ))}
      </div>
      {progress && (
        <div className="p-4 bg-muted bg-opacity-50">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progreso del Curso</span>
            <span className="text-sm text-muted-foreground">{progress?.completed}/{progress?.total} completado</span>
          </div>
          <div className="w-full bg-background rounded-full h-2">
            <div 
              className="bg-success h-2 rounded-full transition-all duration-500"
              style={{ width: `${(progress?.completed / progress?.total) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseNavigation;