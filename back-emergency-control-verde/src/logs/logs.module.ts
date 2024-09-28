import { Global, Module } from '@nestjs/common';
import { LogsService } from './logs.service';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { Logsinterceptor } from './logs.interceptor';
@Global()
@Module({
  imports: [
    WinstonModule.forRoot({
      level: 'info',
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.errors({ stack: true }),
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike('EmergenciasUdone', {
              colors: true,
              prettyPrint: true,
              appName: true,
            })
          ),
        }),
      ],
    }),
  ],
  providers: [
    LogsService,
    {
      provide: APP_INTERCEPTOR,
      useClass: Logsinterceptor,
    },
  ],
  exports: [LogsService, LogsModule],
})
export class LogsModule {}
