import { IGroceryView } from '@grocery-app/interfaces';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformGroceryInterceptor implements NestInterceptor {
  intercept(
    _context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    return next.handle().pipe(
      map((data: IGroceryView | IGroceryView[]) => {
        if (Array.isArray(data)) {
          return data.map((item) => this.transformGrocery(item));
        }
        return this.transformGrocery(data);
      }),
    );
  }

  private transformGrocery(grocery: IGroceryView): Partial<IGroceryView> {
    return {
      id: grocery.id,
      name: grocery.name,
      status: grocery.status,
      priority: grocery.priority,
      quantity: grocery.quantity,
    };
  }
}
