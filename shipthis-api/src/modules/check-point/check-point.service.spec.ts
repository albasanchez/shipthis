import { Test, TestingModule } from '@nestjs/testing';
import { CheckPointService } from './check-point.service';

describe('CheckPointService', () => {
  let service: CheckPointService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CheckPointService],
    }).compile();

    service = module.get<CheckPointService>(CheckPointService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
