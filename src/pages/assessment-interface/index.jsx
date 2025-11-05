import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import QuizHeader from './components/QuizHeader';
import QuestionNavigation from './components/QuestionNavigation';
import QuestionDisplay from './components/QuestionDisplay';
import QuizReview from './components/QuizReview';
import QuizResults from './components/QuizResults';
import QuizList from './components/QuizList';
import { useQuizList } from '../../hooks/useAssessment';

const AssessmentInterface = () => {
  const navigate = useNavigate();
  
  // UI State
  const [uiState, setUiState] = useState({
    sidebarCollapsed: false,
    currentView: 'list', // list, quiz, review, results
    isSubmitting: false,
    loading: false,
    error: null
  });

  // Assessment State
  const [assessmentState, setAssessmentState] = useState({
    currentQuiz: null,
    currentQuestion: 0,
    answers: {},
    flaggedQuestions: [],
    timeRemaining: 0,
    results: null
  });

  // Filter State
  const [filterState, setFilterState] = useState({
    subject: 'all',
    status: 'all'
  });

  const { quizzes: apiQuizzes, loading: quizzesLoading, error: quizzesError } = useQuizList();

  const subjectOptions = [
    { value: 'all', label: 'Todas las materias' },
    { value: 'Matemáticas', label: 'Matemáticas' },
    { value: 'Informática', label: 'Informática' },
    { value: 'Historia', label: 'Historia' },
    { value: 'Química', label: 'Química' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos los estados' },
    { value: 'available', label: 'Disponible' },
    { value: 'in-progress', label: 'En progreso' },
    { value: 'completed', label: 'Completado' },
    { value: 'locked', label: 'Bloqueado' }
  ];

  // Filtrado de exámenes con memoization (datos desde la API)
  const filteredQuizzes = useMemo(() => {
    const source = apiQuizzes || [];
    return source.filter(quiz => {
      const matchesSubject = filterState.subject === 'all' || quiz?.subject === filterState.subject;
      const matchesStatus = filterState.status === 'all' || quiz?.status === filterState.status;
      return matchesSubject && matchesStatus;
    });
  }, [apiQuizzes, filterState.subject, filterState.status]);

  // Timer effect for timed quizzes
  useEffect(() => {
    let timer;
    const { currentQuiz, timeRemaining } = assessmentState;
    
    if (uiState.currentView === 'quiz' && currentQuiz?.timed && timeRemaining > 0) {
      timer = setInterval(() => {
        setAssessmentState(prev => {
          if (prev.timeRemaining <= 1) {
            handleSubmitQuiz();
            return { ...prev, timeRemaining: 0 };
          }
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }
    
    return () => clearInterval(timer);
  }, [uiState.currentView, assessmentState.currentQuiz, assessmentState.timeRemaining]);

  // Auto-save effect
  useEffect(() => {
    let autoSaveTimer;
    const { answers } = assessmentState;

    if (uiState.currentView === 'quiz' && Object.keys(answers)?.length > 0) {
      autoSaveTimer = setInterval(() => {
        try {
          // Aquí iría la lógica real de auto-guardado al API
          localStorage.setItem('quizProgress', JSON.stringify({
            answers,
            timestamp: new Date().toISOString()
          }));
          console.log('Progreso guardado automáticamente');
        } catch (error) {
          console.error('Error al guardar el progreso:', error);
        }
      }, 30000);
    }
    
    return () => clearInterval(autoSaveTimer);
  }, [uiState.currentView, assessmentState.answers]);

  const handleStartQuiz = (quiz) => {
    try {
      setAssessmentState(prev => ({
        ...prev,
        currentQuiz: quiz,
        currentQuestion: 0,
        answers: {},
        flaggedQuestions: [],
        timeRemaining: quiz?.timed ? quiz.duration * 60 : 0,
        results: null
      }));

      setUiState(prev => ({
        ...prev,
        currentView: 'quiz',
        loading: false,
        error: null
      }));
    } catch (error) {
      setUiState(prev => ({
        ...prev,
        error: 'Error al iniciar el examen',
        loading: false
      }));
    }
  };

  const handleViewResults = (quiz) => {
    try {
      setUiState(prev => ({
        ...prev,
        loading: true,
        error: null
      }));

      // Simular carga de resultados del API
      const mockResults = {
        score: quiz?.lastScore?.score,
        totalPoints: quiz?.totalPoints,
        correctAnswers: Math.floor(quiz?.lastScore?.score / quiz?.totalPoints * quiz?.questionCount),
        incorrectAnswers: quiz?.questionCount - Math.floor(quiz?.lastScore?.score / quiz?.totalPoints * quiz?.questionCount) - 2,
        unanswered: 2,
        timeSpent: "78:45",
        questionResults: Array.from({ length: quiz?.questionCount }, (_, i) => ({
          correct: Math.random() > 0.3,
          answered: Math.random() > 0.1,
          points: Math.random() > 0.3 ? Math.ceil(Math.random() * 5) : 0
        }))
      };

      setAssessmentState(prev => ({
        ...prev,
        currentQuiz: quiz,
        results: mockResults
      }));

      setUiState(prev => ({
        ...prev,
        currentView: 'results',
        loading: false
      }));
    } catch (error) {
      setUiState(prev => ({
        ...prev,
        error: 'Error al cargar los resultados',
        loading: false
      }));
    }
  };

  const handleAnswerChange = (answer) => {
    try {
      setAssessmentState(prev => ({
        ...prev,
        answers: {
          ...prev.answers,
          [prev.currentQuestion]: answer
        }
      }));
    } catch (error) {
      setUiState(prev => ({
        ...prev,
        error: 'Error al guardar la respuesta'
      }));
    }
  };

  const handleQuestionSelect = (questionIndex) => {
    setAssessmentState(prev => ({
      ...prev,
      currentQuestion: questionIndex
    }));
  };

  const handleToggleFlag = (questionIndex) => {
    setAssessmentState(prev => ({
      ...prev,
      flaggedQuestions: prev.flaggedQuestions?.includes(questionIndex)
        ? prev.flaggedQuestions.filter(q => q !== questionIndex)
        : [...prev.flaggedQuestions, questionIndex]
    }));
  };

  const handleNextQuestion = () => {
    setAssessmentState(prev => {
      const isLastQuestion = prev.currentQuestion >= prev.currentQuiz?.questions?.length - 1;
      
      return {
        ...prev,
        currentQuestion: isLastQuestion ? prev.currentQuestion : prev.currentQuestion + 1
      };
    });

    if (assessmentState.currentQuestion >= assessmentState.currentQuiz?.questions?.length - 1) {
      setUiState(prev => ({
        ...prev,
        currentView: 'review'
      }));
    }
  };

  const handlePreviousQuestion = () => {
    setAssessmentState(prev => ({
      ...prev,
      currentQuestion: Math.max(0, prev.currentQuestion - 1)
    }));
  };

  const handleQuestionJump = (questionIndex) => {
    setAssessmentState(prev => ({
      ...prev,
      currentQuestion: questionIndex
    }));

    setUiState(prev => ({
      ...prev,
      currentView: 'quiz'
    }));
  };

  const handleSubmitQuiz = async () => {
    try {
      setUiState(prev => ({
        ...prev,
        isSubmitting: true,
        error: null
      }));

      // Simulación del envío al API
      await new Promise(resolve => setTimeout(resolve, 2000));

      const { currentQuiz, answers, timeRemaining } = assessmentState;
      
      // Mock results calculation
      const mockResults = {
        score: Math.floor(Math.random() * 40) + 60,
        totalPoints: currentQuiz?.totalPoints,
        correctAnswers: Math.floor(Math.random() * 10) + 15,
        incorrectAnswers: Math.floor(Math.random() * 8) + 2,
        unanswered: Math.floor(Math.random() * 3),
        timeSpent: currentQuiz?.timed 
          ? `${Math.floor((currentQuiz?.duration * 60 - timeRemaining) / 60)}:${
              ((currentQuiz?.duration * 60 - timeRemaining) % 60)?.toString()?.padStart(2, '0')
            }` 
          : "N/A",
        questionResults: currentQuiz?.questions?.map((_, index) => ({
          correct: Math.random() > 0.3,
          answered: answers?.[index] !== undefined,
          points: Math.random() > 0.3 ? Math.ceil(Math.random() * 5) : 0
        }))
      };

      setAssessmentState(prev => ({
        ...prev,
        results: mockResults
      }));

      setUiState(prev => ({
        ...prev,
        currentView: 'results',
        isSubmitting: false
      }));
    } catch (error) {
      setUiState(prev => ({
        ...prev,
        error: 'Error al enviar el examen',
        isSubmitting: false
      }));
    }
  };

  const handleRetakeQuiz = () => {
    try {
      const { currentQuiz } = assessmentState;

      setAssessmentState(prev => ({
        ...prev,
        currentQuestion: 0,
        answers: {},
        flaggedQuestions: [],
        timeRemaining: currentQuiz?.timed ? currentQuiz.duration * 60 : 0,
        results: null
      }));

      setUiState(prev => ({
        ...prev,
        currentView: 'quiz',
        error: null
      }));
    } catch (error) {
      setUiState(prev => ({
        ...prev,
        error: 'Error al reiniciar el examen'
      }));
    }
  };

  const handleBackToList = () => {
    try {
      setAssessmentState(prev => ({
        ...prev,
        currentQuiz: null,
        currentQuestion: 0,
        answers: {},
        flaggedQuestions: [],
        timeRemaining: 0,
        results: null
      }));

      setUiState(prev => ({
        ...prev,
        currentView: 'list',
        error: null
      }));
    } catch (error) {
      setUiState(prev => ({
        ...prev,
        error: 'Error al volver a la lista'
      }));
    }
  };

  const renderContent = () => {
    const { 
      currentQuiz, 
      currentQuestion, 
      answers, 
      flaggedQuestions,
      results 
    } = assessmentState;

    const {
      currentView,
      isSubmitting,
      loading,
      error
    } = uiState;

  if (loading || quizzesLoading) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-muted-foreground">Cargando...</p>
          </div>
        </div>
      );
    }

  if (error || quizzesError) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <Icon name="AlertTriangle" size={48} className="text-error mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">
              Se produjo un error
            </h3>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      );
    }

    switch (currentView) {
      case 'quiz':
        return (
          <div className="flex h-full">
            <QuestionNavigation
              questions={currentQuiz?.questions}
              currentQuestion={currentQuestion}
              answers={answers}
              flaggedQuestions={flaggedQuestions}
              onQuestionSelect={handleQuestionSelect}
              onToggleFlag={handleToggleFlag}
            />
            <QuestionDisplay
              question={currentQuiz?.questions?.[currentQuestion]}
              questionIndex={currentQuestion}
              totalQuestions={currentQuiz?.questions?.length}
              answer={answers?.[currentQuestion]}
              onAnswerChange={handleAnswerChange}
              onNext={handleNextQuestion}
              onPrevious={handlePreviousQuestion}
              isFirst={currentQuestion === 0}
              isLast={currentQuestion === currentQuiz?.questions?.length - 1}
            />
          </div>
        );

      case 'review':
        return (
          <QuizReview
            quiz={currentQuiz}
            answers={answers}
            flaggedQuestions={flaggedQuestions}
            onQuestionJump={handleQuestionJump}
            onSubmit={handleSubmitQuiz}
            isSubmitting={isSubmitting}
          />
        );

      case 'results':
        return (
          <QuizResults
            quiz={currentQuiz}
            results={results}
            onRetakeQuiz={handleRetakeQuiz}
          />
        );

      default:
        return (
          <div className="flex-1 p-8">
            <div className="max-w-6xl mx-auto">
              {/* Header */}
              <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg">
                    <Icon name="FileText" size={24} className="text-primary-foreground" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">Centro de Evaluaciones</h1>
                    <p className="text-muted-foreground">
                      Accede a tus exámenes, quizzes y evaluaciones programadas
                    </p>
                  </div>
                </div>

                {/* Stats (calculados desde la API de quizzes) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-card border border-border rounded-lg p-4 text-center academic-shadow">
                    <div className="text-2xl font-bold text-primary">{(apiQuizzes || []).length}</div>
                    <div className="text-sm text-muted-foreground">Evaluaciones Totales</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 text-center academic-shadow">
                    <div className="text-2xl font-bold text-success">{(apiQuizzes || []).filter(q => q?.status === 'completed').length}</div>
                    <div className="text-sm text-muted-foreground">Completadas</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 text-center academic-shadow">
                    <div className="text-2xl font-bold text-warning">{(apiQuizzes || []).filter(q => q?.status === 'in-progress').length}</div>
                    <div className="text-sm text-muted-foreground">En Progreso</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 text-center academic-shadow">
                    <div className="text-2xl font-bold text-accent">{Math.round(((apiQuizzes || []).reduce((acc, q) => acc + (q?.lastScore?.percentage || 0), 0) / Math.max(1, (apiQuizzes || []).filter(q => q?.lastScore).length)) || 0)}%</div>
                    <div className="text-sm text-muted-foreground">Promedio General</div>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                  <Select
                    label="Filtrar por materia"
                    options={subjectOptions}
                    value={filterState.subject}
                    onChange={subject => setFilterState(prev => ({ ...prev, subject }))}
                    className="w-full sm:w-48"
                  />
                  
                  <Select
                    label="Filtrar por estado"
                    options={statusOptions}
                    value={filterState.status}
                    onChange={status => setFilterState(prev => ({ ...prev, status }))}
                    className="w-full sm:w-48"
                  />

                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilterState({
                        subject: 'all',
                        status: 'all'
                      });
                    }}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Limpiar Filtros
                  </Button>
                </div>
              </div>

              {/* Quiz List */}
              <QuizList
                quizzes={filteredQuizzes}
                onStartQuiz={handleStartQuiz}
                onViewResults={handleViewResults}
              />

              {filteredQuizzes?.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No se encontraron evaluaciones
                  </h3>
                  <p className="text-muted-foreground">
                    Ajusta los filtros para ver más evaluaciones disponibles.
                  </p>
                </div>
              )}
            </div>
          </div>
        );
    }
  };

  const { 
    currentView,
    sidebarCollapsed,
    isSubmitting
  } = uiState;

  const {
    currentQuiz,
    timeRemaining 
  } = assessmentState;

  // Manejo de guardado de progreso
  const handleSaveProgress = useCallback(async () => {
    try {
      // Aquí iría la lógica real de guardado al API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Progreso guardado manualmente');
    } catch (error) {
      setUiState(prev => ({
        ...prev,
        error: 'Error al guardar el progreso'
      }));
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'list' && <Header />}
      
      <div className="flex">
        {currentView === 'list' && (
          <Sidebar 
            isCollapsed={sidebarCollapsed} 
            onToggle={() => setUiState(prev => ({
              ...prev,
              sidebarCollapsed: !prev.sidebarCollapsed
            }))} 
          />
        )}
        
        <main className={`flex-1 ${currentView === 'list' ? 'ml-0 lg:ml-64' : ''} ${currentView === 'list' ? 'mt-16' : ''}`}>
          {currentView === 'quiz' && (
            <QuizHeader
              quiz={currentQuiz}
              timeRemaining={timeRemaining}
              onSubmit={() => setUiState(prev => ({ ...prev, currentView: 'review' }))}
              onSaveProgress={handleSaveProgress}
              isSubmitting={isSubmitting}
            />
          )}
          
          <div className={`${currentView === 'quiz' ? 'h-[calc(100vh-120px)]' : 'min-h-screen'} flex flex-col`}>
            {currentView !== 'list' && (
              <div className="p-4 border-b border-border bg-card">
                <Button
                  variant="outline"
                  onClick={handleBackToList}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Volver a Evaluaciones
                </Button>
              </div>
            )}
            
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AssessmentInterface;