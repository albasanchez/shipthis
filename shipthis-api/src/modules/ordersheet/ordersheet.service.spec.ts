import { Test, TestingModule } from '@nestjs/testing';
import { OrdersheetService } from './ordersheet.service';

describe('OrdersheetService', () => {
  let service: OrdersheetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersheetService],
    }).compile();

    service = module.get<OrdersheetService>(OrdersheetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
