import { useQuery } from '@tanstack/react-query';

import { useDI } from '@core/di';

import type { Slot } from '../domain/types';

export function useTimeSlots(staffId: string | null, date: string | null) {
  const { slots } = useDI();

  return useQuery<Slot[]>({
    queryKey: ['slots', staffId, date],
    queryFn: () => slots.slotsFor(staffId ?? '', date ?? ''),
    enabled: Boolean(staffId && date),
  });
}
