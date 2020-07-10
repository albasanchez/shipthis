import { IsNumber, IsNotEmpty } from 'class-validator';
export class TotalsDto {
  @IsNotEmpty()
  @IsNumber()
  delivery: number;

  @IsNotEmpty()
  @IsNumber()
  inTransit: number;

  @IsNotEmpty()
  @IsNumber()
  delivered: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;
}
