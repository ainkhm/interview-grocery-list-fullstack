import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUserView } from '@grocery-app/interfaces';

@Injectable()
export class TransformUserInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: IUserView) => ({
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role,
      })),
    );
  }
}
