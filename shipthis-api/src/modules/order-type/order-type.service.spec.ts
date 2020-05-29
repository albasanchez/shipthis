import { Test, TestingModule } from '@nestjs/testing';
import { OrderTypeService } from './order-type.service';

describe('OrderTypeService', () => {
  let service: OrderTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderTypeService],
    }).compile();

    service = module.get<OrderTypeService>(OrderTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
