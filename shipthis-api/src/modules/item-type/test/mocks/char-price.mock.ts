import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { ItemTypeService } from '../../item-type.service';
import { CharPriceHistRepository } from '../../repositories/char-price-hist.repository';

export class CharPriceMock {
  findOne() {
      return jest.fn().mockResolvedValue({
        item_price_hist_id: '1',
        starting_date: '2020-08-01',
        ending_date: null,
        base_price: 5,
        price_km: 5,
      });
    } 
  find() {
    return jest.fn().mockResolvedValue([
      {
        char_price_hist_id: 1,
        starting_date: '2020-08-01',
        ending_date: '2020-08-10',
        tax: 5,
        characteristic: {
          status: 'ACTIVE',
        },
      },
      {
        char_price_hist_id: 2,
        starting_date: '2020-08-02',
        ending_date: '2020-08-05',
        tax: 3,
        characteristic: {
          status: 'DELETED',
        },
      },
    ]);
  }
  update() {
    return jest.fn();
  }
  save() {
    return jest.fn();
  }
}
