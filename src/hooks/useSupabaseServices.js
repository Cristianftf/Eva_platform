import { useMemo } from 'react';

export function useSupabaseServices(supabaseHelpers) {
  return useMemo(() => {
    const validateService = (service, serviceName) => {
      if (!service) {
        throw new Error(`${serviceName} service is not initialized`);
      }
      return service;
    };

    return {
      courses: validateService(supabaseHelpers?.courses, 'courses'),
      enrollments: validateService(supabaseHelpers?.enrollments, 'enrollments'),
      assignments: validateService(supabaseHelpers?.assignments, 'assignments'),
      notifications: validateService(supabaseHelpers?.notifications, 'notifications'),
      activities: validateService(supabaseHelpers?.activities, 'activities')
    };
  }, [supabaseHelpers]);
}