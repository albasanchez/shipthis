import { Warehouse } from '../entities/warehouse.entity';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
export class NewCommercialAllyDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  manager_name: string;

  @IsNotEmpty()
  @IsString()
  manager_last_name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  warehouses: Warehouse[];
}
