import { Prisma } from '@prisma/client';

export function historyMiddleware<T extends { id: string }>(): Prisma.Middleware {
    const modelItem = 'GroceryItem';
    const modelHistory = 'StatusHistory';
    const handlers: Record<
      string,
      (params: Prisma.MiddlewareParams, result: T, next: (params: Prisma.MiddlewareParams) => Promise<T>) => Promise<void>
    > = {
      update: async (params, result, next) => {
        if (params.model === modelItem && params.args?.data?.status) {
          await next({
            model: modelHistory,
            action: 'create',
            args: {
              data: {
                groceryItemId: result.id,
                status: params.args.data.status,
                changedAt: new Date(),
              },
            },
            dataPath: [],
            runInTransaction: false,
          });
        }
      },
      delete: async (params, result, next) => {
        if (params.model === modelItem) {
          await next({
            model: modelHistory,
            action: 'deleteMany',
            args: {
              where: {
                groceryItemId: result.id,
              },
            },
            dataPath: [],
            runInTransaction: false,
          });
        }
      },
    };
  
    return async (params: Prisma.MiddlewareParams, next: (params: Prisma.MiddlewareParams) => Promise<T>): Promise<T> => {
      const result = await next(params);
  
      const handler = handlers[params.action];
      if (handler) {
        await handler(params, result, next);
      }
  
      return result;
    };
  }
