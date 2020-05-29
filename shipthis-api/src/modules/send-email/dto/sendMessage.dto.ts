import { IsString, IsEmail } from 'class-validator';

export class SendMessageDto{
   
    @IsString()
    @IsEmail()
    sendTo:String;

    @IsString()
    name:String;

    @IsString()
    lastName:String; 
    

    constructor(sendTo, name, lastName){
        this.sendTo = sendTo;
        this.name = name;
        this.lastName = lastName;
    }
}