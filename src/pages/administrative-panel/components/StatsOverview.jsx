import React from 'react';
import Icon from '../../../components/AppIcon';
import { useAdminStats } from '../hooks/useAdmin';

const StatsOverview = () => {
  const { stats, loading, error } = useAdminStats();

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="academic-card p-6 animate-pulse">
            <div className="h-8 w-8 bg-muted rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-6 w-16 bg-muted rounded"></div>
              <div className="h-4 w-24 bg-muted rounded"></div>
              <div className="h-3 w-32 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="academic-card p-6">
        <div className="text-center text-destructive">
          <Icon name="AlertTriangle" size={24} className="mx-auto mb-2" />
          <p>Error al cargar estadísticas</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats?.stats?.map((stat) => (
        <div key={stat?.id} className="academic-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Icon name={stat?.icon} size={20} className="text-primary" />
            </div>
            {stat?.change && (
              <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                stat?.changeType === 'positive' ? 'text-success bg-success/10' : 'text-destructive bg-destructive/10'
              }`}>
                {stat?.change}
              </span>
            )}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-foreground">{stat?.value}</h3>
            <p className="text-sm font-medium text-foreground">{stat?.title}</p>
            <p className="text-xs text-muted-foreground">{stat?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsOverview;