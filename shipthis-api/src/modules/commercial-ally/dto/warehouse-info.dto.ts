import { Place } from './../../ordersheet/entities/place.entity';
import { CommercialAlly } from '../entities/commercial-ally.entity';
import { IsNotEmpty, IsString, IsEmail, IsOptional, IsNumber} from 'class-validator';
export class WarehouseInfoDto {
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsString()
  @IsNotEmpty()
  commercial_ally_key: string;

  @IsString()
  @IsNotEmpty()
  address: string;
  
}