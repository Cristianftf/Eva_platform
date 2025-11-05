import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import { useProfile } from '../../../hooks/useProfile';

const SettingsPanel = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState(null);
  const { profileData } = useProfile();

  useEffect(() => {
    // Seed settings from profileData if available
    if (profileData) {
      setSettings(prev => ({
        ...prev,
        firstName: profileData?.firstName || profileData?.name || '',
        lastName: profileData?.lastName || '',
        email: profileData?.email || '',
        phone: profileData?.phone || '',
        bio: profileData?.bio || '',
        language: profileData?.preferences?.language || 'es',
        timezone: profileData?.preferences?.timezone || 'Europe/Madrid',
        theme: profileData?.preferences?.theme || 'light',
        profileVisibility: profileData?.privacy?.visibility || 'public',
        showEmail: profileData?.privacy?.showEmail ?? false,
        showPhone: profileData?.privacy?.showPhone ?? false
      }));
    } else if (!settings) {
      // default shape while loading
      setSettings({
        firstName: '', lastName: '', email: '', phone: '', bio: '',
        profileVisibility: 'public', showEmail: false, showPhone: false, showProgress: true, showAchievements: true,
        emailNotifications: true, pushNotifications: true, courseUpdates: true, assignmentReminders: true,
        gradeNotifications: true, discussionReplies: false, weeklyReport: true,
        language: 'es', timezone: 'Europe/Madrid', theme: 'light', dateFormat: 'DD/MM/YYYY', timeFormat: '24h'
      });
    }
  }, [profileData]);

  const tabs = [
    { id: 'profile', name: 'Perfil', icon: 'User' },
    { id: 'privacy', name: 'Privacidad', icon: 'Shield' },
    { id: 'notifications', name: 'Notificaciones', icon: 'Bell' },
    { id: 'preferences', name: 'Preferencias', icon: 'Settings' },
    { id: 'security', name: 'Seguridad', icon: 'Lock' }
  ];

  const languageOptions = [
    { value: 'es', label: 'Español' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' }
  ];

  const timezoneOptions = [
    { value: 'Europe/Madrid', label: 'Madrid (GMT+1)' },
    { value: 'Europe/London', label: 'Londres (GMT+0)' },
    { value: 'America/New_York', label: 'Nueva York (GMT-5)' },
    { value: 'America/Los_Angeles', label: 'Los Ángeles (GMT-8)' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Claro' },
    { value: 'dark', label: 'Oscuro' },
    { value: 'auto', label: 'Automático' }
  ];

  const visibilityOptions = [
    { value: 'public', label: 'Público' },
    { value: 'university', label: 'Solo Universidad' },
    { value: 'private', label: 'Privado' }
  ];

  const handleInputChange = (field, value) => {
    setSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    // Here you would typically save settings to your backend
    console.log('Saving settings:', settings);
    // Show success message
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Información Personal</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Nombre"
            type="text"
            value={settings?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
          />
          <Input
            label="Apellidos"
            type="text"
            value={settings?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
          />
          <Input
            label="Correo Electrónico"
            type="email"
            value={settings?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
          />
          <Input
            label="Teléfono"
            type="tel"
            value={settings?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
          />
        </div>
        <div className="mt-4">
          <Input
            label="Biografía"
            type="text"
            placeholder="Cuéntanos sobre ti..."
            value={settings?.bio}
            onChange={(e) => handleInputChange('bio', e?.target?.value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Foto de Perfil</h3>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center">
            <Icon name="User" size={32} className="text-primary-foreground" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Upload" size={16} className="mr-2" />
              Subir Foto
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Trash2" size={16} className="mr-2" />
              Eliminar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPrivacyTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Visibilidad del Perfil</h3>
        <Select
          label="¿Quién puede ver tu perfil?"
          options={visibilityOptions}
          value={settings?.profileVisibility}
          onChange={(value) => handleInputChange('profileVisibility', value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Información Visible</h3>
        <div className="space-y-3">
          <Checkbox
            label="Mostrar correo electrónico"
            checked={settings?.showEmail}
            onChange={(e) => handleInputChange('showEmail', e?.target?.checked)}
          />
          <Checkbox
            label="Mostrar número de teléfono"
            checked={settings?.showPhone}
            onChange={(e) => handleInputChange('showPhone', e?.target?.checked)}
          />
          <Checkbox
            label="Mostrar progreso académico"
            checked={settings?.showProgress}
            onChange={(e) => handleInputChange('showProgress', e?.target?.checked)}
          />
          <Checkbox
            label="Mostrar logros y certificaciones"
            checked={settings?.showAchievements}
            onChange={(e) => handleInputChange('showAchievements', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Métodos de Notificación</h3>
        <div className="space-y-3">
          <Checkbox
            label="Notificaciones por correo electrónico"
            description="Recibe notificaciones importantes en tu email"
            checked={settings?.emailNotifications}
            onChange={(e) => handleInputChange('emailNotifications', e?.target?.checked)}
          />
          <Checkbox
            label="Notificaciones push"
            description="Recibe notificaciones en tiempo real en tu dispositivo"
            checked={settings?.pushNotifications}
            onChange={(e) => handleInputChange('pushNotifications', e?.target?.checked)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Tipos de Notificación</h3>
        <div className="space-y-3">
          <Checkbox
            label="Actualizaciones de cursos"
            description="Nuevo contenido, cambios en el programa"
            checked={settings?.courseUpdates}
            onChange={(e) => handleInputChange('courseUpdates', e?.target?.checked)}
          />
          <Checkbox
            label="Recordatorios de tareas"
            description="Fechas límite y entregas pendientes"
            checked={settings?.assignmentReminders}
            onChange={(e) => handleInputChange('assignmentReminders', e?.target?.checked)}
          />
          <Checkbox
            label="Notificaciones de calificaciones"
            description="Nuevas calificaciones y comentarios"
            checked={settings?.gradeNotifications}
            onChange={(e) => handleInputChange('gradeNotifications', e?.target?.checked)}
          />
          <Checkbox
            label="Respuestas en discusiones"
            description="Cuando alguien responde a tus comentarios"
            checked={settings?.discussionReplies}
            onChange={(e) => handleInputChange('discussionReplies', e?.target?.checked)}
          />
          <Checkbox
            label="Reporte semanal de progreso"
            description="Resumen semanal de tu actividad académica"
            checked={settings?.weeklyReport}
            onChange={(e) => handleInputChange('weeklyReport', e?.target?.checked)}
          />
        </div>
      </div>
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Idioma y Región</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Idioma de la interfaz"
            options={languageOptions}
            value={settings?.language}
            onChange={(value) => handleInputChange('language', value)}
          />
          <Select
            label="Zona horaria"
            options={timezoneOptions}
            value={settings?.timezone}
            onChange={(value) => handleInputChange('timezone', value)}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Apariencia</h3>
        <Select
          label="Tema de la aplicación"
          options={themeOptions}
          value={settings?.theme}
          onChange={(value) => handleInputChange('theme', value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Formato de Fecha y Hora</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Formato de fecha"
            options={[
              { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
              { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
              { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
            ]}
            value={settings?.dateFormat}
            onChange={(value) => handleInputChange('dateFormat', value)}
          />
          <Select
            label="Formato de hora"
            options={[
              { value: '24h', label: '24 horas (14:30)' },
              { value: '12h', label: '12 horas (2:30 PM)' }
            ]}
            value={settings?.timeFormat}
            onChange={(value) => handleInputChange('timeFormat', value)}
          />
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Cambiar Contraseña</h3>
        <div className="space-y-4">
          <Input
            label="Contraseña actual"
            type="password"
            placeholder="Ingresa tu contraseña actual"
          />
          <Input
            label="Nueva contraseña"
            type="password"
            placeholder="Ingresa tu nueva contraseña"
          />
          <Input
            label="Confirmar nueva contraseña"
            type="password"
            placeholder="Confirma tu nueva contraseña"
          />
          <Button variant="default">
            <Icon name="Lock" size={16} className="mr-2" />
            Actualizar Contraseña
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Autenticación de Dos Factores</h3>
        <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
          <div>
            <p className="font-medium text-foreground">2FA no está activado</p>
            <p className="text-sm text-muted-foreground">
              Añade una capa extra de seguridad a tu cuenta
            </p>
          </div>
          <Button variant="outline">
            <Icon name="Shield" size={16} className="mr-2" />
            Activar 2FA
          </Button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Sesiones Activas</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name="Monitor" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Navegador Web - Chrome</p>
                <p className="text-sm text-muted-foreground">Madrid, España • Activa ahora</p>
              </div>
            </div>
            <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full">
              Actual
            </span>
          </div>
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <Icon name="Smartphone" size={20} className="text-muted-foreground" />
              <div>
                <p className="font-medium text-foreground">Aplicación Móvil - iOS</p>
                <p className="text-sm text-muted-foreground">Madrid, España • Hace 2 horas</p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Icon name="LogOut" size={14} className="mr-1" />
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-card rounded-lg border border-border academic-shadow">
      {/* Tabs Header */}
      <div className="border-b border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Configuración</h2>
        <div className="flex flex-wrap gap-2">
          {tabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? "default" : "ghost"}
              size="sm"
              onClick={() => setActiveTab(tab?.id)}
              className="flex items-center gap-2"
            >
              <Icon name={tab?.icon} size={16} />
              {tab?.name}
            </Button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'profile' && renderProfileTab()}
        {activeTab === 'privacy' && renderPrivacyTab()}
        {activeTab === 'notifications' && renderNotificationsTab()}
        {activeTab === 'preferences' && renderPreferencesTab()}
        {activeTab === 'security' && renderSecurityTab()}

        {/* Save Button */}
        <div className="flex justify-end gap-2 mt-8 pt-6 border-t border-border">
          <Button variant="outline">
            <Icon name="RotateCcw" size={16} className="mr-2" />
            Restablecer
          </Button>
          <Button variant="default" onClick={handleSave}>
            <Icon name="Save" size={16} className="mr-2" />
            Guardar Cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;