import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
export class UpdateDiscountDto {

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  percentage: number;
}