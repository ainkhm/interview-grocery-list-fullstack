import {
    Injectable,
    CanActivate,
    ExecutionContext,
    NotFoundException,
    BadRequestException,
  } from "@nestjs/common";
  import { Request } from "express";
  import { UserService } from "../user.service";
  
  @Injectable()
  export class UserEmailGuard implements CanActivate {
    constructor(private readonly userService: UserService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req: Request = context.switchToHttp().getRequest();
  
      if (!req.body.email && req.method === "POST") {
        throw new NotFoundException("Email is required");
      }
  
      const user = await this.userService.findOne({ email: req.body.email });
      if (user) {
        throw new BadRequestException("Email already in use");
      }
      return true;
    }
  }