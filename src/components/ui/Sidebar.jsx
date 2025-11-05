import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import http from '../../config/http';
import { ENDPOINTS } from '../../config/api';
import { useAuth } from '../../Context/authHooks';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const { user } = useAuth();

  const [streak, setStreak] = useState({ daysActive: 0, weeklyGoalPercent: 0 });
  const [streakLoading, setStreakLoading] = useState(false);
  const [streakError, setStreakError] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchStreak = async () => {
      if (!user?.id) return;
      setStreakLoading(true);
      try {
        // Try the recommended endpoint for dashboard stats
        const resp = await http.get(ENDPOINTS.USERS.DASHBOARD_STATS(user.id));
        if (!mounted) return;
        const data = resp.data || {};
        // Expecting shape: { studyStreakDays: number, weeklyGoalPercent: number }
        setStreak({
          daysActive: data.studyStreakDays ?? data.studyStreak ?? 0,
          weeklyGoalPercent: data.weeklyGoalPercent ?? data.weeklyGoal ?? 0
        });
        setStreakError(null);
      } catch (err) {
        // If endpoint doesn't exist or fails, fallback to a simple /users/:id/metrics or /users/:id/dashboard
        try {
          const alt = await http.get(`/users/${user.id}/metrics`);
          if (!mounted) return;
          const ad = alt.data || {};
          setStreak({
            daysActive: ad.studyStreakDays ?? ad.studyStreak ?? 0,
            weeklyGoalPercent: ad.weeklyGoalPercent ?? ad.weeklyGoal ?? 0
          });
          setStreakError(null);
        } catch (err2) {
          if (!mounted) return;
          console.warn('Failed fetching streak metrics', err2?.message || err?.message);
          setStreak({ daysActive: 0, weeklyGoalPercent: 0 });
          setStreakError(err2?.message || err?.message || 'Error fetching streak');
        }
      } finally {
        if (mounted) setStreakLoading(false);
      }
    };

    fetchStreak();

    return () => { mounted = false; };
  }, [user?.id]);

  const navigationItems = [
    {
      category: 'Learning',
      items: [
        { name: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
        { name: 'My Courses', path: '/course-detail-pages', icon: 'BookOpen' },
        { name: 'Assessments', path: '/assessment-interface', icon: 'FileText' },
        { name: 'Study Groups', path: '/communication-hub', icon: 'Users' },
      ]
    },
    {
      category: 'Communication',
      items: [
        { name: 'Messages', path: '/communication-hub', icon: 'MessageSquare' },
        { name: 'Announcements', path: '/communication-hub?tab=announcements', icon: 'Megaphone' },
        { name: 'Discussion Forums', path: '/communication-hub?tab=forums', icon: 'MessageCircle' },
      ]
    },
    {
      category: 'Progress',
      items: [
        { name: 'My Progress', path: '/profile-progress-center', icon: 'TrendingUp' },
        { name: 'Achievements', path: '/profile-progress-center?tab=achievements', icon: 'Award' },
        { name: 'Calendar', path: '/profile-progress-center?tab=calendar', icon: 'Calendar' },
      ]
    },
    {
      category: 'Settings',
      items: [
        { name: 'Profile Settings', path: '/profile-progress-center?tab=settings', icon: 'User' },
        { name: 'Preferences', path: '/profile-progress-center?tab=preferences', icon: 'Settings' },
        { name: 'Admin Panel', path: '/administrative-panel', icon: 'Shield' },
      ]
    }
  ];

  const isActivePath = (path) => {
    const currentPath = location?.pathname + location?.search;
    return currentPath === path || location?.pathname === path;
  };

  const toggleMobileSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Sidebar Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMobileSidebar}
        className="fixed top-20 left-4 z-50 lg:hidden bg-card border border-border academic-shadow"
      >
        <Icon name="Menu" size={20} />
      </Button>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileSidebar}
        />
      )}
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-40 transition-all duration-300 ease-out sidebar-blur ${
          isCollapsed ? 'w-16' : 'w-64'
        } ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            {!isCollapsed && (
              <div className="flex items-center space-x-2">
                <Icon name="GraduationCap" size={20} className="text-primary" />
                <span className="font-semibold text-foreground">Navigation</span>
              </div>
            )}
            {onToggle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                className="hidden lg:flex"
              >
                <Icon name={isCollapsed ? "ChevronRight" : "ChevronLeft"} size={16} />
              </Button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {navigationItems?.map((section) => (
              <div key={section?.category}>
                {!isCollapsed && (
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    {section?.category}
                  </h3>
                )}
                <div className="space-y-1">
                  {section?.items?.map((item) => (
                    <Link
                      key={item?.path}
                      to={item?.path}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 group ${
                        isActivePath(item?.path)
                          ? 'bg-primary text-primary-foreground academic-shadow'
                          : 'text-foreground hover:bg-muted hover:text-foreground'
                      } ${isCollapsed ? 'justify-center' : ''}`}
                      title={isCollapsed ? item?.name : ''}
                    >
                      <Icon 
                        name={item?.icon} 
                        size={18} 
                        className={`${isActivePath(item?.path) ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-foreground'}`}
                      />
                      {!isCollapsed && <span>{item?.name}</span>}
                      {isActivePath(item?.path) && (
                        <div className="absolute left-0 w-1 h-6 bg-accent rounded-r-full" />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-border">
            <div className={`flex items-center space-x-3 ${isCollapsed ? 'justify-center' : ''}`}>
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center collaborative-pulse">
                <Icon name="Zap" size={14} className="text-success-foreground" />
              </div>
              {!isCollapsed && (
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Study Streak</p>
                  <p className="text-xs text-muted-foreground">
                    {streakLoading ? 'Cargando...' : `${streak?.daysActive || 0} days active`}
                    {streakError ? ' • error' : ''}
                  </p>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <div className="mt-3 bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">Weekly Goal</span>
                  <span className="text-xs text-muted-foreground">{streakLoading ? '...' : `${streak?.weeklyGoalPercent ?? 0}%`}</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-500 academic-progress-arc"
                    style={{ width: `${streak?.weeklyGoalPercent ?? 0}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;