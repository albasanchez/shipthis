import { AuthGuard } from '@nestjs/passport';
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
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { OrderDetailDto } from './dto/order-detail.dto';

@Controller('ordersheet')
export class OrdersheetController {
  constructor(private readonly _orderSheetService: OrdersheetService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('calculate-order')
  @UsePipes(ValidationPipe)
  async createOrdersheet(@Body() newOrder: CreateOrdersheetDto) {
    return this._orderSheetService.calculateOrder(newOrder);
  }

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Post('history-order')
  @UsePipes(ValidationPipe)
  async searchHistoryOrder(@Body() historyRef: OrderHistoryDto) {
    return this._orderSheetService.searchHistoryOrder(historyRef);
  }

  @UseGuards(AuthGuard('jwt'))
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

  @UseGuards(AuthGuard('jwt'))
  @Get('orders')
  async getAllOrders() {
    return await this._orderSheetService.gelAllOrders();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('orders-total')
  async getAllOrdersTotal() {
    return await this._orderSheetService.gelAllOrdersTotal();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('address-validation')
  @UsePipes(ValidationPipe)
  async validateAddress(@Body() addressReq: AddressValidationDto) {
    return this._orderSheetService.addressConfirmation(addressReq.address);
  }
}
