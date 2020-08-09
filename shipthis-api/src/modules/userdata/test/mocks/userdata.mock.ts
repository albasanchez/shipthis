import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { UserdataService } from '../../userdata.service';
import { UserDataRepository } from '../../repositories/userdata.repository';

export const userdataMockModuleMetadata: ModuleMetadata = {
  providers: [UserdataService, UserDataRepository],
  imports: [AppLoggerModule],
};

export class UserdataMock {
  save() {
    return jest.fn();
  }
  find() {
    return jest.fn();
  }
  findOne(successful: boolean) {
    if (successful) {
      return jest.fn().mockResolvedValue({
        comment_id: 1,
        time_mark: new Date(),
        comment_message: 'Comment',
        reviewed: false,
        language: 'EN',
      });
    } else {
      return jest.fn().mockResolvedValue(null);
    }
  }
}