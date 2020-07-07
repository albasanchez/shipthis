import { CreateItemDto } from './../../ordersheet/dto/create-item.dto';
import {
  IsNotEmpty,
  IsArray,
  IsString,
  IsEmail,
  IsUUID,
  IsNumber,
} from 'class-validator';
export class CreatePickupDto {
  @IsUUID()
  @IsNotEmpty()
  commercial_ally_api_key: string;

  @IsNotEmpty()
  @IsNumber()
  Warehouse_id: number;

  @IsNotEmpty()
  @IsString()
  rec_first_name: string;

  @IsNotEmpty()
  @IsString()
  rec_last_name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  rec_email: string;

  @IsNotEmpty()
  @IsString()
  rec_phone_number: string;

  @IsNotEmpty()
  @IsString()
  destination_address: string;

  @IsNotEmpty()
  @IsArray()
  items: CreateItemDto[];
}
