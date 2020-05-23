import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentBoxRepository } from './comment-box.repository';
import { CommentBoxController } from './comment-box.controller';
import { CommentBoxService } from './comment-box.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentBoxRepository])],
  controllers: [CommentBoxController],
  providers: [CommentBoxService],
})
export class CommentBoxModule {}
