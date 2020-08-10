import { ModuleMetadata } from '@nestjs/common';
import { SendGridService } from '@anchan828/nest-sendgrid';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { GenerateTemplate } from '../../generate-template';
import { ConfigService } from '../../../../config/config.service';
import { EmailService } from '../../email.service';

export const emailMockModuleMetadata: ModuleMetadata = {
  providers: [
    EmailService,
    GenerateTemplate,
    {
      provide: ConfigService,
      useFactory() {
        return {
          get: jest.fn().mockReturnValue(1),
        };
      },
    },
    {
      provide: SendGridService,
      useFactory() {
        return {
          send: jest.fn(),
        };
      },
    },
  ],
  imports: [AppLoggerModule],
};

export const bill = {
  ordersheet_id: 1,
  creation_date: new Date(),
  origin: 'Origin St',
  destination: 'Destination St',
  order_type: 'Silver',
  ignore_holidays: false,
  discount: 0,
  subtotal: 10,
  additional_taxes: 0,
  facturation_amount: 10,
  shipper: {
    fullname: 'Josh',
    document: '1111',
    email: 'josh@gmail.com',
    phone_number: '+1 (234) 567890',
  },
  receiver: {
    fullname: 'Josh',
    document: '1111',
    email: 'josh@gmail.com',
    phone_number: '+1 (234) 567890',
  },
  packages: [
    {
      description: 'Description',
      weight: 1,
      height: 2,
      width: 3,
      length: 2,
      characteristics: [],
      cost: 10,
    },
  ],
};

export const response: any = {};
