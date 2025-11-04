import React, { useState } from 'react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const ProgressAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('semester');
  const [selectedMetric, setSelectedMetric] = useState('grades');

  const periodOptions = [
    { value: 'week', label: 'Última Semana' },
    { value: 'month', label: 'Último Mes' },
    { value: 'semester', label: 'Semestre Actual' },
    { value: 'year', label: 'Año Académico' }
  ];

  const metricOptions = [
    { value: 'grades', label: 'Calificaciones' },
    { value: 'activity', label: 'Actividad de Estudio' },
    { value: 'completion', label: 'Tasa de Completación' },
    { value: 'participation', label: 'Participación' }
  ];

  // Mock data for different charts
  const gradesTrend = [
    { month: 'Ago', promedio: 8.2, matematicas: 8.5, fisica: 7.8, programacion: 8.7, ingles: 7.9 },
    { month: 'Sep', promedio: 8.4, matematicas: 8.7, fisica: 8.1, programacion: 8.9, ingles: 8.2 },
    { month: 'Oct', promedio: 8.6, matematicas: 8.9, fisica: 8.3, programacion: 9.1, ingles: 8.4 },
    { month: 'Nov', promedio: 8.7, matematicas: 9.0, fisica: 8.5, programacion: 9.2, ingles: 8.6 }
  ];

  const studyActivity = [
    { day: 'Lun', horas: 4.5, sesiones: 3 },
    { day: 'Mar', horas: 3.2, sesiones: 2 },
    { day: 'Mié', horas: 5.1, sesiones: 4 },
    { day: 'Jue', horas: 2.8, sesiones: 2 },
    { day: 'Vie', horas: 4.0, sesiones: 3 },
    { day: 'Sáb', horas: 6.2, sesiones: 4 },
    { day: 'Dom', horas: 3.5, sesiones: 2 }
  ];

  const courseCompletion = [
    { curso: 'Matemáticas III', completado: 85, total: 100 },
    { curso: 'Física II', completado: 72, total: 100 },
    { curso: 'Programación Web', completado: 94, total: 100 },
    { curso: 'Inglés Técnico', completado: 68, total: 100 },
    { curso: 'Base de Datos', completado: 91, total: 100 }
  ];

  const studyPatterns = [
    { name: 'Mañana (6-12)', value: 35, color: '#3B82F6' },
    { name: 'Tarde (12-18)', value: 45, color: '#10B981' },
    { name: 'Noche (18-24)', value: 20, color: '#F59E0B' }
  ];

  const performanceMetrics = [
    {
      title: "Promedio General",
      value: "8.7",
      change: "+0.3",
      trend: "up",
      icon: "TrendingUp",
      color: "text-success"
    },
    {
      title: "Horas de Estudio",
      value: "28.3h",
      change: "+2.1h",
      trend: "up",
      icon: "Clock",
      color: "text-primary"
    },
    {
      title: "Tasa de Completación",
      value: "82%",
      change: "+5%",
      trend: "up",
      icon: "CheckCircle",
      color: "text-success"
    },
    {
      title: "Participación",
      value: "94%",
      change: "-2%",
      trend: "down",
      icon: "MessageSquare",
      color: "text-warning"
    }
  ];

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="bg-card rounded-lg border border-border academic-shadow p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-2">Análisis de Progreso</h2>
            <p className="text-muted-foreground">
              Visualiza tu rendimiento académico y patrones de estudio
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              options={periodOptions}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              className="w-full sm:w-40"
            />
            <Select
              options={metricOptions}
              value={selectedMetric}
              onChange={setSelectedMetric}
              className="w-full sm:w-40"
            />
          </div>
        </div>
      </div>
      {/* Performance Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics?.map((metric, index) => (
          <div key={index} className="bg-card rounded-lg border border-border academic-shadow p-4">
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center ${metric?.color}`}>
                <Icon name={metric?.icon} size={20} />
              </div>
              <span className={`text-sm font-medium ${
                metric?.trend === 'up' ? 'text-success' : 'text-warning'
              }`}>
                {metric?.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{metric?.value}</div>
            <div className="text-sm text-muted-foreground">{metric?.title}</div>
          </div>
        ))}
      </div>
      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grades Trend Chart */}
        <div className="bg-card rounded-lg border border-border academic-shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Tendencia de Calificaciones</h3>
            <Button variant="ghost" size="sm">
              <Icon name="Download" size={16} />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={gradesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="month" stroke="#64748B" />
                <YAxis domain={[7, 10]} stroke="#64748B" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px'
                  }} 
                />
                <Legend />
                <Line type="monotone" dataKey="promedio" stroke="#2563EB" strokeWidth={3} />
                <Line type="monotone" dataKey="matematicas" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="fisica" stroke="#F59E0B" strokeWidth={2} />
                <Line type="monotone" dataKey="programacion" stroke="#8B5CF6" strokeWidth={2} />
                <Line type="monotone" dataKey="ingles" stroke="#EF4444" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Study Activity Chart */}
        <div className="bg-card rounded-lg border border-border academic-shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Actividad de Estudio Semanal</h3>
            <Button variant="ghost" size="sm">
              <Icon name="BarChart3" size={16} />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={studyActivity}>
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
                <Legend />
                <Bar dataKey="horas" fill="#3B82F6" name="Horas de Estudio" />
                <Bar dataKey="sesiones" fill="#10B981" name="Sesiones" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Course Completion Progress */}
        <div className="bg-card rounded-lg border border-border academic-shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Progreso por Curso</h3>
            <Button variant="ghost" size="sm">
              <Icon name="BookOpen" size={16} />
            </Button>
          </div>
          <div className="space-y-4">
            {courseCompletion?.map((course, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{course?.curso}</span>
                  <span className="text-sm text-muted-foreground">{course?.completado}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-500"
                    style={{ width: `${course?.completado}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Patterns Pie Chart */}
        <div className="bg-card rounded-lg border border-border academic-shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Patrones de Estudio</h3>
            <Button variant="ghost" size="sm">
              <Icon name="PieChart" size={16} />
            </Button>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={studyPatterns}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {studyPatterns?.map((entry, index) => (
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
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Insights and Recommendations */}
      <div className="bg-card rounded-lg border border-border academic-shadow p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recomendaciones Personalizadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="TrendingUp" size={20} className="text-blue-600" />
              <span className="font-medium text-blue-800">Mejora Continua</span>
            </div>
            <p className="text-sm text-blue-700">
              Tu promedio ha mejorado 0.3 puntos este mes. Mantén el ritmo de estudio actual.
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Clock" size={20} className="text-green-600" />
              <span className="font-medium text-green-800">Horario Óptimo</span>
            </div>
            <p className="text-sm text-green-700">
              Eres más productivo en las tardes. Considera programar temas difíciles entre 12-18h.
            </p>
          </div>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-2">
              <Icon name="Target" size={20} className="text-orange-600" />
              <span className="font-medium text-orange-800">Área de Enfoque</span>
            </div>
            <p className="text-sm text-orange-700">
              Inglés Técnico necesita más atención. Dedica 30 min extra diarios a este curso.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressAnalytics;