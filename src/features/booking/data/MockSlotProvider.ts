import type { ISlotProvider } from '../domain/ISlotProvider';
import type { Slot, Staff } from '../domain/types';

const STAFF: Staff[] = [
  { id: 'st1', name: 'علی رضایی', role: 'آرایشگر ارشد', avatar: '👨‍🦱', rating: 4.9 },
  { id: 'st2', name: 'مریم کریمی', role: 'میکاپ آرتیست', avatar: '👩‍🎨', rating: 4.8 },
  { id: 'st3', name: 'سارا احمدی', role: 'متخصص رنگ', avatar: '👩‍🦰', rating: 5.0 },
];

export class MockSlotProvider implements ISlotProvider {
  async staffByService(_serviceId: string): Promise<Staff[]> {
    await delay(250);
    return STAFF;
  }

  async slotsFor(staffId: string, date: string): Promise<Slot[]> {
    await delay(350);
    // ساعت‌های کاری ۹ صبح تا ۷ عصر، هر ۳۰ دقیقه
    const base = new Date(`${date}T09:00:00`);
    const slots: Slot[] = [];
    for (let i = 0; i < 20; i++) {
      const d = new Date(base.getTime() + i * 30 * 60_000);
      const iso = d.toISOString();
      // الگوی تصادفی ولی قابل تکرار برای available بودن
      const seed = (staffId.charCodeAt(1) + i) % 3;
      slots.push({ id: `${staffId}-${iso}`, startsAt: iso, available: seed !== 0 });
    }
    return slots;
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
