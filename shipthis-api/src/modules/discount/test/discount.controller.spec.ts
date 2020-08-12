import { Test, TestingModule } from '@nestjs/testing';
import { DiscountController } from '../discount.controller';
import { DiscountService } from '../discount.service';

describe('Discount Controller', () => {
  let controller: DiscountController;
  let service: DiscountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountController],
      providers: [
        {
          provide: DiscountService,
          useFactory() {
            return {
              assignWelcomeDiscount: jest.fn(),
              getAvaliableDiscounts: jest.fn(),
              getDiscountsInfo: jest.fn(),
              getDiscounts: jest.fn(),
              assignDiscount: jest.fn(),
              updateDiscount: jest.fn(),
              deleteDiscount: jest.fn(),
              createDiscount: jest.fn(),
              assignDiscounts: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<DiscountController>(DiscountController);
    service = module.get<DiscountService>(DiscountService);
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAvaliableDiscounts', () => {
    it('should return saved response', () => {
      const data = { useremail: 'test@gmail.com'};
      controller.getAvaliableDiscounts(data);
      expect(service.getAvaliableDiscounts).toHaveBeenCalledWith(data.useremail);
    });
  });

  describe('getDiscounts', () => {
    it('should return saved response', () => {
      controller.getDiscounts();
      expect(service.getDiscounts).toHaveBeenCalled();
    });
  });

  describe('getDiscountsInfo', () => {
    it('should return saved response', () => {
      controller.getDiscountsInfo();
      expect(service.getDiscountsInfo).toHaveBeenCalled();
    });
  });

  describe('assignDiscount', () => {
    it('should return saved response', () => {
      const data = { discount_id:1, user_id:1};
      controller.assignDiscount(data);
      expect(service.assignDiscount).toHaveBeenCalledWith(data);
    });
  });

  describe('assignDiscounts', () => {
    it('should return saved response', () => {
      const optionInfo = { option: 1, discount_id:1};
      controller.assignDiscounts(optionInfo);
      expect(service.assignDiscounts).toHaveBeenCalledWith(optionInfo);
    });
  });

  describe('createDiscount', () => {
    it('should return saved response', () => {
      const info = { name: 'SUMMER', percentage: 20 };
      controller.createDiscount(info);
      expect(service.createDiscount).toHaveBeenCalledWith(info);
    });
  });

  describe('updateDiscount', () => {
    it('should return saved response', () => {
      const info = { name: 'SUMMER', percentage: 30 };
      controller.updateDiscount(1, info);
      expect(service.updateDiscount).toHaveBeenCalledWith(1, info);
    });
  });

  describe('deleteDiscount', () => {
    it('should return saved response', () => {
      const discountID: number = 1;
      controller.deleteDiscount(discountID);
      expect(service.deleteDiscount).toHaveBeenCalledWith(discountID);
    });
  });

});

