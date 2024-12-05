import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { GroceryService } from './grocery.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import {
  GroceryItemIdDto,
  UpdateGroceryDto,
  CreateGroceryDto,
  FilterGroceryDto,
} from '@grocery-app/api-model';

@ApiTags('Grocery')
@Controller({
  version: '1',
  path: 'grocery',
})
export class GroceryController {
  constructor(private groceryService: GroceryService) {}
 
  @ApiOperation({ description: 'Fetch all available grocery items.' })
  @ApiResponse({
    description: `All products with a quantity greater than 0`,
    status: HttpStatus.OK,
    type: FilterGroceryDto,
  })
  @Post('filter')
  public async filterGroceries(@Body() filter: FilterGroceryDto) {
    const data = await this.groceryService.filterGroceries(filter);

    return {
      data,
    };
  }

  @ApiOperation({ description: 'Get a grocery item.' })
  @ApiParam({ name: 'id', type: String })
  @Get(':id')
  public async getGroceryById(@Param('id') id: string) {
    const result = await this.groceryService.getGroceryById(id);
    if (result === null) {
      throw new NotFoundException(`grocery item ${id} not found`);
    }
    return result;
  }

  @ApiOperation({ description: 'Create grocery item' })
  @ApiResponse({
    description: `Create grocery item`,
    status: HttpStatus.OK,
    type: CreateGroceryDto,
  })
  @ApiBody({ type: CreateGroceryDto })
  @Post()
  public async createGrocery(@Body() createGroceryDto: CreateGroceryDto) {
    return this.groceryService.createGrocery(createGroceryDto);
  }

  @ApiOperation({ description: 'Update grocery item by UUID' })
  @ApiResponse({
    description: 'Successfully updated grocery item.',
    status: HttpStatus.OK,
    type: UpdateGroceryDto,
  })
  @ApiResponse({
    description: 'Grocery item not found.',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Unique identifier for the grocery item',
  })
  @ApiBody({ type: UpdateGroceryDto })
  @Patch(':id')
  public async updateGrocery(
    @Param('id') id: string,
    @Body() updateGroceryDto: UpdateGroceryDto,
  ) {
    const result = await this.groceryService.updateGrocery(
      id,
      updateGroceryDto,
    );

    if (!result) {
      throw new NotFoundException(`Grocery item with id ${id} not found`);
    }

    return {
      message: 'Grocery item updated successfully',
      data: result,
    };
  }

  @ApiOperation({ description: 'Delete grocery by item uuid' })
  @ApiParam({ name: 'id', type: String })
  @Delete(':id')
  public async deleteGrocery(@Param('id') id: string) {
    const result = this.groceryService.deleteGrocery(id);
    return {
      message: 'Grocery deleted successfully',
      data: result,
    };
  }
}
