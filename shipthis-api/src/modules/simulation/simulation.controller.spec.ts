import { Test, TestingModule } from '@nestjs/testing';
import { SimulationController } from './simulation.controller';

describe('Simulation Controller', () => {
  let controller: SimulationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulationController],
    }).compile();

    controller = module.get<SimulationController>(SimulationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
