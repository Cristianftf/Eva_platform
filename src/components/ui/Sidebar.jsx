import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

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
                  <p className="text-xs text-muted-foreground">7 days active</p>
                </div>
              )}
            </div>
            
            {!isCollapsed && (
              <div className="mt-3 bg-muted rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-foreground">Weekly Goal</span>
                  <span className="text-xs text-muted-foreground">85%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className="bg-success h-2 rounded-full transition-all duration-500 academic-progress-arc"
                    style={{ width: '85%' }}
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