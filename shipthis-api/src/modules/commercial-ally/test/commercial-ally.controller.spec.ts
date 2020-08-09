import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAllyController } from '../commercial-ally.controller';
import { CommercialAllyService } from '../commercial-ally.service';
import { ally, pickup, warehouse } from './mocks/constants';

describe('CommercialAlly Controller', () => {
  let controller: CommercialAllyController;
  let service: CommercialAllyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommercialAllyController],
      providers: [
        {
          provide: CommercialAllyService,
          useFactory() {
            return {
              calculatePickup: jest.fn(),
              registerPickup: jest.fn(),
              searchPickupDetail: jest.fn(),
              createCommercialAlly: jest.fn(),
              getAllCommercialAllies: jest.fn(),
              updateCommercialAlly: jest.fn(),
              deleteCommercialAlly: jest.fn(),
              getWarehouses: jest.fn(),
              createWarehouse: jest.fn(),
              getPickups: jest.fn(),
              updateWarehouse: jest.fn(),
              deleteWarehouse: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<CommercialAllyController>(CommercialAllyController);
    service = module.get<CommercialAllyService>(CommercialAllyService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call calculate pickup service', () => {
    controller.calculatePickup(pickup);
    expect(service.calculatePickup).toHaveBeenCalledWith(pickup);
  });

  it('should call create pickup service', () => {
    controller.createPickup(pickup, null);
    expect(service.registerPickup).toHaveBeenCalledWith(pickup, null);
  });

  it('should call consult pickup service', () => {
    controller.consultPickup(pickup);
    expect(service.searchPickupDetail).toHaveBeenCalledWith(pickup.tracking_id);
  });

  it('should call create commercial ally service', () => {
    controller.createCommercialAlly(ally);
    expect(service.createCommercialAlly).toHaveBeenCalledWith(ally);
  });

  it('should call consult commercial ally service', () => {
    controller.getAllCommercialAllies();
    expect(service.getAllCommercialAllies).toHaveBeenCalled();
  });

  it('should call update commercial ally service', () => {
    controller.updateCommercialAlly(ally);
    expect(service.updateCommercialAlly).toHaveBeenCalledWith(ally);
  });

  it('should call delete commercial ally service', () => {
    controller.deleteCommercialAlly(ally);
    expect(service.deleteCommercialAlly).toHaveBeenCalledWith(
      ally.commercial_ally_key,
    );
  });

  it('should call delete commercial ally service', () => {
    controller.deleteCommercialAlly(ally);
    expect(service.deleteCommercialAlly).toHaveBeenCalledWith(
      ally.commercial_ally_key,
    );
  });

  it('should call get commercial ally warehouses service', () => {
    controller.getWarehouses(ally);
    expect(service.getWarehouses).toHaveBeenCalledWith(
      ally.commercial_ally_key,
    );
  });

  it('should call create commercial ally warehouses service', () => {
    controller.createWarehouse(warehouse);
    expect(service.createWarehouse).toHaveBeenCalledWith(warehouse);
  });

  it('should call update commercial ally warehouses service', () => {
    controller.updateWarehouse(1, warehouse);
    expect(service.updateWarehouse).toHaveBeenCalledWith(1, warehouse);
  });

  it('should call delete commercial ally warehouses service', () => {
    controller.deleteWarehouse(1);
    expect(service.deleteWarehouse).toHaveBeenCalledWith(1);
  });

  it('should call get commercial ally pickups service', () => {
    controller.getPickups(ally);
    expect(service.getPickups).toHaveBeenCalledWith(ally.commercial_ally_key);
  });
});
