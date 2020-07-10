import { IsNotEmpty, IsString, IsEmail, IsUUID } from 'class-validator';
export class CommercialAllyInfoDto {
  @IsNotEmpty()
  @IsUUID()
  commercial_ally_key: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  manager_name: string;

  @IsNotEmpty()
  @IsString()
  manager_last_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  status: string;
}
