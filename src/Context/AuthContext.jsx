import React, { createContext, useState, useEffect, useMemo } from 'react';
import axios from 'axios';

// URL base de tu API Spring Boot
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// Crear una instancia de axios con configuración común
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
}); 

// Interceptor para agregar el token a las peticiones
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const AuthContext = createContext({});

// El hook useAuth se ha movido a authHooks.js

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  // Profile operations object for async operations
  const profileOperations = useMemo(() => ({
    async load(userId) {
      if (!userId) return;
      setProfileLoading(true);
      try {
        const { data } = await api.get(`/users/${userId}/profile`);
        if (data) {
          // normalize backend fields
          const fullName = data.fullName || data.full_name || data.name || '';

          // Normalize role: backend may return 'ROLE_STUDENT' or 'student'
          const rawRole = data.role || data.roles || null;
          let normalizedRole = null;
          if (typeof rawRole === 'string') {
            if (rawRole.startsWith('ROLE_')) {
              normalizedRole = rawRole.replace('ROLE_', '').toLowerCase();
            } else {
              normalizedRole = rawRole.toLowerCase();
            }
          } else if (Array.isArray(rawRole) && rawRole.length > 0) {
            // e.g. ['ROLE_STUDENT'] or ['student']
            const r = rawRole[0];
            normalizedRole = typeof r === 'string' ? (r.startsWith('ROLE_') ? r.replace('ROLE_', '').toLowerCase() : r.toLowerCase()) : null;
          }

          setUserProfile({
            ...data,
            full_name: fullName,
            // keep original raw role for reference and expose normalized role in `role`
            roleRaw: rawRole,
            role: normalizedRole
          });
        }
      } catch (error) {
        console.error('Error loading profile:', error);
      } finally {
        setProfileLoading(false);
      }
    },

    clear() {
      setUserProfile(null);
      setProfileLoading(false);
      localStorage.removeItem('token');
    }
  }), []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verificar la validez del token con el backend
      api.get('/auth/validate')
        .then(({ data }) => {
          setUser(data.user);
          profileOperations.load(data.user.id);
        })
        .catch(() => {
          profileOperations.clear();
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [profileOperations])

  // Auth functions
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      setUser(data.user);
      await profileOperations.load(data.user.id);
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error: error.response?.data?.message || 'Error de inicio de sesión' };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, userData = {}) => {
    try {
      setLoading(true);
      const { data } = await api.post('/auth/register', {
        email,
        password,
        ...userData
      });
      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error: error.response?.data?.message || 'Error en el registro' };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      await api.post('/auth/logout');
      setUser(null);
      setUserProfile(null);
      localStorage.removeItem('token');
      return { error: null };
    } catch (error) {
      console.error('Sign out error:', error);
      return { error: error.response?.data?.message || 'Error al cerrar sesión' };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    if (!user?.id) {
      return { data: null, error: new Error('No hay usuario conectado') };
    }

    try {
      setProfileLoading(true);
  const { data } = await api.put(`/users/${user.id}/profile`, updates);
  // normalize returned profile similar to load
  const fullName = data.fullName || data.full_name || data.name || '';
  const rawRole = data.role || data.roles || null;
  let normalizedRole = null;
  if (typeof rawRole === 'string') {
    normalizedRole = rawRole.startsWith('ROLE_') ? rawRole.replace('ROLE_', '').toLowerCase() : rawRole.toLowerCase();
  } else if (Array.isArray(rawRole) && rawRole.length > 0) {
    const r = rawRole[0];
    normalizedRole = typeof r === 'string' ? (r.startsWith('ROLE_') ? r.replace('ROLE_', '').toLowerCase() : r.toLowerCase()) : null;
  }

  setUserProfile({ ...data, full_name: fullName, roleRaw: rawRole, role: normalizedRole });
      return { data, error: null };
    } catch (error) {
      console.error('Update profile error:', error);
      return { data: null, error: error.response?.data?.message || 'Error al actualizar el perfil' };
    } finally {
      setProfileLoading(false);
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    profileLoading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isAuthenticated: !!user,
    // support both raw ROLE_* values and the normalized role set above
    isStudent: (userProfile?.role === 'student') || (userProfile?.roleRaw === 'ROLE_STUDENT'),
    isTeacher: (userProfile?.role === 'teacher') || (userProfile?.roleRaw === 'ROLE_TEACHER'),
    isAdmin: (userProfile?.role === 'admin') || (userProfile?.roleRaw === 'ROLE_ADMIN')
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Re-export the useAuth hook from the dedicated hooks file so callers can import
// `useAuth` from either './AuthContext' or './authHooks' depending on preference.
export { useAuth } from './authHooks';