import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class DiscountInfoDto {
  @IsNumber()
  @IsNotEmpty()
  discount_id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  percentage: number;

  @IsString()
  @IsOptional()
  status: string;
}
