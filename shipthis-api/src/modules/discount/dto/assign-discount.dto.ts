import { IsNotEmpty, IsNumber } from 'class-validator';
export class AssignDiscountDto {
  @IsNumber()
  @IsNotEmpty()
  discount_id: number;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;
}
