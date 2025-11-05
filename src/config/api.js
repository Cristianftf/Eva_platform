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
    UPDATE_PROFILE: (userId) => `/users/${userId}/profile`,
    DASHBOARD_STATS: (userId) => `/users/${userId}/dashboard/stats`,
    NOTIFICATIONS: (userId) => `/users/${userId}/notifications`,
    MARK_NOTIFICATION_READ: (userId, notificationId) => `/users/${userId}/notifications/${notificationId}/read`
  },
  COURSES: {
    LIST: '/courses',
    ENROLLED: '/courses/enrolled',
    DETAILS: (courseId) => `/courses/${courseId}`,
    ENROLL: (courseId) => `/courses/${courseId}/enroll`,
    PROGRESS: (courseId) => `/courses/${courseId}/progress`,
    MODULES: (courseId) => `/courses/${courseId}/modules`
  },
  ASSIGNMENTS: {
    LIST: '/assignments',
    UPCOMING: '/assignments/upcoming',
    DETAILS: (assignmentId) => `/assignments/${assignmentId}`,
    SUBMIT: (assignmentId) => `/assignments/${assignmentId}/submit`
  },
  ACTIVITIES: {
    RECENT: '/activities/recent',
    DETAILS: (activityId) => `/activities/${activityId}`
  },
  STUDY_GROUPS: {
    LIST: '/study-groups',
    JOIN: (groupId) => `/study-groups/${groupId}/join`,
    CREATE: '/study-groups/create'
  },
  COMMUNICATION: {
    SCHEDULE_TUTORING: '/communication/tutoring/schedule',
    QUICK_QUIZ: '/assessment/quick-quiz'
  }
};