import type { IServiceCatalog } from '../domain/IServiceCatalog';
import type { Service } from '../domain/types';

const MOCK: Service[] = [
  {
    id: 's1',
    title: 'اصلاح مو',
    description: 'اصلاح و آرایش موی سر',
    durationMinutes: 45,
    price: 350000,
    icon: '✂️',
  },
  {
    id: 's2',
    title: 'رنگ مو',
    description: 'رنگ و مش',
    durationMinutes: 120,
    price: 1200000,
    icon: '🎨',
  },
  {
    id: 's3',
    title: 'پکیج عروس',
    description: 'میکاپ، شنیون و اصلاح',
    durationMinutes: 180,
    price: 3500000,
    icon: '👰',
  },
  {
    id: 's4',
    title: 'میکاپ ساده',
    description: 'میکاپ روزانه',
    durationMinutes: 60,
    price: 500000,
    icon: '💄',
  },
];

export class MockServiceCatalog implements IServiceCatalog {
  async list(): Promise<Service[]> {
    await delay(300);
    return MOCK;
  }

  async byId(id: string): Promise<Service | null> {
    await delay(150);
    return MOCK.find((s) => s.id === id) ?? null;
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
