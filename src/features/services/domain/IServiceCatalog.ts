import type { Service } from './types';

export interface IServiceCatalog {
  list(): Promise<Service[]>;
  byId(id: string): Promise<Service | null>;
}
