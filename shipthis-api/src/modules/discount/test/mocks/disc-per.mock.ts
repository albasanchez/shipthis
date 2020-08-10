import { ModuleMetadata } from '@nestjs/common';
import { DiscPerRepository } from '../../repositories/disc-per.repository';
import { EmailService } from '../../../../modules/email/email.service';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { DiscountService } from '../../discount.service';
import { DiscountRepository } from '../../repositories/discount.repository';
import { ConfigService } from '../../../../config/config.service';

export const discPerMockModuleMetadata: ModuleMetadata = {
  providers: [
    DiscPerRepository,
  ],
  imports: [AppLoggerModule],
};

export class DiscPerMock {
  findOne(successful: string) {
    if (successful == 'Active') {
      return jest.fn().mockResolvedValue(1);
    } else if (successful == 'Deleted') {
      return jest.fn().mockResolvedValue(2);
    } else {
      return jest.fn().mockResolvedValue(null);
    }
  }
  save() {
    return jest.fn();
  }
  find() {
    return jest.fn().mockResolvedValue(1);
  }
  update() {
    return jest.fn();
  }
}

export const createQueryBuilder: any = {
  innerJoinAndSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  getMany: jest.fn().mockReturnValue([
    {
      characteristic_id: 1,
      name: 'Flammable',
      status: 'ACTIVE',
      char_price_hists: [
        {
          char_price_hist_id: 1,
          starting_date: '2020-08-01',
          ending_date: '2021-08-01',
          tax: 0.8,
          characteristic: {},
          char_items: [],
        },
      ],
    },
    {
      characteristic_id: 2,
      name: 'Animal',
      status: 'ACTIVE',
      char_price_hists: [
        {
          char_price_hist_id: 2,
          starting_date: '2020-08-01',
          ending_date: '2021-08-01',
          tax: 0.7,
          characteristic: {},
          char_items: [],
        },
      ],
    },
  ]),
};