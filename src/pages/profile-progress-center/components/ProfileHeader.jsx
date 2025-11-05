import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useProfile } from '../../../hooks/useProfile';

const ProfileHeader = () => {
  const [isEditing, setIsEditing] = useState(false);
  const { profileData, updateProfile, loading, error } = useProfile();
  const [editData, setEditData] = useState({});
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    if (profileData) {
      setEditData(profileData);
    }
  }, [profileData]);


  const handleEdit = () => {
    setIsEditing(true);
    setEditData(profileData);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await updateProfile(editData);
      setIsEditing(false);
    } catch (err) {
      console.error('Error al guardar cambios:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (profileData) {
      setEditData(profileData);
    }
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border academic-shadow p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Profile Image and Basic Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary">
              <Image
                src={profileData?.avatar || profileData?.image || 'https://images.unsplash.com/photo-1605765356613-7f20ebf0f339'}
                alt={profileData?.name || 'Foto de perfil'}
                className="w-full h-full object-cover" />

            </div>
            <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground hover:bg-primary/90 transition-colors">
              <Icon name="Camera" size={16} />
            </button>
          </div>

          <div className="flex-1 text-center sm:text-left">
            {isEditing ?
            <div className="space-y-3">
                <Input
                type="text"
                value={editData?.name}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
                className="text-lg font-semibold" />

                <Input
                type="email"
                value={editData?.email}
                onChange={(e) => handleInputChange('email', e?.target?.value)} />

              </div> :

            <>
                <h1 className="text-2xl font-bold text-foreground mb-1">{profileData?.name}</h1>
                <p className="text-muted-foreground mb-2">{profileData?.email}</p>
              </>
            }
            
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                <Icon name="Hash" size={12} className="mr-1" />
                {profileData?.studentId}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary">
                <Icon name="GraduationCap" size={12} className="mr-1" />
                {profileData?.major}
              </span>
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                <Icon name="Calendar" size={12} className="mr-1" />
                {profileData?.year}
              </span>
            </div>
          </div>
        </div>

        {/* Stats and Actions */}
        <div className="flex flex-col items-center lg:items-end gap-4">
          <div className="flex gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-foreground">{profileData?.gpa ?? '—'}</div>
              <div className="text-xs text-muted-foreground">Promedio</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{profileData?.coursesCount ?? profileData?.courses?.length ?? 0}</div>
              <div className="text-xs text-muted-foreground">Cursos</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{(profileData?.progressPercent ?? profileData?.overallProgress ?? 0) + '%'}</div>
              <div className="text-xs text-muted-foreground">Progreso</div>
            </div>
          </div>

          {isEditing ?
          <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancel} disabled={saving}>
                <Icon name="X" size={16} className="mr-1" />
                Cancelar
              </Button>
              <Button variant="default" size="sm" onClick={handleSave} disabled={saving}>
                <Icon name="Check" size={16} className="mr-1" />
                {saving ? 'Guardando...' : 'Guardar'}
              </Button>
            </div> :

          <Button variant="outline" size="sm" onClick={handleEdit}>
              <Icon name="Edit" size={16} className="mr-1" />
              Editar Perfil
            </Button>
          }
        </div>
      </div>
      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Fecha de Ingreso:</span>
            <span className="ml-2 font-medium text-foreground">{profileData?.joinDate || profileData?.enrolledAt || '—'}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Estado:</span>
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-success/10 text-success">
              <Icon name="CheckCircle" size={12} className="mr-1" />
              Activo
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Último Acceso:</span>
            <span className="ml-2 font-medium text-foreground">{profileData?.lastAccess ? new Date(profileData.lastAccess).toLocaleString() : '—'}</span>
          </div>
          <div>
            <span className="text-muted-foreground">Racha de Estudio:</span>
            <span className="ml-2 inline-flex items-center font-medium text-accent">
              <Icon name="Flame" size={12} className="mr-1" />
              {profileData?.studyStreak ? `${profileData.studyStreak} días` : '—'}
            </span>
          </div>
        </div>
      </div>
    </div>);

};

export default ProfileHeader;