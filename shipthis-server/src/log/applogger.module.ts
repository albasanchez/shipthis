import { Module } from '@nestjs/common';
import { AppLogger } from './applogger.service';

@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LoggerModule {}
