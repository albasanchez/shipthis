import { Injectable } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { AppLoggerService } from 'src/log/applogger.service';
import { GenerateTemplate } from './generate-template';
import { BillDto } from '../ordersheet/dto/bill.dto';
import { ConfigService } from 'src/config/config.service';
import { Configuration } from '../../config/config.keys';
import { Response } from 'express';
import qrcode = require('qrcode');
import pdf = require('html-pdf');

@Injectable()
export class EmailService {
  constructor(
    private readonly _sendGrid: SendGridService,
    private readonly _appLoggerService: AppLoggerService,
    private readonly _generateTemplate: GenerateTemplate,
    private readonly _config: ConfigService,
  ) {}

  private async sendEmail(info): Promise<void> {
    await this._sendGrid.send(info);
  }

  async sendWelcomeEmail(
    email: string,
    name: string,
    lastname: string,
  ): Promise<void> {
    this._appLoggerService.log('Sending Welcome email');
    await this.sendEmail(this._generateTemplate.welcome(email, name, lastname));
  }

  async sendInvoiceByEmail(
    file,
    email: string,
    fullName: string,
    trackingUrl: string,
  ): Promise<void> {
    this._appLoggerService.log('Sending Invoice by email');
    await this.sendEmail(
      this._generateTemplate.invoice(file, email, fullName, trackingUrl),
    );
  }

  async generateInvoice(
    bill: BillDto,
    res: Response,
    type: string,
  ): Promise<void> {
    let trackingUrl: string = null;
    let destination_person_email: string = null;
    let destination_person_name: string = null;
    if (type === 'order') {
      trackingUrl =
        this._config.get(Configuration.TRACKING_URL) + bill.ordersheet_id;
      destination_person_email = bill.shipper.email;
      destination_person_name = bill.shipper.fullname;
    } else if (type === 'pickup') {
      trackingUrl =
        this._config.get(Configuration.PICKUP_URL) + bill.ordersheet_id;
      destination_person_email = bill.receiver.email;
      destination_person_name = bill.receiver.fullname;
    }

    const code = await qrcode.toDataURL(`${trackingUrl}`);
    res.render('invoice.hbs', { bill, code }, (err, html) => {
      const options = {
        height: '11.25in',
        width: '8.5in',
        base: this._config.get(Configuration.BACKEND_URL),
      };
      pdf.create(html, options).toBuffer((err, data) => {
        this.sendInvoiceByEmail(
          data,
          destination_person_email,
          destination_person_name,
          trackingUrl,
        );
      });
      res.send(bill);
    });
  }
}
