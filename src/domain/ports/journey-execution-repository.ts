import { JourneyExecution } from '../entities/journey-execution';

export interface JourneyExecutionRepository {
  findById(id: string): Promise<JourneyExecution | null>;
  findAll(): Promise<JourneyExecution[]>;
  findPendingExecutions(): Promise<JourneyExecution[]>;
  save(execution: JourneyExecution): Promise<JourneyExecution>;
  updateStatus(id: string, status: JourneyExecution['status']): Promise<void>;
  delete(id: string): Promise<void>;
}
