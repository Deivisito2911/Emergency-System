import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class Logsinterceptor implements NestInterceptor {
  private readonly logger = new Logger(Logsinterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const url = context.getArgByIndex(0).originalUrl;
    const method = context.getArgByIndex(0).method;
    this.logger.log(`Before ${method} ${url}`);
    return next
      .handle()
      .pipe(tap(() => this.logger.log(`After ${method} ${url}...`)));
  }
}
