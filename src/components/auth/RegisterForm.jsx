import React, { useState } from 'react';
import { useAuth } from '../../Context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useFormValidation } from '../../hooks/useFormValidation';

const RegisterForm = ({ onToggleMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'student'
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { signUp } = useAuth()
  const { errors, validateForm, setErrors } = useFormValidation();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    setErrors({});
  }


  const handleSubmit = async (e) => {
    e?.preventDefault()
    
    if (!validateForm(formData)) {
      return
    }

    setIsLoading(true)
    setSuccess(false)

    try {
      const { error } = await signUp(formData?.email, formData?.password, {
        full_name: formData?.fullName,
        role: formData?.role
      })
      
      if (error) {
        // error puede ser un string o un objeto Error
        const msg = typeof error === 'string' ? error : (error?.message || '');
        if (msg.includes('already registered') || msg.includes('already exists')) {
          setErrors({ email: 'Este email ya está registrado. Intenta iniciar sesión.' });
        } else {
          setErrors({ auth: 'Error al crear la cuenta. Intenta nuevamente.' });
        }
      } else {
        setSuccess(true)
        setTimeout(() => {
          onToggleMode()
        }, 2000)
      }
    } catch (err) {
      setErrors({ connection: 'Error de conexión. Intenta nuevamente.' });
    } finally {
      setIsLoading(false)
    }
  }

  const roleOptions = [
    { value: 'student', label: 'Estudiante' },
    { value: 'teacher', label: 'Profesor' },
    { value: 'admin', label: 'Administrador' }
  ]

  if (success) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">¡Cuenta creada!</h2>
            <p className="text-gray-600 mb-4">
              Tu cuenta ha sido creada exitosamente. Ahora puedes iniciar sesión.
            </p>
            <Button onClick={onToggleMode} className="w-full">
              Ir a Iniciar Sesión
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Crear Cuenta</h2>
          <p className="text-gray-600 mt-2">Únete a nuestra plataforma educativa</p>
        </div>

        {(errors.auth || errors.connection) && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md flex items-center gap-2 text-red-700">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span className="text-sm">{errors.auth || errors.connection}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
              Nombre Completo
            </label>
            <div className="space-y-1">
            <Input
              id="fullName"
              type="text"
              placeholder="Tu nombre completo"
              value={formData?.fullName}
              onChange={(e) => handleInputChange('fullName', e?.target?.value)}
              disabled={isLoading}
              className={`w-full ${errors.fullName ? 'border-red-500' : ''}`}
            />
            {errors.fullName && (
              <p className="text-xs text-red-600">{errors.fullName}</p>
            )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <div className="space-y-1">
            <Input
              id="email"
              type="email"
              placeholder="tu.email@universidad.edu"
              value={formData?.email}
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
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo de Usuario
            </label>
            <Select
              value={formData?.role}
              onChange={(value) => handleInputChange('role', value)}
              disabled={isLoading}
              options={roleOptions}
              className="w-full"
            />
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
                placeholder="Mínimo 6 caracteres"
                value={formData?.password}
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

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar Contraseña
            </label>
            <div className="space-y-1">
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Repite tu contraseña"
                value={formData?.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e?.target?.value)}
                disabled={isLoading}
                className={`w-full pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-xs text-red-600">{errors.confirmPassword}</p>
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
                Creando cuenta...
              </>
            ) : (
              'Crear Cuenta'
            )}
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={onToggleMode}
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Inicia sesión aquí
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm