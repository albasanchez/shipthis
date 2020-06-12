import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTypeService } from './item-type.service';
import { ItemTypeController } from './item-type.controller';
import { CharacteristicRepository } from './repositories/characteristic.repository';
import { ItemPriceHistRepository } from './repositories/item-price-hist.repository';
import { CharPriceHistRepository } from './repositories/char-price-hist.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CharacteristicRepository,
      ItemPriceHistRepository,
      CharPriceHistRepository,
    ]),
  ],
  providers: [ItemTypeService],
  controllers: [ItemTypeController],
})
export class ItemTypeModule {}
