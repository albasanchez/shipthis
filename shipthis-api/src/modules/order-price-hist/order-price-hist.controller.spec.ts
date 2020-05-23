import { Test, TestingModule } from '@nestjs/testing';
import { OrderPriceHistController } from './order-price-hist.controller';

describe('OrderPriceHist Controller', () => {
  let controller: OrderPriceHistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderPriceHistController],
    }).compile();

    controller = module.get<OrderPriceHistController>(OrderPriceHistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
