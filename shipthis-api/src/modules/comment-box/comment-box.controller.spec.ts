import { Test, TestingModule } from '@nestjs/testing';
import { CommentBoxController } from './comment-box.controller';

describe('CommentBox Controller', () => {
  let controller: CommentBoxController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentBoxController],
    }).compile();

    controller = module.get<CommentBoxController>(CommentBoxController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
