import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemPriceHistRepository } from './item-price-hist.repository';
import { ItemPriceHistController } from './item-price-hist.controller';
import { ItemPriceHistService } from './item-price-hist.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemPriceHistRepository])],
  controllers: [ItemPriceHistController],
  providers: [ItemPriceHistService],
})
export class ItemPriceHistModule {}
