import 'dotenv/config';
import env from './config/env';
import { logger } from './shared/utils/logger';
import { setupApp } from './app';

export const app = setupApp();

export const server = app.listen(env.port, () => {
  logger.info(`Server running at: http://localhost:${env.port}`);
});
