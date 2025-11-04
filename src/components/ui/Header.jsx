import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { name: 'Dashboard', path: '/student-dashboard', icon: 'LayoutDashboard' },
    { name: 'Courses', path: '/course-detail-pages', icon: 'BookOpen' },
    { name: 'Assessments', path: '/assessment-interface', icon: 'FileText' },
    { name: 'Communication', path: '/communication-hub', icon: 'MessageSquare' },
  ];

  const moreItems = [
    { name: 'Admin Panel', path: '/administrative-panel', icon: 'Settings' },
    { name: 'Profile & Progress', path: '/profile-progress-center', icon: 'User' },
  ];

  const isActivePath = (path) => location?.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border academic-shadow">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <Link to="/student-dashboard" className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <svg
              viewBox="0 0 24 24"
              className="w-6 h-6 text-primary-foreground"
              fill="currentColor"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-semibold text-foreground">EduConnect</span>
            <span className="text-xs text-muted-foreground">Platform</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.name}</span>
            </Link>
          ))}
          
          {/* More Dropdown */}
          <div className="relative group">
            <button className="flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors duration-200">
              <Icon name="MoreHorizontal" size={16} />
              <span>More</span>
            </button>
            
            <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="py-1">
                {moreItems?.map((item) => (
                  <Link
                    key={item?.path}
                    to={item?.path}
                    className={`flex items-center space-x-2 px-4 py-2 text-sm hover:bg-muted transition-colors duration-200 ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground'
                        : 'text-popover-foreground'
                    }`}
                  >
                    <Icon name={item?.icon} size={16} />
                    <span>{item?.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
            <Icon name="Bell" size={20} />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
          </button>

          {/* Profile */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} className="text-primary-foreground" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-foreground">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">Student</p>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="lg:hidden"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-card border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {[...navigationItems, ...moreItems]?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;