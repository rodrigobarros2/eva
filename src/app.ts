import express, { Application, Request, Response } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { connectDatabase } from './infrastructure/mongodb/connection';
import routes from './infrastructure/http/routes';
import { errorHandler } from './infrastructure/http/middlewares/error-handler.middleware';
import 'dotenv/config';

export const setupApp = (): Application => {
  const app: Application = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(helmet());

  app.use('/api/v1', routes);

  app.get('/', (request: Request, response: Response) => {
    response.json({
      response: 'successfull',
      message: 'Hello World 🌍',
      data: {},
    });
  });

  app.use((request: Request, response: Response) => {
    response.status(404).json({
      response: 'error',
      message: 'Not Found. Ohh you are lost, read the API documentation to find your way back home 😂',
      data: {},
    });
  });

  connectDatabase();

  app.use(errorHandler);

  return app;
};
