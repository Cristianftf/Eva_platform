import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizHeader = ({ quiz, timeRemaining, onSubmit, onSaveProgress, isSubmitting }) => {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
    }
    return `${minutes}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 300) return 'text-error'; // 5 minutes
    if (timeRemaining <= 900) return 'text-warning'; // 15 minutes
    return 'text-success';
  };

  return (
    <div className="bg-card border-b border-border p-6 academic-shadow">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
            <Icon name="FileText" size={24} className="text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{quiz?.title}</h1>
            <div className="flex items-center space-x-4 mt-1">
              <span className="text-sm text-muted-foreground">
                {quiz?.questions?.length} preguntas
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                {quiz?.duration} minutos
              </span>
              <span className="text-sm text-muted-foreground">•</span>
              <span className="text-sm text-muted-foreground">
                Puntuación máxima: {quiz?.totalPoints}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {quiz?.timed && (
            <div className="flex items-center space-x-2 bg-muted rounded-lg px-4 py-2">
              <Icon name="Clock" size={18} className={getTimeColor()} />
              <span className={`font-mono text-lg font-semibold ${getTimeColor()}`}>
                {formatTime(timeRemaining)}
              </span>
            </div>
          )}

          <Button
            variant="outline"
            onClick={onSaveProgress}
            iconName="Save"
            iconPosition="left"
          >
            Guardar Progreso
          </Button>

          <Button
            variant="default"
            onClick={onSubmit}
            loading={isSubmitting}
            iconName="Send"
            iconPosition="left"
          >
            Enviar Examen
          </Button>
        </div>
      </div>
      {quiz?.instructions && (
        <div className="mt-4 p-4 bg-muted rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" />
            <div>
              <h3 className="font-medium text-foreground mb-1">Instrucciones</h3>
              <p className="text-sm text-muted-foreground">{quiz?.instructions}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizHeader;