import { Test, TestingModule } from '@nestjs/testing';
import { UserdataController } from './userdata.controller';

describe('Userdata Controller', () => {
  let controller: UserdataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserdataController],
    }).compile();

    controller = module.get<UserdataController>(UserdataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
