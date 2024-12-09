import {
  IsNotEmpty,
  IsString,
  IsInt,
  Min,
  Max,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class BaseGroceryDto {
  @IsOptional()
  @IsUUID()
  userId: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  priority?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  quantity?: number;
}
