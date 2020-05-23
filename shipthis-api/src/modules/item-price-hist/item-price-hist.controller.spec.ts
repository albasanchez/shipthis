import { Test, TestingModule } from '@nestjs/testing';
import { ItemPriceHistController } from './item-price-hist.controller';

describe('ItemPriceHist Controller', () => {
  let controller: ItemPriceHistController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemPriceHistController],
    }).compile();

    controller = module.get<ItemPriceHistController>(ItemPriceHistController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
