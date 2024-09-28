import { Injectable, Inject, LoggerService } from '@nestjs/common';
import { IlogService } from './Ilogservice';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class LogsService implements IlogService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}
  log(level: string, obj: string) {
    const log = this.logger;
    switch (level) {
      case 'info':
        log.log(obj);
        break;
      case 'error':
        log.error(new Error(obj));
        break;
      case 'warn':
        log.warn(obj);
        break;
      default:
        break;
    }
    this.logger.log(obj);
  }
  error(error: Error) {
    this.logger.error(error);
  }
  info(message: string) {
    this.logger.log(message);
  }
  warn(message: string) {
    this.logger.warn(message);
  }
}
