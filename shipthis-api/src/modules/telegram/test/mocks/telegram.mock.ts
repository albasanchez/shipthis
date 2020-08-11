import { ModuleMetadata } from '@nestjs/common';
import { TelegramService } from '../../telegram.service';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { ConfigService } from '../../../../config/config.service';

export const telegramMockModuleMetadata: ModuleMetadata = {
  providers: [
    TelegramService,
    {
      provide: ConfigService,
      useFactory() {
        return {
          get: jest.fn().mockReturnValue(1),
        };
      },
    },
  ],
  imports: [AppLoggerModule],
};
