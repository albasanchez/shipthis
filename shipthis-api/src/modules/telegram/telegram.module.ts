import { PickupRepository } from './../commercial-ally/repositories/pickup.repository';
import { OrdersheetRepository } from './../ordersheet/repositories/ordersheet.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from 'src/config/config.module';
import { Module, HttpModule } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrdersheetRepository, PickupRepository]),
    ConfigModule,
    AppLoggerModule,
    HttpModule,
  ],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule {}
