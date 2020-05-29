import {
    IsNotEmpty,
    IsString,
    IsOptional,
    IsIn,
    IsEmail,
    IsDecimal,
    IsBoolean,
    IsDateString,
  } from 'class-validator';
  
export class UpdateUserDataDto  {
    
    @IsNotEmpty()
    user_id:number;

    @IsString()
    @IsEmail()
    email:String;
    
    @IsString()
    userName:String;
    
    @IsString()
    userPassword:String;
}