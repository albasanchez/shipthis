import { IsNotEmpty, IsString, IsEmail, IsOptional } from 'class-validator';
export class RecoverUserDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  useremail: string;

  @IsNotEmpty()
  @IsString()
  document: string;
}
