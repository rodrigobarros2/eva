import { Request, Response, NextFunction } from 'express';
import { ObjectSchema } from 'joi';
import { HttpCode } from '../../../constants/httpCode.enum';

export const validateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await schema.validateAsync(req.body, { abortEarly: false });
      next();
    } catch (error: any) {
      res.status(HttpCode.UNPROCESSABLE_ENTITY).json({
        message: 'Erro de validação',
        errors: error.details.map((detail: { message: string }) => detail.message),
      });
    }
  };
};

export default validateSchema;
