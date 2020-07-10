import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CharPriceInfoDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: String;

  @IsNotEmpty()
  @IsNumber()
  tax: number;
}
