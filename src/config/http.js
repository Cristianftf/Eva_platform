// HTTP client configuration
import axios from 'axios';
import { API_URL } from './api';

// Create axios instance with default config
const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for API calls
http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 y no estamos intentando refrescar el token
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Intentar refrescar el token
        const response = await http.post('/auth/refresh');
        const { token } = response.data;
        
        localStorage.setItem('token', token);
        http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        return http(originalRequest);
      } catch (err) {
        // Si falla el refresh, limpiar el almacenamiento y redirigir al login
        localStorage.removeItem('token');
        window.location.href = '/auth';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default http;