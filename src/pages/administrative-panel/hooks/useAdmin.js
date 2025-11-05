import { useState, useEffect } from 'react';
import { ADMIN_API } from '../services/api';

// Hook para estadísticas generales
export const useAdminStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const response = await ADMIN_API.getStats();
        setStats(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error al cargar estadísticas');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
};

// Hook para analíticas
export const useAnalytics = (timeRange = '7d') => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await ADMIN_API.getAnalytics(timeRange);
        setAnalyticsData(response.data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Error al cargar analíticas');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timeRange]);

  const exportAnalytics = async (format) => {
    try {
      const response = await ADMIN_API.exportAnalytics(timeRange, format);
      return response.data;
    } catch (err) {
      throw new Error(err.message || 'Error al exportar analíticas');
    }
  };

  return { analyticsData, loading, error, exportAnalytics };
};

// Hook para gestión de cursos
export const useCourses = (initialFilters = {}) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await ADMIN_API.getCourses(filters);
      setCourses(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al cargar cursos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [filters]);

  const createCourse = async (data) => {
    try {
      const response = await ADMIN_API.createCourse(data);
      await fetchCourses();
      return response.data;
    } catch (err) {
      throw new Error(err.message || 'Error al crear curso');
    }
  };

  const updateCourse = async (id, data) => {
    try {
      const response = await ADMIN_API.updateCourse(id, data);
      await fetchCourses();
      return response.data;
    } catch (err) {
      throw new Error(err.message || 'Error al actualizar curso');
    }
  };

  const deleteCourse = async (id) => {
    try {
      await ADMIN_API.deleteCourse(id);
      await fetchCourses();
    } catch (err) {
      throw new Error(err.message || 'Error al eliminar curso');
    }
  };

  const bulkAction = async (action, ids) => {
    try {
      await ADMIN_API.bulkActionCourses(action, ids);
      await fetchCourses();
    } catch (err) {
      throw new Error(err.message || 'Error al realizar acción masiva');
    }
  };

  return {
    courses,
    loading,
    error,
    filters,
    setFilters,
    createCourse,
    updateCourse,
    deleteCourse,
    bulkAction,
    refetch: fetchCourses
  };
};

// Hook para gestión de usuarios
export const useUsers = (initialFilters = {}) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await ADMIN_API.getUsers(filters);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al cargar usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [filters]);

  const createUser = async (data) => {
    try {
      const response = await ADMIN_API.createUser(data);
      await fetchUsers();
      return response.data;
    } catch (err) {
      throw new Error(err.message || 'Error al crear usuario');
    }
  };

  const updateUser = async (id, data) => {
    try {
      const response = await ADMIN_API.updateUser(id, data);
      await fetchUsers();
      return response.data;
    } catch (err) {
      throw new Error(err.message || 'Error al actualizar usuario');
    }
  };

  const deleteUser = async (id) => {
    try {
      await ADMIN_API.deleteUser(id);
      await fetchUsers();
    } catch (err) {
      throw new Error(err.message || 'Error al eliminar usuario');
    }
  };

  const bulkAction = async (action, ids) => {
    try {
      await ADMIN_API.bulkActionUsers(action, ids);
      await fetchUsers();
    } catch (err) {
      throw new Error(err.message || 'Error al realizar acción masiva');
    }
  };

  return {
    users,
    loading,
    error,
    filters,
    setFilters,
    createUser,
    updateUser,
    deleteUser,
    bulkAction,
    refetch: fetchUsers
  };
};

// Hook para actividad reciente
export const useRecentActivity = (limit = 5) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await ADMIN_API.getRecentActivity(limit);
      setActivities(response.data);
      setError(null);
    } catch (err) {
      setError(err.message || 'Error al cargar actividades');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, [limit]);

  return { activities, loading, error, refetch: fetchActivities };
};