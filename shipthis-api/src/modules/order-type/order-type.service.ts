import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderType } from './entities/order-type.entity';
import { OrderTypeStatus } from './constants/order-type-status.enum';
import { OrderTypeRepository } from './repositories/order-type.repository';
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
    return await this._orderTypeRepository.getAllActiveOrdertypes();
  }
}
