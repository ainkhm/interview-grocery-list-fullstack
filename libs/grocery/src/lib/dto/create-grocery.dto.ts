import { IsNotEmpty, IsString } from 'class-validator';
import { BaseGroceryDto } from './base-grocery.dto';
import { ENUMS } from '@grocery-app/interfaces';

export class CreateGroceryDto extends BaseGroceryDto {

  @IsString()
  @IsNotEmpty()
  status!: ENUMS.Status;
}
