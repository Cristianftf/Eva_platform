import { useState, useEffect } from 'react';
import { useQuiz } from '../../../hooks/useAssessment';

export const useQuizState = (quizId) => {
  const { quiz, loading, error } = useQuiz(quizId);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState(null);

  useEffect(() => {
    if (quiz?.duration) {
      const minutes = quiz.duration;
      setTimeLeft(minutes * 60); // Convertir a segundos
    }
  }, [quiz]);

  useEffect(() => {
    if (!timeLeft) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto submit when time is up
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTimeLeft = () => {
    if (!timeLeft) return '--:--';
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const setAnswer = async (questionIndex, answer) => {
    const newAnswers = { ...answers, [questionIndex]: answer };
    setAnswers(newAnswers);

    // Guardar progreso
    try {
      setSaving(true);
      await saveProgress(newAnswers);
      setSavedAt(new Date());
    } catch (err) {
      console.error('Error saving progress:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz?.questions?.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz?.id) return;
    try {
      const response = await submitQuiz(quiz.id, answers);
      // Redirigir a la página de resultados
      window.location.href = `/assessment/${quiz.id}/results`;
      return response;
    } catch (err) {
      console.error('Error submitting quiz:', err);
      throw err;
    }
  };

  return {
    quiz,
    loading,
    error,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    setAnswer,
    timeLeft: formatTimeLeft(),
    saving,
    savedAt,
    handleNext,
    handlePrevious,
    handleSubmit,
    currentQuestion: quiz?.questions?.[currentQuestionIndex],
    isFirst: currentQuestionIndex === 0,
    isLast: currentQuestionIndex === quiz?.questions?.length - 1,
    progress: ((currentQuestionIndex + 1) / (quiz?.questions?.length || 1)) * 100
  };
};