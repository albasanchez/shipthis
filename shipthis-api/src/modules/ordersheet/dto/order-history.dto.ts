import { IsEmail, IsNotEmpty } from 'class-validator';
export class OrderHistoryDto {
  @IsEmail()
  @IsNotEmpty()
  useremail: string;
}
