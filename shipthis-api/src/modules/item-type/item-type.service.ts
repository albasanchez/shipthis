import { Injectable } from '@nestjs/common';
import { ItemTypeRepository } from './item-type.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { ItemType } from './item-type.entity';
import { ItemTypeStatus } from './constants/item-type-status.enum';
import { AppLoggerService } from 'src/log/applogger.service';

@Injectable()
export class ItemTypeService {
  constructor(
    @InjectRepository(ItemTypeRepository)
    private readonly _itemTypeRepo: ItemTypeRepository,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async getAllActiveItemtypes(): Promise<ItemType[]> {
    this._appLogger.log('Reading all Active ItemTypes');
    return this._itemTypeRepo
      .createQueryBuilder('it')
      .innerJoinAndSelect('it.prices', 'price', 'price.ending_date is null')
      .innerJoinAndSelect('it.category', 'category')
      .where('it.status = :st', { st: ItemTypeStatus.ACTIVE })
      .getMany();
  }
}
