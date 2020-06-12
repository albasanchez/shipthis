import { IsOptional, IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateItemDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  item_weight: number;

  @IsNotEmpty()
  @IsNumber()
  item_length: number;

  @IsNotEmpty()
  @IsNumber()
  item_width: number;

  @IsNotEmpty()
  @IsNumber()
  item_height: number;
}
