import { Item } from './../../ordersheet/entities/item.entity';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsNumber,
  IsUUID,
} from 'class-validator';
export class PickupsInfoDto {
  @IsNotEmpty()
  @IsUUID()
  id: number;

  @IsNotEmpty()
  @IsString()
  rec_name: string;

  @IsNotEmpty()
  @IsString()
  rec_last_name: string;

  @IsNotEmpty()
  @IsString()
  rec_phone_number: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  rec_email: string;

  @IsNotEmpty()
  @IsDate()
  creation_date: Date;

  @IsNotEmpty()
  @IsDate()
  delivery_date: Date;

  @IsNotEmpty()
  @IsString()
  pickup_status: string;

  @IsNotEmpty()
  @IsNumber()
  facturation_amount: number;

  @IsNotEmpty()
  @IsString()
  origin_warehouse_name: string;

  @IsNotEmpty()
  @IsString()
  origin_warehouse_direction: string;

  @IsNotEmpty()
  @IsString()
  destination_place: string;

  @IsNotEmpty()
  items: Item[];
}
