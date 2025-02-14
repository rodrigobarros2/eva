import { Request, Response, NextFunction } from 'express';
import { logger } from '../../../shared/utils/logger';
import { HttpCode } from '../../../constants/httpCode.enum';

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {
  logger.error(err.stack);

  res.status(HttpCode.INTERNAL_SERVER_ERROR).json({
    response: 'Error',
    message: err.message,
  });

  next();
}
