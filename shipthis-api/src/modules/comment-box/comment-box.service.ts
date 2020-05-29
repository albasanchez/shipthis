import { Injectable } from '@nestjs/common';
import { CommentBoxRepository } from './comment-box.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentBoxDto } from './dto/create-comment-box.dto';
import { CommentBox } from './comment-box.entity';
import { Timestamp } from 'typeorm';
import { AppLoggerService } from 'src/log/applogger.service';

@Injectable()
export class CommentBoxService {
  constructor(
    @InjectRepository(CommentBoxRepository)
    private readonly _commentBoxRepo: CommentBoxRepository,
    private readonly _appLogger: AppLoggerService,
  ) {}

  async createComment(comment: CreateCommentBoxDto): Promise<any> {
    this._appLogger.log('Registering new comment on commentBox');
    const cm: CommentBox = new CommentBox();
    cm.comment_message = comment.comment;
    cm.time_mark = new Date();

    await this._commentBoxRepo.save(cm);

    return { response: 'Comment registered successfully' };
  }
}
