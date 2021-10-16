import { startConnection } from './dals/dataAccess';
import config from './config';

import createApp from './app.express';
import util from 'util';
import { logger } from './logger';
import { NextFunction, Request, Response } from 'express';

// Prevent multiline inspect, useful for grepping in logs.
util.inspect.defaultOptions.breakLength = Infinity;

const app = createApp();
startConnection(config.DB_CONFIG.DB_NAME, config.DB_CONFIG.DB_HOST, config.DB_CONFIG.DB_PORT);

// error handler middleware
app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  res.status(error.status || 500).send({
    error: error.message || 'Internal Server Error',
  });
});

app.listen(config.PORT, config.HOST, () => {
  logger.info(`Server running on port ${config.HOST}:${config.PORT}`);
});
