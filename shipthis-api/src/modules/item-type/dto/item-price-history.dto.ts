import { IsNotEmpty, IsNumber } from 'class-validator';

export class NewItemHistDto {
  @IsNotEmpty()
  @IsNumber()
  base_price: number;

  @IsNotEmpty()
  @IsNumber()
  price_km: number;
}
