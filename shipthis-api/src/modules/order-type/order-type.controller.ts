import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { OrderTypeService } from './order-type.service';
import { UpdateOrderTypeHistDto } from './dto/update-order-type-hist.dto';

@Controller('order-type')
export class OrderTypeController {
  constructor(private readonly _orderTypeService: OrderTypeService) {}

  @Get('allactive')
  async getAllActiveOrdertypes() {
    return this._orderTypeService.getAllActiveOrdertypes();
  }

  @Post('updateOrderTypeHistory')
  @UsePipes(ValidationPipe)
  async updateCharHist(
    @Body() newRegister: UpdateOrderTypeHistDto,
  ): Promise<UpdateOrderTypeHistDto> {
    return this._orderTypeService.updateOrderTypeHist(newRegister);
  }
}
