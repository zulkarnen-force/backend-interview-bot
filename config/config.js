
export default {
    port: process.env.PORT || 1234,
    ip: process.env.HOST || '127.0.0.1',
    mongo: {
      uri: process.env.MONGO_URL || 'mongodb://localhost:27017/test'
    },
    redis: {
      uri: process.env.REDIS_URL || 'redis://localhost:6379'
    },
    bot: {
      token:  process.env.BOT_TOKEN
    },
    jwtSecret: process.env.JWT_SECRET || 'jkl!±@£!@ghj1237'
  };
  