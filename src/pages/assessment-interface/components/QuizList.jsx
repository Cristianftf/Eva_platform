import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizList = ({ quizzes, onStartQuiz, onViewResults }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success';
      case 'in-progress':
        return 'text-warning';
      case 'available':
        return 'text-primary';
      case 'locked':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'in-progress':
        return 'Clock';
      case 'available':
        return 'Play';
      case 'locked':
        return 'Lock';
      default:
        return 'FileText';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completado';
      case 'in-progress':
        return 'En Progreso';
      case 'available':
        return 'Disponible';
      case 'locked':
        return 'Bloqueado';
      default:
        return 'Desconocido';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-success bg-success/10';
      case 'medium':
        return 'text-warning bg-warning/10';
      case 'hard':
        return 'text-error bg-error/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getDifficultyText = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'Fácil';
      case 'medium':
        return 'Medio';
      case 'hard':
        return 'Difícil';
      default:
        return 'N/A';
    }
  };

  return (
    <div className="space-y-6">
      {quizzes?.map((quiz) => (
        <div
          key={quiz?.id}
          className="bg-card border border-border rounded-lg academic-shadow hover:shadow-lg transition-shadow duration-300"
        >
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-foreground">{quiz?.title}</h3>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(quiz?.status)} bg-current/10`}
                  >
                    <Icon name={getStatusIcon(quiz?.status)} size={12} className="mr-1" />
                    {getStatusText(quiz?.status)}
                  </span>
                </div>
                
                <p className="text-muted-foreground mb-4 line-clamp-2">{quiz?.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Icon name="FileText" size={14} />
                    <span>{quiz?.questionCount} preguntas</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>{quiz?.duration} min</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Award" size={14} />
                    <span>{quiz?.totalPoints} puntos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={14} />
                    <span>Vence: {quiz?.dueDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(quiz?.difficulty)}`}
                >
                  {getDifficultyText(quiz?.difficulty)}
                </span>
                
                {quiz?.attempts > 0 && (
                  <span className="text-xs text-muted-foreground">
                    Intentos: {quiz?.attempts}/{quiz?.maxAttempts}
                  </span>
                )}
              </div>
            </div>

            {quiz?.status === 'completed' && quiz?.lastScore && (
              <div className="mb-4 p-4 bg-muted rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-success">{quiz?.lastScore?.percentage}%</div>
                      <div className="text-xs text-muted-foreground">Puntuación</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">
                        {quiz?.lastScore?.score}/{quiz?.totalPoints}
                      </div>
                      <div className="text-xs text-muted-foreground">Puntos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-medium text-primary">{quiz?.lastScore?.grade}</div>
                      <div className="text-xs text-muted-foreground">Calificación</div>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Completado: {quiz?.lastScore?.completedAt}
                  </div>
                </div>
              </div>
            )}

            {quiz?.status === 'in-progress' && (
              <div className="mb-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="AlertCircle" size={16} className="text-warning" />
                  <span className="text-sm font-medium text-warning">
                    Examen en progreso - Tiempo restante: {quiz?.timeRemaining}
                  </span>
                </div>
              </div>
            )}

            {quiz?.status === 'locked' && quiz?.lockReason && (
              <div className="mb-4 p-4 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-error" />
                  <span className="text-sm text-error">{quiz?.lockReason}</span>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="User" size={12} />
                <span>Profesor: {quiz?.instructor}</span>
              </div>

              <div className="flex items-center space-x-2">
                {quiz?.status === 'completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewResults(quiz)}
                    iconName="BarChart3"
                    iconPosition="left"
                  >
                    Ver Resultados
                  </Button>
                )}

                {(quiz?.status === 'available' || quiz?.status === 'in-progress') && (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => onStartQuiz(quiz)}
                    iconName={quiz?.status === 'in-progress' ? "Play" : "FileText"}
                    iconPosition="left"
                  >
                    {quiz?.status === 'in-progress' ? 'Continuar' : 'Comenzar Examen'}
                  </Button>
                )}

                {quiz?.status === 'completed' && quiz?.allowRetake && quiz?.attempts < quiz?.maxAttempts && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onStartQuiz(quiz)}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Repetir
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizList;