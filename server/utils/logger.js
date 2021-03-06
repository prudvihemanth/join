const winston = require('winston');
const path = require('path');

const logDir = 'logs';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: path.join(logDir, '/error.log'), level: 'error' }),
    new winston.transports.File({ filename: path.join(logDir, '/combined.log') }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger;
