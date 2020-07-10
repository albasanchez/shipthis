import { UserdataStatus } from './../../userdata/constants/user-status.enum';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsIn,
  IsEmail,
  IsNumber,
  IsDate,
} from 'class-validator';

export class UserInfoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  useremail: string;

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
  phone_number: string;

  @IsDate()
  @IsNotEmpty()
  date_of_birth: Date;

  @IsNotEmpty()
  @IsDate()
  registration_date: Date;

  @IsNotEmpty()
  @IsString()
  registration_type: string;

  @IsNotEmpty()
  @IsString()
  role: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([UserdataStatus.ACTIVE, UserdataStatus.BLOCKED, UserdataStatus.RESETED])
  status: string;
}
