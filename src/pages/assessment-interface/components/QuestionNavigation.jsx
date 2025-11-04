import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionNavigation = ({ 
  questions, 
  currentQuestion, 
  answers, 
  flaggedQuestions, 
  onQuestionSelect, 
  onToggleFlag 
}) => {
  const getQuestionStatus = (index) => {
    const isAnswered = answers?.[index] !== undefined && answers?.[index] !== null && answers?.[index] !== '';
    const isFlagged = flaggedQuestions?.includes(index);
    const isCurrent = index === currentQuestion;

    if (isCurrent) return 'current';
    if (isFlagged && isAnswered) return 'flagged-answered';
    if (isFlagged) return 'flagged';
    if (isAnswered) return 'answered';
    return 'unanswered';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'answered':
        return 'bg-success text-success-foreground border-success';
      case 'flagged':
        return 'bg-warning text-warning-foreground border-warning';
      case 'flagged-answered':
        return 'bg-accent text-accent-foreground border-accent';
      default:
        return 'bg-muted text-muted-foreground border-border hover:bg-surface';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'answered':
        return 'Check';
      case 'flagged': case'flagged-answered':
        return 'Flag';
      default:
        return null;
    }
  };

  const answeredCount = questions?.filter((_, index) => {
    const answer = answers?.[index];
    return answer !== undefined && answer !== null && answer !== '';
  })?.length;

  const flaggedCount = flaggedQuestions?.length;

  return (
    <div className="bg-card border-r border-border w-80 h-full overflow-y-auto">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-4">Navegación de Preguntas</h2>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-success">{answeredCount}</div>
            <div className="text-sm text-muted-foreground">Respondidas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">{flaggedCount}</div>
            <div className="text-sm text-muted-foreground">Marcadas</div>
          </div>
        </div>

        <div className="space-y-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded border"></div>
            <span className="text-muted-foreground">Pregunta actual</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded border"></div>
            <span className="text-muted-foreground">Respondida</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded border"></div>
            <span className="text-muted-foreground">Marcada para revisar</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-muted rounded border"></div>
            <span className="text-muted-foreground">Sin responder</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-5 gap-2">
          {questions?.map((_, index) => {
            const status = getQuestionStatus(index);
            const statusIcon = getStatusIcon(status);
            
            return (
              <button
                key={index}
                onClick={() => onQuestionSelect(index)}
                className={`relative w-12 h-12 rounded-lg border-2 transition-all duration-200 flex items-center justify-center font-medium text-sm ${getStatusColor(status)}`}
              >
                <span>{index + 1}</span>
                {statusIcon && (
                  <Icon 
                    name={statusIcon} 
                    size={12} 
                    className="absolute -top-1 -right-1 bg-card rounded-full p-0.5" 
                  />
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={() => onToggleFlag(currentQuestion)}
            iconName={flaggedQuestions?.includes(currentQuestion) ? "FlagOff" : "Flag"}
            iconPosition="left"
            fullWidth
          >
            {flaggedQuestions?.includes(currentQuestion) ? 'Desmarcar' : 'Marcar para Revisar'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionNavigation;