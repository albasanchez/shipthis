import { TrajectoryRepository } from './repositories/trajectory.repository';
import { PlaceRepository } from './repositories/place.repository';
import { ItemRepository } from './repositories/item.repository';
import { CheckPointRepository } from './repositories/check-point.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersheetRepository } from './repositories/ordersheet.repository';
import { OrdersheetController } from './ordersheet.controller';
import { OrdersheetService } from './ordersheet.service';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersheetRepository,
      CheckPointRepository,
      ItemRepository,
      PlaceRepository,
      TrajectoryRepository,
    ]),
    AppLoggerModule,
  ],
  controllers: [OrdersheetController],
  providers: [OrdersheetService],
})
export class OrdersheetModule {}
