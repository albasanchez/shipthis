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
    ]),
    AppLoggerModule,
  ],
  providers: [CommercialAllyService],
  controllers: [CommercialAllyController],
})
export class CommercialAllyModule {}
