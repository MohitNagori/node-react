import 'dotenv/config';

export default {
  PORT: +process.env.PORT! || 3000,
  HOST: process.env.HOST || '0.0.0.0',

  DB_CONFIG: {
    DB_HOST: process.env.DB_HOST! || 'localhost',
    DB_PORT: +process.env.DB_PORT! || 27017,
    DB_NAME: process.env.DB_NAME! || 'users',
  },

  SECRET_KEY: process.env.SECRET_KEY! || 'gWdbm3wTWJQbhp2uajsaAVJ4VU1aGoDt',

  LOG_LEVEL: process.env.LOG_LEVEL || 'debug',
};
