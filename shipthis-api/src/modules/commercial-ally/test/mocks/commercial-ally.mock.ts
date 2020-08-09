import { ModuleMetadata } from '@nestjs/common';
import { WarehouseRepository } from '../../repositories/warehouse.repository';
import { PickupRepository } from '../../repositories/pickup.repository';
import { PlaceRepository } from '../../../../modules/ordersheet/repositories/place.repository';
import { CharacteristicRepository } from '../../../../modules/item-type/repositories/characteristic.repository';
import { ItemPriceHistRepository } from '../../../../modules/item-type/repositories/item-price-hist.repository';
import { EmailService } from '../../../../modules/email/email.service';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { CommercialAllyService } from '../../commercial-ally.service';
import { CommercialAllyRepository } from '../../repositories/commercial-ally.repository';
import { CommercialAllyStatus } from '../../constants/commercial-ally-status.enum';
import { ConfigService } from '../../../../config/config.service';
import { DaoLocationIq } from '../../../../modules/dao/implementations/dao-locationiq';

const ally = {
  commercial_ally_key: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
  name: 'CommercialAlly',
  email: 'ally@gmail.com',
  phone_number: '+1 (234) 567890',
  manager_name: 'manager',
  manager_last_name: 'name',
  description: 'eCommerce',
  status: '',
  warehouses: [],
};

export const commercialAllyMockModuleMetadata: ModuleMetadata = {
  providers: [
    CommercialAllyService,
    CommercialAllyRepository,
    WarehouseRepository,
    PickupRepository,
    PlaceRepository,
    CharacteristicRepository,
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

export class CommercialAllyMock {
  findOne(successful: string) {
    if (successful == 'Active') {
      ally.status = CommercialAllyStatus.ACTIVE;
      return jest.fn().mockResolvedValue(ally);
    } else if (successful == 'Deleted') {
      ally.status = CommercialAllyStatus.DELETED;
      return jest.fn().mockResolvedValue(ally);
    } else {
      return jest.fn().mockResolvedValue(null);
    }
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

export class ItemPriceMock {
  findOne() {
    return jest.fn().mockResolvedValue({ base_price: 5, price_km: 0.02 });
  }
}
