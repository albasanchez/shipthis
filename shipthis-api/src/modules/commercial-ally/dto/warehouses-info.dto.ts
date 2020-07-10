import { Place } from './../../ordersheet/entities/place.entity';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class WarehousesInfoDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  place: Place;

  @IsNotEmpty()
  @IsString()
  status: string;
}
