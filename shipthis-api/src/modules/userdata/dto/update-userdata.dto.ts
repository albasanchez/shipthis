import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class UpdateUserDataDto {
  @IsNotEmpty()
  user_id: number;

  @IsString()
  @IsEmail()
  email: String;

  @IsString()
  userName: String;

  @IsString()
  userPassword: String;
}
