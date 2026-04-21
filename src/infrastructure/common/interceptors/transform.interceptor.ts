import {
  Injectable,
  Logger,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
export interface Response<T> {
  statusCode: number;
  data: T;
  message: string | null;
  timestamp: string;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();

    return next.handle().pipe(
      map((data: any) => {
        if (data && data.statusCode && data.timestamp) {
          return data; // already formatted
        }

        return {
          statusCode: response.statusCode,
          data,
          message: 'success',
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
