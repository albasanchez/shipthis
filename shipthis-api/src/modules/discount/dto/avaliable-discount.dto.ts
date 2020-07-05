import { IsEmail, IsNotEmpty } from 'class-validator';
export class AvaliableDiscountDto {
  @IsEmail()
  @IsNotEmpty()
  useremail: string;
}
