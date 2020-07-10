import { Characteristic } from './../../item-type/entities/characteristic.entity';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsArray,
} from 'class-validator';
export class CreateItemDto {
  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  item_weight: number;

  @IsNotEmpty()
  @IsNumber()
  item_length: number;

  @IsNotEmpty()
  @IsNumber()
  item_width: number;

  @IsNotEmpty()
  @IsNumber()
  item_height: number;

  @IsArray()
  characteristics: Characteristic[];
}
