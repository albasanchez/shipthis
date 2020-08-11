import { Test, TestingModule } from '@nestjs/testing';
import { ItemTypeService } from '../item-type.service';
import { ItemPriceHistRepository } from '../repositories/item-price-hist.repository';
import { CharacteristicRepository } from '../repositories/characteristic.repository';
import { CharPriceHistRepository } from '../repositories/char-price-hist.repository';
import { CharacteristicNotFoundException } from '../../../common/exceptions/characteristic-not-found.exception';
import { ItemPriceMock } from './mocks/item-price.mock';
import { CharMock, createQueryBuilder } from './mocks/characteristic.mock';
import { CharPriceMock } from './mocks/char-price.mock';
import { ItemTypeMockModuleMetadata } from './mocks/item-type.mock';
import { response } from 'express';
import { ItemPriceHist } from '../entities/item-price-hist.entity';

describe('ItemTypeService', () => {
  let service: ItemTypeService;
  let ItemRepository: ItemPriceHistRepository;
  let CharRepository: CharacteristicRepository;
  let CharPriceRepository: CharPriceHistRepository;
  const ItemPricemockRepository: ItemPriceMock = new ItemPriceMock();
  const CharmockRepository: CharMock = new CharMock();
  const CharPricemockRepository: CharPriceMock = new CharPriceMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule(
      ItemTypeMockModuleMetadata,
    ).compile();

    service = module.get<ItemTypeService>(ItemTypeService);
    ItemRepository = module.get<ItemPriceHistRepository>(
      ItemPriceHistRepository,
    );
    CharRepository = module.get<CharacteristicRepository>(
      CharacteristicRepository,
    );
    CharPriceRepository = module.get<CharPriceHistRepository>(
      CharPriceHistRepository,
    );
  });

  describe('getCurrentItemPrice', () => {
    it('should find a item price in the database', async () => {
      ItemRepository.findOne = ItemPricemockRepository.findOne();
      service.getCurrentItemPrice();
      expect(ItemRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('Active Characteristics', () => {
    it('should get all active characteristics in the database', async () => {
      jest
        .spyOn(CharRepository, 'createQueryBuilder')
        .mockImplementation(() => createQueryBuilder);

      service.getACurrentActiveCharacteristics();
      expect(CharRepository.createQueryBuilder).toHaveBeenCalled();
    });
  });

  describe('Update Price', () => {
    it('should change the price of a item in the database', async () => {
      ItemRepository.save = ItemPricemockRepository.save();
      ItemRepository.findOne = ItemPricemockRepository.findOne();
      ItemRepository.update = ItemPricemockRepository.update();

      const newPriceRegister = {
        base_price: 5,
        price_km: 5,
      };

      service.updatePriceHist(newPriceRegister);
      expect(ItemRepository.findOne).toHaveBeenCalled();
    });
  });

  describe('get CharacteristicInfo', () => {
    it('should find info about characteristic in the database', async () => {
      CharPriceRepository.find = CharPricemockRepository.find();

      service.getCharacteristicsInfo();
      expect(CharPriceRepository.find).toHaveBeenCalled();
    });
  });

  describe('update Char Hist', () => {
    it('should change info about characteristic in the database', async () => {
      CharRepository.findOne = CharmockRepository.findOne(true);
      CharPriceRepository.findOne = CharPricemockRepository.findOne();
      CharPriceRepository.update = CharPricemockRepository.update();
      CharPriceRepository.save = CharPricemockRepository.save();
      const newRegister = {
        id: 1,
        tax: 5,
      };
      service.updateCharHist(newRegister);
      expect(CharRepository.findOne).toHaveBeenCalled();
    });
    it('should not change info about characteristic in the database', async () => {
      CharRepository.findOne = CharmockRepository.findOne(false);
      const newRegister = {
        id: 1,
        tax: 5,
      };
      try {
        await service.updateCharHist(newRegister);
      } catch (e) {
        expect(CharRepository.findOne).toHaveBeenCalled();
        expect(e).toBeInstanceOf(CharacteristicNotFoundException);
      }
    });
  });
});import { from } from 'form-data';

