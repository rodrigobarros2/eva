export default {
  port: process.env.PORT || 3333,
  mongoDbUri: process.env.MONGODB_URI!,
  redisHost: process.env.REDIS_HOST!,
  redisPort: process.env.REDIS_PORT!,
  redisPassword: process.env.REDIS_PASSWORD!,
};
