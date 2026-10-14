import type { IAppointmentRepository } from '../domain/IAppointmentRepository';
import type { Appointment, CreateAppointmentDto } from '../domain/types';

export class MockAppointmentRepository implements IAppointmentRepository {
  private items: Appointment[] = [
    {
      id: 'a1',
      serviceId: 's1',
      serviceTitle: 'اصلاح مو',
      staffName: 'علی رضایی',
      startsAt: new Date(Date.now() + 86400000),
      status: 'confirmed',
    },
    {
      id: 'a2',
      serviceId: 's4',
      serviceTitle: 'میکاپ ساده',
      staffName: 'مریم کریمی',
      startsAt: new Date(Date.now() + 172800000),
      status: 'pending',
    },
  ];

  async list(): Promise<Appointment[]> {
    await delay(300);
    return [...this.items];
  }

  async create(dto: CreateAppointmentDto): Promise<Appointment> {
    await delay(500);
    const appointment: Appointment = {
      id: `a${Date.now()}`,
      serviceId: dto.serviceId,
      serviceTitle: 'خدمت جدید',
      staffName: 'کارشناس',
      startsAt: new Date(dto.startsAt),
      status: 'confirmed',
    };
    this.items = [appointment, ...this.items];
    return appointment;
  }

  async cancel(id: string): Promise<void> {
    await delay(300);
    this.items = this.items.map((a) => (a.id === id ? { ...a, status: 'cancelled' } : a));
  }
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
