

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, IsOptional, IsEnum, IsDate, IsNumber, IsUUID, isNumber } from 'class-validator';
import { Transform, Type, Expose} from 'class-transformer'
import { PartialType } from '@nestjs/mapped-types'

export enum GroceryItemStatus {
  RANOUT = 'RANOUT',
  HAVE = 'HAVE',
}

export class GroceryResponseDto {

  @ApiProperty({ description: 'Unique identifier for the grocery item' })
  @IsString()
  id: string;

  @ApiProperty({ description: 'ID of the user who owns this item' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Name of the grocery item' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Status of the grocery item',
    enum: GroceryItemStatus,
    default: GroceryItemStatus.RANOUT,
  })
  @IsEnum(GroceryItemStatus)
  status: GroceryItemStatus;

  @ApiProperty({ description: 'Priority of the grocery item', required: false, default: 5 })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  priority?: number

  @ApiProperty({ description: 'Quantity of the grocery item', required: false, default: 0 })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  quantity?: number

  @ApiProperty({ description: 'Last status change timestamp', required: false })
  @IsOptional()
  @IsDate()
  @Type(() => Date)
  lastStatusChanged?: Date;

  @ApiProperty({ description: 'Timestamp when the item was created' })
  @IsDate()
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty({ description: 'Timestamp when the item was last updated' })
  @IsDate()
  @Type(() => Date)
  updatedAt: Date;
}

export class FilterGroceryDto {
  @ApiProperty({ description: 'ID of the user who owns this item', required: false })
  @IsOptional()
  @IsString()
  userId?: string;

  @ApiProperty({
    description: 'Status of the grocery item',
    enum: GroceryItemStatus,
    default: GroceryItemStatus.RANOUT,
  })
  @IsEnum(GroceryItemStatus)
  status: GroceryItemStatus;

  @ApiProperty({ description: 'Priority of the grocery item', required: false })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  priority?: number

  @ApiProperty({ description: 'Name of the grocery item for search', required: false })
  @IsOptional()
  @IsString()
  name?: string;
}

export class CreateGroceryDto {
  @ApiProperty({ description: 'Name of the grocery item' })
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Status of the grocery item',
    enum: GroceryItemStatus,
    default: GroceryItemStatus.RANOUT,
  })
  @IsEnum(GroceryItemStatus)
  status: GroceryItemStatus;

  @ApiProperty({ description: 'ID of the user who owns this item' })
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Priority of the grocery item', required: false, default: 5 })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  priority?: number

  @ApiProperty({ description: 'Quantity of the grocery item', required: false, default: 0 })
  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @IsOptional()
  quantity?: number
}

export class UpdateGroceryDto  extends PartialType(CreateGroceryDto) {}

export class GroceryItemIdDto {
  @IsUUID()
  id: string
}