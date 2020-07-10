import { Module } from '@nestjs/common';
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { EmailService } from './email.service';
import { AppLoggerModule } from 'src/log/applogger.module';
import { ConfigModule } from '../../config/config.module';
import { Configuration } from '../../config/config.keys';
import { ConfigService } from '../../config/config.service';
import { GenerateTemplate } from './generate-template';

@Module({
  imports: [
    ConfigModule,
    AppLoggerModule,
    SendGridModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory(config: ConfigService) {
        return {
          apikey: config.get(Configuration.SEND_GRID_KEY),
        };
      },
    }),
  ],
  providers: [EmailService, GenerateTemplate],
  exports: [EmailService],
})
export class EmailModule {}
