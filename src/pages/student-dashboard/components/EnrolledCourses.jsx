import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const EnrolledCourses = ({ courses }) => {
  const getProgressColor = (progress) => {
    if (progress >= 80) return 'bg-emerald-500';
    if (progress >= 60) return 'bg-blue-500';
    if (progress >= 40) return 'bg-amber-500';
    return 'bg-red-500';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Mis Cursos</h2>
        <Link 
          to="/course-detail-pages" 
          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center space-x-1"
        >
          <span>Ver todos</span>
          <Icon name="ArrowRight" size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((course) => (
          <Link 
            key={course?.id} 
            to={`/course-detail-pages?course=${course?.id}`}
            className="block group"
          >
            <div className="bg-muted rounded-lg p-4 hover:shadow-md transition-all duration-200 group-hover:scale-105">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image 
                    src={course?.thumbnail} 
                    alt={course?.thumbnailAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground text-sm line-clamp-1">
                    {course?.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">{course?.instructor}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-medium text-foreground">{course?.progress}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(course?.progress)}`}
                    style={{ width: `${course?.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{course?.currentModule}</span>
                  <span>{course?.totalModules} módulos</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EnrolledCourses;