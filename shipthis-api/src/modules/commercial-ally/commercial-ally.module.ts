import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommercialAllyService } from './commercial-ally.service';
import { CommercialAllyController } from './commercial-ally.controller';
import { CommercialAllyRepository } from './repositories/commercial-ally.repository';
import { PickupRepository } from './repositories/pickup.repository';
import { WarehouseRepository } from './repositories/warehouse.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommercialAllyRepository,
      PickupRepository,
      WarehouseRepository,
    ]),
  ],
  providers: [CommercialAllyService],
  controllers: [CommercialAllyController],
})
export class CommercialAllyModule {}
