import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsIn,
    IsNumber,
  } from 'class-validator';
  
  export class NewItemHistDto {
    @IsOptional()
    @IsString()
    starting_date: string;
  
    @IsOptional()
    @IsString()
    ending_date: string;
  
    @IsNotEmpty()
    @IsNumber()
    base_price: number;
  
    @IsNotEmpty()
    @IsNumber()
    price_km: number;
  
  }