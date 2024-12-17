import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from '@grocery-app/user';
import { GroceryModule } from '@grocery-app/grocery';
import { AuthModule } from '@grocery-app/auth';

@Module({
  imports: [AuthModule, UserModule, GroceryModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
