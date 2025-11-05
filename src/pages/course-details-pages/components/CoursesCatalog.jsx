import React, { useEffect, useState } from 'react';
import http from '../../../config/http';
import { ENDPOINTS } from '../../../config/api';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import { Link } from 'react-router-dom';

const CoursesCatalog = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await http.get(ENDPOINTS.COURSES.LIST);
        setCourses(res?.data || []);
      } catch (err) {
        console.error('Error loading courses catalog', err);
        setError(err?.response?.data?.message || err.message || 'Error cargando cursos');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <div className="p-6"><div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" /></div>
  );

  if (error) return (
    <div className="p-6 bg-destructive/10 border border-destructive/20 rounded-lg">Error: {error}</div>
  );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Explorar Cursos</h2>
        <div />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map((c) => (
          <Link key={c?.id} to={`/course-detail-pages?course=${c?.id}`} className="block group">
            <div className="bg-card rounded-lg p-4 hover:shadow-md transition-all duration-200 group-hover:scale-105">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 rounded-lg overflow-hidden">
                  <Image src={c?.thumbnail} alt={c?.thumbnailAlt || c?.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{c?.title}</h3>
                  <p className="text-xs text-muted-foreground">{c?.instructor || c?.instructorName}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-3 truncate">{c?.description}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Icon name="BookOpen" size={12} />
                  <span>{c?.modules || 0} módulos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={12} />
                  <span>{c?.enrolledStudents || c?.studentsCount || 0} inscritos</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {courses?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No hay cursos disponibles.</p>
        </div>
      )}
    </div>
  );
};

export default CoursesCatalog;
