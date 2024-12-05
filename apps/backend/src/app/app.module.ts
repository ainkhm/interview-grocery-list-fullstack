import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { AppController } from "./app.controller";
import { GroceryController, GroceryService } from "@grocery-app/grocery";

@Module({
  imports: [],
  controllers: [AppController, GroceryController],
  providers: [AppService, GroceryService],
})
export class AppModule {}
