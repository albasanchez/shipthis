import { CreateItemDto } from './../../item/dto/create-item.dto';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';

export class CreateOrdersheetDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  useremail: string;

  @IsNotEmpty()
  @IsNumber()
  origin_office: number;

  @IsNotEmpty()
  @IsNumber()
  order_price_hist: number;

  @IsNotEmpty()
  @IsString()
  rec_fullname: string;

  @IsNotEmpty()
  @IsString()
  rec_phone_code: string;

  @IsNotEmpty()
  @IsString()
  rec_phone_number: string;

  @IsNotEmpty()
  @IsString()
  rec_document: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  rec_email: string;

  @IsOptional()
  @IsBoolean()
  ignore_hollydays: boolean;

  @IsOptional()
  @IsNumber()
  destination_office: number;

  @IsOptional()
  @IsString()
  destination_address: string;

  @IsArray()
  items: CreateItemDto[];
}
