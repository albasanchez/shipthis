import { Test, TestingModule } from '@nestjs/testing';
import { CommentBoxController } from '../comment-box.controller';
import { CommentBoxService } from '../comment-box.service';

describe('CommentBox Controller', () => {
  let controller: CommentBoxController;
  let service: CommentBoxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentBoxController],
      providers: [
        {
          provide: CommentBoxService,
          useFactory() {
            return {
              createComment: jest.fn(),
              getComments: jest.fn(),
              changeReviewed: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<CommentBoxController>(CommentBoxController);
    service = module.get<CommentBoxService>(CommentBoxService);
  });

  describe('saveComment', () => {
    it('should return saved response', () => {
      const comment = { comment: 'Comment1', language: 'EN' };
      controller.saveComment(comment);
      expect(service.createComment).toHaveBeenCalledWith(comment);
    });
  });
  describe('getComments', () => {
    it('should return saved response', () => {
      controller.getComments();
      expect(service.getComments).toHaveBeenCalled();
    });
  });
  describe('updateComment', () => {
    it('should return saved response', () => {
      const comment = { comment_id: 1, reviewed: true };
      controller.updateComment(comment);
      expect(service.changeReviewed).toHaveBeenCalledWith(comment);
    });
  });
});
