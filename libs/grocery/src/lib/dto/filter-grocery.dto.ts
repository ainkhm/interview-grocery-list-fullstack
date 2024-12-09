import { IsOptional, IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { BaseGroceryDto } from './base-grocery.dto';
import { ENUMS } from '@grocery-app/interfaces';
export class FilterGroceryDto extends BaseGroceryDto {
  @IsOptional()
  @IsString()
  status?: ENUMS.Status;
}
