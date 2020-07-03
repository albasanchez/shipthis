import {
  IsOptional,
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { CreateItemDto } from './create-item.dto';

export class CreateOrdersheetDto {
  @IsNotEmpty()
  @IsBoolean()
  ignore_holidays: boolean;

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
  @ValidateNested()
  items: CreateItemDto[];
}
