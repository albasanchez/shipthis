import { Injectable } from '@nestjs/common';
import { CommentBox } from './entities/comment-box.entity';
import { CommentBoxRepository } from './repositories/comment-box.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentBoxDto } from './dto/create-comment-box.dto';
import { UpdateReviewedDTO } from './dto/update-reviewed.dto';
import { AppLoggerService } from 'src/log/applogger.service';
import { CommentNotFoundException } from 'src/common/exceptions/comment-not-found.exception';

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

  async getComments(): Promise<CommentBox[]> {
    this._appLogger.log('Handling New Request: Get comments');

    return await this._commentBoxRepo.find();
  }

  async changeReviewed(info: UpdateReviewedDTO) {
    this._appLogger.log('Handling New Request: Update comment reviewed');

    let comment: CommentBox = await this._commentBoxRepo.findOne(
      info.comment_id,
    );

    if (!comment) {
      throw new CommentNotFoundException();
    }

    return await this._commentBoxRepo.updateReviewed(comment, info.reviewed);
  }
}
