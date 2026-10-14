import type { Appointment, CreateAppointmentDto } from './types';

export interface IAppointmentRepository {
  list(): Promise<Appointment[]>;
  create(dto: CreateAppointmentDto): Promise<Appointment>;
  cancel(id: string): Promise<void>;
}
