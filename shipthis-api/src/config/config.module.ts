import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { AppLoggerModule } from '../log/applogger.module';
import { AppLoggerService } from '../log/applogger.service';

@Module({
  imports: [AppLoggerModule],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(new AppLoggerService()),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
