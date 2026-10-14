import type { Slot, Staff } from './types';

export interface ISlotProvider {
  staffByService(serviceId: string): Promise<Staff[]>;
  slotsFor(staffId: string, date: string): Promise<Slot[]>;
}
