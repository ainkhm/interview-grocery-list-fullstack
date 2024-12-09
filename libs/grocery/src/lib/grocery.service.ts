import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService, GroceryItemUpdateInput } from '@grocery-app/prisma';

import { CreateGroceryDto, FilterGroceryDto, UpdateGroceryDto } from './dto';
import { IGrocery, IGroceryView } from '@grocery-app/interfaces';

@Injectable()
export class GroceryService {
  constructor(private readonly prisma: PrismaService) {}

  async filterGrocery(filter: FilterGroceryDto): Promise<IGroceryView[]> {
    const grocery = await this.prisma.groceryItem.findMany({
      where: {
        userId: filter.userId,
        status: filter.status,
        quantity: filter.quantity,
        priority: filter.priority,
        name: filter.name
          ? { startsWith: filter.name, mode: 'insensitive' }
          : undefined,
      },
      orderBy: [{ priority: 'asc' }, { name: 'asc' }],
    });

    return grocery;
  }

  async getGroceryById(id: string): Promise<IGroceryView | null> {
    const result = this.prisma.groceryItem.findUnique({ where: { id } });
    return result;
  }

  async createGrocery(
    createGroceryDto: CreateGroceryDto,
  ): Promise<IGroceryView> {
    try {
      const createdGrocery = await this.prisma.groceryItem.create({
        data: createGroceryDto,
      });
      return createdGrocery;
    } catch (err) {
      throw new InternalServerErrorException(
        `Something went wrong while creating this item. Details: ${err}`,
      );
    }
  }
  async updateGrocery(id: string, updateGroceryDto: UpdateGroceryDto) {
    const { ...updateData } = updateGroceryDto;

    const updateInput: GroceryItemUpdateInput = { ...updateData };
    return this.prisma.groceryItem.update({
      where: {
        id: id,
      },
      data: updateInput,
    });
  }
  async deleteGrocery(id: string) {
    return this.prisma.groceryItem.delete({
      where: {
        id: id,
      },
    });
  }
}
