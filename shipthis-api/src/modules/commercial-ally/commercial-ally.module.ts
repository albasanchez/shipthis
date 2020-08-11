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
import { AppLoggerModule } from '../../log/applogger.module';
import { EncriptionModule } from '../encription/encription.module';
import { CommercialAllySubscriber } from './subscribers/commercial-ally-subscriber.service';
import { PickupSubscriber } from './subscribers/pickup-subscriber.service';
import { AuditModule } from '../audit/audit.module';

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
    EncriptionModule,
    AuditModule,
  ],
  providers: [
    CommercialAllyService,
    CommercialAllySubscriber,
    PickupSubscriber,
  ],
  controllers: [CommercialAllyController],
})
export class CommercialAllyModule {}
