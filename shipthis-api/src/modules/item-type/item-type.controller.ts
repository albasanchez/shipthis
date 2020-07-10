import { AuthGuard } from '@nestjs/passport';
import { ItemTypeService } from './item-type.service';
import {
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { NewItemHistDto } from './dto/item-price-history.dto';
import { NewCharPriceDto } from './dto/new-char-price.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('item-type')
export class ItemTypeController {
  constructor(private readonly _itemTypeServ: ItemTypeService) {}

  @Get('current-price')
  async getCurrentItemPrice() {
    return this._itemTypeServ.getCurrentItemPrice();
  }

  @Get('active-characteristics')
  async getACurrentActiveCharacteristics() {
    return this._itemTypeServ.getACurrentActiveCharacteristics();
  }

  @Post('updateItemHistory')
  @UsePipes(ValidationPipe)
  async updateItemHist(
    @Body() newRegister: NewItemHistDto,
  ): Promise<NewItemHistDto> {
    return this._itemTypeServ.updatePriceHist(newRegister);
  }

  @Get('characteristics')
  async getCharacteristicsInfo() {
    return this._itemTypeServ.getCharacteristicsInfo();
  }

  @Post('updateCharHistory')
  @UsePipes(ValidationPipe)
  async updateCharHist(
    @Body() newRegister: NewCharPriceDto,
  ): Promise<NewCharPriceDto> {
    return this._itemTypeServ.updateCharHist(newRegister);
  }
}
