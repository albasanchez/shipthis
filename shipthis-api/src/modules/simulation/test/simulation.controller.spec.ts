import { Test, TestingModule } from '@nestjs/testing';
import { SimulationController } from '../simulation.controller';
import { SimulationService } from '../simulation.service';

describe('Simulation Controller', () => {
  let controller: SimulationController;
  let service: SimulationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SimulationController],
      providers: [
        {
          provide: SimulationService,
          useFactory() {
            return {
              getCurrentConfigTime: jest.fn(),
              updateConfigTime: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<SimulationController>(SimulationController);
    service = module.get<SimulationService>(SimulationService);
  });

  describe('getCurrentConfigTime', () => {
    it('should return current time config', () => {
      controller.getCurrentConfigtime();
      expect(service.getCurrentConfigTime).toHaveBeenCalled();
    });
  });
  describe('updateItemHist', () => {
    it('should return updated time config', () => {
      const config_time = { config_time: 5};
      controller.updateItemHist(config_time);
      expect(service.updateConfigTime).toHaveBeenCalledWith(config_time);
    });
  });
});
