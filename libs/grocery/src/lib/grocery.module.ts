import { Module, MiddlewareConsumer, NestModule, RequestMethod } from '@nestjs/common';
import { GroceryController } from './grocery.controller';
import { GroceryService } from './grocery.service';
import { PrismaModule } from '@grocery-app/prisma';
// import { StatusHistoryMiddleware } from './middlewares';

@Module({
  imports: [PrismaModule],
  controllers: [GroceryController],
  providers: [GroceryService],
  exports: [GroceryService],
})

export class GroceryModule {}
// export class GroceryModule implements NestModule {
//   configure(consumer: MiddlewareConsumer): void {
//     consumer
//       .apply(StatusHistoryMiddleware)
//       .forRoutes({ path: 'v1/auth/grocery', method: RequestMethod.POST });
//   }
// }