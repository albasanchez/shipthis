import { ModuleMetadata } from '@nestjs/common';
import { OrderTypeService } from '../../order-type.service';
import { OrderTypeRepository } from '../../repositories/order-type.repository';
import { OrderPriceHistRepository } from '../../repositories/order-price-hist.repository';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { orderType, orderPriceHist } from './constants.mock';

export const orderTypeMockModuleMetadata: ModuleMetadata = {
  providers: [OrderTypeService, OrderTypeRepository, OrderPriceHistRepository],
  imports: [AppLoggerModule],
};

export const createQueryBuilder: any = {
  innerJoinAndSelect: jest.fn().mockReturnThis(),
  where: jest.fn().mockReturnThis(),
  getMany: jest.fn().mockReturnValue([]),
};

export class OrderTypeMock {
  findOne(successful: boolean) {
    if (successful) {
      return jest.fn().mockResolvedValue(orderType);
    } else {
      return jest.fn().mockResolvedValue(null);
    }
  }
}

export class OrderPriceMock {
  findOne() {
    return jest.fn().mockResolvedValue(orderPriceHist);
  }
  update() {
    return jest.fn();
  }
  save() {
    return jest.fn();
  }
}
