import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const QuizResults = ({ quiz, results, onRetakeQuiz }) => {
  const getGradeColor = (percentage) => {
    if (percentage >= 90) return 'text-success';
    if (percentage >= 80) return 'text-primary';
    if (percentage >= 70) return 'text-warning';
    return 'text-error';
  };

  const getGradeLetter = (percentage) => {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
  };

  const getPerformanceMessage = (percentage) => {
    if (percentage >= 90) return "¡Excelente trabajo! Has demostrado un dominio excepcional del material.";
    if (percentage >= 80) return "¡Buen trabajo! Tienes un sólido entendimiento del contenido.";
    if (percentage >= 70) return "Trabajo satisfactorio. Considera revisar algunos conceptos clave.";
    if (percentage >= 60) return "Necesitas mejorar. Te recomendamos estudiar más el material.";
    return "Debes estudiar más a fondo el material antes de continuar.";
  };

  const percentage = Math.round((results?.score / results?.totalPoints) * 100);

  return (
    <div className="flex-1 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-card rounded-lg border border-border academic-shadow">
          {/* Header */}
          <div className="p-8 border-b border-border text-center">
            <div className="flex items-center justify-center w-20 h-20 bg-primary rounded-full mx-auto mb-4">
              <Icon name="Trophy" size={32} className="text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">¡Examen Completado!</h1>
            <p className="text-muted-foreground">{quiz?.title}</p>
          </div>

          {/* Score Display */}
          <div className="p-8 border-b border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className={`text-6xl font-bold ${getGradeColor(percentage)} mb-2`}>
                  {getGradeLetter(percentage)}
                </div>
                <div className="text-sm text-muted-foreground">Calificación</div>
              </div>
              
              <div className="text-center">
                <div className={`text-6xl font-bold ${getGradeColor(percentage)} mb-2`}>
                  {percentage}%
                </div>
                <div className="text-sm text-muted-foreground">Porcentaje</div>
              </div>
              
              <div className="text-center">
                <div className="text-6xl font-bold text-foreground mb-2">
                  {results?.score}/{results?.totalPoints}
                </div>
                <div className="text-sm text-muted-foreground">Puntos</div>
              </div>
            </div>

            <div className="bg-muted rounded-lg p-6 text-center">
              <p className="text-foreground font-medium">{getPerformanceMessage(percentage)}</p>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="p-8 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground mb-6">Detalles del Resultado</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-success">{results?.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correctas</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-error">{results?.incorrectAnswers}</div>
                <div className="text-sm text-muted-foreground">Incorrectas</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-warning">{results?.unanswered}</div>
                <div className="text-sm text-muted-foreground">Sin Responder</div>
              </div>
              <div className="bg-muted rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">{results?.timeSpent}</div>
                <div className="text-sm text-muted-foreground">Tiempo</div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-foreground">Progreso General</span>
                <span className="text-sm text-muted-foreground">{percentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all duration-1000 ${
                    percentage >= 70 ? 'bg-success' : 'bg-error'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>

            {/* Question Breakdown */}
            <div className="space-y-3">
              <h3 className="font-medium text-foreground">Análisis por Pregunta</h3>
              {results?.questionResults?.map((result, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    result?.correct
                      ? 'bg-success/10 border border-success/20'
                      : result?.answered
                      ? 'bg-error/10 border border-error/20' :'bg-warning/10 border border-warning/20'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon
                      name={result?.correct ? "CheckCircle" : result?.answered ? "XCircle" : "MinusCircle"}
                      size={16}
                      className={
                        result?.correct
                          ? 'text-success'
                          : result?.answered
                          ? 'text-error' :'text-warning'
                      }
                    />
                    <span className="text-sm text-foreground">
                      Pregunta {index + 1}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">
                      {result?.points}/{quiz?.questions?.[index]?.points} pts
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="p-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-4">
                <Link to="/course-detail-pages">
                  <Button variant="outline" iconName="ArrowLeft" iconPosition="left">
                    Volver al Curso
                  </Button>
                </Link>
                
                <Link to="/student-dashboard">
                  <Button variant="outline" iconName="Home" iconPosition="left">
                    Dashboard
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                >
                  Descargar Resultados
                </Button>

                {quiz?.allowRetake && percentage < 70 && (
                  <Button
                    variant="default"
                    onClick={onRetakeQuiz}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Repetir Examen
                  </Button>
                )}
              </div>
            </div>

            {/* Recommendations */}
            {percentage < 80 && (
              <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="Lightbulb" size={20} className="text-primary mt-0.5" />
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Recomendaciones de Estudio</h3>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Revisa los temas donde tuviste respuestas incorrectas</li>
                      <li>• Consulta el material de estudio adicional</li>
                      <li>• Participa en los foros de discusión del curso</li>
                      <li>• Programa una sesión de tutoría con el profesor</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResults;