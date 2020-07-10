import { LanguageType } from './../../userdata/constants/language.enum';
import { GenderType } from './../../userdata/constants/gender.enum';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsIn,
  IsEmail,
  IsBoolean,
  IsUrl,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  useremail: string;

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
  @IsString()
  middle_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  second_last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([GenderType.MALE, GenderType.FEMALE, GenderType.OTHER])
  gender: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  date_of_birth: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([LanguageType.ENGLISH, LanguageType.SPANISH])
  def_language: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  picture_url: string;

  @IsBoolean()
  @IsNotEmpty()
  receive_notifications: Boolean;
}
