import { IsNotEmpty, IsNumber, IsBoolean, IsOptional } from 'class-validator';
export class CreateItemDto {
  @IsNotEmpty()
  @IsNumber()
  item_type_hist: number;

  @IsNotEmpty()
  @IsNumber()
  item_weight: number;

  @IsNotEmpty()
  @IsNumber()
  item_volumen: number;

  @IsOptional()
  @IsBoolean()
  is_insured: boolean;

  @IsOptional()
  @IsBoolean()
  is_fragile: boolean;
}
