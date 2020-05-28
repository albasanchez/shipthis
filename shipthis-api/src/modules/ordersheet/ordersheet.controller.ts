import { OrderHistoryDto } from './dto/order-history.dto';
import { OrdersheetService } from './ordersheet.service';
import { CreateOrdersheetDto } from './dto/create-ordersheet.dto';
import {
  Controller,
  UsePipes,
  ValidationPipe,
  Post,
  Body,
} from '@nestjs/common';

@Controller('ordersheet')
export class OrdersheetController {
  constructor(private readonly _orderSheetService: OrdersheetService) {}

  @Post('create')
  @UsePipes(ValidationPipe)
  async createOrdersheet(@Body() newOrder: CreateOrdersheetDto) {
    return this._orderSheetService.createOrdersheet(newOrder);
  }

  @Post('history')
  @UsePipes(ValidationPipe)
  async searchHistory(@Body() historyRef: OrderHistoryDto) {
    return this._orderSheetService.searchHistory(historyRef);
  }
}
