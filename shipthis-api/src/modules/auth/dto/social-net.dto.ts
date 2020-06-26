import { LanguageType } from './../../userdata/constants/language.enum';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsIn,
  IsEmail,
  IsUrl,
} from 'class-validator';

export class SocialNetDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  useremail: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([LanguageType.ENGLISH, LanguageType.SPANISH])
  def_language: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  picture_url: string;
}
