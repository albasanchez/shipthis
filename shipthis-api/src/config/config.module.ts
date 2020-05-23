import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
import { AppLoggerModule } from 'src/log/applogger.module';
import { AppLoggerService } from 'src/log/applogger.service';

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
