import { AddressValidationDto } from './dto/address-validation.dto';
import { OrderHistoryDto } from './dto/order-history.dto';
import { OrdersheetService } from './ordersheet.service';
import { CreateOrdersheetDto } from './dto/create-ordersheet.dto';
import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
  Get,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { OrderDetailDto } from './dto/order-detail.dto';

@Controller('ordersheet')
export class OrdersheetController {
  constructor(private readonly _orderSheetService: OrdersheetService) {}

  @Post('calculate-order')
  @UsePipes(ValidationPipe)
  async createOrdersheet(@Body() newOrder: CreateOrdersheetDto) {
    return this._orderSheetService.calculateOrder(newOrder);
  }

  @Post('register-order')
  @UsePipes(ValidationPipe)
  async registerOrdersheet(
    @Body() newOrder: CreateOrdersheetDto,
    @Res() res: Response,
  ) {
    return this._orderSheetService.registerOrder(newOrder, res);
  }

  @Post('order-bill')
  @UsePipes(ValidationPipe)
  async consultBill(@Body() orderDetail: OrderDetailDto) {
    return this._orderSheetService.consultBill(orderDetail.tracking_id);
  }

  @Post('history-order')
  @UsePipes(ValidationPipe)
  async searchHistoryOrder(@Body() historyRef: OrderHistoryDto) {
    return this._orderSheetService.searchHistoryOrder(historyRef);
  }

  @Post('history-bill')
  @UsePipes(ValidationPipe)
  async searchHistoryBill(@Body() historyRef: OrderHistoryDto) {
    return this._orderSheetService.searchHistoryBill(historyRef);
  }

  @Post('detail')
  @UsePipes(ValidationPipe)
  async searchOrderDetail(@Body() orderDetail: OrderDetailDto) {
    return this._orderSheetService.searchOrdersheetDetail(orderDetail);
  }

  @Get('orders')
  async getAllOrders() {
    return await this._orderSheetService.gelAllOrders();
  }

  @Get('orders-total')
  async getAllOrdersTotal() {
    return await this._orderSheetService.gelAllOrdersTotal();
  }

  @Post('address-validation')
  @UsePipes(ValidationPipe)
  async validateAddress(@Body() addressReq: AddressValidationDto) {
    return this._orderSheetService.addressConfirmation(addressReq.address);
  }
}
