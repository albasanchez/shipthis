import { Controller, Get } from '@nestjs/common';
import { OrderTypeService } from './order-type.service';

@Controller('order-type')
export class OrderTypeController {
  constructor(private readonly _orderTypeService: OrderTypeService) {}

  @Get('allactive')
  async getAllActiveOrdertypes() {
    return this._orderTypeService.getAllActiveOrdertypes();
  }
}
