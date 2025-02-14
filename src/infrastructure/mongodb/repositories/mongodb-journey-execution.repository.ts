import { JourneyExecution } from '../../../domain/entities/journey-execution';
import { JourneyExecutionRepository } from '../../../domain/ports/journey-execution-repository';
import { JourneyExecutionModel } from '../schemas/journey-execution.schema';

export class MongoDBJourneyExecutionRepository implements JourneyExecutionRepository {
  async findById(id: string): Promise<JourneyExecution | null> {
    return await JourneyExecutionModel.findById(id).exec();
  }

  async findAll(): Promise<JourneyExecution[]> {
    return JourneyExecutionModel.find().exec();
  }

  async findPendingExecutions(): Promise<JourneyExecution[]> {
    return await JourneyExecutionModel.find({ status: 'pending' }).exec();
  }

  async save(execution: JourneyExecution): Promise<JourneyExecution> {
    const newExecution = new JourneyExecutionModel(execution);
    return await newExecution.save();
  }

  async updateStatus(executionId: string, status: 'scheduled' | 'in_progress' | 'completed' | 'failed'): Promise<void> {
    await JourneyExecutionModel.updateOne({ _id: executionId }, { status, updatedAt: new Date() }).exec();
  }

  async delete(id: string): Promise<void> {
    await JourneyExecutionModel.findByIdAndDelete(id).exec();
  }
}
