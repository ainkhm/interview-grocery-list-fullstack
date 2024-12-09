import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PrismaModule } from '@grocery-app/prisma';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { LoginDataValidationMiddleware } from '../lib/middlewares/login-data-validation.middleware';

@Module({
  imports: [PrismaModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(LoginDataValidationMiddleware)
      .forRoutes({ path: 'v1/auth/login', method: RequestMethod.POST });
  }
}
