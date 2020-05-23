import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrdersheetRepository } from './ordersheet.repository';
import { OrdersheetController } from './ordersheet.controller';
import { OrdersheetService } from './ordersheet.service';

@Module({
  imports: [TypeOrmModule.forFeature([OrdersheetRepository])],
  controllers: [OrdersheetController],
  providers: [OrdersheetService],
})
export class OrdersheetModule {}
