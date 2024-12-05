import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import {
  CreateGroceryDto,
  UpdateGroceryDto,
  FilterGroceryDto,
} from '@grocery-app/api-model';
import { historyMiddleware } from './grocery.middleware';

const prisma = new PrismaClient();

prisma.$use(historyMiddleware());

@Injectable()
export class GroceryService {
  async filterGroceries(filter: FilterGroceryDto) {
    const groceries = await prisma.groceryItem.findMany({
      where: {
        userId: filter.userId,
        status: filter.status,

        priority: filter.priority,

        name: filter.name
          ? { startsWith: filter.name, mode: 'insensitive' }
          : undefined,
      },
      orderBy: [{ priority: 'asc' }, { name: 'asc' }],
    });

    return {
      data: groceries,
    };
  }

  async getGroceryById(id: string) {
    return prisma.groceryItem.findFirst({
      where: {
        id: id,
      },
    });
  }

  async createGrocery(createGroceryDto: CreateGroceryDto) {
    if (!createGroceryDto.name.trim()) {
      throw new BadRequestException('Invalid product name.');
    }
    try {
      await prisma.$transaction(async (tx) => {
        return await tx.groceryItem.create({
          data: createGroceryDto,
        });
      });
    } catch (err) {
      throw new InternalServerErrorException(
        `Someting went wrong to create this product. More ${err}`,
      );
    }
  }

  async deleteGrocery(id: string) {
    return prisma.groceryItem.delete({
      where: {
        id: id,
      },
    });
  }

  async updateGrocery(id: string, updateGroceryDto: UpdateGroceryDto) {
    const { ...updateData } = updateGroceryDto;
    const updateInput: Prisma.GroceryItemUpdateInput = { ...updateData };
    return prisma.groceryItem.update({
      where: {
        id: id,
      },
      data: updateInput,
    });
  }
}
