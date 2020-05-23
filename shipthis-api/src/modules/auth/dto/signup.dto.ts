import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsIn,
  IsEmail,
  IsDecimal,
  IsDate,
  IsBoolean,
} from 'class-validator';
import { Person } from '../../person/person.entity';
export class SignupDto {
  @IsOptional()
  @IsString()
  @IsEmail()
  useremail: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  document: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  middle_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  second_last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn(['M', 'F', 'O'])
  gender: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsDecimal()
  phone_code: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsDecimal()
  phone_number: string;

  @IsDate()
  @IsNotEmpty()
  date_of_birth: Date;

  @IsNotEmpty()
  @IsString()
  @IsIn(['es', 'en'])
  def_language: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  picture_url: string;

  @IsBoolean()
  @IsNotEmpty()
  receive_notifications: Boolean;
}
