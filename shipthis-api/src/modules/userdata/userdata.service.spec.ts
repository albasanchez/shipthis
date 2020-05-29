import { Test, TestingModule } from '@nestjs/testing';
import { UserdataService } from './userdata.service';

describe('UserdataService', () => {
  let service: UserdataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserdataService],
    }).compile();

    service = module.get<UserdataService>(UserdataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
