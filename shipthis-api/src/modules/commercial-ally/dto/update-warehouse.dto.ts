import { Place } from './../../ordersheet/entities/place.entity';
import { IsNotEmpty, IsString, IsOptional} from 'class-validator';
export class UpdateWarehouseDto {
 
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  place: Place;
  
}