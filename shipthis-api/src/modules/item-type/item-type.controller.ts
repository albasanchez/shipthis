import { ItemTypeService } from './item-type.service';
import { Controller, Get } from '@nestjs/common';

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
}
