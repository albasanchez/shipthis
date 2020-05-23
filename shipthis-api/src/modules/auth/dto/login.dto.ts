import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
export class LoginDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  useremail: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
