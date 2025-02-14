import { Request, Response, NextFunction } from 'express';
import { CollaboratorRepository } from '../../../domain/ports/collaborator-repository';
import { Collaborator } from '../../../domain/entities/collaborator';
import { HttpCode } from '../../../constants/httpCode.enum';
import 'express-async-errors';

export class CollaboratorController {
  constructor(private collaboratorRepo: CollaboratorRepository) {}

  async createCollaborator(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, email, phone } = req.body;

    const collaborator: Collaborator = {
      name,
      email,
      phone,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.collaboratorRepo.save(collaborator);

    res.status(HttpCode.CREATED).json({
      response: 'success',
      message: 'Create Collaborator scheduled successfully',
      data: result ?? {},
    });
  }

  async getCollaborators(req: Request, res: Response, next: NextFunction): Promise<void> {
    const collaborators = await this.collaboratorRepo.findAll();
    res.status(HttpCode.OK).json({
      response: 'success',
      message: 'Collaborators retrieved successfully',
      data: collaborators,
    });
  }
}
