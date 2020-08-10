import { Test, TestingModule } from '@nestjs/testing';
import { CommentBoxService } from '../comment-box.service';
import { CommentBoxRepository } from '../repositories/comment-box.repository';
import { CommentNotFoundException } from '../../../common/exceptions';
import {
  CommentBoxMock,
  commentBoxMockModuleMetadata,
} from './mocks/comment-box.mock';

describe('CommentBoxService', () => {
  let service: CommentBoxService;
  let repository: CommentBoxRepository;
  const mockRepository: CommentBoxMock = new CommentBoxMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      commentBoxMockModuleMetadata,
    ).compile();

    service = module.get<CommentBoxService>(CommentBoxService);
    repository = module.get<CommentBoxRepository>(CommentBoxRepository);
  });

  describe('createComment', () => {
    it('should save a comment in the database', async () => {
      repository.save = mockRepository.save();
      const comment = {
        comment: 'Comment',
        language: 'EN',
      };
      const response = await service.createComment(comment);
      expect(repository.save).toHaveBeenCalled();
      expect(response).toEqual({ response: 'Comment registered successfully' });
    });
  });

  describe('getComments', () => {
    it('should get all comments in the database', async () => {
      repository.find = mockRepository.find();
      service.getComments();
      expect(repository.find).toHaveBeenCalled();
    });
  });

  describe('changeReviewed', () => {
    it('should change the status of a comment in the database', async () => {
      repository.save = mockRepository.save();
      repository.findOne = mockRepository.findOne(true);

      const comment = {
        comment_id: 1,
        reviewed: false,
      };
      service.changeReviewed(comment);
      expect(repository.findOne).toHaveBeenCalledWith(comment.comment_id);
    });

    it('should not change the status of a comment in the database', async () => {
      repository.save = mockRepository.save();
      repository.findOne = mockRepository.findOne(false);

      const comment = {
        comment_id: 1,
        reviewed: false,
      };
      try {
        await service.changeReviewed(comment);
      } catch (e) {
        expect(repository.findOne).toHaveBeenCalledWith(comment.comment_id);
        expect(repository.save).not.toHaveBeenCalled();
        expect(e).toBeInstanceOf(CommentNotFoundException);
      }
    });
  });
});
