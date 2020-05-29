import { Test, TestingModule } from '@nestjs/testing';
import { TrajectoryService } from './trajectory.service';

describe('TrajectoryService', () => {
  let service: TrajectoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrajectoryService],
    }).compile();

    service = module.get<TrajectoryService>(TrajectoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
