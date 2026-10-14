import { create } from 'zustand';

import type { BookingDraft } from '../domain/types';

interface BookingDraftState extends BookingDraft {
  setService: (id: string) => void;
  setStaff: (id: string) => void;
  setSlot: (slotId: string, startsAt: string) => void;
  setDate: (date: string) => void;
  reset: () => void;
  isStaffComplete: () => boolean;
  isDateTimeComplete: () => boolean;
  isComplete: () => boolean;
}

const initial: BookingDraft = {
  serviceId: null,
  staffId: null,
  date: null,
  slotId: null,
  slotsStartAt: null,
};

export const useBookingDraft = create<BookingDraftState>((set, get) => ({
  ...initial,

  setService: (id) => set({ serviceId: id }),

  setStaff: (id) =>
    set({
      staffId: id,
      slotId: null,
      slotsStartAt: null,
    }),

  setDate: (date) =>
    set({
      date,
      slotId: null,
      slotsStartAt: null,
    }),

  setSlot: (slotId, startsAt) => set({ slotId, slotsStartAt: startsAt }),

  reset: () => set(initial),

  isStaffComplete: () => Boolean(get().staffId),
  isDateTimeComplete: () => Boolean(get().date && get().slotId),
  isComplete: () => {
    const s = get();
    return Boolean(s.serviceId && s.staffId && s.date && s.slotId && s.slotsStartAt);
  },
}));
