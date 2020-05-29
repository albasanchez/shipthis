import { Test, TestingModule } from '@nestjs/testing';
import { CommentBoxService } from './comment-box.service';

describe('CommentBoxService', () => {
  let service: CommentBoxService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommentBoxService],
    }).compile();

    service = module.get<CommentBoxService>(CommentBoxService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
