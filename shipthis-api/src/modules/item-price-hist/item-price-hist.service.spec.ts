import { Test, TestingModule } from '@nestjs/testing';
import { ItemPriceHistService } from './item-price-hist.service';

describe('ItemPriceHistService', () => {
  let service: ItemPriceHistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemPriceHistService],
    }).compile();

    service = module.get<ItemPriceHistService>(ItemPriceHistService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
