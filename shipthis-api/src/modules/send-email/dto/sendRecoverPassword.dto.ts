import { IsString, IsEmail } from 'class-validator';

export class SendRecoverPasswordDto {
    @IsString()
    @IsEmail()
    sendTo:String;

    @IsString()
    name:String;

    @IsString()
    lastName:String; 

    @IsString()
    password:String; 
    

    constructor(sendTo, name, lastName, password) {
        this.sendTo = sendTo;
        this.name = name;
        this.lastName = lastName;
        this.password = password;
    }
}