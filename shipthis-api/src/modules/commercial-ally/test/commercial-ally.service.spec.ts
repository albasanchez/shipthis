import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAllyService } from '../commercial-ally.service';
import { CommercialAllyRepository } from '../repositories/commercial-ally.repository';
import { WarehouseRepository } from '../repositories/warehouse.repository';
import {
  commercialAllyMockModuleMetadata,
  CommercialAllyMock,
  createQueryBuilder,
  ItemPriceMock,
  PlaceMock,
} from './mocks/commercial-ally.mock';
import {
  CommercialAllyDeletedException,
  WarehouseDeletedException,
  WarehouseNotFoundException,
  CommercialAllyNotFoundException,
  BadItemStructureException,
  PickupNotFoundException,
} from '../../../common/exceptions';
import { CharacteristicRepository } from '../../../modules/item-type/repositories/characteristic.repository';
import { Characteristic } from '../../../modules/item-type/entities/characteristic.entity';
import { CharPriceHist } from '../../../modules/item-type/entities/char-price-hist.entity';
import { LocationMock } from '../../../modules/dao/mocks/location.mock';
import axios from 'axios';
import { ItemPriceHistRepository } from '../../../modules/item-type/repositories/item-price-hist.repository';
import {
  WarehouseMock,
  warehouseCreateQueryBuilder,
} from './mocks/warehouse.mock';
import { PickupRepository } from '../repositories/pickup.repository';
import { PickupMock } from './mocks/pickup.mock';
import {
  defaultWarehouse,
  defaultPlace,
  response,
  warehouse,
} from './mocks/constants';
import { PlaceRepository } from '../../../modules/ordersheet/repositories/place.repository';

describe('CommercialAllyService', () => {
  let service: CommercialAllyService;
  let allyRepository: CommercialAllyRepository;
  let warehouseRepository: WarehouseRepository;
  let characteristicRepository: CharacteristicRepository;
  let itemPriceRepository: ItemPriceHistRepository;
  let pickupRepository: PickupRepository;
  let placeRepository: PlaceRepository;
  const mockAllyRepository: CommercialAllyMock = new CommercialAllyMock();
  const mockWarehouseRepository: WarehouseMock = new WarehouseMock();
  const mockItemPriceRepository: ItemPriceMock = new ItemPriceMock();
  const mockPickupRepository: PickupMock = new PickupMock();
  const mockPlaceRepository: PlaceMock = new PlaceMock();
  const locationMock: LocationMock = new LocationMock();

  const pickup = {
    tracking_id: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
    commercial_ally_api_key: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
    Warehouse_id: 1,
    rec_first_name: 'John',
    rec_last_name: 'Doe',
    rec_email: 'johnDoe@gmail.com',
    rec_phone_number: '+1 (234) 567890',
    destination_address: 'Berry Street',
    items: [
      {
        description: 'Item1',
        item_weight: 100,
        item_length: 130,
        item_width: 30,
        item_height: 50,
        characteristics: [new Characteristic(), new Characteristic()],
      },
      {
        description: 'Item2',
        item_weight: 100,
        item_length: 130,
        item_width: 30,
        item_height: 50,
        characteristics: null,
      },
    ],
  };
  const ally = {
    commercial_ally_key: 'b902ff4b-9ee2-4ea8-9d61-83e035eccb26',
    name: 'CommercialAlly',
    email: 'ally@gmail.com',
    phone_number: '+1 (234) 567890',
    manager_name: 'manager',
    manager_last_name: 'name',
    description: 'eCommerce',
    warehouses: [defaultWarehouse],
    status: '',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      commercialAllyMockModuleMetadata,
    ).compile();

    service = module.get<CommercialAllyService>(CommercialAllyService);
    allyRepository = module.get<CommercialAllyRepository>(
      CommercialAllyRepository,
    );
    warehouseRepository = module.get<WarehouseRepository>(WarehouseRepository);
    characteristicRepository = module.get<CharacteristicRepository>(
      CharacteristicRepository,
    );
    itemPriceRepository = module.get<ItemPriceHistRepository>(
      ItemPriceHistRepository,
    );
    pickupRepository = module.get<PickupRepository>(PickupRepository);
    placeRepository = module.get<PlaceRepository>(PlaceRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(allyRepository).toBeDefined();
    expect(warehouseRepository).toBeDefined();
  });

  describe('pickup', () => {
    it('should calculate pickup data', async () => {
      pickup.items[0].characteristics[0].characteristic_id = 1;
      pickup.items[0].characteristics[1].characteristic_id = 2;
      pickup.items[0].characteristics[1].char_price_hists = [
        new CharPriceHist(),
      ];
      pickup.items[0].characteristics[1].char_price_hists[0].char_price_hist_id = 2;

      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.findOne = mockWarehouseRepository.findOne('Active');
      jest
        .spyOn(characteristicRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);
      axios.get = locationMock.get();
      itemPriceRepository.findOne = mockItemPriceRepository.findOne();

      await service.calculatePickup(pickup);
      expect(allyRepository.findOne).toHaveBeenCalledWith({
        where: { commercial_ally_id: pickup.commercial_ally_api_key },
      });
      expect(warehouseRepository.findOne).toHaveBeenCalled();
      expect(characteristicRepository.createQueryBuilder).toHaveBeenCalled();
    });
    it('should register a pickup', async () => {
      pickup.items[0].characteristics[0].characteristic_id = 1;
      pickup.items[0].characteristics[1].characteristic_id = 2;
      pickup.items[0].characteristics[1].char_price_hists = [
        new CharPriceHist(),
      ];
      pickup.items[0].characteristics[1].char_price_hists[0].char_price_hist_id = 2;

      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.findOne = mockWarehouseRepository.findOne('Active');
      jest
        .spyOn(characteristicRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);
      axios.get = locationMock.get();
      itemPriceRepository.findOne = mockItemPriceRepository.findOne();
      pickupRepository.save = mockPickupRepository.save();

      await service.registerPickup(pickup, response);
      expect(allyRepository.findOne).toHaveBeenCalledWith({
        where: { commercial_ally_id: pickup.commercial_ally_api_key },
      });
      expect(warehouseRepository.findOne).toHaveBeenCalled();
      expect(characteristicRepository.createQueryBuilder).toHaveBeenCalled();
      expect(pickupRepository.save).toHaveBeenCalled();
    });
    it('should consult a pickup', async () => {
      pickupRepository.findOne = mockPickupRepository.findOne(true);
      await service.searchPickupDetail(pickup.tracking_id);
      expect(pickupRepository.findOne).toHaveBeenCalledWith(pickup.tracking_id);
    });
  });

  describe('commercial ally', () => {
    it('should create a commercial ally', async () => {
      ally.warehouses[0].place = defaultPlace;
      ally.warehouses[0].place.address = 'Berry Street';
      axios.get = locationMock.get();
      allyRepository.save = mockAllyRepository.save();
      await service.createCommercialAlly(ally);
      expect(allyRepository.save).toHaveBeenCalled();
    });
    it('should consult all commercial allies', async () => {
      allyRepository.find = mockAllyRepository.find();
      await service.getAllCommercialAllies();
      expect(allyRepository.find).toHaveBeenCalled();
    });
    it('should update a commercial ally', async () => {
      allyRepository.findOne = mockAllyRepository.findOne('Active');
      allyRepository.update = mockAllyRepository.update();
      await service.updateCommercialAlly(ally);
      expect(allyRepository.findOne).toHaveBeenCalled();
    });
    it('should delete a commercial ally', async () => {
      allyRepository.findOne = mockAllyRepository.findOne('Active');
      jest
        .spyOn(warehouseRepository, 'createQueryBuilder')
        .mockImplementation(() => warehouseCreateQueryBuilder);
      allyRepository.update = mockAllyRepository.update();
      await service.deleteCommercialAlly(ally.commercial_ally_key);
      expect(allyRepository.findOne).toHaveBeenCalled();
    });
    it('should consult all warehouses from a commercial ally', async () => {
      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.find = mockWarehouseRepository.find();
      await service.getWarehouses(ally.commercial_ally_key);
      expect(allyRepository.findOne).toHaveBeenCalled();
    });
    it('should consult all pickups from a commercial ally', async () => {
      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.find = mockWarehouseRepository.find();
      pickupRepository.find = mockPickupRepository.find();
      await service.getPickups(ally.commercial_ally_key);
      expect(allyRepository.findOne).toHaveBeenCalled();
      expect(warehouseRepository.find).toHaveBeenCalled();
      expect(pickupRepository.find).toHaveBeenCalled();
    });
  });

  describe('warehouse', () => {
    it('should create a warehouse', async () => {
      axios.get = locationMock.get();
      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.save = mockWarehouseRepository.save();
      await service.createWarehouse(warehouse);
      expect(allyRepository.findOne).toHaveBeenCalled();
      expect(warehouseRepository.save).toHaveBeenCalled();
    });
    it('should update a warehouse', async () => {
      warehouseRepository.findOne = mockWarehouseRepository.findOne('Active');
      axios.get = locationMock.get();
      placeRepository.save = mockPlaceRepository.save(true);
      warehouseRepository.update = mockWarehouseRepository.update();
      await service.updateWarehouse(1, warehouse);
      expect(warehouseRepository.findOne).toHaveBeenCalled();
      expect(placeRepository.save).toHaveBeenCalled();
      expect(warehouseRepository.update).toHaveBeenCalled();
    });
    it('should delete a warehouse', async () => {
      warehouseRepository.findOne = mockWarehouseRepository.findOne('Active');
      warehouseRepository.update = mockWarehouseRepository.update();
      await service.deleteWarehouse(1);
      expect(warehouseRepository.findOne).toHaveBeenCalled();
      expect(warehouseRepository.update).toHaveBeenCalled();
    });
  });

  describe('pickup exceptions', () => {
    it('should throw pickup not found exception', async () => {
      pickupRepository.findOne = mockPickupRepository.findOne(false);
      try {
        await service.searchPickupDetail(pickup.tracking_id);
      } catch (e) {
        expect(pickupRepository.findOne).toHaveBeenCalledWith(
          pickup.tracking_id,
        );
        expect(e).toBeInstanceOf(PickupNotFoundException);
      }
    });
    it('should throw bad item structure exception because characteristic id does not exist', async () => {
      pickup.items[0].characteristics[0].characteristic_id = null;
      pickup.items[0].characteristics[1].characteristic_id = 2;
      pickup.items[0].characteristics[1].char_price_hists = [
        new CharPriceHist(),
      ];
      pickup.items[0].characteristics[1].char_price_hists[0].char_price_hist_id = 2;

      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.findOne = mockWarehouseRepository.findOne('Active');
      jest
        .spyOn(characteristicRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);
      axios.get = locationMock.get();
      itemPriceRepository.findOne = mockItemPriceRepository.findOne();
      try {
        await service.calculatePickup(pickup);
      } catch (e) {
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
        expect(warehouseRepository.findOne).toHaveBeenCalled();
        expect(characteristicRepository.createQueryBuilder).toHaveBeenCalled();
        expect(e).toBeInstanceOf(BadItemStructureException);
      }
    });
    it('should throw bad item structure exception because characteristic id is innactive', async () => {
      pickup.items[0].characteristics[0].characteristic_id = 10;
      pickup.items[0].characteristics[1].characteristic_id = 2;
      pickup.items[0].characteristics[1].char_price_hists = [
        new CharPriceHist(),
      ];
      pickup.items[0].characteristics[1].char_price_hists[0].char_price_hist_id = 2;

      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.findOne = mockWarehouseRepository.findOne('Active');
      jest
        .spyOn(characteristicRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);
      axios.get = locationMock.get();
      itemPriceRepository.findOne = mockItemPriceRepository.findOne();
      try {
        await service.calculatePickup(pickup);
      } catch (e) {
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
        expect(warehouseRepository.findOne).toHaveBeenCalled();
        expect(characteristicRepository.createQueryBuilder).toHaveBeenCalled();
        expect(e).toBeInstanceOf(BadItemStructureException);
      }
    });
    it('should throw commercial ally deleted exception', async () => {
      allyRepository.findOne = mockAllyRepository.findOne('Deleted');
      try {
        await service.calculatePickup(pickup);
      } catch (e) {
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
        expect(e).toBeInstanceOf(CommercialAllyDeletedException);
      }
    });
    it('should throw warehouse deleted exception', async () => {
      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.findOne = mockWarehouseRepository.findOne('Deleted');
      try {
        await service.calculatePickup(pickup);
      } catch (e) {
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
        expect(e).toBeInstanceOf(WarehouseDeletedException);
      }
    });
    it('should throw bad item structure exception', async () => {
      pickup.items[0].characteristics[0].characteristic_id = 1;
      pickup.items[0].characteristics[1].characteristic_id = 2;
      pickup.items[0].item_height = null;

      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.findOne = mockWarehouseRepository.findOne('Active');
      jest
        .spyOn(characteristicRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);
      try {
        await service.calculatePickup(pickup);
      } catch (e) {
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
        expect(e).toBeInstanceOf(BadItemStructureException);
      }
    });
    it('should throw commercial ally not found exception', async () => {
      allyRepository.findOne = mockAllyRepository.findOne('Not found');
      try {
        await service.calculatePickup(pickup);
      } catch (e) {
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
        expect(e).toBeInstanceOf(CommercialAllyNotFoundException);
      }
    });
    it('should throw warehouse not found exception', async () => {
      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.findOne = mockWarehouseRepository.findOne(
        'Not found',
      );
      try {
        await service.calculatePickup(pickup);
      } catch (e) {
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
        expect(e).toBeInstanceOf(WarehouseNotFoundException);
      }
    });
  });

  describe('commercial ally exceptions', () => {
    it('should throw commercial ally deleted exception while updating', async () => {
      allyRepository.findOne = mockAllyRepository.findOne('Deleted');
      try {
        await service.updateCommercialAlly(ally);
      } catch (e) {
        expect(allyRepository.findOne).toHaveBeenCalled();
        expect(e).toBeInstanceOf(CommercialAllyDeletedException);
      }
    });
    it('should throw commercial ally deleted exception while deleting', async () => {
      allyRepository.findOne = mockAllyRepository.findOne('Deleted');
      try {
        await service.deleteCommercialAlly(ally.commercial_ally_key);
      } catch (e) {
        expect(allyRepository.findOne).toHaveBeenCalled();
        expect(e).toBeInstanceOf(CommercialAllyDeletedException);
      }
    });
  });

  describe('warehouse exceptions', () => {
    it('should throw commercial ally deleted exception', async () => {
      axios.get = locationMock.get();
      allyRepository.findOne = mockAllyRepository.findOne('Deleted');
      warehouseRepository.save = mockWarehouseRepository.save();
      try {
        await service.createWarehouse(warehouse);
      } catch (e) {
        expect(allyRepository.findOne).toHaveBeenCalled();
        expect(e).toBeInstanceOf(CommercialAllyDeletedException);
      }
    });
    it('should throw warehouse deleted exception', async () => {
      warehouseRepository.findOne = mockWarehouseRepository.findOne('Deleted');
      try {
        await service.updateWarehouse(1, warehouse);
      } catch (e) {
        expect(warehouseRepository.findOne).toHaveBeenCalled();
        expect(e).toBeInstanceOf(WarehouseDeletedException);
      }
    });
  });
});
