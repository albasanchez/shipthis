import { IsNotEmpty, IsString } from 'class-validator';
export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
