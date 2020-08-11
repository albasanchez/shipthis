import { ModuleMetadata } from '@nestjs/common';
import { OfficeService } from '../../office.service';
import { OfficeReposiroty } from '../../repositories/office.repository';
import { AppLoggerModule } from '../../../../log/applogger.module';

export const officeMockModuleMetadata: ModuleMetadata = {
  providers: [OfficeService, OfficeReposiroty],
  imports: [AppLoggerModule],
};

export class OfficeMock {
  find() {
    return jest.fn();
  }
}
