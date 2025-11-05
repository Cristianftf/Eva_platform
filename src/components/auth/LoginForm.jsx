import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useFormValidation } from '../../hooks/useFormValidation';

const LoginForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { signIn } = useAuth()
  const { errors, validateForm, setErrors } = useFormValidation();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e?.preventDefault()
    
    if (!validateForm(formData)) {
      return
    }

    setIsLoading(true)
    setErrors({});

    try {
      const { error } = await signIn(formData.email, formData.password);
      
      if (error) {
        setErrors({ auth: 'Credenciales inválidas. Verifica tu email y contraseña.' });
      }
    } catch (err) {
      setErrors({ connection: 'Error de conexión. Intenta nuevamente.' });
    } finally {
      setIsLoading(false)
    }
  }

  

  const handleDemoLogin = (demoEmail, demoPassword) => {
    // Rellenar el formulario con credenciales de demo
    setFormData(prev => ({ ...prev, email: demoEmail, password: demoPassword }))
    setErrors({});
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Iniciar Sesión</h2>
          <p className="text-gray-600 mt-2">Accede a tu plataforma educativa</p>
        </div>

        {(errors.auth || errors.connection) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{errors.auth || errors.connection}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <div className="space-y-1">
            <Input
              id="email"
              type="email"
              placeholder="tu.email@universidad.edu"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              disabled={isLoading}
              className={`w-full ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <div className="space-y-1">
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e?.target?.value)}
                disabled={isLoading}
                className={`w-full pr-10 ${errors.password ? 'border-red-500' : ''}`}
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
            {errors.password && (
              <p className="text-xs text-red-600">{errors.password}</p>
            )}
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

       
      </div>
    </div>
  );
}

export default LoginForm