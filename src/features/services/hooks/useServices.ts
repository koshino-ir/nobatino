import { useQuery } from '@tanstack/react-query';

import { useDI } from '@core/di';

import type { Service } from '../domain/types';

export const servicesKeys = {
  all: ['services'] as const,
  detail: (id: string) => ['services', id] as const,
};

export function useServices() {
  const { services: repo } = useDI();

  return useQuery<Service[]>({
    queryKey: servicesKeys.all,
    queryFn: () => repo.list(),
    staleTime: 5 * 60_000,
  });
}

export function useService(id: string) {
  const { services: repo } = useDI();

  return useQuery<Service | null>({
    queryKey: servicesKeys.detail(id),
    queryFn: () => repo.byId(id),
    enabled: Boolean(id),
  });
}
