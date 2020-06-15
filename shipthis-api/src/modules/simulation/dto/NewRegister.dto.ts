import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsIn,
    IsNumber,
  } from 'class-validator';
  
  export class NewRegisterDto {
    @IsOptional()
    @IsString()
    starting_date: string;
  
    @IsOptional()
    @IsString()
    ending_date: string;
  
    @IsNotEmpty()
    @IsNumber()
    config_time: number;
  }