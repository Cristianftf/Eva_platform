import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../Context/AuthContext';
import http from '../config/http';

export function useEducationalData() {
  const { user, userProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Course data
  const [courses, setCourses] = useState([])
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [instructorCourses, setInstructorCourses] = useState([])

  // Assignment data
  const [upcomingAssignments, setUpcomingAssignments] = useState([])

  // Notification data
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)

  // Activity data
  const [recentActivities, setRecentActivities] = useState([])

  // Load all published courses
  const loadCourses = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await http.get('/courses/published');
      setCourses(data || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al cargar los cursos');
      console.error('Error loading courses:', err);
    } finally {
      setLoading(false);
    }
  }, [])

  // Load student enrolled courses
  const loadEnrolledCourses = useCallback(async () => {
    if (!user?.id || userProfile?.role !== 'student') return;

    try {
      setLoading(true);
      const { data } = await http.get(`/students/${user.id}/courses`);
      const serverCourses = data || [];
      // Map server DTO to UI-friendly shape expected by components
      const mapped = serverCourses.map(c => {
        const modules = c?.modulesCount || 0;
        const progress = c?.progress || 0;
        const currentModuleIndex = modules > 0 ? Math.max(1, Math.ceil((progress / 100) * modules)) : 1;
        return {
          id: c?.id,
          title: c?.title,
          instructor: c?.instructorName || c?.instructor || '',
          thumbnail: c?.thumbnail || null,
          thumbnailAlt: c?.thumbnailAlt || c?.title || '',
          progress: progress,
          currentModule: `Módulo ${currentModuleIndex}`,
          totalModules: modules,
          updatedAt: c?.updatedAt || c?.updated_at
        };
      });
  setEnrolledCourses(mapped);
  return mapped;
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al cargar cursos inscritos');
      console.error('Error loading enrolled courses:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, userProfile?.role])

  // Load instructor courses
  const loadInstructorCourses = useCallback(async () => {
    if (!user?.id || userProfile?.role !== 'teacher') return;

    try {
      setLoading(true);
      const { data } = await http.get(`/courses/instructor/${user.id}`);
      setInstructorCourses(data || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al cargar cursos del instructor');
      console.error('Error loading instructor courses:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id, userProfile?.role])

  // Load upcoming assignments for students
  const loadUpcomingAssignments = useCallback(async () => {
    if (!user?.id || userProfile?.role !== 'student') return;

    try {
      const { data } = await http.get(`/students/${user.id}/deadlines`);
      const serverDeadlines = data || [];
      const mappedDeadlines = serverDeadlines.map(d => ({
        id: `${d.courseId || d.courseId}-${d.title}`,
        dueDate: d.dueDate || d.due_date,
        type: d.type || 'assignment',
        title: d.title,
        course: d.courseTitle || d.course || d.courseId,
        estimatedTime: d.estimatedTime || d.estimated_time || '2h'
      }));
      setUpcomingAssignments(mappedDeadlines || []);
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al cargar tareas pendientes');
      console.error('Error loading upcoming assignments:', err);
    }
  }, [user?.id, userProfile?.role])

  // Load user notifications
  const loadNotifications = useCallback(async (enrolledList = null) => {
    if (!user?.id) return;

    try {
      const { data } = await http.get(`/students/${user.id}/notifications`);
      const serverNotes = data || [];
      const mapped = serverNotes.map(n => ({
        id: n.id || (n.courseId ? `${n.courseId}-${Math.random().toString(36).slice(2)}` : Math.random().toString(36).slice(2)),
        type: n.type || 'announcement',
        title: n.title || (n.message ? (n.message.length > 60 ? n.message.slice(0, 57) + '...' : n.message) : 'Notificación'),
        message: n.message || n.title || '',
        course: (() => {
          const lookup = enrolledList || enrolledCourses || [];
          const found = lookup.find(c => c.id === n.courseId);
          return n.courseTitle || found?.title || n.courseId || null;
        })(),
        timestamp: n.createdAt || n.created_at || new Date().toISOString(),
        priority: n.priority || 'low',
        read: !!n.is_read || !!n.read
      }));
      setNotifications(mapped);
      const unread = mapped.filter(m => !m.read).length || 0;
      setUnreadCount(unread);
      return mapped;
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al cargar notificaciones');
      console.error('Error loading notifications:', err);
      return [];
    }
  }, [user?.id, enrolledCourses])

  // Load user activities
  const loadActivities = useCallback(async () => {
    if (!user?.id) return;

    try {
      // The backend doesn't currently expose a dedicated activities endpoint for students.
      // Derive recent activities from notifications and enrolled courses.
      const activities = [];
      if (notifications?.length) {
        for (const n of notifications.slice(0, 10)) {
          activities.push({
            id: n.id || n.message || Math.random().toString(36).slice(2),
            type: n.type || 'announcement',
            action: 'recibió',
            target: n.title || n.message || 'notificación',
            course: n.course || null,
            user: userProfile?.full_name || user?.email,
            timestamp: n.timestamp || n.createdAt || n.created_at || new Date().toISOString(),
          });
        }
      }

      // add quick activities from enrolled courses
      if (enrolledCourses?.length) {
        for (const c of enrolledCourses.slice(0, 5)) {
          activities.push({
            id: `course-${c.id}`,
            type: 'course',
            action: 'actualizó',
            target: `progreso en ${c.title} (${c.progress || 0}%)`,
            course: c.title,
            user: userProfile?.full_name || user?.email,
            timestamp: c.updatedAt || c.updated_at || new Date().toISOString(),
          });
        }
      }

      setRecentActivities(activities.slice(0, 20));
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al cargar actividades');
      console.error('Error loading activities:', err);
    }
  }, [user?.id, notifications, enrolledCourses, userProfile])

  // Enroll in a course
  const enrollInCourse = useCallback(async (courseId) => {
    if (!user?.id || userProfile?.role !== 'student') {
      throw new Error('Solo los estudiantes pueden inscribirse en cursos');
    }

    try {
      setLoading(true);
      const { data } = await http.post('/enrollments', {
        userId: user.id,
        courseId
      });
      
      // Refresh enrolled courses
      await loadEnrolledCourses();
      
      return { data, error: null };
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al inscribirse en el curso');
      console.error('Error enrolling in course:', err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  }, [user?.id, userProfile?.role, loadEnrolledCourses])

  // Update course progress
  const updateProgress = useCallback(async (courseId, progress, currentModule) => {
    if (!user?.id || userProfile?.role !== 'student') return;

    try {
      const { data } = await http.put(`/enrollments/${courseId}/progress`, {
        userId: user.id,
        progress,
        currentModule
      });
      
      // Refresh enrolled courses to show updated progress
      await loadEnrolledCourses();
      
      return { data, error: null };
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al actualizar el progreso');
      console.error('Error updating progress:', err);
      return { data: null, error: err };
    }
  }, [user?.id, userProfile?.role, loadEnrolledCourses])

  // Mark notification as read
  const markNotificationAsRead = useCallback(async (notificationId) => {
    try {
      await http.put(`/notifications/${notificationId}/read`);
      
      // Update local state: set `read` flag
      setNotifications(prev => 
        prev?.map(notification => 
          notification?.id === notificationId 
            ? { ...notification, read: true }
            : notification
        ) || []
      );
      
      // Update unread count
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al marcar notificación como leída');
      console.error('Error marking notification as read:', err);
    }
  }, [])

  // Add new activity
  const addActivity = useCallback(async (action, target, courseId, type) => {
    if (!user?.id) return;

    try {
      await http.post('/activities', {
        userId: user.id,
        action,
        target,
        courseId,
        type
      });
      
      // Refresh activities
      await loadActivities();
    } catch (err) {
      setError(err?.response?.data?.message || 'Error al añadir actividad');
      console.error('Error adding activity:', err);
    }
  }, [user?.id, loadActivities])

  // Load initial data based on user role
  useEffect(() => {
    if (!user || !userProfile) return

    const loadInitialData = async () => {
      switch (userProfile?.role) {
        case 'student':
          // ensure enrolled courses and notifications load first so activities can be derived
          const enrolled = await loadEnrolledCourses();
          await loadNotifications(enrolled || null);
          await Promise.all([
            loadCourses(),
            loadUpcomingAssignments(),
            loadActivities()
          ])
          break
        case 'teacher':
          await Promise.all([
            loadInstructorCourses(),
            loadNotifications(),
            loadActivities()
          ])
          break
        case 'admin':
          await Promise.all([
            loadCourses(),
            loadNotifications(),
            loadActivities()
          ])
          break
        default:
          break
      }
    }

    loadInitialData()
  }, [user?.id, userProfile?.role])

  // Dashboard stats calculation
  const dashboardStats = {
    activeCourses: enrolledCourses?.length || instructorCourses?.length || 0,
    pendingAssignments: upcomingAssignments?.length || 0,
    overallProgress: enrolledCourses?.length 
      ? Math.round(enrolledCourses?.reduce((acc, course) => acc + (course?.progress || 0), 0) / enrolledCourses?.length)
      : 0,
    newMessages: unreadCount
  }

  return {
    // Data
    courses,
    enrolledCourses,
    instructorCourses,
    upcomingAssignments,
    notifications,
    unreadCount,
    recentActivities,
    dashboardStats,
    
    // Loading states
    loading,
    error, 
    
    // Actions
    loadCourses,
    loadEnrolledCourses,
    loadInstructorCourses,
    loadUpcomingAssignments,
    loadNotifications,
    loadActivities,
    enrollInCourse,
    updateProgress,
    markNotificationAsRead,
    addActivity,
    
    // Utilities
    clearError: () => setError(null)
  }
}

export default useEducationalData