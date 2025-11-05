import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import http from '../../../config/http';

const CourseContent = ({ modules, onContentSelect }) => {
  const [expandedModules, setExpandedModules] = useState(new Set([1]));
  const [updatingProgress, setUpdatingProgress] = useState(false);

  // Track content progress
  const updateProgress = async (lessonId, completed) => {
    try {
      setUpdatingProgress(true);
      const res = await http.put(`/lessons/${lessonId}/progress`, { completed });
      // Actualización exitosa - el backend debería devolver el nuevo estado
      const updatedLesson = res.data;
      console.log('Progress updated:', updatedLesson);
    } catch (error) {
      console.error('Error updating progress:', error);
    } finally {
      setUpdatingProgress(false);
    }
  };

  const handleContentClick = (lesson) => {
    onContentSelect(lesson);
    if (!lesson.completed && !lesson.isLocked) {
      updateProgress(lesson.id, true);
    }
  };

  const toggleModule = (moduleId) => {
    const newExpanded = new Set(expandedModules);
    if (newExpanded?.has(moduleId)) {
      newExpanded?.delete(moduleId);
    } else {
      newExpanded?.add(moduleId);
    }
    setExpandedModules(newExpanded);
  };
 
  const getContentIcon = (type) => {
    switch (type) {
      case 'video': return 'Play';
      case 'document': return 'FileText';
      case 'quiz': return 'HelpCircle';
      case 'assignment': return 'PenTool';
      default: return 'File';
    }
  };

  const getContentDuration = (duration) => {
    if (duration < 60) return `${duration}min`;
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    return `${hours}h ${minutes}min`;
  };

  return (
    <div className="space-y-4">
      {modules?.map((module) => (
        <div key={module.id} className="bg-card border border-border rounded-lg academic-shadow">
          <button
            onClick={() => toggleModule(module.id)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-muted transition-colors duration-200"
          >
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                module.completed ? 'bg-success' : 'bg-muted'
              }`}>
                {module.completed ? (
                  <Icon name="Check" size={16} className="text-success-foreground" />
                ) : (
                  <span className="text-sm font-medium text-muted-foreground">{module.id}</span>
                )}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{module.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {module.lessons?.length} lecciones • {getContentDuration(module.totalDuration)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm text-muted-foreground">
                {module.completedLessons}/{module.lessons?.length}
              </div>
              <Icon 
                name={expandedModules?.has(module.id) ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-muted-foreground"
              />
            </div>
          </button>

          {expandedModules?.has(module.id) && (
            <div className="border-t border-border">
              {module.lessons?.map((lesson) => (
                <div
                  key={lesson?.id}
                  className="flex items-center justify-between p-4 hover:bg-muted transition-colors duration-200 border-b border-border last:border-b-0"
                >
                  <button
                    onClick={() => handleContentClick(lesson)}
                    disabled={lesson.isLocked || updatingProgress}
                    className="flex items-center gap-3 flex-1 text-left"
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      lesson?.completed ? 'bg-success' : 'bg-muted'
                    }`}>
                      {lesson?.completed ? (
                        <Icon name="Check" size={12} className="text-success-foreground" />
                      ) : (
                        <Icon name={getContentIcon(lesson?.type)} size={12} className="text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{lesson?.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="capitalize">{lesson?.type}</span>
                        <span>•</span>
                        <span>{getContentDuration(lesson?.duration)}</span>
                        {lesson?.isPreview && (
                          <>
                            <span>•</span>
                            <span className="text-primary font-medium">Vista previa</span>
                          </>
                        )}
                      </div>
                    </div>
                  </button>
                  
                  <div className="flex items-center gap-2">
                    {lesson?.hasNotes && (
                      <Icon name="StickyNote" size={16} className="text-warning" />
                    )}
                    {lesson?.isLocked && (
                      <Icon name="Lock" size={16} className="text-muted-foreground" />
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onContentSelect(lesson)}
                    >
                      <Icon name="Play" size={16} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      {/* Course Statistics */}
      <div className="bg-card border border-border rounded-lg p-6 academic-shadow">
        <h3 className="font-semibold text-foreground mb-4">Estadísticas del Curso</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {modules?.reduce((acc, module) => acc + module.lessons?.length, 0)}
            </div>
            <div className="text-sm text-muted-foreground">Lecciones</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">
              {modules?.reduce((acc, module) => acc + module.totalDuration, 0) / 60}h
            </div>
            <div className="text-sm text-muted-foreground">Duración Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning mb-1">
              {modules?.filter(m => m?.lessons?.some(l => l?.type === 'quiz'))?.length}
            </div>
            <div className="text-sm text-muted-foreground">Evaluaciones</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary mb-1">
              {modules?.filter(m => m?.lessons?.some(l => l?.type === 'assignment'))?.length}
            </div>
            <div className="text-sm text-muted-foreground">Proyectos</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;