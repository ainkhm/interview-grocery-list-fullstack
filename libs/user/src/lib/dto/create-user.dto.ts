import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
} from 'class-validator';
import { BaseUserDto } from './base-user.dto';
import { ENUMS } from '@grocery-app/interfaces';

export class CreateUserDto extends BaseUserDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  name!: string;

  @IsNotEmpty()
  role!: ENUMS.Role;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  confirmPassword!: string;
}
