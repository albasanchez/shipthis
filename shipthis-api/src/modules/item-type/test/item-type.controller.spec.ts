import { Test, TestingModule } from '@nestjs/testing';
import { ItemTypeController } from '../item-type.controller';
import { ItemTypeService } from '../item-type.service';

describe('ItemType Controller', () => {
  let controller: ItemTypeController;
  let service: ItemTypeService; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemTypeController],
      providers: [
        {
          provide: ItemTypeService,
          useFactory() {
            return {
              getCurrentItemPrice: jest.fn(),
              getACurrentActiveCharacteristics: jest.fn(),
              updatePriceHist: jest.fn(),
              getCharacteristicsInfo: jest.fn(),
              updateCharHist: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<ItemTypeController>(ItemTypeController);
    service = module.get<ItemTypeService>(ItemTypeService);
  });

  describe('current-price', () => {
    it('should return a response about current price', () => {
      controller.getCurrentItemPrice();
      expect(service.getCurrentItemPrice).toHaveBeenCalled();
    });
  });

  describe('active-characteristics', () => {
    it('should return an active characteristics', () => {
      controller.getACurrentActiveCharacteristics();
      expect(service.getACurrentActiveCharacteristics).toHaveBeenCalled();
    });
  });

  describe('updateItemHistory', () => {
    it('should return a saved response', () => {
      const newRegister = { base_price: 5, price_km: 5 };
      controller.updateItemHist(newRegister);
      expect(service.updatePriceHist).toHaveBeenCalledWith(newRegister);
    });
  });

  describe('characteristics', () => {
    it('should return a characteristics', () => {
      controller.getCharacteristicsInfo();
      expect(service.getCharacteristicsInfo).toHaveBeenCalled();
    });
  });

  describe('update-charHistory', () => {
    it('should return a saved response', () => {
      const newRegister = { id: 1, tax: 5 };
      controller.updateCharHist(newRegister);
      expect(service.updateCharHist).toHaveBeenCalledWith(newRegister);
    });
  });
});
