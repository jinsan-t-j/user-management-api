import { WinstonModule, utilities as nestWinstonModuleUtilities } from 'nest-winston';
import path from 'path';
import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

import { AppEnv, DateTimeFormat } from '../../../shared/constants';

/**
 * The WInston logging configuration.
 *
 * @param appName - The name of the application.
 * @returns The winston logger instance.
 */
export const WinstonFactory = (appName: string) => {
    return WinstonModule.createLogger({
        handleExceptions: true,
        handleRejections: true,
        transports: [
            ...(process.env.APP_ENV !== AppEnv.PROD
                ? [
                      new winston.transports.Console({
                          format: winston.format.combine(
                              winston.format.timestamp(),
                              winston.format.ms(),
                              nestWinstonModuleUtilities.format.nestLike(appName, {
                                  colors: true,
                                  prettyPrint: true,
                              }),
                          ),
                      }),
                  ]
                : []),
            new DailyRotateFile({
                level: process.env.APP_ENV !== AppEnv.PROD ? 'debug' : 'warn',
                datePattern: DateTimeFormat.YYY_MM_DD,
                filename: '%DATE%.log',
                dirname: path.resolve(__dirname, '../../../../logs/'),
                maxSize: '5m',
                maxFiles: '14d',
                handleExceptions: true,
                handleRejections: true,
                format: winston.format.combine(
                    winston.format.label({ label: appName }),
                    winston.format.timestamp(),
                    winston.format.printf(({ level, message, label, timestamp, stack }) => {
                        return `${timestamp} [${label}] ${level}: ${message ?? ''} ${stack ?? ''}`;
                    }),
                ),
                auditFile: 'logs/.audit/app.json',
            }),
        ],
    });
};
