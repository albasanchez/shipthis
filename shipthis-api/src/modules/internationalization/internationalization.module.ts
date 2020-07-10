import { AppLoggerModule } from './../../log/applogger.module';
import { Module } from '@nestjs/common';
import { InternationalizationController } from './internationalization.controller';
import { InternationalizationService } from './internationalization.service';

@Module({
  imports: [AppLoggerModule],
  controllers: [InternationalizationController],
  providers: [InternationalizationService],
})
export class InternationalizationModule {}
