import { ModuleMetadata } from '@nestjs/common';
import { InternationalizationService } from '../../internationalization.service';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { ConfigService } from '../../../../config/config.service';

export const internationalizationMockModuleMetadata: ModuleMetadata = {
  providers: [
    InternationalizationService,
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
