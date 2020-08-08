import { ModuleMetadata } from '@nestjs/common/interfaces';
import { AppLoggerModule } from '../../../../log/applogger.module';
import { CommentBoxService } from '../../comment-box.service';
import { CommentBoxRepository } from '../../repositories/comment-box.repository';

export const commentBoxMockModuleMetadata: ModuleMetadata = {
  providers: [CommentBoxService, CommentBoxRepository],
  imports: [AppLoggerModule],
};

export class CommentBoxMock {
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
