import { useQuery } from '@tanstack/react-query';

import { useDI } from '@core/di';

import type { Staff } from '../domain/types';

export function useStaff(serviceId: string | null) {
  const { slots } = useDI();

  return useQuery<Staff[]>({
    queryKey: ['staff', serviceId],
    queryFn: () => slots.staffByService(serviceId ?? ''),
    enabled: Boolean(serviceId),
  });
}
