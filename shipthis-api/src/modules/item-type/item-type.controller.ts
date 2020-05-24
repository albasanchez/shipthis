import { Controller, Get } from '@nestjs/common';
import { ItemTypeService } from './item-type.service';

@Controller('item-type')
export class ItemTypeController {
  constructor(private readonly _itemTypeService: ItemTypeService) {}

  @Get('allActive')
  async getAllActiveItemTypes() {
    return this._itemTypeService.getAllActiveItemtypes();
  }
}
