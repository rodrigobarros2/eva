import { Collaborator } from '../../../domain/entities/collaborator';
import { CollaboratorRepository } from '../../../domain/ports/collaborator-repository';
import { CollaboratorModel } from '../schemas/collaborator.schema';

export class MongoDBCollaboratorRepository implements CollaboratorRepository {
  async findById(id: string): Promise<Collaborator | null> {
    return await CollaboratorModel.findById(id).exec();
  }

  async findAll(): Promise<Collaborator[]> {
    return await CollaboratorModel.find().exec();
  }

  async save(collaborator: Collaborator): Promise<Collaborator> {
    const newCollaborator = new CollaboratorModel(collaborator);
    return await newCollaborator.save();
  }

  async update(id: string, collaborator: Partial<Collaborator>): Promise<Collaborator | null> {
    return await CollaboratorModel.findByIdAndUpdate(id, collaborator, { new: true }).exec();
  }

  async delete(id: string): Promise<void> {
    await CollaboratorModel.findByIdAndDelete(id).exec();
  }
}
