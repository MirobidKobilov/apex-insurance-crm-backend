import * as winston from 'winston';
import { WinstonModuleOptions } from 'nest-winston/dist/winston.interfaces';

export const logConfiguration: WinstonModuleOptions = {
  transports: [
    new winston.transports.File({
      filename: 'logs/nest.log',
    }),
  ],
  format: winston.format.combine(
    winston.format.label({
      label: `APP LOG`,
    }),
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.printf(
      (info) =>
        `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`,
    ),
  ),
};

export const logger = winston.createLogger(logConfiguration);
