import { Module } from '@nestjs/common';
import { AppLoggerService } from './applogger.service';

@Module({
  providers: [AppLoggerService],
  exports: [AppLoggerService],
})
export class AppLoggerModule {}
