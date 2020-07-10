import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Get,
  Patch,
} from '@nestjs/common';
import { CommentBoxService } from './comment-box.service';
import { CreateCommentBoxDto } from './dto/create-comment-box.dto';
import { UpdateReviewedDTO } from "./dto/update-reviewed.dto";

@Controller('comment-box')
export class CommentBoxController {
  constructor(private readonly _comBoxServ: CommentBoxService) {}

  @Post('savecomment')
  @UsePipes(ValidationPipe)
  saveComment(@Body() comment: CreateCommentBoxDto) {
    return this._comBoxServ.createComment(comment);
  }

  @Get()
  getComments() {
    return this._comBoxServ.getComments();
  }

  @Patch()
  updateComment(@Body() info: UpdateReviewedDTO) {
    return this._comBoxServ.changeReviewed(info);
  }
}
