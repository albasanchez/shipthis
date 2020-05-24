import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTypeRepository } from './item-type.repository';
import { ItemTypeController } from './item-type.controller';
import { ItemTypeService } from './item-type.service';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [TypeOrmModule.forFeature([ItemTypeRepository]), AppLoggerModule],
  controllers: [ItemTypeController],
  providers: [ItemTypeService],
})
export class ItemTypeModule {}
