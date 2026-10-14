export interface Staff {
  id: string;
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

export interface Slot {
  id: string;
  startsAt: string; // ISO
  available: boolean;
}

export type BookingStep = 'staff' | 'datetime' | 'confirm';

export interface BookingDraft {
  serviceId: string | null;
  staffId: string | null;
  date: string | null; // YYYY-MM-DD
  slotId: string | null;
  slotsStartAt: string | null;
}
