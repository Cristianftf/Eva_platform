import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ConsultationScheduler = ({ isOpen, onClose, professor }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [consultationType, setConsultationType] = useState('');

  const availableDates = [
    { value: '2025-11-04', label: 'Lunes, 4 de Noviembre' },
    { value: '2025-11-05', label: 'Martes, 5 de Noviembre' },
    { value: '2025-11-06', label: 'Miércoles, 6 de Noviembre' },
    { value: '2025-11-07', label: 'Jueves, 7 de Noviembre' },
    { value: '2025-11-08', label: 'Viernes, 8 de Noviembre' }
  ];

  const availableTimes = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' }
  ];

  const consultationTypes = [
    { value: 'academic', label: 'Consulta Académica' },
    { value: 'thesis', label: 'Revisión de Tesis' },
    { value: 'project', label: 'Proyecto Final' },
    { value: 'career', label: 'Orientación Profesional' },
    { value: 'other', label: 'Otro' }
  ];

  const handleSchedule = () => {
    if (selectedDate && selectedTime && subject && consultationType) {
      // Here you would typically send the consultation request to your backend
      console.log('Scheduling consultation:', {
        professor: professor?.name,
        date: selectedDate,
        time: selectedTime,
        subject,
        description,
        type: consultationType
      });
      
      // Reset form and close modal
      setSelectedDate('');
      setSelectedTime('');
      setSubject('');
      setDescription('');
      setConsultationType('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="Calendar" size={24} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Agendar Consulta</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Professor Info */}
        {professor && (
          <div className="p-6 border-b border-border">
            <div className="flex items-center space-x-3">
              <Image
                src={professor?.avatar}
                alt={professor?.avatarAlt}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h3 className="font-medium text-foreground">{professor?.name}</h3>
                <p className="text-sm text-muted-foreground">{professor?.department}</p>
                <div className="flex items-center mt-1">
                  <Icon name="Clock" size={12} className="text-muted-foreground mr-1" />
                  <span className="text-xs text-muted-foreground">
                    Horario: Martes y Jueves 2:00 - 4:00 PM
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="p-6 space-y-4">
          <Select
            label="Tipo de Consulta"
            placeholder="Selecciona el tipo de consulta"
            options={consultationTypes}
            value={consultationType}
            onChange={setConsultationType}
            required
          />

          <Input
            label="Asunto"
            type="text"
            placeholder="Describe brevemente el tema a tratar"
            value={subject}
            onChange={(e) => setSubject(e?.target?.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Fecha"
              placeholder="Selecciona fecha"
              options={availableDates}
              value={selectedDate}
              onChange={setSelectedDate}
              required
            />

            <Select
              label="Hora"
              placeholder="Selecciona hora"
              options={availableTimes}
              value={selectedTime}
              onChange={setSelectedTime}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Descripción (Opcional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e?.target?.value)}
              placeholder="Proporciona más detalles sobre lo que te gustaría discutir..."
              className="w-full p-3 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              rows="3"
            />
          </div>

          {/* Consultation Guidelines */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2 flex items-center">
              <Icon name="Info" size={16} className="mr-2 text-primary" />
              Pautas para la Consulta
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Prepara tus preguntas con anticipación</li>
              <li>• Trae material relevante (notas, tareas, etc.)</li>
              <li>• La consulta tiene una duración máxima de 30 minutos</li>
              <li>• Puedes cancelar hasta 2 horas antes</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="default"
            onClick={handleSchedule}
            disabled={!selectedDate || !selectedTime || !subject || !consultationType}
            iconName="Calendar"
            iconPosition="left"
          >
            Agendar Consulta
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationScheduler;