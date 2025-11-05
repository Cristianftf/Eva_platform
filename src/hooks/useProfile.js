import { useState, useEffect } from 'react';
import { useAuth } from '../Context/authHooks';
import http from '../config/http';

export function useProfile() {
  const [profileData, setProfileData] = useState(null);
  const [achievements, setAchievements] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useAuth();

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        const response = await http.get(`/profile/${user.id}`);
        setProfileData(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError(err.message || 'Error fetching profile');
      } finally {
        setLoading(false);
      }
    };

    const fetchAchievements = async () => {
      if (!user) return;
      
      try {
        const response = await http.get(`/profile/${user.id}/achievements`);
        setAchievements(response.data || []);
      } catch (err) {
        console.error('Error fetching achievements:', err);
      }
    };

    const fetchAnalytics = async () => {
      if (!user) return;
      
      try {
        const response = await http.get(`/profile/${user.id}/analytics`);
        setAnalytics(response.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
      }
    };

    const fetchGoals = async () => {
      if (!user) return;
      
      try {
        const response = await http.get(`/profile/${user.id}/goals`);
        setGoals(response.data || []);
      } catch (err) {
        console.error('Error fetching goals:', err);
      }
    };

    fetchProfileData();
    fetchAchievements();
    fetchAnalytics();
    fetchGoals();
  }, [user]);

  const updateProfile = async (updatedData) => {
    if (!user) return;
    
    try {
      const response = await http.put(`/profile/${user.id}`, updatedData);
      setProfileData(response.data);
      return response.data;
    } catch (err) {
      console.error('Error updating profile:', err);
      throw err;
    }
  };

  const updateGoal = async (goalId, updatedGoal) => {
    if (!user) return;
    
    try {
      const response = await http.put(`/goals/${goalId}`, updatedGoal);
      const data = response.data;
      setGoals(prev => prev.map(g => g.id === goalId ? data : g));
      return data;
    } catch (err) {
      console.error('Error updating goal:', err);
      throw err;
    }
  };

  const addGoal = async (newGoal) => {
    if (!user) return;
    
    try {
      const response = await http.post(`/profile/${user.id}/goals`, newGoal);
      const data = response.data;
      setGoals(prev => [...prev, data]);
      return data;
    } catch (err) {
      console.error('Error creating goal:', err);
      throw err;
    }
  };

  const deleteGoal = async (goalId) => {
    if (!user) return;
    
    try {
      await http.delete(`/goals/${goalId}`);
      setGoals(prev => prev.filter(g => g.id !== goalId));
    } catch (err) {
      console.error('Error deleting goal:', err);
      throw err;
    }
  };

  return {
    profileData,
    achievements,
    analytics,
    goals,
    loading,
    error,
    updateProfile,
    updateGoal,
    addGoal,
    deleteGoal
  };
}