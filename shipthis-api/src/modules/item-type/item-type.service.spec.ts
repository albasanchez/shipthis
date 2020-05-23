import { Test, TestingModule } from '@nestjs/testing';
import { ItemTypeService } from './item-type.service';

describe('ItemTypeService', () => {
  let service: ItemTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemTypeService],
    }).compile();

    service = module.get<ItemTypeService>(ItemTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
