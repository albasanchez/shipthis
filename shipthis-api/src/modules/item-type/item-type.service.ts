import { CharacteristicRepository } from './repositories/characteristic.repository';
import { ItemPriceHistRepository } from './repositories/item-price-hist.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemPriceHist } from './entities/item-price-hist.entity';
import { Characteristic } from './entities/characteristic.entity';
import { NewItemHistDto } from './dto/item-price-history.dto';
import { CharPriceInfoDto } from './dto/char-price-info.dto';
import { CharPriceHistRepository } from './repositories/char-price-hist.repository';
import { NewCharPriceDto } from './dto/new-char-price.dto';
import { CharacteristicNotFoundException } from 'src/common/exceptions/characteristic-not-found.exception';
import { AppLoggerService } from 'src/log/applogger.service';

@Injectable()
export class ItemTypeService {
  constructor(
    @InjectRepository(ItemPriceHistRepository)
    private readonly _itemPriceRepo: ItemPriceHistRepository,
    @InjectRepository(CharacteristicRepository)
    private readonly _characRepo: CharacteristicRepository,
    @InjectRepository(CharPriceHistRepository)
    private readonly _characHistRepo: CharPriceHistRepository,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async getCurrentItemPrice(): Promise<ItemPriceHist> {
    this._appLogger.log(
      'Handling New Request: Consulting Current Item Price History Service',
    );

    const currentPrice: ItemPriceHist = await this._itemPriceRepo.getCurrentPrice();

    this._appLogger.log('Item Price History has been consulted sucessfully');

    return currentPrice;
  }

  async getACurrentActiveCharacteristics(): Promise<Characteristic[]> {
    this._appLogger.log(
      'Handling New Request: Consulting Active Characteristics Service',
    );

    const characteristics: Characteristic[] = await this._characRepo.getAllCharacteristics();

    this._appLogger.log(
      'Active Characteristics has been consulted sucessfully',
    );

    return characteristics;
  }

  async updatePriceHist(newRegister: NewItemHistDto): Promise<NewItemHistDto> {
    this._appLogger.log(
      'Handling New Request: Update Item Price History Service',
    );

    const newPriceHist: ItemPriceHist = await this._itemPriceRepo.updateHistory(
      newRegister,
    );

    this._appLogger.log('Item Price History has been updated sucessfully');

    return newPriceHist;
  }

  async getCharacteristicsInfo(): Promise<CharPriceInfoDto[]> {
    this._appLogger.log(
      'Handling New Request: Consulting Characteristics Information Service',
    );

    const characteristics: CharPriceInfoDto[] = await this._characHistRepo.getCharacteristicsInfo();

    this._appLogger.log(
      'Characteristics Information has been consulted sucessfully',
    );

    return characteristics;
  }

  async updateCharHist(newRegister: NewCharPriceDto): Promise<NewCharPriceDto> {
    this._appLogger.log(
      'Handling New Request: Update Characteristic Price History Service',
    );

    const characteristic: Characteristic = await this._characRepo.getCharacteristicById(
      newRegister.id,
    );

    if (!characteristic) {
      throw new CharacteristicNotFoundException();
    }

    const newPriceRegister = this._characHistRepo.updateHistory(
      newRegister,
      characteristic,
    );

    this._appLogger.log('Characteristic Price History has been updated');

    return newPriceRegister;
  }
}
