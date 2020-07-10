import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class UpdateDiscountDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  percentage: number;
}
