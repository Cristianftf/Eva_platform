import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');

  const timeRangeOptions = [
    { value: '7d', label: 'Últimos 7 días' },
    { value: '30d', label: 'Últimos 30 días' },
    { value: '90d', label: 'Últimos 90 días' },
    { value: '1y', label: 'Último año' }
  ];

  const engagementData = [
    { day: 'Lun', students: 890, professors: 45, activities: 234 },
    { day: 'Mar', students: 1200, professors: 52, activities: 312 },
    { day: 'Mié', students: 1100, professors: 48, activities: 289 },
    { day: 'Jue', students: 1350, professors: 56, activities: 367 },
    { day: 'Vie', students: 1450, professors: 61, activities: 423 },
    { day: 'Sáb', students: 780, professors: 23, activities: 156 },
    { day: 'Dom', students: 650, professors: 18, activities: 134 }
  ];

  const courseCompletionData = [
    { month: 'Ene', completed: 45, enrolled: 120 },
    { month: 'Feb', completed: 67, enrolled: 145 },
    { month: 'Mar', completed: 89, enrolled: 178 },
    { month: 'Abr', completed: 123, enrolled: 203 },
    { month: 'May', completed: 156, enrolled: 234 },
    { month: 'Jun', completed: 189, enrolled: 267 }
  ];

  const deviceUsageData = [
    { name: 'Escritorio', value: 65, color: '#2563EB' },
    { name: 'Móvil', value: 25, color: '#7C3AED' },
    { name: 'Tablet', value: 10, color: '#F59E0B' }
  ];

  const topCoursesData = [
    {
      id: 1,
      title: 'Cálculo Diferencial e Integral',
      instructor: 'Dr. María González',
      students: 245,
      completion: 87,
      rating: 4.8,
      trend: 'up'
    },
    {
      id: 2,
      title: 'Física Mecánica',
      instructor: 'Prof. Carlos Ruiz',
      students: 178,
      completion: 92,
      rating: 4.6,
      trend: 'up'
    },
    {
      id: 3,
      title: 'Química Orgánica Básica',
      instructor: 'Dra. Ana López',
      students: 156,
      completion: 78,
      rating: 4.4,
      trend: 'down'
    },
    {
      id: 4,
      title: 'Ingeniería de Software',
      instructor: 'Dr. Roberto Silva',
      students: 134,
      completion: 85,
      rating: 4.7,
      trend: 'up'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Panel de Analíticas</h3>
        <div className="flex items-center space-x-4">
          <Select
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
            className="w-40"
          />
          <Button variant="outline" iconName="Download" iconPosition="left">
            Exportar Reporte
          </Button>
        </div>
      </div>
      {/* Engagement Chart */}
      <div className="academic-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-md font-semibold text-foreground">Participación Diaria</h4>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-muted-foreground">Estudiantes</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-secondary rounded-full"></div>
              <span className="text-muted-foreground">Profesores</span>
            </div>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="day" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="students" fill="#2563EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="professors" fill="#7C3AED" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Completion Trends */}
        <div className="academic-card p-6">
          <h4 className="text-md font-semibold text-foreground mb-6">Tendencias de Finalización</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={courseCompletionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="enrolled" 
                  stroke="#F59E0B" 
                  strokeWidth={3}
                  dot={{ fill: '#F59E0B', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Device Usage */}
        <div className="academic-card p-6">
          <h4 className="text-md font-semibold text-foreground mb-6">Uso por Dispositivo</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceUsageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {deviceUsageData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center space-x-6 mt-4">
            {deviceUsageData?.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                ></div>
                <span className="text-sm text-muted-foreground">{item?.name} ({item?.value}%)</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Top Performing Courses */}
      <div className="academic-card p-6">
        <h4 className="text-md font-semibold text-foreground mb-6">Cursos con Mejor Rendimiento</h4>
        <div className="space-y-4">
          {topCoursesData?.map((course) => (
            <div key={course?.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <h5 className="font-medium text-foreground">{course?.title}</h5>
                <p className="text-sm text-muted-foreground">{course?.instructor}</p>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{course?.students}</p>
                  <p className="text-xs text-muted-foreground">Estudiantes</p>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-semibold text-foreground">{course?.completion}%</p>
                  <p className="text-xs text-muted-foreground">Finalización</p>
                </div>
                
                <div className="flex items-center space-x-1">
                  <Icon name="Star" size={16} className="text-warning fill-current" />
                  <span className="text-sm font-medium text-foreground">{course?.rating}</span>
                </div>
                
                <div className="flex items-center">
                  <Icon 
                    name={course?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                    size={16} 
                    className={course?.trend === 'up' ? 'text-success' : 'text-destructive'} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;