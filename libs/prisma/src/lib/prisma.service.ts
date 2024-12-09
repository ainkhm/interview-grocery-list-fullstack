import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
export type MiddlewareParams = Prisma.MiddlewareParams;
export type GroceryItemUpdateInput = Prisma.GroceryItemUpdateInput;
