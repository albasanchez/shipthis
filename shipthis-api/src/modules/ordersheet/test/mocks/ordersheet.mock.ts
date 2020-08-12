import { ModuleMetadata } from '@nestjs/common';
import { OrdersheetService } from '../../ordersheet.service';
import { OrdersheetRepository } from '../../repositories/ordersheet.repository';
import { EmailService } from '../../../email/email.service';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { DaoLocationIq } from '../../../dao/implementations/dao-locationiq';
import { UserDataRepository } from '../../../userdata/repositories/userdata.repository';
import { OfficeReposiroty } from '../../../office/repositories/office.repository';
import { OrderPriceHistRepository } from '../../../order-type/repositories/order-price-hist.repository';
import { CharacteristicRepository } from '../../../item-type/repositories/characteristic.repository';
import { ReceiverRepository } from '../../../userdata/repositories/receiver.repository';
import { DiscPerRepository } from '../../../discount/repositories/disc-per.repository';
import { ItemPriceHistRepository } from '../../../item-type/repositories/item-price-hist.repository';

export const ordersheetMockModuleMetadata: ModuleMetadata = {
  providers: [
    OrdersheetService,
    OrdersheetRepository,
    UserDataRepository,
    OfficeReposiroty,
    OrderPriceHistRepository,
    CharacteristicRepository,
    ReceiverRepository,
    DiscPerRepository,
    ItemPriceHistRepository,
    DaoLocationIq,
    {
      provide: EmailService,
      useFactory() {
        return {
          generateInvoice: jest.fn(),
        };
      },
    },
  ],
  imports: [AppLoggerModule],
};

export class OrderPriceMock {
  findOne() {
    return jest.fn().mockResolvedValue({});
  }
}
