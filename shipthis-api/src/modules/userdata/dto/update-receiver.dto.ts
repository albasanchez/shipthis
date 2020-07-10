import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UpdateReceiverDto {
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
  @IsString()
  @IsEmail()
  email: string;
}
