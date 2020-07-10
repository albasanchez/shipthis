import { IsNotEmpty, IsString, IsEmail, IsNumber } from 'class-validator';

export class ReceiverInfoDto {
  @IsNotEmpty()
  @IsNumber()
  id: Number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;
}
