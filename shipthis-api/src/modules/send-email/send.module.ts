import { Module } from '@nestjs/common';
import { SendService } from './send.service';
import { TemplateService } from './dto/template.service';
import { ConfigModule } from 'src/config/config.module';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  exports:[SendService],
  imports: [ConfigModule, AppLoggerModule],
  controllers: [],
  providers: [SendService,TemplateService],
})
export class SendModule {}
