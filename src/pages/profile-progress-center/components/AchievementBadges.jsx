import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useProfile } from '../../../hooks/useProfile';

const AchievementBadges = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { achievements: profileAchievements = [], loading } = useProfile();
  const achievements = profileAchievements || [];

  const categories = [
    { id: 'all', name: 'Todos', icon: 'Grid3X3' },
    { id: 'completion', name: 'Completación', icon: 'CheckCircle' },
    { id: 'performance', name: 'Rendimiento', icon: 'TrendingUp' },
    { id: 'participation', name: 'Participación', icon: 'MessageSquare' },
    { id: 'habits', name: 'Hábitos', icon: 'Clock' },
    { id: 'social', name: 'Social', icon: 'Users' },
    { id: 'exploration', name: 'Exploración', icon: 'Compass' }
  ];

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'text-gray-500';
      case 'uncommon': return 'text-green-500';
      case 'rare': return 'text-blue-500';
      case 'epic': return 'text-purple-500';
      case 'legendary': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements?.filter(achievement => achievement?.category === selectedCategory);

  const earnedCount = achievements?.filter(a => a?.earned)?.length || 0;
  const totalCount = achievements?.length || 0;

  return (
    <div className="bg-card rounded-lg border border-border academic-shadow p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Logros y Insignias</h2>
          <p className="text-muted-foreground">
            Has desbloqueado {earnedCount} de {totalCount} logros disponibles
          </p>
        </div>
        <div className="flex items-center gap-2 mt-4 sm:mt-0">
          <div className="text-sm text-muted-foreground">Progreso:</div>
          <div className="flex items-center gap-2">
            <div className="w-24 bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-500"
                style={{ width: `${(earnedCount / totalCount) * 100}%` }}
              />
            </div>
            <span className="text-sm font-medium text-foreground">
              {Math.round((earnedCount / totalCount) * 100)}%
            </span>
          </div>
        </div>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={selectedCategory === category?.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category?.id)}
            className="flex items-center gap-2"
          >
            <Icon name={category?.icon} size={14} />
            {category?.name}
          </Button>
        ))}
      </div>
      {/* Achievements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredAchievements?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`relative p-4 rounded-lg border-2 transition-all duration-300 hover:shadow-md ${
              achievement?.earned
                ? `${achievement?.bgColor} ${achievement?.borderColor} opacity-100`
                : 'bg-muted border-muted-foreground/20 opacity-60'
            }`}
          >
            {/* Rarity Indicator */}
            <div className="absolute top-2 right-2">
              <div className={`w-2 h-2 rounded-full ${getRarityColor(achievement?.rarity)?.replace('text-', 'bg-')}`} />
            </div>

            {/* Achievement Icon */}
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
              achievement?.earned ? achievement?.bgColor : 'bg-muted'
            }`}>
              <Icon 
                name={achievement?.icon} 
                size={24} 
                className={achievement?.earned ? achievement?.color : 'text-muted-foreground'} 
              />
            </div>

            {/* Achievement Info */}
            <h3 className={`font-semibold mb-1 ${
              achievement?.earned ? 'text-foreground' : 'text-muted-foreground'
            }`}>
              {achievement?.title}
            </h3>
            <p className={`text-xs mb-3 ${
              achievement?.earned ? 'text-muted-foreground' : 'text-muted-foreground/70'
            }`}>
              {achievement?.description}
            </p>

            {/* Status */}
            {achievement?.earned ? (
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                  <Icon name="Check" size={10} className="mr-1" />
                  Desbloqueado
                </span>
                <span className="text-xs text-muted-foreground">
                  {achievement?.earnedDate}
                </span>
              </div>
            ) : (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">
                    Progreso: {achievement?.progress}%
                  </span>
                </div>
                <div className="w-full bg-background rounded-full h-1.5">
                  <div 
                    className="bg-primary h-1.5 rounded-full transition-all duration-500"
                    style={{ width: `${achievement?.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Share Achievements */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h3 className="font-medium text-foreground mb-1">Compartir Logros</h3>
            <p className="text-sm text-muted-foreground">
              Muestra tus logros académicos en redes sociales
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Descargar Certificado
            </Button>
            <Button variant="outline" size="sm">
              <Icon name="Share2" size={16} className="mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;