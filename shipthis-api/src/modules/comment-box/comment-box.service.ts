import { Injectable } from '@nestjs/common';
import { CommentBoxRepository } from './repositories/comment-box.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentBoxDto } from './dto/create-comment-box.dto';
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

    await this._commentBoxRepo.saveComment(comment.comment, comment.language);

    return { response: 'Comment registered successfully' };
  }
}
