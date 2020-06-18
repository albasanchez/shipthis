import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsIn,
    IsNumber,
  } from 'class-validator';
  
  export class NewConfigTimeDto {
    @IsNotEmpty()
    @IsNumber()
    config_time: number;
  }