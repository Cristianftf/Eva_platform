import http from '../../../config/http';

// Endpoints para administración
export const ADMIN_API = {
  // Endpoints de análisis
  getAnalytics: (timeRange) => http.get(`/api/admin/analytics?timeRange=${timeRange}`),
  exportAnalytics: (timeRange, format) => http.get(`/api/admin/analytics/export?timeRange=${timeRange}&format=${format}`),
  
  // Endpoints de cursos
  getCourses: (params) => http.get('/api/admin/courses', { params }),
  getCourseById: (id) => http.get(`/api/admin/courses/${id}`),
  createCourse: (data) => http.post('/api/admin/courses', data),
  updateCourse: (id, data) => http.put(`/api/admin/courses/${id}`, data),
  deleteCourse: (id) => http.delete(`/api/admin/courses/${id}`),
  bulkActionCourses: (action, ids) => http.post('/api/admin/courses/bulk', { action, ids }),

  // Endpoints de usuarios
  getUsers: (params) => http.get('/api/admin/users', { params }),
  getUserById: (id) => http.get(`/api/admin/users/${id}`),
  createUser: (data) => http.post('/api/admin/users', data),
  updateUser: (id, data) => http.put(`/api/admin/users/${id}`, data),
  deleteUser: (id) => http.delete(`/api/admin/users/${id}`),
  bulkActionUsers: (action, ids) => http.post('/api/admin/users/bulk', { action, ids }),

  // Endpoints de estadísticas
  getStats: () => http.get('/api/admin/stats'),
  getRecentActivity: (limit = 5) => http.get(`/api/admin/activity?limit=${limit}`),

  // Endpoints de configuración
  getSettings: () => http.get('/api/admin/settings'),
  updateSettings: (data) => http.put('/api/admin/settings', data),
  
  // Endpoints de contenido
  uploadContent: (data) => http.post('/api/admin/content/upload', data),
  getContent: (params) => http.get('/api/admin/content', { params }),
  deleteContent: (id) => http.delete(`/api/admin/content/${id}`)
};