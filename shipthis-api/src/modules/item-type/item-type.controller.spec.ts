import { Test, TestingModule } from '@nestjs/testing';
import { ItemTypeController } from './item-type.controller';

describe('ItemType Controller', () => {
  let controller: ItemTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemTypeController],
    }).compile();

    controller = module.get<ItemTypeController>(ItemTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
