import { Controller, Get, HttpStatus } from "@nestjs/common";
import { AppService } from "./app.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("App")
export class AppController {
  constructor(private readonly appService: AppService) {}
}
