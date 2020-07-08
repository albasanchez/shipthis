import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class RecoverUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  useremail: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
