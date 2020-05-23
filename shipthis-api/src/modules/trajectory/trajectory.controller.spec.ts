import { Test, TestingModule } from '@nestjs/testing';
import { TrajectoryController } from './trajectory.controller';

describe('Trajectory Controller', () => {
  let controller: TrajectoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TrajectoryController],
    }).compile();

    controller = module.get<TrajectoryController>(TrajectoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
