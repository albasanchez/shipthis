import { Injectable } from '@nestjs/common';
import { TemplateService } from './dto/template.service'
import { ConfigService } from 'src/config/config.service';
import { Configuration } from 'src/config/config.keys';
import { AppLoggerService } from 'src/log/applogger.service';
import { config } from 'dotenv';
var hogan = require('hogan.js');
const  sgMail = require('@sendgrid/mail') ;
const fs = require("fs");
const path = require("path");



@Injectable()
export class SendService {

     constructor(
         private templateService:TemplateService,
         private readonly _config: ConfigService,
         private readonly _appLogger: AppLoggerService,
        ){
            sgMail.setApiKey(this._config.get(Configuration.SEND_GRID_KEY))
        }

    public send(user, discriminator){
   
        switch(discriminator) { 
            case 1: { 
               this.sendEmailRegister(user);
               break;
            } 
            case 2: { 
               this.sendEmailInvoice(user)
               break; 
            }
            case 3: { 
                this.sendRecoverPassword(user)
                break; 
             }
        }
    }

    public sendEmailRegister(user){
       
        // obtener la plantilla de email
        var template = fs.readFileSync(path.resolve('src/modules/send-email/view/page-message-email.hjs'),'utf-8');

        var compiledTemplate = hogan.compile(template);

        const  msg  =  {
            to: user.sendTo,
            from:'shipthis@gmail.com',
            subject: 'Registered on ShipThis',
            html:compiledTemplate.render({firstName: user.name, lastName:user.lastName}),
        };
        this._appLogger.log('sending welcome message, successfully');
        this.sendEmail(sgMail, msg);
    }

    public sendEmailInvoice(user){

        const attachment = fs.readFileSync(path.resolve("src/generateFile/files/",user.idUser + "-invoice.pdf")).toString("base64");
        
        const  msg  =  {
            to: user.sendTo,
            from:'shipthis@gmail.com',
            subject: 'ShipThis',
            text:'Invoice',
            attachments:[
                {
                    content: attachment,
                    filename: "invoice.pdf",
                    type: "application/pdf",
                    disposition: "attachment"
                }
            ] ,
            
        };
       this.sendEmail(sgMail, msg)
    }

    public sendRecoverPassword(user){
        var template = fs.readFileSync(path.resolve('src/modules/send-email/view/page-recover-password.hjs'),'utf-8');

        var compiledTemplate = hogan.compile(template);

        const  msg  =  {
            to: user.sendTo,
            from:'shipthis@gmail.com',
            subject: 'Request to reset password - ShipThis',
            html:compiledTemplate.render({firstName: user.name, lastName:user.lastName, password:user.password}),
        };
        this._appLogger.log('sending recover password, successfully');
        this.sendEmail(sgMail, msg);
    }

    private sendEmail(sgMail, msg){
        sgMail.send(msg).then(() => {}, error => {
            console.error(error);
            if (error.response) {
              console.error(error.response.body)
            }
        });
    }

}