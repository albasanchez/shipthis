import { Injectable, Inject } from '@nestjs/common';
import { SendGridService } from "@anchan828/nest-sendgrid";
import { AppLoggerService } from 'src/log/applogger.service';
import { GenerateTemplate } from "./generate-template";

@Injectable()
export class EmailService {
  constructor(
    private readonly sendGrid: SendGridService,
    private readonly appLoggerService: AppLoggerService,
    private readonly generateTemplate: GenerateTemplate,
  ) {}

  private async sendEmail(info): Promise<void>{
    await this.sendGrid.send(info);
  }

  async sendWelcomeEmail(email: string, name: string, lastname: string): Promise<void> {
    this.appLoggerService.log("Sending Welcome email");
    await this.sendEmail(this.generateTemplate.welcome(email,name,lastname));
  }

  async sendInvoiceByEmail(file, email: string, name: string, lastname: string): Promise<void> {
    this.appLoggerService.log("Sending Invoice by email");
    await this.sendEmail(this.generateTemplate.invoice(file,email,name,lastname));
  }
}
