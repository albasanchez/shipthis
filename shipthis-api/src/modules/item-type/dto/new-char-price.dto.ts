import { IsNotEmpty, IsNumber } from 'class-validator';

export class NewCharPriceDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  tax: number;
}
