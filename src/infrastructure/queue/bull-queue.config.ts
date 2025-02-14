import Bull from 'bull';
import env from '../../config/env';

export const createQueue = (name: string): Bull.Queue => {
  return new Bull(name, {
    redis: {
      host: env.redisHost,
      port: env.redisPort ? parseInt(env.redisPort, 10) : undefined,
      password: env.redisPassword,
    },
    defaultJobOptions: {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 1000,
      },
      removeOnComplete: true,
    },
  });
};
