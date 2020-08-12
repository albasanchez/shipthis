import { Test, TestingModule } from '@nestjs/testing';
import { OrderTypeController } from '../order-type.controller';
import { OrderTypeService } from '../order-type.service';
import { updateOrderType } from './mocks/constants.mock';

describe('OrderType Controller', () => {
  let controller: OrderTypeController;
  let service: OrderTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderTypeController],
      providers: [
        {
          provide: OrderTypeService,
          useFactory() {
            return {
              getAllActiveOrdertypes: jest.fn(),
              updateOrderTypeHist: jest.fn(),
            };
          },
        },
      ],
    }).compile();

    controller = module.get<OrderTypeController>(OrderTypeController);
    service = module.get<OrderTypeService>(OrderTypeService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call get all active order types service', () => {
    controller.getAllActiveOrdertypes();
    expect(service.getAllActiveOrdertypes).toBeCalled();
  });

  it('should call update order types service', () => {
    controller.updateCharHist(updateOrderType);
    expect(service.updateOrderTypeHist).toBeCalledWith(updateOrderType);
  });
});
