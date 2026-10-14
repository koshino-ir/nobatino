import type { Appointment } from '../domain/types';

export type AppointmentFilter = 'upcoming' | 'past' | 'all';

export const FILTER_LABELS: Record<AppointmentFilter, string> = {
  upcoming: 'پیش‌رو',
  past: 'گذشته',
  all: 'همه',
};

export function filterAppointments(items: Appointment[], filter: AppointmentFilter): Appointment[] {
  const now = Date.now();
  const sorted = [...items].sort(
    (a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime(),
  );

  switch (filter) {
    case 'upcoming':
      return sorted.filter(
        (a) => new Date(a.startsAt).getTime() >= now && a.status !== 'cancelled',
      );
    case 'past':
      return sorted.filter((a) => new Date(a.startsAt).getTime() < now || a.status === 'cancelled');
    case 'all':
      return sorted;
  }
}
