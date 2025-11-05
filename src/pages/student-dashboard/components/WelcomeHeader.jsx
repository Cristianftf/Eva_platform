import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  const { userProfile } = useAuth();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg sm:rounded-xl p-4 sm:p-6 text-white mb-4 sm:mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-1 sm:mb-2">
            {getGreeting()}, {userProfile?.full_name || 'Estudiante'}
          </h1>
          <p className="text-primary-foreground/80 text-xs sm:text-sm line-clamp-2">
            Bienvenido de vuelta a tu centro de aprendizaje personalizado
          </p>
          {userProfile?.email && (
            <p className="text-primary-foreground/60 text-[10px] sm:text-xs mt-1">
              {userProfile.email}
            </p>
          )}
        </div>
        <div className="flex sm:hidden items-center ml-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="Sun" size={16} className="text-primary-foreground" />
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3 md:gap-4">
          <div className="text-right">
            <p className="text-xs md:text-sm text-primary-foreground/80">Hoy</p>
            <p className="text-sm md:text-base font-semibold">{currentTime}</p>
          </div>
          <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Icon 
              name="Sun" 
              size={20} 
              className="text-primary-foreground md:scale-125" 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;