import { createLogger, format, transports } from 'winston';
import config from './config';

// Official Winston log levels sorted by priority.
// The used level will display its own level and all levels from the left side.
// If you provide a level that is not listed here logger will not produce output
const validLogLevels = ['emerg', 'alert', 'crit', 'error', 'warning', 'notice', 'info', 'debug', 'off'];
const getLogLevel = (level?: string) => (validLogLevels.some((vl) => vl === level) ? level : 'debug');

const formatMetadata = (metadata: object) => {
  const serializedMeta = Object.entries(metadata)
    .reduce<string[]>((acc, [key, value]) => [...acc, `${key}=${value}`], [])
    .join(' ');
  return serializedMeta.length ? `[${serializedMeta}]` : '';
};

const formatter = format.printf(
  ({ level, message, timestamp, metadata }) => `${timestamp} [${level}] ${formatMetadata(metadata)} ${message}`,
);

export const logger = createLogger({
  level: getLogLevel(config.LOG_LEVEL),
  transports: [new transports.Console()],
  format: format.combine(
    format.colorize(),
    format.metadata(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    formatter,
  ),
});
