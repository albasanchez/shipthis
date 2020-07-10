import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateOrderTypeHistDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  time_tax: number;

  @IsNotEmpty()
  @IsNumber()
  holidays_tax: number;

  @IsNotEmpty()
  @IsNumber()
  specific_destination_tax: number;
}
