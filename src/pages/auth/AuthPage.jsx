import React, { useState, useEffect } from 'react';
import { useAuth } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
 import LoginForm from'../../components/auth/LoginForm';
 import RegisterForm from'../../components/auth/RegisterForm';
import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)
  const { user, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (user && !loading) {
      navigate('/student-dashboard')
    }
  }, [user, loading, navigate])

  const toggleMode = () => {
    setIsLogin(!isLogin)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-700">Cargando...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center min-h-screen">
          {/* Left side - Branding and Features */}
          <div className="hidden lg:block">
            <div className="max-w-lg">
              <div className="flex items-center mb-8">
                <GraduationCap className="w-10 h-10 text-blue-600 mr-3" />
                <h1 className="text-3xl font-bold text-gray-900">EduPlatform</h1>
              </div>
              
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Transforma tu experiencia educativa
              </h2>
              
              <p className="text-xl text-gray-600 mb-8">
                Una plataforma completa para estudiantes y profesores con herramientas 
                modernas de aprendizaje, comunicación y evaluación.
              </p>

              <div className="grid grid-cols-1 gap-6">
                <div className="flex items-start">
                  <BookOpen className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Cursos Interactivos</h3>
                    <p className="text-gray-600">
                      Accede a contenido multimedia, módulos estructurados y materiales descargables.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Users className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Comunicación en Tiempo Real</h3>
                    <p className="text-gray-600">
                      Chatea con profesores y compañeros, participa en foros de discusión.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Award className="w-6 h-6 text-blue-600 mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Seguimiento de Progreso</h3>
                    <p className="text-gray-600">
                      Monitorea tu avance, recibe calificaciones y consulta estadísticas detalladas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
                <h4 className="font-semibold text-gray-900 mb-2">¿Nuevo en la plataforma?</h4>
                <p className="text-gray-600 text-sm">
                  Utiliza las credenciales de demostración para explorar todas las funcionalidades 
                  disponibles según tu tipo de usuario.
                </p>
              </div>
            </div>
          </div>

          {/* Right side - Auth Forms */}
          <div className="flex items-center justify-center">
            <div className="w-full max-w-md">
              {/* Mobile branding */}
              <div className="lg:hidden text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <GraduationCap className="w-8 h-8 text-blue-600 mr-2" />
                  <h1 className="text-2xl font-bold text-gray-900">EduPlatform</h1>
                </div>
                <p className="text-gray-600">
                  Tu plataforma educativa integral
                </p>
              </div>

              {isLogin ? (
                <LoginForm onToggleMode={toggleMode} />
              ) : (
                <RegisterForm onToggleMode={toggleMode} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage