import { NextFunction, Request, Response } from 'express';
import { JourneyRepository } from '../../../domain/ports/journey-repository';
import { Journey } from '../../../domain/entities/journey';
import { HttpCode } from '../../../constants/httpCode.enum';

export class JourneyController {
  constructor(private journeyRepo: JourneyRepository) {}

  async createJourney(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, description, actions } = req.body;

    const journey: Journey = {
      name,
      description,
      actions,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await this.journeyRepo.save(journey);

    res.status(HttpCode.CREATED).json({
      response: 'success',
      message: 'Journey scheduled successfully',
      data: result ?? {},
    });
  }

  async getJourneys(req: Request, res: Response, next: NextFunction): Promise<void> {
    const journeys = await this.journeyRepo.findAll();
    res.status(HttpCode.OK).json({
      response: 'success',
      message: 'Journeys retrieved successfully',
      data: journeys,
    });
  }
}
