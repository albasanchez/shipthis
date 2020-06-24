import { CharacteristicRepository } from './repositories/characteristic.repository';
import { ItemPriceHistRepository } from './repositories/item-price-hist.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemPriceHist } from './entities/item-price-hist.entity';
import { Characteristic } from './entities/characteristic.entity';
import { NewItemHistDto } from './dto/item-price-history.dto';

@Injectable()
export class ItemTypeService {
  constructor(
    @InjectRepository(ItemPriceHistRepository)
    private readonly _itemPriceRepo: ItemPriceHistRepository,
    @InjectRepository(CharacteristicRepository)
    private readonly _characRepo: CharacteristicRepository,
  ) {}

  async getCurrentItemPrice(): Promise<ItemPriceHist> {
    return this._itemPriceRepo.getCurrentPrice();
  }

  async getACurrentActiveCharacteristics(): Promise<Characteristic[]> {
    return this._characRepo.getAllCharacteristics();
  }

  async updatePriceHist(newRegister: NewItemHistDto): Promise<NewItemHistDto> {
     return this._itemPriceRepo.updateHistory(newRegister);
  } 

  
}
