export type AppointmentStatus = 'confirmed' | 'pending' | 'cancelled' | 'done';

export interface Appointment {
  id: string;
  serviceId: string;
  serviceTitle: string;
  staffName: string;
  startsAt: Date;
  status: AppointmentStatus;
}

export interface CreateAppointmentDto {
  serviceId: string;
  staffId: string;
  startsAt: string;
  serviceTitle?: string;
  staffName?: string;
}
