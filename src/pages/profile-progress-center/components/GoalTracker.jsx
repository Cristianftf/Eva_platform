import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const GoalTracker = () => {
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: '',
    targetDate: '',
    targetValue: '',
    unit: ''
  });

  const goalCategories = [
    { value: 'academic', label: 'Académico' },
    { value: 'skill', label: 'Habilidades' },
    { value: 'certification', label: 'Certificaciones' },
    { value: 'personal', label: 'Personal' }
  ];

  const unitOptions = [
    { value: 'percentage', label: 'Porcentaje (%)' },
    { value: 'hours', label: 'Horas' },
    { value: 'courses', label: 'Cursos' },
    { value: 'points', label: 'Puntos' },
    { value: 'projects', label: 'Proyectos' }
  ];

  const goals = [
    {
      id: 1,
      title: "Mantener Promedio Superior a 9.0",
      description: "Alcanzar y mantener un promedio general superior a 9.0 durante todo el semestre",
      category: "academic",
      categoryLabel: "Académico",
      targetValue: 9.0,
      currentValue: 8.7,
      unit: "puntos",
      targetDate: "2024-12-15",
      progress: 87,
      status: "in_progress",
      icon: "Target",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: 2,
      title: "Completar Certificación en React",
      description: "Obtener certificación oficial en desarrollo con React y tecnologías relacionadas",
      category: "certification",
      categoryLabel: "Certificaciones",
      targetValue: 100,
      currentValue: 65,
      unit: "porcentaje",
      targetDate: "2024-11-30",
      progress: 65,
      status: "in_progress",
      icon: "Award",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: 3,
      title: "Estudiar 150 Horas Este Mes",
      description: "Dedicar al menos 150 horas de estudio efectivo durante el mes de noviembre",
      category: "personal",
      categoryLabel: "Personal",
      targetValue: 150,
      currentValue: 89,
      unit: "horas",
      targetDate: "2024-11-30",
      progress: 59,
      status: "in_progress",
      icon: "Clock",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: 4,
      title: "Dominar JavaScript Avanzado",
      description: "Completar todos los módulos del curso de JavaScript avanzado con calificación superior a 8.5",
      category: "skill",
      categoryLabel: "Habilidades",
      targetValue: 8.5,
      currentValue: 9.2,
      unit: "puntos",
      targetDate: "2024-10-31",
      progress: 100,
      status: "completed",
      icon: "CheckCircle",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: 5,
      title: "Participar en 20 Discusiones Grupales",
      description: "Contribuir activamente en al menos 20 discusiones grupales diferentes",
      category: "academic",
      categoryLabel: "Académico",
      targetValue: 20,
      currentValue: 12,
      unit: "participaciones",
      targetDate: "2024-12-01",
      progress: 60,
      status: "in_progress",
      icon: "MessageSquare",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    }
  ];

  const handleAddGoal = () => {
    // Here you would typically save the goal to your backend
    console.log('New goal:', newGoal);
    setShowAddGoal(false);
    setNewGoal({
      title: '',
      description: '',
      category: '',
      targetDate: '',
      targetValue: '',
      unit: ''
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
            <Icon name="Check" size={10} className="mr-1" />
            Completado
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            <Icon name="Clock" size={10} className="mr-1" />
            En Progreso
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-destructive/10 text-destructive">
            <Icon name="AlertCircle" size={10} className="mr-1" />
            Vencido
          </span>
        );
      default:
        return null;
    }
  };

  const getDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const completedGoals = goals?.filter(goal => goal?.status === 'completed')?.length;
  const totalGoals = goals?.length;

  return (
    <div className="bg-card rounded-lg border border-border academic-shadow p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Seguimiento de Objetivos</h2>
          <p className="text-muted-foreground">
            Has completado {completedGoals} de {totalGoals} objetivos establecidos
          </p>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <div className="flex items-center gap-2">
            <div className="w-16 bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-500"
                style={{ width: `${(completedGoals / totalGoals) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              {Math.round((completedGoals / totalGoals) * 100)}%
            </span>
          </div>
          <Button 
            variant="default" 
            size="sm"
            onClick={() => setShowAddGoal(true)}
          >
            <Icon name="Plus" size={16} className="mr-2" />
            Nuevo Objetivo
          </Button>
        </div>
      </div>
      {/* Add Goal Form */}
      {showAddGoal && (
        <div className="mb-6 p-4 bg-muted rounded-lg border border-border">
          <h3 className="text-lg font-semibold text-foreground mb-4">Agregar Nuevo Objetivo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Título del Objetivo"
              type="text"
              placeholder="Ej: Completar curso de Python"
              value={newGoal?.title}
              onChange={(e) => setNewGoal({...newGoal, title: e?.target?.value})}
            />
            <Select
              label="Categoría"
              options={goalCategories}
              value={newGoal?.category}
              onChange={(value) => setNewGoal({...newGoal, category: value})}
              placeholder="Selecciona una categoría"
            />
            <Input
              label="Valor Objetivo"
              type="number"
              placeholder="Ej: 100"
              value={newGoal?.targetValue}
              onChange={(e) => setNewGoal({...newGoal, targetValue: e?.target?.value})}
            />
            <Select
              label="Unidad de Medida"
              options={unitOptions}
              value={newGoal?.unit}
              onChange={(value) => setNewGoal({...newGoal, unit: value})}
              placeholder="Selecciona la unidad"
            />
            <Input
              label="Fecha Objetivo"
              type="date"
              value={newGoal?.targetDate}
              onChange={(e) => setNewGoal({...newGoal, targetDate: e?.target?.value})}
            />
          </div>
          <div className="mt-4">
            <Input
              label="Descripción"
              type="text"
              placeholder="Describe tu objetivo en detalle..."
              value={newGoal?.description}
              onChange={(e) => setNewGoal({...newGoal, description: e?.target?.value})}
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button variant="default" onClick={handleAddGoal}>
              <Icon name="Check" size={16} className="mr-2" />
              Guardar Objetivo
            </Button>
            <Button variant="outline" onClick={() => setShowAddGoal(false)}>
              <Icon name="X" size={16} className="mr-2" />
              Cancelar
            </Button>
          </div>
        </div>
      )}
      {/* Goals List */}
      <div className="space-y-4">
        {goals?.map((goal) => (
          <div
            key={goal?.id}
            className={`p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${
              goal?.status === 'completed' 
                ? 'bg-success/5 border-success/20' 
                : `${goal?.bgColor} ${goal?.borderColor}`
            }`}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Goal Info */}
              <div className="flex-1">
                <div className="flex items-start gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${goal?.bgColor}`}>
                    <Icon name={goal?.icon} size={20} className={goal?.color} />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                      <h3 className="font-semibold text-foreground">{goal?.title}</h3>
                      {getStatusBadge(goal?.status)}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{goal?.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Icon name="Tag" size={12} />
                        {goal?.categoryLabel}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Calendar" size={12} />
                        {new Date(goal.targetDate)?.toLocaleDateString('es-ES')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Icon name="Clock" size={12} />
                        {getDaysRemaining(goal?.targetDate)} días restantes
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              <div className="lg:w-64">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {goal?.currentValue} / {goal?.targetValue} {goal?.unit}
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {goal?.progress}%
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-2 mb-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      goal?.status === 'completed' ? 'bg-success' : 'bg-primary'
                    }`}
                    style={{ width: `${Math.min(goal?.progress, 100)}%` }}
                  />
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Icon name="Edit" size={14} className="mr-1" />
                    Editar
                  </Button>
                  <Button variant="ghost" size="sm" className="flex-1">
                    <Icon name="TrendingUp" size={14} className="mr-1" />
                    Actualizar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-success mb-1">{completedGoals}</div>
            <div className="text-sm text-muted-foreground">Objetivos Completados</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary mb-1">
              {goals?.filter(g => g?.status === 'in_progress')?.length}
            </div>
            <div className="text-sm text-muted-foreground">En Progreso</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-1">
              {Math.round(goals?.reduce((acc, goal) => acc + goal?.progress, 0) / goals?.length)}%
            </div>
            <div className="text-sm text-muted-foreground">Progreso Promedio</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalTracker;