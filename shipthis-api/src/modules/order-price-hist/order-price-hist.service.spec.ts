import { Test, TestingModule } from '@nestjs/testing';
import { OrderPriceHistService } from './order-price-hist.service';

describe('OrderPriceHistService', () => {
  let service: OrderPriceHistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderPriceHistService],
    }).compile();

    service = module.get<OrderPriceHistService>(OrderPriceHistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
