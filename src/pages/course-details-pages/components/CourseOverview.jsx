import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CourseOverview = ({ course }) => {
  const learningObjectives = [
  "Dominar los conceptos fundamentales de React y su ecosistema",
  "Desarrollar aplicaciones web modernas con hooks y componentes funcionales",
  "Implementar gestión de estado con Redux y Context API",
  "Crear interfaces de usuario responsivas con CSS moderno",
  "Aplicar mejores prácticas de desarrollo y testing",
  "Desplegar aplicaciones en producción con herramientas modernas"];


  const prerequisites = [
  "Conocimientos básicos de JavaScript ES6+",
  "Familiaridad con HTML y CSS",
  "Experiencia básica con Git y GitHub",
  "Comprensión de conceptos de programación orientada a objetos"];


  const courseFeatures = [
  { icon: 'Video', title: 'Videos HD', description: '25+ horas de contenido en video' },
  { icon: 'FileText', title: 'Recursos', description: 'Documentos y guías descargables' },
  { icon: 'Code', title: 'Proyectos', description: '5 proyectos prácticos' },
  { icon: 'Award', title: 'Certificado', description: 'Certificado de finalización' },
  { icon: 'Users', title: 'Comunidad', description: 'Acceso a foro de estudiantes' },
  { icon: 'Clock', title: 'Acceso', description: 'Acceso de por vida' }];


  return (
    <div className="space-y-6">
      {/* Course Description */}
      <div className="bg-card border border-border rounded-lg p-6 academic-shadow">
        <h2 className="text-xl font-semibold text-foreground mb-4">Descripción del Curso</h2>
        <div className="prose prose-slate max-w-none">
          <p className="text-foreground leading-relaxed mb-4">
            Este curso completo de React te llevará desde los conceptos básicos hasta el desarrollo de aplicaciones web modernas y escalables. 
            Aprenderás a construir interfaces de usuario interactivas utilizando las últimas características de React 18, incluyendo hooks, 
            context API, y patrones de diseño avanzados.
          </p>
          <p className="text-foreground leading-relaxed">
            A través de proyectos prácticos y ejercicios hands-on, desarrollarás las habilidades necesarias para crear aplicaciones web 
            profesionales que cumplan con los estándares de la industria. El curso incluye mejores prácticas de desarrollo, 
            testing, y deployment en entornos de producción.
          </p>
        </div>
      </div>
      {/* Learning Objectives */}
      <div className="bg-card border border-border rounded-lg p-6 academic-shadow">
        <h2 className="text-xl font-semibold text-foreground mb-4">Objetivos de Aprendizaje</h2>
        <div className="grid gap-3">
          {learningObjectives?.map((objective, index) =>
          <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-success rounded-full flex items-center justify-center mt-0.5">
                <Icon name="Check" size={14} className="text-success-foreground" />
              </div>
              <p className="text-foreground leading-relaxed">{objective}</p>
            </div>
          )}
        </div>
      </div>
      {/* Course Features */}
      <div className="bg-card border border-border rounded-lg p-6 academic-shadow">
        <h2 className="text-xl font-semibold text-foreground mb-4">Características del Curso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courseFeatures?.map((feature, index) =>
          <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
              <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name={feature?.icon} size={18} className="text-primary-foreground" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">{feature?.title}</h3>
                <p className="text-sm text-muted-foreground">{feature?.description}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Prerequisites */}
      <div className="bg-card border border-border rounded-lg p-6 academic-shadow">
        <h2 className="text-xl font-semibold text-foreground mb-4">Requisitos Previos</h2>
        <div className="grid gap-3">
          {prerequisites?.map((prerequisite, index) =>
          <div key={index} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 bg-warning rounded-full flex items-center justify-center mt-0.5">
                <Icon name="AlertCircle" size={14} className="text-warning-foreground" />
              </div>
              <p className="text-foreground leading-relaxed">{prerequisite}</p>
            </div>
          )}
        </div>
      </div>
      {/* Instructor Info */}
      <div className="bg-card border border-border rounded-lg p-6 academic-shadow">
        <h2 className="text-xl font-semibold text-foreground mb-4">Instructor</h2>
        <div className="flex items-start gap-4">
          <Image
            src="https://images.unsplash.com/photo-1616478159178-b5b3874d5e6d"
            alt="Professional headshot of male instructor with beard wearing dark shirt in modern office setting"
            className="w-16 h-16 rounded-full object-cover" />

          <div className="flex-1">
            <h3 className="font-semibold text-foreground">{course?.instructor}</h3>
            <p className="text-muted-foreground mb-2">Senior React Developer & Tech Educator</p>
            <p className="text-foreground leading-relaxed text-sm">
              Con más de 8 años de experiencia en desarrollo frontend y 5 años enseñando React, 
              Carlos ha ayudado a más de 10,000 estudiantes a dominar el desarrollo web moderno. 
              Actualmente trabaja como Senior Developer en una empresa tecnológica líder.
            </p>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={14} className="text-warning" />
                <span className="text-sm text-muted-foreground">4.9 rating</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Users" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">12,450 estudiantes</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="BookOpen" size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">15 cursos</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);

};

export default CourseOverview;