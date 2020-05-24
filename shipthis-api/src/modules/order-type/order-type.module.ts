import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderTypeRepository } from './order-type.repository';
import { OrderTypeController } from './order-type.controller';
import { OrderTypeService } from './order-type.service';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrderTypeRepository]), AppLoggerModule],
  controllers: [OrderTypeController],
  providers: [OrderTypeService],
})
export class OrderTypeModule {}
