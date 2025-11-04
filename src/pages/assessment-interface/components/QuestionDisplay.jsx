import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const QuestionDisplay = ({ 
  question, 
  questionIndex, 
  totalQuestions, 
  answer, 
  onAnswerChange, 
  onNext, 
  onPrevious,
  isFirst,
  isLast 
}) => {
  const renderQuestionContent = () => {
    switch (question?.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question?.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  answer === option?.id
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={option?.id}
                  checked={answer === option?.id}
                  onChange={(e) => onAnswerChange(e?.target?.value)}
                  className="mt-1 w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <div className="flex-1">
                  <span className="text-foreground">{option?.text}</span>
                  {option?.image && (
                    <div className="mt-2 w-32 h-24 overflow-hidden rounded-md">
                      <Image
                        src={option?.image}
                        alt={option?.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        );

      case 'multiple-select':
        return (
          <div className="space-y-3">
            {question?.options?.map((option, index) => (
              <label
                key={index}
                className={`flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  answer && answer?.includes(option?.id)
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <Checkbox
                  checked={answer && answer?.includes(option?.id)}
                  onChange={(e) => {
                    const currentAnswers = answer || [];
                    if (e?.target?.checked) {
                      onAnswerChange([...currentAnswers, option?.id]);
                    } else {
                      onAnswerChange(currentAnswers?.filter(id => id !== option?.id));
                    }
                  }}
                />
                <div className="flex-1">
                  <span className="text-foreground">{option?.text}</span>
                  {option?.image && (
                    <div className="mt-2 w-32 h-24 overflow-hidden rounded-md">
                      <Image
                        src={option?.image}
                        alt={option?.imageAlt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        );

      case 'true-false':
        return (
          <div className="space-y-3">
            {['true', 'false']?.map((option) => (
              <label
                key={option}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  answer === option
                    ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
                }`}
              >
                <input
                  type="radio"
                  name={`question-${questionIndex}`}
                  value={option}
                  checked={answer === option}
                  onChange={(e) => onAnswerChange(e?.target?.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary"
                />
                <span className="text-foreground font-medium">
                  {option === 'true' ? 'Verdadero' : 'Falso'}
                </span>
              </label>
            ))}
          </div>
        );

      case 'short-answer':
        return (
          <Input
            type="text"
            placeholder="Escribe tu respuesta aquí..."
            value={answer || ''}
            onChange={(e) => onAnswerChange(e?.target?.value)}
            className="w-full"
          />
        );

      case 'essay':
        return (
          <textarea
            placeholder="Escribe tu ensayo aquí..."
            value={answer || ''}
            onChange={(e) => onAnswerChange(e?.target?.value)}
            rows={8}
            className="w-full p-4 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
          />
        );

      case 'fill-blank':
        return (
          <div className="space-y-4">
            <p className="text-foreground leading-relaxed">
              {question?.text?.split('___')?.map((part, index, array) => (
                <React.Fragment key={index}>
                  {part}
                  {index < array?.length - 1 && (
                    <Input
                      type="text"
                      placeholder="..."
                      value={(answer && answer?.[index]) || ''}
                      onChange={(e) => {
                        const newAnswers = answer || [];
                        newAnswers[index] = e?.target?.value;
                        onAnswerChange([...newAnswers]);
                      }}
                      className="inline-block w-32 mx-2"
                    />
                  )}
                </React.Fragment>
              ))}
            </p>
          </div>
        );

      default:
        return <div className="text-muted-foreground">Tipo de pregunta no soportado</div>;
    }
  };

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-muted-foreground">
                Pregunta {questionIndex + 1} de {totalQuestions}
              </span>
              <div className="flex items-center space-x-2">
                <Icon name="Award" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">
                  {question?.points} {question?.points === 1 ? 'punto' : 'puntos'}
                </span>
              </div>
            </div>
            <div className="w-48 bg-muted rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${((questionIndex + 1) / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <div className="bg-card rounded-lg border border-border academic-shadow p-8">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">
                {question?.question}
              </h2>
              
              {question?.image && (
                <div className="mb-6 w-full max-w-md overflow-hidden rounded-lg">
                  <Image
                    src={question?.image}
                    alt={question?.imageAlt}
                    className="w-full h-48 object-cover"
                  />
                </div>
              )}

              {question?.description && (
                <p className="text-muted-foreground mb-6">{question?.description}</p>
              )}
            </div>

            {renderQuestionContent()}

            {question?.hint && (
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <div className="flex items-start space-x-2">
                  <Icon name="Lightbulb" size={16} className="text-accent mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Pista</h4>
                    <p className="text-sm text-muted-foreground">{question?.hint}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border-t border-border p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Button
            variant="outline"
            onClick={onPrevious}
            disabled={isFirst}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Anterior
          </Button>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Save" size={16} />
            <span>Guardado automáticamente</span>
          </div>

          <Button
            variant="default"
            onClick={onNext}
            iconName="ChevronRight"
            iconPosition="right"
          >
            {isLast ? 'Revisar' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;