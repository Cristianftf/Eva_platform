import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';

const LoginForm = ({ onToggleMode }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { signIn } = useAuth()

  const handleSubmit = async (e) => {
    e?.preventDefault()
    
    if (!email || !password) {
      setError('Por favor, completa todos los campos')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const { error } = await signIn(email, password)
      
      if (error) {
        setError('Credenciales inválidas. Verifica tu email y contraseña.')
      }
    } catch (err) {
      setError('Error de conexión. Intenta nuevamente.',err)
    } finally {
      setIsLoading(false)
    }
  }

  const demoCredentials = [
    {
      role: 'Administrador',
      email: 'admin@universidad.edu',
      password: 'admin123'
    },
    {
      role: 'Profesor',
      email: 'maria.garcia@universidad.edu',
      password: 'teacher123'
    },
    {
      role: 'Estudiante',
      email: 'alex.johnson@universidad.edu',
      password: 'student123'
    }
  ]

  const handleDemoLogin = (demoEmail, demoPassword) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="text-gray-600 mt-2">Accede a tu plataforma educativa</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <Input
              id="email"
              type="email"
              placeholder="tu.email@universidad.edu"
              value={email}
              onChange={(e) => setEmail(e?.target?.value)}
              disabled={isLoading}
              className="w-full"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e?.target?.value)}
                disabled={isLoading}
                className="w-full pr-10"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Iniciando sesión...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={onToggleMode}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Regístrate aquí
              </button>
            </p>
          </div>
        </div>

        {/* Demo Credentials Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-900 mb-3">
              Credenciales de Demostración
            </h3>
            <div className="space-y-2">
              {demoCredentials?.map((cred, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded p-2">
                  <div className="text-xs">
                    <div className="font-medium text-gray-900">{cred?.role}</div>
                    <div className="text-gray-600">{cred?.email}</div>
                    <div className="text-gray-500">Contraseña: {cred?.password}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDemoLogin(cred?.email, cred?.password)}
                    disabled={isLoading}
                    className="ml-2"
                  >
                    Usar
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm