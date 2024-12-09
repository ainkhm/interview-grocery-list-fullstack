import { PartialType } from '@nestjs/mapped-types';
import { BaseUserDto } from './base-user.dto';
import { IsNotEmpty, IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto extends PartialType(BaseUserDto) {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  override password!: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  confirmPassword?: string;
}
