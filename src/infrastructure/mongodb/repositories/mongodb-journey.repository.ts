import { Journey } from '../../../domain/entities/journey';
import { JourneyRepository } from '../../../domain/ports/journey-repository';
import { JourneyModel } from '../schemas/journey.schema';

export class MongoDBJourneyRepository implements JourneyRepository {
  async findById(id: string): Promise<Journey | null> {
    return await JourneyModel.findById(id).exec();
  }

  async findAll(): Promise<Journey[]> {
    return await JourneyModel.find().exec();
  }

  async save(journey: Journey): Promise<Journey> {
    const newJourney = new JourneyModel(journey);
    await newJourney.save();
    return newJourney.toObject();
  }

  async update(id: string, journey: Partial<Journey>): Promise<Journey | null> {
    return await JourneyModel.findByIdAndUpdate(id, journey, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await JourneyModel.findByIdAndDelete(id).exec();
  }
}
