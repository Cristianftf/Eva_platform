import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';
import http from '../../../config/http';
import { ENDPOINTS } from '../../../config/api';

const CourseManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [courses, setCourses] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(false);
  const [coursesError, setCoursesError] = useState(null);

  useEffect(() => {
    const loadCourses = async () => {
      setLoadingCourses(true);
      try {
        const res = await http.get(ENDPOINTS.COURSES.LIST);
        setCourses(res?.data || []);
      } catch (err) {
        console.error('Error loading courses', err);
        setCoursesError(err?.response?.data?.message || err.message || 'Error cargando cursos');
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCourses();
  }, []);


  const statusOptions = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'active', label: 'Activos' },
  { value: 'completed', label: 'Completados' },
  { value: 'draft', label: 'Borradores' }];


  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: 'Activo', className: 'bg-success/10 text-success' },
      completed: { label: 'Completado', className: 'bg-primary/10 text-primary' },
      draft: { label: 'Borrador', className: 'bg-warning/10 text-warning' }
    };

    const config = statusConfig?.[status];
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.className}`}>
        {config?.label}
      </span>);

  };

  const filteredCourses = courses?.filter((course) => {
    const matchesSearch = course?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    course?.instructor?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    course?.id?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || course?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSelectCourse = (courseId) => {
    setSelectedCourses((prev) =>
    prev?.includes(courseId) ?
    prev?.filter((id) => id !== courseId) :
    [...prev, courseId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCourses?.length === filteredCourses?.length) {
      setSelectedCourses([]);
    } else {
      setSelectedCourses(filteredCourses?.map((course) => course?.id));
    }
  };

  return (
    <div className="academic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Gestión de Cursos</h3>
        <Button variant="default" iconName="Plus" iconPosition="left">
          Crear Curso
        </Button>
      </div>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Buscar cursos, instructores o códigos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
            className="w-full" />

        </div>
        <div className="w-full sm:w-48">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filtrar por estado" />

        </div>
      </div>
      {/* Bulk Actions */}
      {selectedCourses?.length > 0 &&
      <div className="flex items-center justify-between p-4 bg-muted rounded-lg mb-4">
          <span className="text-sm font-medium text-foreground">
            {selectedCourses?.length} curso(s) seleccionado(s)
          </span>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Archive">
              Archivar
            </Button>
            <Button variant="outline" size="sm" iconName="Copy">
              Duplicar
            </Button>
            <Button variant="destructive" size="sm" iconName="Trash2">
              Eliminar
            </Button>
          </div>
        </div>
      }
      {/* Course Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <input
                  type="checkbox"
                  checked={selectedCourses?.length === filteredCourses?.length && filteredCourses?.length > 0}
                  onChange={handleSelectAll}
                  className="rounded border-border" />

              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Curso</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Instructor</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Estudiantes</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Estado</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Progreso</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses?.map((course) =>
            <tr key={course?.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="py-4 px-2">
                  <input
                  type="checkbox"
                  checked={selectedCourses?.includes(course?.id)}
                  onChange={() => handleSelectCourse(course?.id)}
                  className="rounded border-border" />

                </td>
                <td className="py-4 px-4">
                  <div>
                    <p className="font-medium text-foreground">{course?.title}</p>
                    <p className="text-sm text-muted-foreground">{course?.id}</p>
                    <div className="flex items-center mt-1 text-xs text-muted-foreground">
                      <Icon name="BookOpen" size={12} className="mr-1" />
                      <span>{course?.modules} módulos</span>
                      <span className="mx-2">•</span>
                      <Icon name="FileText" size={12} className="mr-1" />
                      <span>{course?.assignments} tareas</span>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-3">
                    <Image
                    src={course?.instructorAvatar}
                    alt={course?.instructorAvatarAlt}
                    className="w-8 h-8 rounded-full object-cover" />

                    <span className="text-sm font-medium text-foreground">{course?.instructor}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Users" size={16} className="text-muted-foreground" />
                    <span className="text-sm font-medium text-foreground">{course?.students}</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {getStatusBadge(course?.status)}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex-1 bg-muted rounded-full h-2 max-w-20">
                      <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${course?.progress}%` }} />

                    </div>
                    <span className="text-sm font-medium text-foreground">{course?.progress}%</span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="icon">
                      <Icon name="Eye" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="Edit" size={16} />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredCourses?.length === 0 &&
      <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No se encontraron cursos que coincidan con los criterios de búsqueda.</p>
        </div>
      }
    </div>);

};

export default CourseManagement;