import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CourseGrades = ({ grades, courseStats }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'Todas las Categorías', icon: 'BarChart3' },
    { id: 'assignments', label: 'Tareas', icon: 'FileText' },
    { id: 'quizzes', label: 'Cuestionarios', icon: 'HelpCircle' },
    { id: 'exams', label: 'Exámenes', icon: 'BookOpen' },
    { id: 'participation', label: 'Participación', icon: 'MessageSquare' }
  ];

  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-warning';
    if (percentage >= 70) return 'text-primary';
    return 'text-destructive';
  };

  const getGradeBg = (percentage) => {
    if (percentage >= 90) return 'bg-success bg-opacity-10';
    if (percentage >= 80) return 'bg-warning bg-opacity-10';
    if (percentage >= 70) return 'bg-primary bg-opacity-10';
    return 'bg-destructive bg-opacity-10';
  };

  const getLetterGrade = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const filteredGrades = selectedCategory === 'all' 
    ? grades 
    : grades?.filter(grade => grade?.category === selectedCategory);

  const calculateCategoryAverage = (category) => {
    const categoryGrades = grades?.filter(g => g?.category === category);
    if (categoryGrades?.length === 0) return 0;
    return categoryGrades?.reduce((sum, g) => sum + g?.percentage, 0) / categoryGrades?.length;
  };

  return (
    <div className="space-y-6">
      {/* Grade Overview */}
      <div className="bg-card border border-border rounded-lg p-6 academic-shadow">
        <h2 className="text-xl font-semibold text-foreground mb-6">Resumen de Calificaciones</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-primary bg-opacity-10 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">Promedio General</span>
              <Icon name="TrendingUp" size={20} className="text-primary" />
            </div>
            <div className="text-2xl font-bold text-primary mb-1">
              {courseStats?.overallAverage}%
            </div>
            <div className="text-sm text-muted-foreground">
              Calificación: {getLetterGrade(courseStats?.overallAverage)}
            </div>
          </div>
          
          <div className="bg-success bg-opacity-10 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">Mejor Calificación</span>
              <Icon name="Award" size={20} className="text-success" />
            </div>
            <div className="text-2xl font-bold text-success mb-1">
              {courseStats?.highestGrade}%
            </div>
            <div className="text-sm text-muted-foreground">
              {courseStats?.highestGradeAssignment}
            </div>
          </div>
          
          <div className="bg-warning bg-opacity-10 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">Tareas Completadas</span>
              <Icon name="CheckCircle" size={20} className="text-warning" />
            </div>
            <div className="text-2xl font-bold text-warning mb-1">
              {courseStats?.completedAssignments}
            </div>
            <div className="text-sm text-muted-foreground">
              de {courseStats?.totalAssignments} tareas
            </div>
          </div>
          
          <div className="bg-secondary bg-opacity-10 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-foreground">Posición en Clase</span>
              <Icon name="Users" size={20} className="text-secondary" />
            </div>
            <div className="text-2xl font-bold text-secondary mb-1">
              #{courseStats?.classRank}
            </div>
            <div className="text-sm text-muted-foreground">
              de {courseStats?.totalStudents} estudiantes
            </div>
          </div>
        </div>

        {/* Grade Distribution Chart */}
        <div className="bg-muted rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-3">Distribución por Categoría</h3>
          <div className="space-y-3">
            {categories?.slice(1)?.map((category) => {
              const average = calculateCategoryAverage(category?.id);
              return (
                <div key={category?.id} className="flex items-center gap-3">
                  <Icon name={category?.icon} size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground w-24">{category?.label}</span>
                  <div className="flex-1 bg-background rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${average}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-foreground w-12 text-right">
                    {average?.toFixed(1)}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="bg-card border border-border rounded-lg p-4 academic-shadow">
        <div className="flex flex-wrap gap-2">
          {categories?.map((category) => (
            <Button
              key={category?.id}
              variant={selectedCategory === category?.id ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category?.id)}
              iconName={category?.icon}
              iconPosition="left"
            >
              {category?.label}
            </Button>
          ))}
        </div>
      </div>
      {/* Grades List */}
      <div className="space-y-4">
        {filteredGrades?.map((grade) => (
          <div key={grade?.id} className="bg-card border border-border rounded-lg p-6 academic-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Icon name="FileText" size={20} className="text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">{grade?.title}</h3>
                  <span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full capitalize">
                    {grade?.category}
                  </span>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Icon name="Calendar" size={14} />
                    <span>Fecha: {new Date(grade.submittedAt)?.toLocaleDateString('es-ES')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Icon name="Clock" size={14} />
                    <span>Entregado: {grade?.submittedOnTime ? 'A tiempo' : 'Tarde'}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className={`text-2xl font-bold ${getGradeColor(grade?.percentage)} mb-1`}>
                  {grade?.score}/{grade?.maxScore}
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getGradeBg(grade?.percentage)} ${getGradeColor(grade?.percentage)}`}>
                  {grade?.percentage}% ({getLetterGrade(grade?.percentage)})
                </div>
              </div>
            </div>

            {/* Grade Breakdown */}
            {grade?.breakdown && (
              <div className="border-t border-border pt-4">
                <h4 className="font-medium text-foreground mb-3">Desglose de Calificación</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {grade?.breakdown?.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                      <span className="text-foreground">{item?.criterion}</span>
                      <span className="font-medium text-foreground">
                        {item?.score}/{item?.maxScore}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback */}
            {grade?.feedback && (
              <div className="border-t border-border pt-4 mt-4">
                <h4 className="font-medium text-foreground mb-2">Retroalimentación del Profesor</h4>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-foreground leading-relaxed">{grade?.feedback}</p>
                </div>
              </div>
            )}

            {/* Improvement Suggestions */}
            {grade?.suggestions && grade?.suggestions?.length > 0 && (
              <div className="border-t border-border pt-4 mt-4">
                <h4 className="font-medium text-foreground mb-2">Sugerencias de Mejora</h4>
                <ul className="space-y-1">
                  {grade?.suggestions?.map((suggestion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Icon name="ArrowRight" size={14} className="mt-0.5 flex-shrink-0" />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Grade Trends */}
      <div className="bg-card border border-border rounded-lg p-6 academic-shadow">
        <h3 className="text-lg font-semibold text-foreground mb-4">Tendencia de Calificaciones</h3>
        <div className="h-64 flex items-end justify-between gap-2 bg-muted rounded-lg p-4">
          {grades?.slice(-8)?.map((grade) => (
            <div key={grade?.id} className="flex flex-col items-center gap-2">
              <div 
                 className="bg-primary rounded-t transition-all duration-500 w-8"
                style={{ height: `${(grade?.percentage / 100) * 200}px` }}
              />
              <div className="text-xs text-muted-foreground text-center">
                <div className="font-medium">{grade?.percentage}%</div>
                <div className="truncate w-16">{grade?.title?.split(' ')?.[0]}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseGrades;