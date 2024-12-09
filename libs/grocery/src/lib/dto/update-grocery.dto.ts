import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

import { BaseGroceryDto } from './base-grocery.dto';
import { ENUMS } from '@grocery-app/interfaces';

export class UpdateGroceryDto extends BaseGroceryDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  status?: ENUMS.Status;

  @IsString()
  @IsNotEmpty()
  lastStatusChanged!: string;
}
