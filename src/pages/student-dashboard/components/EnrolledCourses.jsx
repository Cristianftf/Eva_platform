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
    <div className="bg-card border border-border rounded-lg p-3 sm:p-4 md:p-6">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-foreground">Mis Cursos</h2>
        <Link 
          to="/course-detail-pages" 
          className="text-primary hover:text-primary/80 text-xs sm:text-sm font-medium flex items-center gap-1"
        >
          <span>Ver todos</span>
          <Icon name="ArrowRight" size={14} className="sm:scale-110" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
        {courses?.map((course) => (
          <Link 
            key={course?.id} 
            to={`/course-detail-pages?course=${course?.id}`}
            className="block group"
          >
            <div className="bg-muted rounded-lg p-2 sm:p-3 md:p-4 hover:shadow-md transition-all duration-200 group-hover:scale-[1.02]">
              <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg overflow-hidden">
                  <Image 
                    src={course?.thumbnail} 
                    alt={course?.thumbnailAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-foreground text-xs sm:text-sm line-clamp-1">
                    {course?.title}
                  </h3>
                  <p className="text-[10px] sm:text-xs text-muted-foreground line-clamp-1">
                    {course?.instructor}
                  </p>
                </div>
              </div>
              
              <div className="space-y-1.5 sm:space-y-2">
                <div className="flex items-center justify-between text-[10px] sm:text-xs">
                  <span className="text-muted-foreground">Progreso</span>
                  <span className="font-medium text-foreground">{course?.progress}%</span>
                </div>
                <div className="w-full bg-background rounded-full h-1.5 sm:h-2">
                  <div 
                    className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 ${getProgressColor(course?.progress)}`}
                    style={{ width: `${course?.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[10px] sm:text-xs text-muted-foreground">
                  <span className="line-clamp-1">{course?.currentModule}</span>
                  <span className="shrink-0 ml-2">{course?.totalModules} módulos</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
        {!courses?.length && (
          <div className="col-span-full text-center py-4 text-sm text-muted-foreground">
            No hay cursos inscritos
          </div>
        )}
      </div>
    </div>
  );
};

export default EnrolledCourses;