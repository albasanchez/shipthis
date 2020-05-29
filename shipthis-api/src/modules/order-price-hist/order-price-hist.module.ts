import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderPriceHistRepository } from './order-price-hist.repository';
import { OrderPriceHistController } from './order-price-hist.controller';
import { OrderPriceHistService } from './order-price-hist.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderPriceHistRepository])],
  controllers: [OrderPriceHistController],
  providers: [OrderPriceHistService],
})
export class OrderPriceHistModule {}
