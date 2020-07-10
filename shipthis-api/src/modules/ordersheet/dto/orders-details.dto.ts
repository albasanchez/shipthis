import {
  IsNotEmpty,
  IsUUID,
  IsNumber,
  IsOptional,
  IsString,
  IsDate,
} from 'class-validator';
export class OrdersDetailsDto {
  @IsUUID()
  @IsNotEmpty()
  tracking_id: number;

  @IsNotEmpty()
  @IsString()
  user_name: string;

  @IsNotEmpty()
  @IsString()
  user_last_name: string;

  @IsNotEmpty()
  @IsString()
  origin_office: string;

  @IsOptional()
  @IsString()
  destination_office: string;

  @IsOptional()
  @IsString()
  destination_place: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsNumber()
  items: number;

  @IsNotEmpty()
  @IsNumber()
  total: number;
}
