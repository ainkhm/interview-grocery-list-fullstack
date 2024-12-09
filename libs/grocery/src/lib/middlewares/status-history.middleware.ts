// import { Injectable, NestMiddleware } from '@nestjs/common';
// import { PrismaService, MiddlewareParams } from '@grocery-app/prisma';
// import { GroceryItem } from '@prisma/client';

// @Injectable()
// export class StatusHistoryMiddleware<T extends { id: string }>
//   implements NestMiddleware
// {
//   constructor(private readonly prisma: PrismaService) {}

//   private readonly modelItem = 'GroceryItem';

//   async use(req: any, res: any, next: () => void): Promise<void> {
//     const { body } = req;

//     if (!body) {
//       return next();
//     }

//     const handlers: Record<
//       string,
//       (params: MiddlewareParams, result: any) => Promise<void>
//     > = {
//       update: async (params, result) => {
//         if (params.model === this.modelItem && params.args?.data?.status) {
//           await this.prisma.statusHistory.create({
//             data: {
//               groceryItemId: result.id,
//               status: params.args.data.status,
//               changedAt: new Date(),
//             },
//           });
//         }
//       },
//       delete: async (params, result) => {
//         if (params.model === this.modelItem) {
//           await this.prisma.statusHistory.deleteMany({
//             where: {
//               groceryItemId: result.id,
//             },
//           });
//         }
//       },
//     };

//     const { action, model, data } = body;
//     const handler = handlers[action];
//     if (handler && model === this.modelItem) {
//       const result = await this.prisma.groceryItem.findUnique({
//         where: { id: data.id },
//       });
//       if (result) {
//         await handler(body, result );
//       }
//     }

//     next();
//   }
// }
export class StatusHistoryMiddleware {}