import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const users = [
  {
    id: 1,
    name: 'Dr. María González',
    email: 'maria.gonzalez@universidad.edu',
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: 'Professional woman with brown hair in white blazer smiling at camera',
    role: 'professor',
    status: 'active',
    lastLogin: '2025-11-03T16:30:00',
    coursesCount: 3,
    studentsCount: 245
  },
  {
    id: 2,
    name: 'Prof. Carlos Ruiz',
    email: 'carlos.ruiz@universidad.edu',
    avatar: "https://images.unsplash.com/photo-1713946598186-8e28275719b9",
    avatarAlt: 'Middle-aged man with glasses and beard in dark suit jacket',
    role: 'professor',
    status: 'active',
    lastLogin: '2025-11-03T15:45:00',
    coursesCount: 2,
    studentsCount: 178
  },
  {
    id: 3,
    name: 'Ana Martínez',
    email: 'ana.martinez@estudiante.edu',
    avatar: "https://images.unsplash.com/photo-1668307296649-34231306be85",
    avatarAlt: 'Young woman with long dark hair smiling in casual white top',
    role: 'student',
    status: 'active',
    lastLogin: '2025-11-03T17:20:00',
    coursesCount: 5,
    studentsCount: null
  },
  {
    id: 4,
    name: 'Roberto Silva',
    email: 'roberto.silva@admin.edu',
    avatar: "https://images.unsplash.com/photo-1714974528889-d51109fb6ae9",
    avatarAlt: 'Professional man with dark hair in gray suit and tie',
    role: 'admin',
    status: 'active',
    lastLogin: '2025-11-03T14:10:00',
    coursesCount: null,
    studentsCount: null
  },
  {
    id: 5,
    name: 'Laura Fernández',
    email: 'laura.fernandez@estudiante.edu',
    avatar: "https://images.unsplash.com/photo-1656662418587-ba53f84c94c9",
    avatarAlt: 'Young woman with curly hair wearing glasses and denim jacket',
    role: 'student',
    status: 'inactive',
    lastLogin: '2025-10-28T10:30:00',
    coursesCount: 3,
    studentsCount: null
  },
  {
    id: 6,
    name: 'Dra. Ana López',
    email: 'ana.lopez@universidad.edu',
    avatar: "https://images.unsplash.com/photo-1684262855358-88f296a2cfc2",
    avatarAlt: 'Professional woman with blonde hair in navy blue blazer',
    role: 'professor',
    status: 'active',
    lastLogin: '2025-11-03T13:15:00',
    coursesCount: 4,
    studentsCount: 312
  }];


  const roleOptions = [
  { value: 'all', label: 'Todos los roles' },
  { value: 'admin', label: 'Administradores' },
  { value: 'professor', label: 'Profesores' },
  { value: 'student', label: 'Estudiantes' }];


  const statusOptions = [
  { value: 'all', label: 'Todos los estados' },
  { value: 'active', label: 'Activos' },
  { value: 'inactive', label: 'Inactivos' }];


  const getRoleBadge = (role) => {
    const roleConfig = {
      admin: { label: 'Admin', className: 'bg-destructive/10 text-destructive', icon: 'Shield' },
      professor: { label: 'Profesor', className: 'bg-primary/10 text-primary', icon: 'GraduationCap' },
      student: { label: 'Estudiante', className: 'bg-secondary/10 text-secondary', icon: 'User' }
    };

    const config = roleConfig?.[role];
    return (
      <div className="flex items-center space-x-1">
        <Icon name={config?.icon} size={12} />
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.className}`}>
          {config?.label}
        </span>
      </div>);

  };

  const getStatusBadge = (status) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
      status === 'active' ? 'bg-success/10 text-success' : 'bg-muted text-muted-foreground'}`
      }>
        {status === 'active' ? 'Activo' : 'Inactivo'}
      </span>);

  };

  const formatLastLogin = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 24) {
      return `hace ${diffInHours}h`;
    } else {
      return date?.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: '2-digit'
      });
    }
  };

  const filteredUsers = users?.filter((user) => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
    user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRole = roleFilter === 'all' || user?.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="academic-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Gestión de Usuarios</h3>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Exportar
          </Button>
          <Button variant="default" iconName="UserPlus" iconPosition="left">
            Agregar Usuario
          </Button>
        </div>
      </div>
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Input
          type="search"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e?.target?.value)} />

        <Select
          options={roleOptions}
          value={roleFilter}
          onChange={setRoleFilter}
          placeholder="Filtrar por rol" />

        <Select
          options={statusOptions}
          value={statusFilter}
          onChange={setStatusFilter}
          placeholder="Filtrar por estado" />

      </div>
      {/* User Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredUsers?.map((user) =>
        <div key={user?.id} className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Image
                src={user?.avatar}
                alt={user?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover" />

                <div>
                  <h4 className="font-medium text-foreground">{user?.name}</h4>
                  <p className="text-sm text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {getRoleBadge(user?.role)}
                {getStatusBadge(user?.status)}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {user?.role === 'professor' &&
            <>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <p className="text-lg font-semibold text-foreground">{user?.coursesCount}</p>
                    <p className="text-xs text-muted-foreground">Cursos</p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <p className="text-lg font-semibold text-foreground">{user?.studentsCount}</p>
                    <p className="text-xs text-muted-foreground">Estudiantes</p>
                  </div>
                </>
            }
              {user?.role === 'student' &&
            <>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <p className="text-lg font-semibold text-foreground">{user?.coursesCount}</p>
                    <p className="text-xs text-muted-foreground">Cursos Inscritos</p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <p className="text-lg font-semibold text-foreground">87%</p>
                    <p className="text-xs text-muted-foreground">Progreso Promedio</p>
                  </div>
                </>
            }
              {user?.role === 'admin' &&
            <>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <p className="text-lg font-semibold text-foreground">24</p>
                    <p className="text-xs text-muted-foreground">Cursos Gestionados</p>
                  </div>
                  <div className="text-center p-2 bg-muted/50 rounded">
                    <p className="text-lg font-semibold text-foreground">1,247</p>
                    <p className="text-xs text-muted-foreground">Usuarios Totales</p>
                  </div>
                </>
            }
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={12} />
                <span>Último acceso: {formatLastLogin(user?.lastLogin)}</span>
              </div>
              <div className="flex items-center space-x-1">
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
            </div>
          </div>
        )}
      </div>
      {filteredUsers?.length === 0 &&
      <div className="text-center py-8">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No se encontraron usuarios que coincidan con los criterios de búsqueda.</p>
        </div>
      }
    </div>);

};

export default UserManagement;