import { Test, TestingModule } from '@nestjs/testing';
import { OrdersheetController } from './ordersheet.controller';

describe('Ordersheet Controller', () => {
  let controller: OrdersheetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersheetController],
    }).compile();

    controller = module.get<OrdersheetController>(OrdersheetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
