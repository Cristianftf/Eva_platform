import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseAssignments = ({ assignments, onSubmitAssignment }) => {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-success';
      case 'submitted': return 'text-warning';
      case 'overdue': return 'text-destructive';
      case 'pending': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'submitted': return 'Clock';
      case 'overdue': return 'AlertTriangle';
      case 'pending': return 'Circle';
      default: return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'Completado';
      case 'submitted': return 'Enviado';
      case 'overdue': return 'Vencido';
      case 'pending': return 'Pendiente';
      default: return 'Pendiente';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDaysUntilDue = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diffTime = due - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return `Vencido hace ${Math.abs(diffDays)} días`;
    if (diffDays === 0) return 'Vence hoy';
    if (diffDays === 1) return 'Vence mañana';
    return `Vence en ${diffDays} días`;
  };

  return (
    <div className="space-y-6">
      {/* Assignment Overview */}
      <div className="bg-card border border-border rounded-lg p-6 academic-shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-foreground">Tareas del Curso</h2>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{assignments?.filter(a => a?.status === 'completed')?.length} completadas</span>
            <span>{assignments?.filter(a => a?.status === 'pending')?.length} pendientes</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-success bg-opacity-10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
              <span className="font-medium text-foreground">Completadas</span>
            </div>
            <div className="text-2xl font-bold text-success">
              {assignments?.filter(a => a?.status === 'completed')?.length}
            </div>
          </div>
          
          <div className="bg-warning bg-opacity-10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Clock" size={20} className="text-warning" />
              <span className="font-medium text-foreground">Enviadas</span>
            </div>
            <div className="text-2xl font-bold text-warning">
              {assignments?.filter(a => a?.status === 'submitted')?.length}
            </div>
          </div>
          
          <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Circle" size={20} className="text-primary" />
              <span className="font-medium text-foreground">Pendientes</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {assignments?.filter(a => a?.status === 'pending')?.length}
            </div>
          </div>
          
          <div className="bg-destructive bg-opacity-10 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="AlertTriangle" size={20} className="text-destructive" />
              <span className="font-medium text-foreground">Vencidas</span>
            </div>
            <div className="text-2xl font-bold text-destructive">
              {assignments?.filter(a => a?.status === 'overdue')?.length}
            </div>
          </div>
        </div>
      </div>
      {/* Assignments List */}
      <div className="space-y-4">
        {assignments?.map((assignment) => (
          <div key={assignment?.id} className="bg-card border border-border rounded-lg academic-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Icon 
                      name={getStatusIcon(assignment?.status)} 
                      size={20} 
                      className={getStatusColor(assignment?.status)}
                    />
                    <h3 className="text-lg font-semibold text-foreground">{assignment?.title}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment?.status)} bg-opacity-10`}>
                      {getStatusText(assignment?.status)}
                    </span>
                  </div>
                  
                  <p className="text-muted-foreground mb-3 leading-relaxed">
                    {assignment?.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Calendar" size={14} />
                      <span>Fecha límite: {formatDate(assignment?.dueDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Award" size={14} />
                      <span>Puntos: {assignment?.points}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={14} />
                      <span>{getDaysUntilDue(assignment?.dueDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 ml-4">
                  <Button
                    variant={assignment?.status === 'pending' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedAssignment(assignment)}
                    iconName="Eye"
                    iconPosition="left"
                  >
                    Ver Detalles
                  </Button>
                  
                  {assignment?.status === 'pending' && (
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => onSubmitAssignment(assignment?.id)}
                      iconName="Upload"
                      iconPosition="left"
                    >
                      Entregar
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Assignment Requirements */}
              {assignment?.requirements && (
                <div className="border-t border-border pt-4">
                  <h4 className="font-medium text-foreground mb-2">Requisitos:</h4>
                  <ul className="space-y-1">
                    {assignment?.requirements?.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              {/* Submission Info */}
              {assignment?.submission && (
                <div className="border-t border-border pt-4 mt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-foreground">Entrega Realizada</h4>
                      <p className="text-sm text-muted-foreground">
                        Enviado el {formatDate(assignment?.submission?.submittedAt)}
                      </p>
                    </div>
                    {assignment?.submission?.grade && (
                      <div className="text-right">
                        <div className="text-lg font-bold text-success">
                          {assignment?.submission?.grade}/{assignment?.points}
                        </div>
                        <div className="text-sm text-muted-foreground">Calificación</div>
                      </div>
                    )}
                  </div>
                  
                  {assignment?.submission?.feedback && (
                    <div className="mt-3 p-3 bg-muted rounded-lg">
                      <h5 className="font-medium text-foreground mb-1">Retroalimentación:</h5>
                      <p className="text-sm text-muted-foreground">{assignment?.submission?.feedback}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {/* Assignment Detail Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">{selectedAssignment?.title}</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedAssignment(null)}
                >
                  <Icon name="X" size={20} />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Descripción Completa</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {selectedAssignment?.fullDescription || selectedAssignment?.description}
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Criterios de Evaluación</h3>
                  <div className="space-y-2">
                    {selectedAssignment?.rubric?.map((criterion, index) => (
                      <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                        <span className="text-foreground">{criterion?.name}</span>
                        <span className="text-muted-foreground">{criterion?.points} puntos</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button
                    variant="default"
                    onClick={() => {
                      onSubmitAssignment(selectedAssignment?.id);
                      setSelectedAssignment(null);
                    }}
                    iconName="Upload"
                    iconPosition="left"
                    disabled={selectedAssignment?.status !== 'pending'}
                  >
                    Entregar Tarea
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedAssignment(null)}
                  >
                    Cerrar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseAssignments;