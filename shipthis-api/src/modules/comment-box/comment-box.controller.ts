import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommentBoxService } from './comment-box.service';
import { CreateCommentBoxDto } from './dto/create-comment-box.dto';

@Controller('comment-box')
export class CommentBoxController {
  constructor(private readonly _comBoxServ: CommentBoxService) {}

  @Post('savecomment')
  @UsePipes(ValidationPipe)
  saveComment(@Body() comment: CreateCommentBoxDto) {
    return this._comBoxServ.createComment(comment);
  }
}
