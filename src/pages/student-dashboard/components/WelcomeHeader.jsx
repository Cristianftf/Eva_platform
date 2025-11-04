import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userName, currentTime }) => {
  const getGreeting = () => {
    const hour = new Date()?.getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-xl p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            {getGreeting()}, {userName}
          </h1>
          <p className="text-primary-foreground/80 text-sm">
            Bienvenido de vuelta a tu centro de aprendizaje personalizado
          </p>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <div className="text-right">
            <p className="text-sm text-primary-foreground/80">Hoy</p>
            <p className="font-semibold">{currentTime}</p>
          </div>
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="Sun" size={24} className="text-primary-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;