import { ItemTypeService } from './item-type.service';
import { Controller, Get, Post, UsePipes, ValidationPipe, Body} from '@nestjs/common';
import { NewItemHistDto } from './dto/item-price-history.dto';

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

  @Post ('updateItemHistory') 
  @UsePipes(ValidationPipe)
  async updateItemHist (@Body() NewRegister: NewItemHistDto): Promise<NewItemHistDto> {
  return this._itemTypeServ.updatePriceHist(NewRegister);
}

}
