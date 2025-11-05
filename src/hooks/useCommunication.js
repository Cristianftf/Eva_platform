import { useState, useEffect } from 'react';
import { useAuth } from '../Context/authHooks';
import http from '../config/http';

export const useChat = () => {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchChats = async () => {
    try {
      setLoading(true);
      const response = await http.get('/communication/chats');
      setChats(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (chatId) => {
    if (!chatId) return;
    try {
      setLoading(true);
      const response = await http.get(`/communication/chats/${chatId}/messages`);
      setMessages(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (chatId, content) => {
    try {
      const response = await http.post(`/communication/chats/${chatId}/messages`, { content });
      setMessages(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const createChat = async (participants) => {
    try {
      const response = await http.post('/communication/chats', { participants });
      setChats(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchChats();
  }, [token]);

  useEffect(() => {
    if (activeChat) {
      fetchMessages(activeChat.id);
    }
  }, [activeChat]);

  return {
    chats,
    messages,
    loading,
    error,
    activeChat,
    setActiveChat,
    sendMessage,
    createChat,
    refetchChats: fetchChats,
    refetchMessages: () => fetchMessages(activeChat?.id)
  };
};

export const useConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchConsultations = async () => {
    try {
      setLoading(true);
      const response = await http.get('/communication/consultations');
      setConsultations(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const scheduleConsultation = async (consultationData) => {
    try {
      const response = await http.post('/communication/consultations', consultationData);
      setConsultations(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const cancelConsultation = async (consultationId) => {
    try {
      await http.delete(`/communication/consultations/${consultationId}`);
      setConsultations(prev => prev.filter(c => c.id !== consultationId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchConsultations();
  }, [token]);

  return {
    consultations,
    loading,
    error,
    scheduleConsultation,
    cancelConsultation,
    refetch: fetchConsultations
  };
};

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await http.get('/communication/notifications');
      setNotifications(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (notificationId) => {
    try {
      await http.patch(`/communication/notifications/${notificationId}/read`);
      setNotifications(prev => prev.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const markAllAsRead = async () => {
    try {
      await http.patch('/communication/notifications/read-all');
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [token]);

  return {
    notifications,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    refetch: fetchNotifications
  };
};