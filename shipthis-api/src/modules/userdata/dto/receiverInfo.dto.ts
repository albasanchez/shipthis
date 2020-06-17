import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class ReceiverInfoDto {

  @IsNotEmpty()
  @IsString()
  name: String;

  @IsNotEmpty()
  @IsString()
  last_name: String;

  @IsNotEmpty()
  @IsString()
  phone_number: String;

  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: String;
}
