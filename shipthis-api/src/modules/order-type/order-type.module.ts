import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTypeRepository } from './order-type.repository';
import { OrderTypeController } from './order-type.controller';
import { OrderTypeService } from './order-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTypeRepository])],
  controllers: [OrderTypeController],
  providers: [OrderTypeService],
})
export class OrderTypeModule {}
