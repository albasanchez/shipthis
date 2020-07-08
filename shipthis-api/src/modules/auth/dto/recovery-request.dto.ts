import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class RecoverRequestDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  useremail: string;

  @IsNotEmpty()
  @IsString()
  document: string;
}
