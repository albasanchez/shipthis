import { Test, TestingModule } from '@nestjs/testing';
import { DiscountController } from './discount.controller';

describe('Discount Controller', () => {
  let controller: DiscountController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DiscountController],
    }).compile();

    controller = module.get<DiscountController>(DiscountController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
