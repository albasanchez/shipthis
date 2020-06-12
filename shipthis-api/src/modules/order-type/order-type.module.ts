import { OrderPriceHistRepository } from './repositories/order-price-hist.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTypeRepository } from './repositories/order-type.repository';
import { OrderTypeController } from './order-type.controller';
import { OrderTypeService } from './order-type.service';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderTypeRepository]),
    TypeOrmModule.forFeature([OrderPriceHistRepository]),
    AppLoggerModule,
  ],
  controllers: [OrderTypeController],
  providers: [OrderTypeService],
})
export class OrderTypeModule {}
