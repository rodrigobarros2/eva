import { Request, Response, NextFunction } from 'express';
import { JourneyExecutionService } from '../../../apllication/services/journey-execution.service';
import { HttpCode } from '../../../constants/httpCode.enum';

export class JourneyExecutionController {
  constructor(private journeyExecutionService: JourneyExecutionService) {}

  public async scheduleJourney(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { journeyId, collaboratorId, startDate } = req.body;

    const result = await this.journeyExecutionService.scheduleJourney({ journeyId, collaboratorId, startDate });

    res.status(HttpCode.CREATED).json({
      response: 'success',
      message: 'Journey scheduled successfully',
      data: result ?? {},
    });
  }

  async getJourneyExecutions(req: Request, res: Response, next: NextFunction): Promise<void> {
    const executions = await this.journeyExecutionService.findAll();
    res.status(HttpCode.OK).json({
      response: 'success',
      message: 'Journey executions retrieved successfully',
      data: executions,
    });
  }
}
