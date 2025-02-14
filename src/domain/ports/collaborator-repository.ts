import { Collaborator } from '../entities/collaborator';

export interface CollaboratorRepository {
  findById(id: string): Promise<Collaborator | null>;
  findAll(): Promise<Collaborator[]>;
  save(collaborator: Collaborator): Promise<Collaborator>;
  update(id: string, collaborator: Partial<Collaborator>): Promise<Collaborator | null>;
  delete(id: string): Promise<void>;
}
