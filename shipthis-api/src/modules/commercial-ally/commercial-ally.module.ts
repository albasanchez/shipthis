import { EmailModule } from './../email/email.module';
import { ItemPriceHistRepository } from './../item-type/repositories/item-price-hist.repository';
import { CharacteristicRepository } from './../item-type/repositories/characteristic.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommercialAllyService } from './commercial-ally.service';
import { CommercialAllyController } from './commercial-ally.controller';
import { CommercialAllyRepository } from './repositories/commercial-ally.repository';
import { PickupRepository } from './repositories/pickup.repository';
import { WarehouseRepository } from './repositories/warehouse.repository';
import { PlaceRepository } from '../ordersheet/repositories/place.repository';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommercialAllyRepository,
      PickupRepository,
      WarehouseRepository,
      PlaceRepository,
      CharacteristicRepository,
      ItemPriceHistRepository,
    ]),
    AppLoggerModule,
    EmailModule,
  ],
  providers: [CommercialAllyService],
  controllers: [CommercialAllyController],
})
export class CommercialAllyModule {}
