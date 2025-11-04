import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CourseHeader = ({ course, onEnroll, isEnrolled }) => {
  return (
    <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg p-6 mb-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-shrink-0">
          <Image
            src={course?.thumbnail}
            alt={course?.thumbnailAlt}
            className="w-full lg:w-48 h-32 object-cover rounded-lg"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
              {course?.category}
            </span>
            <span className="bg-accent px-3 py-1 rounded-full text-sm font-medium text-slate-800">
              {course?.level}
            </span>
          </div>
          
          <h1 className="text-2xl lg:text-3xl font-bold mb-2">{course?.title}</h1>
          <p className="text-white text-opacity-90 mb-4 leading-relaxed">
            {course?.description}
          </p>
          
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Icon name="User" size={16} />
              <span className="text-sm">{course?.instructor}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Clock" size={16} />
              <span className="text-sm">{course?.duration}</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Users" size={16} />
              <span className="text-sm">{course?.enrolledStudents} estudiantes</span>
            </div>
            <div className="flex items-center gap-2">
              <Icon name="Star" size={16} />
              <span className="text-sm">{course?.rating}/5 ({course?.reviews} reseñas)</span>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            {!isEnrolled ? (
              <Button
                variant="default"
                onClick={onEnroll}
                iconName="BookOpen"
                iconPosition="left"
                className="bg-white text-primary hover:bg-gray-100"
              >
                Inscribirse al Curso
              </Button>
            ) : (
              <div className="flex items-center gap-2 bg-success bg-opacity-20 px-4 py-2 rounded-lg">
                <Icon name="CheckCircle" size={16} className="text-success-foreground" />
                <span className="text-sm font-medium">Inscrito</span>
              </div>
            )}
            
            <Button
              variant="ghost"
              iconName="Share2"
              iconPosition="left"
              className="text-white border-white hover:bg-white hover:bg-opacity-10"
            >
              Compartir
            </Button>
            
            <Button
              variant="ghost"
              iconName="Bookmark"
              iconPosition="left"
              className="text-white border-white hover:bg-white hover:bg-opacity-10"
            >
              Guardar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseHeader;