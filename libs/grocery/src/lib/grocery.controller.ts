import {
  Controller,
  UseGuards,
  UseInterceptors,
  Post,
  Body,
  Get,
  NotFoundException,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiParam } from '@nestjs/swagger';

import { GroceryService } from './grocery.service';
import { TransformGroceryInterceptor } from './interceptors';
import { UpdateGroceryDto, CreateGroceryDto, FilterGroceryDto } from './dto';
import { JwtAuthGuard } from '@grocery-app/auth';
import { IGroceryView } from '@grocery-app/interfaces';

@Controller({
  version: '1',
  path: 'grocery',
})
export class GroceryController {
  constructor(private groceryService: GroceryService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        userId: {
          type: 'string',
          example: '8413fd2e-d4d1-4cdb-8dd5-650d23ac770c',
          description: 'The ID of the user associated with the grocery item.',
        },
        status: {
          type: 'string',
          example: 'RANOUT',
          description: 'The status of the grocery item (e.g., RANOUT, HAVE).',
        },
        quantity: {
          type: 'number',
          example: 2,
          description: 'The quantity of the grocery item.',
        },
        priority: {
          type: 'number',
          example: 1,
          description: 'The priority of the grocery item.',
        },
        name: {
          type: 'string',
          example: 'Milk',
          description:
            'The name of the grocery item. Supports partial matching.',
        },
      },
      required: [],
    },
  })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @UseInterceptors(TransformGroceryInterceptor)
  @Post('filter')
  public async filterGroceries(
    @Body() filter: FilterGroceryDto,
  ): Promise<IGroceryView[]> {
    const data = await this.groceryService.filterGrocery(filter);

    return data;
  }

  @ApiParam({ name: 'id', type: String })
  @Get('/:id')
  public async getGroceryById(@Param('id') id: string): Promise<IGroceryView> {
    const result = await this.groceryService.getGroceryById(id);
    if (!result) {
      throw new NotFoundException(`grocery item ${id} not found`);
    }
    return result;
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the grocery item',
          example: 'Milk',
        },
        status: {
          type: 'string',
          description: 'The status of the grocery item',
          enum: ['RANOUT', 'HAVE'],
          example: 'RANOUT',
        },
        role: {
          type: 'string',
          description: 'The role associated with the item',
          example: 'User',
        },
        userId: {
          type: 'string',
          description: 'The ID of the user',
          format: 'uuid',
          example: '8413fd2e-d4d1-4cdb-8dd5-650d23ac770c',
        },
        quantity: {
          type: 'number',
          description: 'The quantity of the grocery item',
          example: 2,
          minimum: 0,
        },
        priority: {
          type: 'number',
          description: 'The priority of the grocery item',
          example: 1,
          minimum: 1,
          maximum: 5,
        },
      },
      required: ['name', 'status', 'role', 'userId'],
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformGroceryInterceptor)
  @Post('create')
  public async createGrocery(
    @Body() createGroceryDto: CreateGroceryDto,
  ): Promise<IGroceryView> {
    const result = this.groceryService.createGrocery(createGroceryDto);
    return result;
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description: 'The name of the grocery item',
          example: 'Milk',
        },
        status: {
          type: 'string',
          description: 'The status of the grocery item',
          enum: ['RANOUT', 'HAVE'],
          example: 'RANOUT',
        },
        role: {
          type: 'string',
          description: 'The role associated with the item',
          example: 'User',
        },
        userId: {
          type: 'string',
          description: 'The ID of the user',
          format: 'uuid',
          example: '8413fd2e-d4d1-4cdb-8dd5-650d23ac770c',
        },
        quantity: {
          type: 'number',
          description: 'The quantity of the grocery item',
          example: 2,
          minimum: 0,
        },
        priority: {
          type: 'number',
          description: 'The priority of the grocery item',
          example: 1,
          minimum: 1,
          maximum: 5,
        },
      },
      required: ['name', 'status', 'role', 'userId'],
    },
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(TransformGroceryInterceptor)
  @Patch('/:id')
  async updateGrocery(
    @Param('id') id: string,
    @Body() updateGroceryDto: UpdateGroceryDto,
  ): Promise<IGroceryView> {
    const result = await this.groceryService.updateGrocery(
      id,
      updateGroceryDto,
    );

    if (!result) {
      throw new NotFoundException('Grocery not found');
    }

    return result;
  }

  @UseGuards(JwtAuthGuard)
  @ApiParam({ name: 'id', type: String })
  @Delete('/:id')
  async deleteGrocery(@Param('id') id: string): Promise<string> {
    const result = await this.groceryService.deleteGrocery(id);

    if (!result) {
      throw new NotFoundException('Grocery not found');
    }

    return 'Grocery deleted successfully';
  }
}
