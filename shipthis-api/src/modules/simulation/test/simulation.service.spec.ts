import { Test, TestingModule } from '@nestjs/testing';
import { SimulationService } from '../simulation.service';
import { SimulationRepository } from '../repositories/simulation.repository';
import { CheckPointRepository } from '../../../modules/ordersheet/repositories/check-point.repository';
import { PickupRepository } from '../../../modules/commercial-ally/repositories/pickup.repository';
import { OrdersheetRepository } from '../../../modules/ordersheet/repositories/ordersheet.repository';
import {
  SimulationMock,
  simulationMockModuleMetadata,
} from './mocks/simulation.mock';
import { checkpointCreateQueryBuilder } from './mocks/checkpoint.mock';
import { PickupMock, pickupCreateQueryBuilder } from './mocks/pickup.mock';
import { job} from './mocks/cronjob.mock';
import {
  OrdersheetMock, ordersheetCreateQueryBuilder
} from './mocks/ordersheet.mock';
import {
  SchedulerRegistry,
} from '@nestjs/schedule';


describe('SimulationService', () => {
  let service: SimulationService;
  let repository: SimulationRepository;
  let checkpointRepository: CheckPointRepository;
  let pickupRepository: PickupRepository;
  let ordersheetRepository: OrdersheetRepository;
  let scheduler: SchedulerRegistry;
  const mockRepository: SimulationMock = new SimulationMock();
  const ordersheetMockRepository: OrdersheetMock = new OrdersheetMock();
  const pickupMockRepository: PickupMock = new PickupMock();
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      simulationMockModuleMetadata,
    ).compile();

    service = module.get<SimulationService>(SimulationService);
    repository = module.get<SimulationRepository>(SimulationRepository);
    checkpointRepository = module.get<CheckPointRepository>(
      CheckPointRepository,
    );
    pickupRepository = module.get<PickupRepository>(
      PickupRepository,
    );
    ordersheetRepository = module.get<OrdersheetRepository>(
      OrdersheetRepository,
    );
    scheduler = module.get<SchedulerRegistry>(
      SchedulerRegistry,
    );
  });

  describe('updateConfigTime', () => {
    it('should update simulation configuration time', async () => {
      repository.findOne = mockRepository.findOne();
      repository.update = mockRepository.update();
      repository.save = mockRepository.save();
      service.getExcutionTime = mockRepository.getExecutionTime();
      const config_time = { config_time: 5 };
      await service.updateConfigTime(config_time);
      expect(repository.findOne).toHaveBeenCalled();
      expect(repository.update).toHaveBeenCalled();
      expect(repository.save).toHaveBeenCalled();
    });
  });

  describe('getCurrentConfigTime', () => {
    it('should return current configuration time', async () => {
      repository.findOne = mockRepository.findOne();
      await service.getCurrentConfigTime();
      expect(repository.findOne).toHaveBeenCalled();
    });
  });

  describe('getExcutionTime', () => {
    it('should get exeution time', async () => {
      jest
        .spyOn(scheduler, 'getCronJob')
        .mockImplementation(() => job);
        repository.findOne = mockRepository.findOne();
      await service.getExcutionTime();
      
      expect(repository.findOne).toHaveBeenCalled();
    });
  });

describe('handleCron', () => {
  it('should update pickup and order sheet status', async () => {
    jest
      .spyOn(ordersheetRepository, 'createQueryBuilder')
      .mockImplementation(() => ordersheetCreateQueryBuilder);

    jest
    .spyOn(pickupRepository, 'createQueryBuilder')
    .mockImplementation(() => pickupCreateQueryBuilder);

    ordersheetRepository.find = ordersheetMockRepository.find('DELIVERY', false, false);
    pickupRepository.find = pickupMockRepository.find('DELIVERY', false, false)
    await service.handleCron();
    expect(ordersheetRepository.createQueryBuilder).toHaveBeenCalled();
    expect(pickupRepository.createQueryBuilder).toHaveBeenCalled();
    expect(ordersheetRepository.find).toHaveBeenCalled();
    expect(pickupRepository.find).toHaveBeenCalled()
  });



 
    it('should update pickup and order sheet status and check points', async () => {
      jest
      .spyOn(checkpointRepository, 'createQueryBuilder')
      .mockImplementation(() => checkpointCreateQueryBuilder);

      jest
        .spyOn(ordersheetRepository, 'createQueryBuilder')
        .mockImplementation(() => ordersheetCreateQueryBuilder);
  
      jest
      .spyOn(pickupRepository, 'createQueryBuilder')
      .mockImplementation(() => pickupCreateQueryBuilder);
  
      ordersheetRepository.find = ordersheetMockRepository.find('DELIVERY', true, false);
      pickupRepository.find = pickupMockRepository.find('DELIVERY', true, false)
      await service.handleCron();
      expect(ordersheetRepository.createQueryBuilder).toHaveBeenCalled();
      expect(pickupRepository.createQueryBuilder).toHaveBeenCalled();
      expect(ordersheetRepository.find).toHaveBeenCalled();
      expect(pickupRepository.find).toHaveBeenCalled()
    });


  
    it('should update pickup and order sheet status for orders without DELIVERY status', async () => {
      jest
        .spyOn(ordersheetRepository, 'createQueryBuilder')
        .mockImplementation(() => ordersheetCreateQueryBuilder);

      jest
      .spyOn(pickupRepository, 'createQueryBuilder')
      .mockImplementation(() => pickupCreateQueryBuilder);

      ordersheetRepository.find = ordersheetMockRepository.find('DELIVERED', true, false);
      pickupRepository.find = pickupMockRepository.find('DELIVERED', true, false)
      await service.handleCron();
      expect(ordersheetRepository.createQueryBuilder).toHaveBeenCalled();
      expect(pickupRepository.createQueryBuilder).toHaveBeenCalled();
      expect(ordersheetRepository.find).toHaveBeenCalled();
      expect(pickupRepository.find).toHaveBeenCalled()
    });



    it('should update check points for orders without DELIVERY status', async () => {
      jest
      .spyOn(checkpointRepository, 'createQueryBuilder')
      .mockImplementation(() => checkpointCreateQueryBuilder);

      jest
        .spyOn(ordersheetRepository, 'createQueryBuilder')
        .mockImplementation(() => ordersheetCreateQueryBuilder);

      jest
      .spyOn(pickupRepository, 'createQueryBuilder')
      .mockImplementation(() => pickupCreateQueryBuilder);

      ordersheetRepository.find = ordersheetMockRepository.find('DELIVERED', true, true);
      pickupRepository.find = pickupMockRepository.find('DELIVERED', true, true)
      await service.handleCron();
      expect(ordersheetRepository.find).toHaveBeenCalled();
      expect(pickupRepository.find).toHaveBeenCalled()
    });
  });
});
