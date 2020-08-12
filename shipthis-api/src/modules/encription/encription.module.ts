import { Module } from '@nestjs/common';
import { EncriptionService } from './encription.service';
import { AppLoggerModule } from '../../log/applogger.module';
import { ConfigModule } from '../../config/config.module';

@Module({
  providers: [EncriptionService],
  exports: [EncriptionService],
  imports: [AppLoggerModule, ConfigModule],
})
export class EncriptionModule {}
