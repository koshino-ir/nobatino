import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import { useDI } from '@core/di';

import type { Appointment } from '../domain/types';

export const appointmentsKeys = {
  all: ['appointments'] as const,
};

export function useAppointments() {
  const { appointments } = useDI();
  return useQuery<Appointment[]>({
    queryKey: appointmentsKeys.all,
    queryFn: () => appointments.list(),
  });
}

export function useCancelAppointment() {
  const { appointments } = useDI();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => appointments.cancel(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: appointmentsKeys.all });
    },
  });
}
