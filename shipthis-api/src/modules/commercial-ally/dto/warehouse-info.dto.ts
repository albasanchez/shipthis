import { IsNotEmpty, IsString } from 'class-validator';
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
