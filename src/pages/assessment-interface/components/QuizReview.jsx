import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuizReview = ({ 
  quiz, 
  answers, 
  flaggedQuestions, 
  onQuestionJump, 
  onSubmit, 
  isSubmitting 
}) => {
  const getAnswerSummary = (question, questionIndex) => {
    const answer = answers?.[questionIndex];
    
    const getAnswerSummary = (question, questionIndex) => {
      const answer = answers?.[questionIndex];
    
      if (!answer || answer === '' || (Array.isArray(answer) && answer?.length === 0)) {
        return { status: 'unanswered', text: 'Sin responder' };
      }

      switch (question?.type) {
        case 'multiple-choice': {
          const selectedOption = question?.options?.find(opt => opt?.id === answer);
          return { 
            status: 'answered', 
            text: selectedOption ? selectedOption?.text : 'Respuesta no válida' 
          };
        }
      
        case 'multiple-select': {
          const selectedOptions = question?.options?.filter(opt => answer?.includes(opt?.id));
          return { 
            status: 'answered', 
            text: selectedOptions?.map(opt => opt?.text)?.join(', ') || 'Sin selecciones' 
          };
        }
      
        case 'true-false': {
          return { 
            status: 'answered', 
            text: answer === 'true' ? 'Verdadero' : 'Falso' 
          };
        }
      
        case 'short-answer':
        case 'essay': {
          return { 
            status: 'answered', 
            text: answer?.length > 50 ? `${answer?.substring(0, 50)}...` : answer 
          };
        }
      
        case 'fill-blank': {
          return { 
            status: 'answered', 
            text: Array.isArray(answer) ? answer?.join(', ') : answer 
          };
        }
      
        default: {
          return { status: 'answered', text: 'Respondida' };
        }
      }
    };
  const unansweredCount = quiz?.questions?.length - answeredCount;

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg border border-border academic-shadow">
          <div className="p-8 border-b border-border">
            <div className="flex items-center space-x-4 mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                <Icon name="CheckCircle" size={24} className="text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold text-foreground">Revisar Respuestas</h1>
                <p className="text-muted-foreground">
                  Revisa tus respuestas antes de enviar el examen
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-success">{answeredCount}</div>
                <div className="text-sm text-muted-foreground">Preguntas Respondidas</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-error">{unansweredCount}</div>
                <div className="text-sm text-muted-foreground">Sin Responder</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-warning">{flaggedQuestions?.length}</div>
                <div className="text-sm text-muted-foreground">Marcadas para Revisar</div>
              </div>
            </div>

            {unansweredCount > 0 && (
              <div className="mt-6 p-4 bg-error/10 border border-error/20 rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="AlertTriangle" size={16} className="text-error mt-0.5" />
                  <div>
                    <h4 className="font-medium text-error mb-1">Preguntas sin responder</h4>
                    <p className="text-sm text-error/80">
                      Tienes {unansweredCount} pregunta{unansweredCount !== 1 ? 's' : ''} sin responder. 
                      Puedes enviar el examen de todos modos, pero estas preguntas no recibirán puntos.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="p-8">
            <h2 className="text-lg font-semibold text-foreground mb-6">Resumen de Respuestas</h2>
            
            <div className="space-y-4">
              {quiz?.questions?.map((question, index) => {
                const answerSummary = getAnswerSummary(question, index);
                const isFlagged = flaggedQuestions?.includes(index);
                
                return (
                  <div
                    key={index}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                      answerSummary?.status === 'unanswered' ?'border-error/20 bg-error/5'
                        : isFlagged
                        ? 'border-warning/20 bg-warning/5' :'border-border bg-muted/30'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="font-medium text-foreground">
                            Pregunta {index + 1}
                          </span>
                          <div className="flex items-center space-x-2">
                            {answerSummary?.status === 'answered' && (
                              <Icon name="Check" size={14} className="text-success" />
                            )}
                            {answerSummary?.status === 'unanswered' && (
                              <Icon name="X" size={14} className="text-error" />
                            )}
                            {isFlagged && (
                              <Icon name="Flag" size={14} className="text-warning" />
                            )}
                            <span className="text-xs text-accent">
                              {question?.points} pts
                            </span>
                          </div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {question?.question}
                        </p>
                        
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">Respuesta:</span>
                          <span className={`text-sm ${
                            answerSummary?.status === 'unanswered' ?'text-error font-medium' :'text-foreground'
                          }`}>
                            {answerSummary?.text}
                          </span>
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onQuestionJump(index)}
                        iconName="Edit"
                        iconPosition="left"
                      >
                        Editar
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-8 border-t border-border bg-muted/30">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p>Una vez enviado, no podrás modificar tus respuestas.</p>
                <p>Asegúrate de haber revisado todas las preguntas.</p>
              </div>
              
              <Button 
                variant="default"
                size="lg"
                onClick={onSubmit}
                loading={isSubmitting}
                iconName="Send"
                iconPosition="left"
              >
                Enviar Examen Final
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}};

export default QuizReview;