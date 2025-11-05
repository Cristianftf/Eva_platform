import { useState, useEffect } from 'react';
import { useAuth } from '../Context/authHooks';
import http from '../config/http';

export const useQuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchQuizzes = async () => {
    try {
      setLoading(true);
      const response = await http.get('/assessment/quizzes');
      setQuizzes(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, [token]);

  return { quizzes, loading, error, refetch: fetchQuizzes };
};

export const useQuiz = (quizId) => {
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchQuiz = async () => {
    if (!quizId) return;
    try {
      setLoading(true);
      const response = await http.get(`/assessment/quizzes/${quizId}`);
      setQuiz(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [quizId, token]);

  return { quiz, loading, error, refetch: fetchQuiz };
};

export const useQuizSubmission = (quizId) => {
  const [submission, setSubmission] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const submitQuiz = async (answers) => {
    try {
      setSubmitting(true);
      const response = await http.post(`/assessment/quizzes/${quizId}/submit`, answers);
      setSubmission(response.data);
      setError(null);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

  const saveProgress = async (answers) => {
    try {
      await http.post(`/assessment/quizzes/${quizId}/save-progress`, answers);
    } catch (err) {
      console.error('Error saving progress:', err);
    }
  };

  return { 
    submission, 
    submitting, 
    error, 
    submitQuiz, 
    saveProgress 
  };
};

export const useQuizResults = (quizId) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchResults = async () => {
    if (!quizId) return;
    try {
      setLoading(true);
      const response = await http.get(`/assessment/quizzes/${quizId}/results`);
      setResults(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
  }, [quizId, token]);

  return { results, loading, error, refetch: fetchResults };
};