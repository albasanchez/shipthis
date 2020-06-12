import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { CreateItemDto } from './create-item.dto';

export class CreateOrdersheetDto {
  @IsOptional()
  @IsBoolean()
  ignore_hollydays: boolean;

  @IsNotEmpty()
  @IsNumber()
  order_price_hist: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  useremail: string;

  @IsNotEmpty()
  @IsNumber()
  receiver_id: number;

  @IsOptional()
  @IsNumber()
  discount_id: number;

  @IsNotEmpty()
  @IsNumber()
  origin_office: number;

  @IsOptional()
  @IsNumber()
  destination_office: number;

  @IsOptional()
  @IsString()
  destination_address: string;

  @IsArray()
  items: CreateItemDto[];
}
