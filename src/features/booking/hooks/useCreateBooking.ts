import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useDI } from '@core/di';
import type { CreateAppointmentDto } from '@features/appointments/domain/types';
import { appointmentsKeys } from '@features/appointments/hooks';

export function useCreateBooking() {
  const { appointments } = useDI();
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (dto: CreateAppointmentDto) => appointments.create(dto),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: appointmentsKeys.all });
    },
  });
}
