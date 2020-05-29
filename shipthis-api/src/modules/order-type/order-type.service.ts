import { Injectable } from '@nestjs/common';
import { OrderPriceHistRepository } from '../order-price-hist/order-price-hist.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderType } from './order-type.entity';
import { OrderTypeStatus } from './constants/orer-type-status.enum';
import { OrderTypeRepository } from './order-type.repository';
import { AppLoggerService } from 'src/log/applogger.service';

@Injectable()
export class OrderTypeService {
  constructor(
    @InjectRepository(OrderTypeRepository)
    private readonly _orderTypeRepository: OrderTypeRepository,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async getAllActiveOrdertypes(): Promise<OrderType[]> {
    this._appLogger.log('Reading all active order types');
    return await this._orderTypeRepository
      .createQueryBuilder('ot')
      .innerJoinAndSelect('ot.prices', 'prices', 'prices.ending_date is null')
      .where('ot.status = :st', { st: OrderTypeStatus.ACTIVE })
      .getMany();
  }
}
