import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AchievementBadges = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const achievements = [
    {
      id: 1,
      title: "Primer Curso Completado",
      description: "Completaste tu primer curso con éxito",
      icon: "Trophy",
      color: "text-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      category: "completion",
      earned: true,
      earnedDate: "15 Oct 2024",
      rarity: "common"
    },
    {
      id: 2,
      title: "Estudiante Destacado",
      description: "Obtuviste calificaciones superiores a 9.0 en 3 cursos consecutivos",
      icon: "Star",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      category: "performance",
      earned: true,
      earnedDate: "28 Oct 2024",
      rarity: "rare"
    },
    {
      id: 3,
      title: "Colaborador Activo",
      description: "Participaste en más de 50 discusiones grupales",
      icon: "Users",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      category: "participation",
      earned: true,
      earnedDate: "02 Nov 2024",
      rarity: "uncommon"
    },
    {
      id: 4,
      title: "Madrugador",
      description: "Completaste 10 sesiones de estudio antes de las 8:00 AM",
      icon: "Sunrise",
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      category: "habits",
      earned: true,
      earnedDate: "20 Oct 2024",
      rarity: "uncommon"
    },
    {
      id: 5,
      title: "Mentor Estudiantil",
      description: "Ayudaste a 5 compañeros a mejorar sus calificaciones",
      icon: "Heart",
      color: "text-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      category: "social",
      earned: false,
      progress: 60,
      rarity: "epic"
    },
    {
      id: 6,
      title: "Racha de Fuego",
      description: "Mantuviste una racha de estudio de 30 días consecutivos",
      icon: "Flame",
      color: "text-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      category: "habits",
      earned: false,
      progress: 23,
      rarity: "legendary"
    },
    {
      id: 7,
      title: "Explorador de Conocimiento",
      description: "Completaste cursos en 5 áreas diferentes",
      icon: "Compass",
      color: "text-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      category: "exploration",
      earned: false,
      progress: 80,
      rarity: "rare"
    },
    {
      id: 8,
      title: "Perfeccionista",
      description: "Obtuviste 100% en 10 evaluaciones diferentes",
      icon: "Target",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
      category: "performance",
      earned: false,
      progress: 40,
      rarity: "epic"
    }
  ];

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

  const earnedCount = achievements?.filter(a => a?.earned)?.length;
  const totalCount = achievements?.length;

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