import { PickupRepository } from './../commercial-ally/repositories/pickup.repository';
import { SimulationRepository } from './repositories/simulation.repository';
import { OrdersheetRepository } from '../ordersheet/repositories/ordersheet.repository';
import { CheckPointRepository } from '../ordersheet/repositories/check-point.repository';
import { Module } from '@nestjs/common';
import { SimulationService } from './simulation.service';
import { AppLoggerModule } from 'src/log/applogger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SimulationController } from './simulation.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SimulationRepository,
      OrdersheetRepository,
      CheckPointRepository,
      PickupRepository,
    ]),
    AppLoggerModule,
  ],
  providers: [SimulationService],
  controllers: [SimulationController],
})
export class SimulationModule {}
