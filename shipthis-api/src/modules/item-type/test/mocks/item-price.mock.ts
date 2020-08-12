import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { ItemTypeService } from '../../item-type.service';
import { ItemPriceHistRepository} from '../../repositories/item-price-hist.repository';

export class ItemPriceMock {
  save() {
      return jest.fn();
      // item_price_hist_id:1,
      // starting_date: '2020-08-01',
      // ending_date: null,
      // base_price: 5,
      // price_km: 5,
      
  }
  update() {
    return jest.fn();
  }
  findOne() {
      return jest.fn().mockResolvedValue({
        item_price_hist_id:'1',
        starting_date: '2020-08-01',
        ending_date: null,
        base_price: 5,
        price_km: 5,
      });
  } 
}

