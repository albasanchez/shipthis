import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderType } from './entities/order-type.entity';
import { OrderTypeRepository } from './repositories/order-type.repository';
import { OrderPriceHistRepository } from './repositories/order-price-hist.repository';
import { AppLoggerService } from 'src/log/applogger.service';
import { UpdateOrderTypeHistDto } from './dto/update-order-type-hist.dto';
import { OrderTypeNotFoundException } from 'src/common/exceptions/order-type-not-found.exception';

@Injectable()
export class OrderTypeService {
  constructor(
    @InjectRepository(OrderTypeRepository)
    private readonly _orderTypeRepository: OrderTypeRepository,
    private readonly _orderTypeHistRepository: OrderPriceHistRepository,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async getAllActiveOrdertypes(): Promise<OrderType[]> {
    this._appLogger.log('Reading all active order types');
    return await this._orderTypeRepository.getAllActiveOrdertypes();
  }

  async updateOrderTypeHist(
    newRegister: UpdateOrderTypeHistDto,
  ): Promise<UpdateOrderTypeHistDto> {
    this._appLogger.log(
      'Handling New Request: Update Order Type History Service',
    );

    const order_type: OrderType = await this._orderTypeRepository.getOrderTypeById(
      newRegister.id,
    );

    if (!order_type) {
      throw new OrderTypeNotFoundException();
    }

    const newPriceRegister = this._orderTypeHistRepository.updateHistory(
      newRegister,
      order_type,
    );

    this._appLogger.log('Order Type History has been updated');

    return newPriceRegister;
  }
}
