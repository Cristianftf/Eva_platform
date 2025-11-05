import { useState } from 'react';

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    if (!email) return 'El email es requerido';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return 'Por favor, ingresa un email válido';
    }
    return null;
  };

  const validatePassword = (password, confirmPassword = null) => {
    if (!password) return 'La contraseña es requerida';
    if (password.length < 6) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    if (confirmPassword !== null && password !== confirmPassword) {
      return 'Las contraseñas no coinciden';
    }
    return null;
  };

  const validateName = (name) => {
    if (!name) return 'El nombre es requerido';
    if (name.length < 2) {
      return 'El nombre debe tener al menos 2 caracteres';
    }
    return null;
  };

  const validateForm = (fields) => {
    const newErrors = {};
    
    Object.keys(fields).forEach(field => {
      switch (field) {
        case 'email':
          const emailError = validateEmail(fields[field]);
          if (emailError) newErrors[field] = emailError;
          break;
        case 'password':
          const passwordError = validatePassword(
            fields[field], 
            fields.confirmPassword
          );
          if (passwordError) newErrors[field] = passwordError;
          break;
        case 'fullName':
          const nameError = validateName(fields[field]);
          if (nameError) newErrors[field] = nameError;
          break;
        case 'confirmPassword':
          // Already handled in password validation
          break;
        default:
          if (!fields[field]) {
            newErrors[field] = 'Este campo es requerido';
          }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    errors,
    validateForm,
    setErrors
  };
};