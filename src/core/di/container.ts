import { MockAppointmentRepository } from '@features/appointments/data/MockAppointmentRepository';
import type { IAppointmentRepository } from '@features/appointments/domain/IAppointmentRepository';
import { MockSlotProvider } from '@features/booking/data/MockSlotProvider';
import type { ISlotProvider } from '@features/booking/domain/ISlotProvider';
import { MockServiceCatalog } from '@features/services/data/MockServiceCatalog';
import type { IServiceCatalog } from '@features/services/domain/IServiceCatalog';
import { http } from '@infra/api';

export interface AppContainer {
  services: IServiceCatalog;
  appointments: IAppointmentRepository;
  slots: ISlotProvider;
  http: typeof http;
}

export const createContainer = (): AppContainer => ({
  services: new MockServiceCatalog(),
  appointments: new MockAppointmentRepository(),
  slots: new MockSlotProvider(),
  http,
});
