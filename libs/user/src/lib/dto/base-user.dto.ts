import { IsNotEmpty, IsString, IsEmail, MinLength } from 'class-validator';

export class BaseUserDto {
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password!: string;
}
