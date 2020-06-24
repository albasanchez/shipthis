import { Controller, UseInterceptors, UploadedFile, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { EmailService } from "../modules/email/email.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly emailService: EmailService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/welcome')
  testWelcomeEmail() {
    this.emailService.sendWelcomeEmail('','','');
    return "Se envió el correo de bienvenida";
  }

  @Post('/invoice')
  @UseInterceptors(FileInterceptor('file'))
  testInvoiceEmail(@UploadedFile() file) {
    this.emailService.sendInvoiceByEmail(file,'','','');
    return "Se envió el correo con la factura";
  }
}
