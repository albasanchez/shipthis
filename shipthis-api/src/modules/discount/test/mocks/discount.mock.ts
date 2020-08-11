import { ModuleMetadata } from '@nestjs/common';
import { DiscPerRepository } from '../../repositories/disc-per.repository';
import { EmailService } from '../../../../modules/email/email.service';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { DiscountService } from '../../discount.service';
import { DiscountRepository } from '../../repositories/discount.repository';
import { ConfigService } from '../../../../config/config.service';
import { UserDataRepository } from '../../../userdata/repositories/userdata.repository';

export const discountMockModuleMetadata: ModuleMetadata = {
  providers: [
    DiscountService,
    DiscountRepository,
    DiscPerRepository, 
    UserDataRepository,
    {
      provide: EmailService,
      useFactory() {
        return {
          generateInvoice: jest.fn(),
          sendDiscountEmail: jest.fn()
        };
      },
    },
    {
      provide: ConfigService,
      useFactory() {
        return {
          get: jest.fn().mockReturnValue(1),
        };
      },
    },
  ],
  imports: [AppLoggerModule],
};

export class DiscountMock {
  findOne(option: string) {
    if (option == 'Welcome') {
      return jest.fn().mockResolvedValue({
      discount_id: 1,
      name: 'WELCOME',
      percentage: 10,
      status: 'ACTIVE'
      });
    } else if (option == 'Summer') {
      return jest.fn().mockResolvedValue({
        discount_id: 2,
        name: 'SUMMER',
        percentage: 20,
        status: 'ACTIVE'
        });
    } else if (option == 'Deleted') {
      return jest.fn().mockResolvedValue({
        discount_id: 2,
        name: 'SUMMER',
        percentage: 20,
        status: 'DELETED'
        }); }
    else {
      return jest.fn().mockResolvedValue(null);
    }
  }
  save() {
    return jest.fn();
  }
  find() {
    return jest.fn().mockResolvedValue([{
      discount_id: 1,
      name: 'WELCOME',
      percentage: 10,
      status: 'ACTIVE'
      },
      {
        discount_id: 2,
        name: 'SUMMER',
        percentage: 20,
        status: 'ACTIVE'
        }]);
  }
  update() {
    return jest.fn();
  }
}
