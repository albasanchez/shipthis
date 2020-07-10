import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentBoxRepository } from './repositories/comment-box.repository';
import { CommentBoxController } from './comment-box.controller';
import { CommentBoxService } from './comment-box.service';
import { AppLoggerModule } from 'src/log/applogger.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentBoxRepository]), AppLoggerModule],
  controllers: [CommentBoxController],
  providers: [CommentBoxService],
})
export class CommentBoxModule {}
