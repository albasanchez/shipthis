import { ConfigModule } from 'src/config/config.module';
import { Module, HttpModule } from '@nestjs/common';
import { TelegramController } from './telegram.controller';
import { TelegramService } from './telegram.service';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [ConfigModule, AppLoggerModule, HttpModule],
  controllers: [TelegramController],
  providers: [TelegramService],
})
export class TelegramModule {}
