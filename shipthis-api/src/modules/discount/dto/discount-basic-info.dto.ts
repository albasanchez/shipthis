import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class DiscountBasicInfoDto {
  @IsNumber()
  @IsNotEmpty()
  discount_id: number;

  @IsString()
  @IsNotEmpty()
  discount: string;
}
