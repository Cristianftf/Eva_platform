// API URLs
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Roles de usuario
export const USER_ROLES = {
  STUDENT: 'ROLE_STUDENT',
  TEACHER: 'ROLE_TEACHER',
  ADMIN: 'ROLE_ADMIN'
};

// Endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    VALIDATE: '/auth/validate'
  },
  USERS: {
    PROFILE: (userId) => `/users/${userId}/profile`,
    UPDATE_PROFILE: (userId) => `/users/${userId}/profile`
  },
  COURSES: {
    LIST: '/courses',
    DETAILS: (courseId) => `/courses/${courseId}`,
    ENROLL: (courseId) => `/courses/${courseId}/enroll`,
    PROGRESS: (courseId) => `/courses/${courseId}/progress`
  }
};