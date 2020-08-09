import { Test, TestingModule } from '@nestjs/testing';
import { CommercialAllyService } from '../commercial-ally.service';
import { CommercialAllyRepository } from '../repositories/commercial-ally.repository';
import { WarehouseRepository } from '../repositories/warehouse.repository';
import {
  commercialAllyMockModuleMetadata,
  CommercialAllyMock,
  createQueryBuilder,
  ItemPriceMock,
} from './mocks/commercial-ally.mock';
import {
  CommercialAllyDeletedException,
  WarehouseDeletedException,
  WarehouseNotFoundException,
  CommercialAllyNotFoundException,
  BadItemStructureException,
} from '../../../common/exceptions';
import { CharacteristicRepository } from '../../../modules/item-type/repositories/characteristic.repository';
import { Characteristic } from '../../../modules/item-type/entities/characteristic.entity';
import { CharPriceHist } from '../../../modules/item-type/entities/char-price-hist.entity';
import { LocationMock } from '../../../modules/dao/mocks/location.mock';
import axios from 'axios';
import { ItemPriceHistRepository } from '../../../modules/item-type/repositories/item-price-hist.repository';
import { WarehouseMock } from './mocks/warehouse.mock';
import { PickupRepository } from '../repositories/pickup.repository';
import { PickupMock } from './mocks/pickup.mock';
import { HttpStatus } from '@nestjs/common';

describe('CommercialAllyService', () => {
  let service: CommercialAllyService;
  let allyRepository: CommercialAllyRepository;
  let warehouseRepository: WarehouseRepository;
  let characteristicRepository: CharacteristicRepository;
  let itemPriceRepository: ItemPriceHistRepository;
  let pickupRepository: PickupRepository;
  const mockAllyRepository: CommercialAllyMock = new CommercialAllyMock();
  const mockWarehouseRepository: WarehouseMock = new WarehouseMock();
  const mockItemPriceRepository: ItemPriceMock = new ItemPriceMock();
  const mockPickupRepository: PickupMock = new PickupMock();
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
  const response: any = {
    json: (body?: any) => {
      //
    },
    status: (code: number) => HttpStatus.OK,
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(allyRepository).toBeDefined();
    expect(warehouseRepository).toBeDefined();
  });

  describe('register pickup functions', () => {
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
  });

  describe('throw exceptions', () => {
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
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
        expect(warehouseRepository.findOne).toHaveBeenCalled();
        expect(characteristicRepository.createQueryBuilder).toHaveBeenCalled();
      } catch (e) {
        expect(e).toEqual(new BadItemStructureException());
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
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
        expect(warehouseRepository.findOne).toHaveBeenCalled();
        expect(characteristicRepository.createQueryBuilder).toHaveBeenCalled();
      } catch (e) {
        expect(e).toEqual(new BadItemStructureException());
      }
    });
    it('should throw commercial ally deleted exception', () => {
      allyRepository.findOne = mockAllyRepository.findOne('Deleted');
      try {
        service.calculatePickup(pickup);
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
      } catch (e) {
        expect(e).toEqual(new CommercialAllyDeletedException());
      }
    });
    it('should throw warehouse deleted exception', () => {
      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.findOne = mockWarehouseRepository.findOne('Deleted');
      try {
        service.calculatePickup(pickup);
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
      } catch (e) {
        expect(e).toEqual(new WarehouseDeletedException());
      }
    });
    it('should throw bad item structure exception', () => {
      pickup.items[0].characteristics[0].characteristic_id = 1;
      pickup.items[0].characteristics[1].characteristic_id = 2;
      pickup.items[0].item_height = null;

      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.findOne = mockWarehouseRepository.findOne('Active');
      jest
        .spyOn(characteristicRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);
      try {
        service.calculatePickup(pickup);
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
      } catch (e) {
        expect(e).toEqual(new BadItemStructureException());
      }
    });
    it('should throw commercial ally not found exception', () => {
      allyRepository.findOne = mockAllyRepository.findOne('Not found');
      try {
        service.calculatePickup(pickup);
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
      } catch (e) {
        expect(e).toEqual(new CommercialAllyNotFoundException());
      }
    });
    it('should throw warehouse not found exception', () => {
      allyRepository.findOne = mockAllyRepository.findOne('Active');
      warehouseRepository.findOne = mockWarehouseRepository.findOne(
        'Not found',
      );
      try {
        service.calculatePickup(pickup);
        expect(allyRepository.findOne).toHaveBeenCalledWith({
          where: { commercial_ally_id: pickup.commercial_ally_api_key },
        });
      } catch (e) {
        expect(e).toEqual(new WarehouseNotFoundException());
      }
    });
  });
});
