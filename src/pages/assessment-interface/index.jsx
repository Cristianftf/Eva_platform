import React, { useState, useEffect } from 'react';
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

const AssessmentInterface = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentView, setCurrentView] = useState('list'); // list, quiz, review, results
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [flaggedQuestions, setFlaggedQuestions] = useState([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock quiz data
  const mockQuizzes = [
    {
      id: 1,
      title: "Examen Final - Cálculo Diferencial",
      description: "Evaluación comprensiva de límites, derivadas y aplicaciones del cálculo diferencial. Incluye problemas teóricos y prácticos.",
      subject: "Matemáticas",
      instructor: "Dr. María González",
      questionCount: 25,
      duration: 120,
      totalPoints: 100,
      difficulty: "hard",
      status: "available",
      dueDate: "15 Nov 2025",
      attempts: 0,
      maxAttempts: 2,
      allowRetake: true,
      timed: true,
      instructions: "Lee cada pregunta cuidadosamente. Puedes marcar preguntas para revisar más tarde. El examen se guardará automáticamente cada 30 segundos.",
      questions: [
        {
          id: 1,
          type: "multiple-choice",
          question: "¿Cuál es la derivada de f(x) = x³ + 2x² - 5x + 3?",
          description: "Aplica las reglas básicas de derivación.",
          points: 4,
          options: [
            { id: "a", text: "3x² + 4x - 5" },
            { id: "b", text: "3x² + 2x - 5" },
            { id: "c", text: "x³ + 4x - 5" },
            { id: "d", text: "3x² + 4x + 3" }
          ],
          correctAnswer: "a",
          hint: "Recuerda que la derivada de xⁿ es n·xⁿ⁻¹"
        },
        {
          id: 2,
          type: "true-false",
          question: "El límite de una función siempre existe si la función es continua en ese punto.",
          points: 2,
          correctAnswer: "true"
        },
        {
          id: 3,
          type: "short-answer",
          question: "Calcula el límite: lim(x→0) (sin(x)/x)",
          description: "Expresa tu respuesta como un número decimal o fracción.",
          points: 5,
          correctAnswer: "1"
        },
        {
          id: 4,
          type: "essay",
          question: "Explica el teorema del valor medio y proporciona un ejemplo de su aplicación.",
          description: "Tu respuesta debe incluir el enunciado del teorema y un ejemplo práctico.",
          points: 10
        },
        {
          id: 5,
          type: "multiple-select",
          question: "¿Cuáles de las siguientes funciones son derivables en x = 0?",
          points: 6,
          options: [
            { id: "a", text: "f(x) = |x|" },
            { id: "b", text: "f(x) = x²" },
            { id: "c", text: "f(x) = sin(x)" },
            { id: "d", text: "f(x) = √x" }
          ],
          correctAnswers: ["b", "c"]
        }
      ]
    },
    {
      id: 2,
      title: "Quiz - Introducción a la Programación",
      description: "Evaluación de conceptos básicos de programación, variables, estructuras de control y funciones.",
      subject: "Informática",
      instructor: "Prof. Carlos Ruiz",
      questionCount: 15,
      duration: 45,
      totalPoints: 60,
      difficulty: "easy",
      status: "completed",
      dueDate: "10 Nov 2025",
      attempts: 1,
      maxAttempts: 3,
      allowRetake: true,
      timed: true,
      lastScore: {
        score: 52,
        percentage: 87,
        grade: "B+",
        completedAt: "08 Nov 2025, 14:30"
      }
    },
    {
      id: 3,
      title: "Examen Parcial - Historia Contemporánea",
      description: "Evaluación sobre los eventos históricos del siglo XX, incluyendo las guerras mundiales y la Guerra Fría.",
      subject: "Historia",
      instructor: "Dra. Ana Martínez",
      questionCount: 30,
      duration: 90,
      totalPoints: 120,
      difficulty: "medium",
      status: "in-progress",
      dueDate: "12 Nov 2025",
      attempts: 1,
      maxAttempts: 1,
      allowRetake: false,
      timed: true,
      timeRemaining: "45:30"
    },
    {
      id: 4,
      title: "Práctica - Química Orgánica",
      description: "Ejercicios de práctica sobre nomenclatura, reacciones y mecanismos en química orgánica.",
      subject: "Química",
      instructor: "Dr. Luis Fernández",
      questionCount: 20,
      duration: 60,
      totalPoints: 80,
      difficulty: "medium",
      status: "locked",
      dueDate: "20 Nov 2025",
      attempts: 0,
      maxAttempts: 5,
      allowRetake: true,
      timed: false,
      lockReason: "Debes completar el módulo de teoría antes de acceder a este examen."
    }
  ];

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

  // Filter quizzes based on selected filters
  const filteredQuizzes = mockQuizzes?.filter(quiz => {
    const matchesSubject = filterSubject === 'all' || quiz?.subject === filterSubject;
    const matchesStatus = filterStatus === 'all' || quiz?.status === filterStatus;
    return matchesSubject && matchesStatus;
  });

  // Timer effect for timed quizzes
  useEffect(() => {
    let timer;
    if (currentView === 'quiz' && currentQuiz?.timed && timeRemaining > 0) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [currentView, currentQuiz, timeRemaining]);

  // Auto-save effect
  useEffect(() => {
    let autoSaveTimer;
    if (currentView === 'quiz' && Object.keys(answers)?.length > 0) {
      autoSaveTimer = setInterval(() => {
        // Auto-save logic would go here
        console.log('Auto-saving progress...');
      }, 30000);
    }
    return () => clearInterval(autoSaveTimer);
  }, [currentView, answers]);

  const handleStartQuiz = (quiz) => {
    setCurrentQuiz(quiz);
    setCurrentQuestion(0);
    setAnswers({});
    setFlaggedQuestions([]);
    
    if (quiz?.timed) {
      setTimeRemaining(quiz?.duration * 60); // Convert minutes to seconds
    }
    
    setCurrentView('quiz');
  };

  const handleViewResults = (quiz) => {
    setCurrentQuiz(quiz);
    // Mock results data
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
    setCurrentView('results');
  };

  const handleAnswerChange = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleQuestionSelect = (questionIndex) => {
    setCurrentQuestion(questionIndex);
  };

  const handleToggleFlag = (questionIndex) => {
    setFlaggedQuestions(prev => 
      prev?.includes(questionIndex)
        ? prev?.filter(q => q !== questionIndex)
        : [...prev, questionIndex]
    );
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentQuiz?.questions?.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setCurrentView('review');
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleQuestionJump = (questionIndex) => {
    setCurrentQuestion(questionIndex);
    setCurrentView('quiz');
  };

  const handleSubmitQuiz = async () => {
    setIsSubmitting(true);
    
    // Simulate submission delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock results calculation
    const mockResults = {
      score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
      totalPoints: currentQuiz?.totalPoints,
      correctAnswers: Math.floor(Math.random() * 10) + 15,
      incorrectAnswers: Math.floor(Math.random() * 8) + 2,
      unanswered: Math.floor(Math.random() * 3),
      timeSpent: currentQuiz?.timed ? `${Math.floor((currentQuiz?.duration * 60 - timeRemaining) / 60)}:${((currentQuiz?.duration * 60 - timeRemaining) % 60)?.toString()?.padStart(2, '0')}` : "N/A",
      questionResults: currentQuiz?.questions?.map((_, index) => ({
        correct: Math.random() > 0.3,
        answered: answers?.[index] !== undefined,
        points: Math.random() > 0.3 ? Math.ceil(Math.random() * 5) : 0
      }))
    };
    
    setIsSubmitting(false);
    setCurrentView('results');
  };

  const handleRetakeQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setFlaggedQuestions([]);
    
    if (currentQuiz?.timed) {
      setTimeRemaining(currentQuiz?.duration * 60);
    }
    
    setCurrentView('quiz');
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setCurrentQuiz(null);
    setCurrentQuestion(0);
    setAnswers({});
    setFlaggedQuestions([]);
    setTimeRemaining(0);
  };

  const renderContent = () => {
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
            results={{
              score: Math.floor(Math.random() * 40) + 60,
              totalPoints: currentQuiz?.totalPoints,
              correctAnswers: Math.floor(Math.random() * 10) + 15,
              incorrectAnswers: Math.floor(Math.random() * 8) + 2,
              unanswered: Math.floor(Math.random() * 3),
              timeSpent: "78:45",
              questionResults: currentQuiz?.questions?.map(() => ({
                correct: Math.random() > 0.3,
                answered: Math.random() > 0.1,
                points: Math.random() > 0.3 ? Math.ceil(Math.random() * 5) : 0
              }))
            }}
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

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  <div className="bg-card border border-border rounded-lg p-4 text-center academic-shadow">
                    <div className="text-2xl font-bold text-primary">4</div>
                    <div className="text-sm text-muted-foreground">Evaluaciones Totales</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 text-center academic-shadow">
                    <div className="text-2xl font-bold text-success">1</div>
                    <div className="text-sm text-muted-foreground">Completadas</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 text-center academic-shadow">
                    <div className="text-2xl font-bold text-warning">1</div>
                    <div className="text-sm text-muted-foreground">En Progreso</div>
                  </div>
                  <div className="bg-card border border-border rounded-lg p-4 text-center academic-shadow">
                    <div className="text-2xl font-bold text-accent">87%</div>
                    <div className="text-sm text-muted-foreground">Promedio General</div>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                  <Select
                    label="Filtrar por materia"
                    options={subjectOptions}
                    value={filterSubject}
                    onChange={setFilterSubject}
                    className="w-full sm:w-48"
                  />
                  
                  <Select
                    label="Filtrar por estado"
                    options={statusOptions}
                    value={filterStatus}
                    onChange={setFilterStatus}
                    className="w-full sm:w-48"
                  />

                  <Button
                    variant="outline"
                    onClick={() => {
                      setFilterSubject('all');
                      setFilterStatus('all');
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

  return (
    <div className="min-h-screen bg-background">
      {currentView === 'list' && <Header />}
      
      <div className="flex">
        {currentView === 'list' && (
          <Sidebar 
            isCollapsed={sidebarCollapsed} 
            onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
          />
        )}
        
        <main className={`flex-1 ${currentView === 'list' ? 'ml-0 lg:ml-64' : ''} ${currentView === 'list' ? 'mt-16' : ''}`}>
          {currentView === 'quiz' && (
            <QuizHeader
              quiz={currentQuiz}
              timeRemaining={timeRemaining}
              onSubmit={() => setCurrentView('review')}
              onSaveProgress={() => console.log('Saving progress...')}
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