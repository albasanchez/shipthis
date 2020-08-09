import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAllyController } from '../commercial-ally.controller';
import { CommercialAllyService } from '../commercial-ally.service';
import { Place } from '../../../modules/ordersheet/entities/place.entity';

describe('CommercialAlly Controller', () => {
  let controller: CommercialAllyController;
  let service: CommercialAllyService;
  const ally = {
    commercial_ally_key: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
    name: 'CommercialAlly',
    email: 'ally@gmail.com',
    phone_number: '+1 (234) 567890',
    manager_name: 'manager',
    manager_last_name: 'name',
    description: 'eCommerce',
    warehouses: [],
  };
  const pickup = {
    tracking_id: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
    commercial_ally_api_key: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
    Warehouse_id: 1,
    rec_first_name: 'John',
    rec_last_name: 'Doe',
    rec_email: 'johnDoe@gmail.com',
    rec_phone_number: '+1 (234) 567890',
    destination_address: 'Berry Street',
    items: [],
  };
  const warehouse = {
    name: 'Warehouse',
    commercial_ally_key: 'ad1da626-b492-4c9c-ac0b-655852d9a6e8',
    address: '199-145 W Brighton Ave. Syracuse, NY . USA',
    place: new Place
  };

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
    controller.deleteWarehouse(1)
    expect(service.deleteWarehouse).toHaveBeenCalledWith(1);
  });

  it('should call get commercial ally pickups service', () => {
    controller.getPickups(ally);
    expect(service.getPickups).toHaveBeenCalledWith(ally.commercial_ally_key);
  });
});
