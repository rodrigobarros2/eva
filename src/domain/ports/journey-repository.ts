import { Journey } from '../entities/journey';

export interface JourneyRepository {
  findById(id: string): Promise<Journey | null>;
  findAll(): Promise<Journey[]>;
  save(journey: Journey): Promise<Journey>;
  update(id: string, journey: Partial<Journey>): Promise<Journey | null>;
  delete(id: string): Promise<void>;
}
