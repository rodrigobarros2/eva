import mongoose from 'mongoose';
import env from '../../config/env';
import { logger } from '../../shared/utils/logger';

const clientOptions = { serverApi: { version: '1' as const, strict: true, deprecationErrors: true } };

export async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.mongoDbUri, clientOptions);
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
    } else {
      throw new Error('Database connection is undefined');
    }

    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error(`Error connecting to MongoDB: ${error}`);
    throw new Error(`Error connecting to MongoDB: ${error}`);
  }
}
