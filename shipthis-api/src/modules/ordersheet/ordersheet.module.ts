import { DiscPerRepository } from './../discount/repositories/disc-per.repository';
import { ReceiverRepository } from './../userdata/repositories/receiver.repository';
import { CharacteristicRepository } from './../item-type/repositories/characteristic.repository';
import { OrderPriceHistRepository } from './../order-type/repositories/order-price-hist.repository';
import { OfficeReposiroty } from './../office/repositories/office.repository';
import { UserDataRepository } from './../userdata/repositories/userdata.repository';
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
import { ItemPriceHistRepository } from '../item-type/repositories/item-price-hist.repository';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      OrdersheetRepository,
      CheckPointRepository,
      ItemRepository,
      PlaceRepository,
      TrajectoryRepository,
      UserDataRepository,
      OfficeReposiroty,
      OrderPriceHistRepository,
      CharacteristicRepository,
      ReceiverRepository,
      DiscPerRepository,
      ItemPriceHistRepository,
    ]),
    AppLoggerModule,
    EmailModule,
  ],
  controllers: [OrdersheetController],
  providers: [OrdersheetService],
})
export class OrdersheetModule {}
