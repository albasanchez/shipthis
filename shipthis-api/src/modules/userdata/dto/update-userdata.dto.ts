import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  IsBoolean,
  IsPositive,
  IsUrl,
  IsIn,
} from 'class-validator';
import { LanguageType } from '../constants/language.enum';

export class UpdateUserDataDTO {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  user_id: number;

  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsOptional()
  middle_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsOptional()
  second_last_name: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;

  @IsNotEmpty()
  @IsIn([LanguageType.ENGLISH, LanguageType.SPANISH])
  def_language: LanguageType;

  @IsString()
  @IsOptional()
  @IsUrl()
  picture_url: string;

  @IsBoolean()
  @IsNotEmpty()
  receive_notifications: boolean;
}
