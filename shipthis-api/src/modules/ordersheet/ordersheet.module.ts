import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersheetRepository } from './ordersheet.repository';
import { OrdersheetController } from './ordersheet.controller';
import { OrdersheetService } from './ordersheet.service';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersheetRepository]), AppLoggerModule],
  controllers: [OrdersheetController],
  providers: [OrdersheetService],
})
export class OrdersheetModule {}
